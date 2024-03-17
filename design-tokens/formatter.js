import StyleDictionary from "style-dictionary";

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFormat({
  name: "panda-css-module",
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
    if (obj.value) {
      if (key === "value") {
        if (obj["$modes"]) {
          res.DEFAULT = { value: obj[key] };
        } else {
          res.value = obj[key];
        }
      } else if (key === "$modes") {
        Object.keys(obj[key]).forEach((mode) => {
          res[mode] = format(obj[key][mode]);
        });
      }
    } else {
      res[key] = format(obj[key]);
    }
  });
  return res;
};
