import serendieTokens from "@serendie/design-token/panda";

// PandaCSSのtokensとtextStylesが混在しているので分離する
const { textStyles, ...tokens } = serendieTokens;

// tokensの中からspacingを取り出してsizesとして定義する
export const SerendieTokens = { ...tokens, sizes: tokens.spacing };

export const SerendieTypography = textStyles;
