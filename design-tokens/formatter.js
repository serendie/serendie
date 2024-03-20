import StyleDictionary from "style-dictionary";

const { fileHeader } = StyleDictionary.formatHelpers;

/*
 * 単純なオブジェクトに変換するフォーマッター
 * 値と小要素を持つ場合にはDEFAULTというキーに値が入る
 */
StyleDictionary.registerFormat({
  name: "spread-module",
  formatter: function ({ dictionary, file }) {
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
  formatter: function ({ dictionary, file }) {
    const res = format(dictionary.tokens);
    const moduleName = "tokens";

    const walker = function (obj) {
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
  formatter: function ({ dictionary, file }) {
    //console.dir(dictionary.tokens, { depth: null });

    const res = {};
    const walker = function (obj) {
      Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === "object") {
          if (obj[key].path) {
            const path = obj[key].path;
            let r = res;
            for (const key of path) {
              if (typeof r[key] === "undefined") {
                r[key] = {};
              }
              r = r[key];
            }
            console.log(obj[key].path.join("."), obj[key].$type);
          }
          walker(obj[key]);
        }
      });
    };

    walker(dictionary.tokens);

    //console.dir(res, { depth: null });

    const output = fileHeader({ file });
    return output;
  },
});
