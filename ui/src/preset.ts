import { Preset } from "@pandacss/dev";
import { SpreadRecipes } from "./recipes";
import { SpreadTokens, SpreadTypography } from "./tokens";

export const SpreadPreset: Preset = {
  theme: {
    extend: {
      breakpoints: {
        expanded: "640px", // TODO: 定義どうするか
      },
      recipes: SpreadRecipes,
      tokens: {
        ...SpreadTokens,
        sizes: {
          ...SpreadTokens["spacing"],
        },
      },
      textStyles: SpreadTypography,
    },
  },
};
