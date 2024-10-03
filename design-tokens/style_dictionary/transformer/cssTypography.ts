import StyleDictionary from "style-dictionary";

StyleDictionary.registerTransform({
  name: "cssTypography",
  transitive: true,
  type: "value",
  matcher: (token) => token.$type === "typography",
  transformer: (token) => {
    const { fontSize, fontWeight, lineHeight } = token.value;
    return `${fontWeight} ${fontSize}/${lineHeight}`;
  },
});
