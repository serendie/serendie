import StyleDictionary from "style-dictionary";

export const excludeInternal: StyleDictionary.Filter = {
  name: "serendie/excludeInternal",
  matcher: (token) => !token.filePath.includes("internal"),
};
