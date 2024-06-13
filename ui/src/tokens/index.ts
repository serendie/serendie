import serendieTokens from "@serendie/design-token/panda";

// PandaCSSのtokensとtextStylesが混在しているので分離する
const { textStyles, ...tokens } = serendieTokens;

export const SerendieTokens = tokens;

export const SerendieTypography = textStyles;
