import StyleDictionary from "style-dictionary";

export const internalOnly: StyleDictionary.Filter = {
  name: "serendie/internalOnly",
  matcher: (token) => token.filePath.includes("internal"),
};
