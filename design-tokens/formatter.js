import StyleDictionary from "style-dictionary";

const { fileHeader } = StyleDictionary.formatHelpers;

/*
 * 単純なオブジェクトに変換するフォーマッター
 * 値と小要素を持つ場合にはDEFAULTというキーに値が入る
 */
StyleDictionary.registerFormat({
  name: "spread-module",
  formatter: ({ dictionary, file }) => {
    const res = format(dictionary.tokens);
    return (
      fileHeader({ file }) + "export default " + JSON.stringify(res, false, 2)
    );
  },
});

const format = (obj) => {
  let res = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj.value !== "undefined") {
      if (key === "value") {
        if (obj["$modes"]) {
          res.DEFAULT = obj[key];
        } else {
          res = obj[key];
        }
      } else if (key === "$modes") {
        Object.keys(obj[key]).forEach((mode) => {
          res[mode] = format(obj[key][mode]);
        });
      }
    } else if (obj[key] && typeof obj[key] === "object") {
      res[key] = format(obj[key]);
    }
  });
  return res;
};

StyleDictionary.registerFormat({
  name: "spread-module-declarations",
  formatter: ({ dictionary, file }) => {
    const res = format(dictionary.tokens);
    const moduleName = "tokens";

    const walker = (obj) => {
      const res = {};
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object") {
          res[key] = walker(obj[key]);
        } else {
          res[key] = "__" + typeof obj[key] + "__";
        }
      });
      return res;
    };

    const output =
      fileHeader({ file }) +
      `export default ${moduleName};
declare const ${moduleName}: ` +
      JSON.stringify(walker(res), false, 2);

    return output
      .replace(/"__string__"/g, "string")
      .replace(/"__number__"/g, "number");
  },
});

/*
 * $typeを使って、PandaCSSのToken Typeに合わせたデータを生成するフォーマッター
 */

StyleDictionary.registerFormat({
  name: "panda-css-module",
  formatter: ({ dictionary, file }) => {
    const res = pandaCssObjectFormat(dictionary.tokens);
    const output =
      fileHeader({ file }) + "export default " + JSON.stringify(res, false, 2);
    return output;
  },
});

StyleDictionary.registerFormat({
  name: "panda-css-module-declarations",
  formatter: ({ dictionary, file }) => {
    const res = pandaCssObjectFormat(dictionary.tokens);
    const moduleName = "tokens";

    const walker = (obj) => {
      const res = {};
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object") {
          res[key] = walker(obj[key]);
        } else {
          res[key] = "__" + typeof obj[key] + "__";
        }
      });
      return res;
    };

    const output =
      fileHeader({ file }) +
      `export default ${moduleName};
declare const ${moduleName}: ` +
      JSON.stringify(walker(res), false, 2);

    return output
      .replace(/"__string__"/g, "string")
      .replace(/"__number__"/g, "number");
  },
});

/*
 * フォーマッターのコア
 * ここでデータを整形する
 */

const pandaCssObjectFormat = (o) => {
  const res = {};
  const walker = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === "object") {
        if (obj[key].path) {
          const path = obj[key].path;
          const value = valueTypeConverter(obj[key].value);
          const type = obj[key].$type;
          const pathAsStr = path.join(".");

          // ここでToken Typesを判定する
          // https://panda-css.com/docs/theming/tokens
          if (type === "color") {
            path.unshift("colors");
          } else if (type === "fontFamily") {
            path.unshift("fonts");
          } else if (type === "fontWeight") {
            path.unshift("fontWeights");
          } else if (type === "shadow") {
            path.unshift("shadows");
          } else if (pathAsStr.match(/\.radius\./)) {
            path.unshift("radii");
          } else {
            // Token Typesに該当しないものは省く
            continue;
          }

          let r = res;
          while (path.length > 0) {
            const p = path.shift();
            if (path.length === 0) {
              r[p] = { value };
            }
            if (r[p] === undefined) {
              r[p] = {};
            }
            r = r[p];
          }
        }
        walker(obj[key]);
      }
    }
  };
  walker(structuredClone(o));

  return res;
};

const valueTypeConverter = (obj) => {
  if (typeof obj !== "object") return obj;
  const ret = {};
  const convert2number = ["offsetX", "offsetY", "blur", "spread"];
  for (const key in obj) {
    let value = obj[key];
    if (convert2number.includes(key)) {
      value = parseInt(value);
    }
    ret[key] = value;
  }
  return ret;
};
