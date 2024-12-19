import StyleDictionary from "style-dictionary";

export const cssTypography: StyleDictionary.Named<StyleDictionary.Transform> = {
  name: "serendie/cssTypography",
  transitive: true,
  type: "value",
  matcher: (token) => token.$type === "typography",
  transformer: (token) => {
    const { fontSize, fontWeight, lineHeight } = token.value;
    return `${fontWeight} ${fontSize}/${lineHeight}`;
  },
};
