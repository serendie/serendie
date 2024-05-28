import { w3cTokenJsonParser } from "style-dictionary-utils/dist/parser/w3c-token-json-parser.js";

export const SpreadParser = {
  pattern: /\.json$/,
  parse: ({ filePath, contents }) => {
    const obj = w3cTokenJsonParser.parse({ filePath, contents });
    const match = filePath.match(/\.(\w+).json$/);
    if (match) {
      const postfix = match[1];
      // defaultの場合はpostfixを付与しない
      if (postfix !== "default") return appendPostfixToValueWalk(obj, postfix);
    }
    replaceFontFamily(obj);
    return obj;
  },
};

function appendPostfixToValueWalk(obj, postfix) {
  const ret = {};
  if (typeof obj === "object") {
    for (const key in obj) {
      if (obj[key].value) {
        ret[key + "_" + postfix] = appendPostfixToValueWalk(obj[key], postfix);
      } else {
        ret[key] = appendPostfixToValueWalk(obj[key], postfix);
      }
    }
  } else {
    return obj;
  }
  return ret;
}

function replaceFontFamily(obj) {
  const ret = {};
  if (typeof obj === "object") {
    if (obj.$type === "fontFamily" && obj.value) {
      // これ以上探索する必要がないので$valueのみ置換してobjを返却
      if (obj.value === "Noto Sans JP") {
        // ui側でhtmlのfont-familyを指定しているので、ここではinheritに置換
        obj.value = `inherit`;
      }
      return obj;
    } else {
      for (const key in obj) {
        ret[key] = replaceFontFamily(obj[key]);
      }
    }
  } else {
    return obj;
  }
  return ret;
}
