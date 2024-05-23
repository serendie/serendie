import { Preset, TextStyles } from "@pandacss/dev";
import { SpreadRecipes } from "./recipes";
import { SpreadTokens, SpreadTypography } from "./tokens";
import { getToken } from "./tokens/getToken";

const { dic } = getToken();

const bodyTextStyle: TextStyles = {
  body: {
    value: {
      fontFamily: `'Roboto Flex Variable','Noto Sans JP Variable', sans-serif`,
    },
  },
};

export const SpreadPreset: Preset = {
  theme: {
    extend: {
      breakpoints: {
        expanded: dic.system.dimension.breakpoint.expanded,
      },
      recipes: SpreadRecipes,
      tokens: {
        ...SpreadTokens,
        sizes: {
          ...SpreadTokens["spacing"],
        },
      },
      textStyles: {
        bodyTextStyle,
        ...SpreadTypography,
      },
    },
  },
};
