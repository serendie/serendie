import StyleDictionary from "style-dictionary";

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFormat({
  name: "spread-module",
  formatter: function ({ dictionary, file }) {
    //console.dir(dictionary.tokens, { depth: 6 });
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
    //console.dir(dictionary.tokens, { depth: 6 });
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

    console.dir(walker(res), { depth: null });

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
