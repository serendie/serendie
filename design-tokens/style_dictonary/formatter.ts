import StyleDictionary from "style-dictionary";
const { fileHeader } = StyleDictionary.formatHelpers;

interface Token {
  [key: string]: string | number | Token;
}

StyleDictionary.registerFormat({
  name: "serendie-module",
  formatter: ({ dictionary, file }) => {
    const token: Token = {};
    dictionary.allTokens.forEach((t) => {
      path2Token(token, t.path, t.value, true);
    });
    return (
      fileHeader({ file }) + "export default " + JSON.stringify(token, null, 2)
    );
  },
});

StyleDictionary.registerFormat({
  name: "serendie-module-declarations",
  formatter: ({ dictionary, file }) => {
    const token: Token = {};
    dictionary.allTokens.forEach((t) => {
      path2Token(token, t.path, t.value, true);
    });

    const output =
      fileHeader({ file }) +
      `export default tokens;
declare const tokens: ` +
      value2type(token);

    return output;
  },
});

StyleDictionary.registerFormat({
  name: "serendie-token-list",
  formatter: ({ dictionary, file }) => {
    const list = dictionary.allTokens.map((t) => {
      return {
        path: t.path,
        key: t.path.join("."),
        type: t.$type,
        value: t.value,
        originalValue: t.original.value,
      };
    });

    return (
      fileHeader({ file }) + "export default " + JSON.stringify(list, null, 2)
    );
  },
});

StyleDictionary.registerFormat({
  name: "serendie-token-list-declarations",
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

StyleDictionary.registerFormat({
  name: "panda-css-module",
  formatter: ({ dictionary, file }) => {
    const token: Token = {};

    dictionary.allTokens.forEach((t) => {
      const path = pathConverter(t.path, t.$type);
      const value = valueTypeConverter(t.value);
      path2Token(token, path, value);
    });

    if (token["unclassified"]) {
      // Token Typesに該当しないものを出力
      console.warn("unclassified tokens");
      console.dir(token["unclassified"], { depth: null });
      delete token["unclassified"];
    }

    return (
      fileHeader({ file }) + "export default " + JSON.stringify(token, null, 2)
    );
  },
});

StyleDictionary.registerFormat({
  name: "panda-css-module-declarations",
  formatter: ({ dictionary, file }) => {
    const token: Token = {};
    const { allTokens } = dictionary;

    allTokens.forEach((t) => {
      const path = pathConverter(t.path, t.$type);
      const value = valueTypeConverter(t.value);
      path2Token(token, path, value);
    });

    if (token["unclassified"]) {
      delete token["unclassified"];
    }

    const output =
      fileHeader({ file }) +
      `export default tokens;
declare const tokens: ` +
      value2type(token);

    return output;
  },
});

/**
 * 指定されたタイプに基づいて、与えられたパスを変換します。
 *
 * @param path - 変換するパス
 * @param type - パスのタイプ
 * @returns 変換されたパス
 */
function pathConverter(path_: string[], type: string): string[] {
  const path = [...path_];
  const pathStr = path.join(".");
  if (type === "color") {
    if (path.at(0) !== "themes") {
      // カラーテーマは除外
      path.unshift("colors");
    }
  } else if (type === "fontFamily") {
    path.unshift("fonts");
  } else if (type === "fontWeight") {
    path.unshift("fontWeights");
  } else if (pathStr.match(/\.typography\.scale\./)) {
    path.unshift("fontSizes");
  } else if (type === "shadow") {
    path.unshift("shadows");
  } else if (pathStr.match(/\.zIndex\./)) {
    path.unshift("zIndex");
  } else if (pathStr.match(/\.lineHeight\./)) {
    path.unshift("lineHeights");
  } else if (pathStr.match(/\.radius\./)) {
    path.unshift("radii");
  } else if (pathStr.match(/\.opacity\./)) {
    path.unshift("opacity");
  } else if (pathStr.match(/\.dimension\.scale\./)) {
    path.unshift("spacing");
  } else if (pathStr.match(/\.dimension\.spacing\./)) {
    path.unshift("spacing");
  } else if (pathStr.match(/\.dimension\.border\./)) {
    path.unshift("borderWidths");
  } else if (pathStr.match(/\.system\.typography\./)) {
    path.unshift("textStyles");
  } else {
    // Token Typesに該当しないもの
    path.unshift("unclassified");
  }

  return path;
}

/*
 * パスをトークンに変換します。
 * @param token - トークン
 * @param paths - パス
 * @param value - 値
 * @param onlyValue - 値のみを設定するかどうか
 */
function path2Token(
  token: Token,
  paths: string[],
  value: Token | string | number,
  onlyValue?: boolean
) {
  let cur = token;

  for (let i = 0; i < paths.length; i++) {
    const path = paths[i];
    if (cur[path] === undefined) {
      cur[path] = {};
    }
    if (i === paths.length - 1) {
      cur[path] = onlyValue ? value : { value };
    }
    cur = cur[path] as Token;
  }
}

/**
 * オブジェクトが文字列であり、特定のキーに対応する場合、数値に変換します。
 *
 * @param obj 変換するオブジェクト
 * @returns 変換されたオブジェクト
 */
const valueTypeConverter = (obj: Token) => {
  if (typeof obj !== "object") return obj;
  const ret: Token = {};
  const convert2number = ["offsetX", "offsetY", "blur", "spread"];
  for (const key in obj) {
    let value = obj[key];
    if (typeof value === "string" && convert2number.includes(key)) {
      value = parseFloat(value);
    }
    ret[key] = value;
  }
  return ret;
};

/**
 * 与えられたトークンを型に変換する関数です。
 *
 * @param token - 変換するトークンオブジェクト
 * @returns 変換された型の文字列
 */
function value2type(token: Token): string {
  const walk = (token: Token): Token => {
    const res: Token = {};
    Object.keys(token).forEach((key) => {
      if (typeof token[key] === "object") {
        res[key] = walk(token[key]);
      } else {
        res[key] = "__" + typeof token[key] + "__";
      }
    });
    return res;
  };

  return JSON.stringify(walk(token), null, 2)
    .replace(/"__string__"/g, "string")
    .replace(/"__number__"/g, "number");
}
