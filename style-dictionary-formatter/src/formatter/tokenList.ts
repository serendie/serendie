import StyleDictionary from "style-dictionary-utils";

const { fileHeader } = StyleDictionary.formatHelpers;

export const tokenList: StyleDictionary.Format = {
  name: "serendie/tokenList",
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
};

export const tokenListDeclarations: StyleDictionary.Format = {
  name: "serendie/tokenListDeclarations",
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
};
