import StyleDictionary from "style-dictionary";

StyleDictionary.registerTransform({
  name: "cssTypography",
  type: "value",
  matcher: (token) => {
    if (token.$type === "typography") {
      //TODO: 本来matcherの中で変換してはいけないのだけど、matchしてもtransformerが呼ばれないのでここで変換している
      const { fontSize, fontWeight, lineHeight } = token.value;
      token.value = `${fontWeight} ${fontSize}/${lineHeight}`;
      return true;
    }
    return false;
  },
  transformer: (token) => {
    return token.value;
  },
});
