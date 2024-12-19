import StyleDictionary from "style-dictionary";

export const cssShadow: StyleDictionary.Named<StyleDictionary.Transform> = {
  name: "serendie/cssShadow",
  type: "value",
  matcher: (token) => token.path.includes("shadow"),
  transformer: (token) => {
    const { color, offsetX, offsetY, blur, spread } = token.value;
    return `drop-shadow(${offsetX} ${offsetY} ${blur} ${spread} ${color})`;
  },
};
