import StyleDictionary from "style-dictionary";

StyleDictionary.registerTransform({
  name: "serendie/robotoToInherit",
  type: "value",
  matcher: (token) => token.$type === "fontFamily" && token.value === "Roboto",
  transformer: () => {
    return "inherit";
  },
});
