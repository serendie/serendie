import StyleDictionary from "style-dictionary";

StyleDictionary.registerFilter({
  name: "serendie/internalOnly",
  matcher: (token) => token.filePath.includes("internal"),
});
