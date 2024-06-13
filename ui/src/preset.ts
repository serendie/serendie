import { Preset } from "@pandacss/dev";
import { SpreadRecipes } from "./recipes";
import { SpreadTokens, SpreadTypography } from "./tokens";
import { getToken } from "./tokens/getToken";
import { SpreadKeyframes } from "./keyframes";

const { dic } = getToken();

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
        ...SpreadTypography,
      },
      keyframes: {
        ...SpreadKeyframes,
      },
    },
  },
};
