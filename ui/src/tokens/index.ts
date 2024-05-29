import spreadTokens from "@spread/design-token/panda";

// PandaCSSのtokensとtextStylesが混在しているので分離する
const { textStyles, ...tokens } = spreadTokens;

export const SpreadTokens = tokens;

export const SpreadTypography = textStyles;
