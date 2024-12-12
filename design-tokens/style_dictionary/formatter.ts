import StyleDictionary from "style-dictionary";
import { path2Token, valueTypeConverter } from "./formatter/utils";

const { fileHeader, getTypeScriptType } = StyleDictionary.formatHelpers;
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
      getTypeScriptType(token);

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

function generatePandaTokens(dictionary: StyleDictionary.Dictionary): Token {
  const token: Token = {};
  dictionary.allTokens.forEach((t) => {
    const path = pathConverter(t.path, t.$type);
    const value = valueTypeConverter(t.value);
    path2Token(token, path, value);
  });

  if (token["unclassified"]) {
    console.warn("unclassified tokens");
    console.dir(token["unclassified"], { depth: null });
    delete token["unclassified"];
  }

  return token;
}

StyleDictionary.registerFormat({
  name: "panda-css-module",
  formatter: ({ dictionary, file }) => {
    const token = generatePandaTokens(dictionary);
    return (
      fileHeader({ file }) + "export default " + JSON.stringify(token, null, 2)
    );
  },
});

StyleDictionary.registerFormat({
  name: "panda-css-module-declarations",
  formatter: ({ dictionary, file }) => {
    const token = generatePandaTokens(dictionary);
    const output =
      fileHeader({ file }) +
      `export default tokens;
declare const tokens: ${getTypeScriptType(token)};`;
    return output;
  },
});

StyleDictionary.registerFormat({
  name: "css-with-theme",
  formatter: ({ dictionary, file }) => {
    const themes: Record<string, string[]> = {};
    dictionary.allProperties.forEach((p) => {
      const [theme, key] =
        p.path[0] === "themes"
          ? [p.path[1], p.path.slice(4).join("-")]
          : ["default", p.path.join("-")];

      (themes[theme] ??= []).push(`--${key}: ${p.value};`);
    });

    const output = Object.entries(themes)
      .map(([theme, values]) =>
        theme === "default"
          ? `:where(:root,:host) {\n${values.join("\n")}\n}`
          : `[data-panda-theme=${theme}] {\n${values.join("\n")}\n}`
      )
      .join("\n");

    return fileHeader({ file }) + output;
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
