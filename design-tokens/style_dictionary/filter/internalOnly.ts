import StyleDictionary from "style-dictionary";

StyleDictionary.registerFilter({
  name: "serendie/onlyInternal",
  matcher: (token) => token.filePath.includes("internal"),
});
