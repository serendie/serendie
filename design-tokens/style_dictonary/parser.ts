import StyleDictionary from "style-dictionary";
import { w3cTokenJsonParser } from "style-dictionary-utils/dist/parser/w3c-token-json-parser.js";

type ParsedObjectValue = string | number | ParsedObject;

interface ParsedObject {
  [key: string]: ParsedObjectValue;
}

export const SerendieParser: StyleDictionary.Parser = {
  pattern: /\.json$/,
  parse: ({ filePath, contents }) => {
    const obj = w3cTokenJsonParser.parse({ contents });

    const match = filePath.match(/\.(\w+).json$/);
    if (match) {
      // filePathにcolorが含まれている場合
      // これらはカラーテーマとして扱う
      if (filePath.includes("color") && !filePath.includes("color.default")) {
        // theme名を取得
        const themeName = match[1];
        const themedObj = {
          themes: {
            [themeName]: {
              tokens: {
                colors: obj,
              },
            },
          },
        };
        return themedObj;
      }

      // 画面サイズ別のpostfixを付与
      const postfix = match[1];
      // defaultの場合はpostfixを付与しない
      if (postfix !== "default") return appendPostfixToValueWalk(obj, postfix);
    }
    replaceFontFamily(obj);
    return obj;
  },
};

function appendPostfixToValueWalk(obj: ParsedObject, postfix: string) {
  const ret: ParsedObject = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "object" && value !== null) {
      if ("value" in value) {
        ret[key + "_" + postfix] = appendPostfixToValueWalk(value, postfix);
      } else {
        ret[key] = appendPostfixToValueWalk(value, postfix);
      }
    } else {
      ret[key] = value;
    }
  }

  return ret;
}

function replaceFontFamily(obj: ParsedObject) {
  const ret: ParsedObject = {};
  if (typeof obj === "object") {
    if (obj.$type === "fontFamily" && obj.value) {
      // これ以上探索する必要がないので$valueのみ置換してobjを返却
      if (obj.value === "Roboto") {
        // ui側でhtmlのfont-familyを指定しているので、ここではinheritに置換
        // https://github.com/serendie/serendie/blob/main/ui/src/styles.css
        obj.value = `inherit`;
      }
      return obj;
    } else {
      for (const key in obj) {
        if (typeof obj[key] === "object")
          ret[key] = replaceFontFamily(obj[key]);
      }
    }
  } else {
    return obj;
  }
  return ret;
}
