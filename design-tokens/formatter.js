import StyleDictionary from "style-dictionary";

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFormat({
  name: "panda-css-module",
  formatter: function ({ dictionary, file }) {
    console.dir(dictionary.tokens, { depth: 6 });
    const res = format(dictionary.tokens);
    return (
      fileHeader({ file }) + "export default " + JSON.stringify(res, false, 2)
    );
  },
});

const format = (obj) => {
  let res = {};
  Object.keys(obj).forEach((key) => {
    if (obj.value) {
      if (key === "value") {
        if (obj["$modes"]) {
          res.DEFAULT = {
            value: obj["original"] ? obj["original"][key] : obj[key],
          };
        } else {
          res.value = obj["original"] ? obj["original"][key] : obj[key];
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
