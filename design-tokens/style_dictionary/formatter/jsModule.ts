import StyleDictionary from "style-dictionary";
import { path2Token } from "./utils";

const { fileHeader, getTypeScriptType } = StyleDictionary.formatHelpers;

StyleDictionary.registerFormat({
  name: "serendie-module",
  formatter: ({ dictionary, file }) => {
    const token: Token = {};
    dictionary.allTokens.forEach((t) => {
      path2Token(token, t.path, t.value, true);
    });
    return (
      fileHeader({ file }) + "export default " + JSON.stringify(token, null, 2)
    );
  },
});

StyleDictionary.registerFormat({
  name: "serendie-module-declarations",
  formatter: ({ dictionary, file }) => {
    const token: Token = {};
    dictionary.allTokens.forEach((t) => {
      path2Token(token, t.path, t.value, true);
    });

    const output =
      fileHeader({ file }) +
      `export default tokens;
declare const tokens: ` +
      getTypeScriptType(token);

    return output;
  },
});
