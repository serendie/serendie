import { defineTextStyles, defineTokens } from "@pandacss/dev";
import spreadTokens from "@spread/design-token/panda";

// PandaCSSのtokensとtextStylesが混在しているので分離する
const { textStyles, ...tokens } = spreadTokens;

export const SpreadTokens = defineTokens(tokens);

export const SpreadTypography = defineTextStyles(textStyles);
