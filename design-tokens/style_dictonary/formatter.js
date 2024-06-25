import StyleDictionary from "style-dictionary";

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFormat({
  name: "spread-token-list",
  formatter: ({ dictionary, file }) => {
    const walker = (obj) => {
      if (typeof obj !== "object") return obj;
      const ret = [];

      if (obj.path) {
        // pathがあるところが末端
        ret.push({
          path: obj.path,
          key: obj.path.join("."),
          type: obj.$type,
          value: obj.value,
          originalValue: obj.original.value,
        });
      } else {
        for (const key in obj) {
          ret.push(walker(obj[key]));
        }
      }
      return ret.flat();
    };

    const res = walker(dictionary.tokens);
    return (
      fileHeader({ file }) + "export default " + JSON.stringify(res, false, 2)
    );
  },
});

StyleDictionary.registerFormat({
  name: "spread-token-list-declarations",
  formatter: ({ file }) => {
    const output =
      fileHeader({ file }) +
      `
export default tokens;

type value = string | number | Record<string, string | number>;

interface Token {
    path: string[];
    key: string;
    type: string;
    value: value;
    originalValue: value;
}

declare const tokens: Token[];
`;

    return output;
  },
});

/*
 * 単純なオブジェクトに変換するフォーマッター
 * 値と小要素を持つ場合にはDEFAULTというキーに値が入る
 */
StyleDictionary.registerFormat({
  name: "serendie-module",
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
  name: "serendie-module-declarations",
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
      if (typeof obj[key] !== "object") continue;
      const cur = obj[key];
      const path = cur.path;
      if (path) {
        const value = valueTypeConverter(cur.value);
        const type = cur.$type;
        const pathAsStr = path.join(".");

        // ここでToken Typesを判定する
        // https://panda-css.com/docs/theming/tokens
        if (type === "color") {
          path.unshift("colors");
        } else if (type === "fontFamily") {
          path.unshift("fonts");
        } else if (type === "fontWeight") {
          path.unshift("fontWeights");
        } else if (pathAsStr.match(/\.typography\.scale\./)) {
          path.unshift("fontSizes");
        } else if (type === "shadow") {
          path.unshift("shadows");
        } else if (pathAsStr.match(/\.zIndex\./)) {
          path.unshift("zIndex");
        } else if (pathAsStr.match(/\.lineHeight\./)) {
          path.unshift("lineHeights");
        } else if (pathAsStr.match(/\.radius\./)) {
          path.unshift("radii");
        } else if (pathAsStr.match(/\.opacity\./)) {
          path.unshift("opacity");
        } else if (pathAsStr.match(/\.dimension\.scale\./)) {
          path.unshift("spacing");
        } else if (pathAsStr.match(/\.dimension\.spacing\./)) {
          path.unshift("spacing");
        } else if (pathAsStr.match(/\.dimension\.border\./)) {
          path.unshift("borderWidths");
        } else if (pathAsStr.match(/\.system\.typography\./)) {
          path.unshift("textStyles");
        } else {
          // Token Typesに該当しないもの
          path.unshift("unclassified");
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
  };
  walker(structuredClone(o));

  if (res["unclassified"]) {
    // Token Typesに該当しないものを出力
    console.warn("unclassified tokens");
    console.dir(res["unclassified"], { depth: null });
    delete res["unclassified"];
  }

  return res;
};

const valueTypeConverter = (obj) => {
  if (typeof obj !== "object") return obj;
  const ret = {};
  const convert2number = ["offsetX", "offsetY", "blur", "spread"];
  for (const key in obj) {
    let value = obj[key];
    if (convert2number.includes(key)) {
      value = parseFloat(value);
    }
    ret[key] = value;
  }
  return ret;
};
