import StyleDictionary from "style-dictionary";

StyleDictionary.registerTransform({
  name: "serendie/cssShadow",
  type: "value",
  matcher: (token) => token.path.includes("shadow"),
  transformer: (token) => {
    const { color, offsetX, offsetY, blur, spread } = token.value;
    return `drop-shadow(${offsetX} ${offsetY} ${blur} ${spread} ${color})`;
  },
});
