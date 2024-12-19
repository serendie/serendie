import StyleDictionary from "style-dictionary";
import { excludeInternal } from "./filter/excludeInternal";
import { internalOnly } from "./filter/internalOnly";
import { cssWithTheme } from "./formatter/cssWithTheme";
import { jsModule, jsModuleDeclarations } from "./formatter/jsModule";
import { pandaToken, pandaTokenDeclarations } from "./formatter/pandaToken";
import { tokenList, tokenListDeclarations } from "./formatter/tokenList";
import { filenameToTheme } from "./parser/filenameToTheme";
import { cssShadow } from "./transformer/cssShadow";
import { cssTypography } from "./transformer/cssTypography";
import { robotoToInherit } from "./transformer/robotoToInherit";
export { customFileHeader } from "./customFileHeader";

export function registerFilter() {
  StyleDictionary.registerFilter(excludeInternal);
  StyleDictionary.registerFilter(internalOnly);
}

export function registerFormatter() {
  StyleDictionary.registerFormat(cssWithTheme);
  StyleDictionary.registerFormat(jsModule);
  StyleDictionary.registerFormat(jsModuleDeclarations);
  StyleDictionary.registerFormat(pandaToken);
  StyleDictionary.registerFormat(pandaTokenDeclarations);
  StyleDictionary.registerFormat(tokenList);
  StyleDictionary.registerFormat(tokenListDeclarations);
}

export function registerParser() {
  StyleDictionary.registerParser(filenameToTheme);
}

export function registerTransformer() {
  StyleDictionary.registerTransform(cssShadow);
  StyleDictionary.registerTransform(cssTypography);
  StyleDictionary.registerTransform(robotoToInherit);
}

export function registerAll() {
  registerFilter();
  registerFormatter();
  registerParser();
  registerTransformer();
}
