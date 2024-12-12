import StyleDictionary from "style-dictionary";

StyleDictionary.registerFilter({
  name: "serendie/excludeInternal",
  matcher: (token) => !token.filePath.includes("internal"),
});
