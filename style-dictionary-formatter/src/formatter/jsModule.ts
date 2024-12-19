import StyleDictionary from "style-dictionary";
import { path2Token } from "./utils";
import { Token } from "../types";

const { fileHeader, getTypeScriptType } = StyleDictionary.formatHelpers;

export const jsModule: StyleDictionary.Format = {
  name: "serendie/jsModule",
  formatter: ({ dictionary, file }) => {
    const token: Token = {};
    dictionary.allTokens.forEach((t) => {
      path2Token(token, t.path, t.value, true);
    });
    return (
      fileHeader({ file }) + "export default " + JSON.stringify(token, null, 2)
    );
  },
};

export const jsModuleDeclarations: StyleDictionary.Format = {
  name: "serendie/jsModuleDeclarations",
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
};
