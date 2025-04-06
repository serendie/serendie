import serendieTokens from "@serendie/design-token/panda";
import merge from "deepmerge";

// PandaCSSのtokensとtextStylesが混在しているので分離する
const { textStyles, ...tokens } = serendieTokens;

// tokensの中からspacingを取り出してsizesとして定義する

const sizes = merge(tokens.sizes, tokens.spacing);

export const SerendieTokens = {
  ...tokens,
  sizes,
};

export const SerendieTypography = textStyles;
