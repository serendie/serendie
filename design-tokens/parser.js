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
