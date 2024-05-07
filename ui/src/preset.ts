import { Preset } from "@pandacss/dev";
import { SpreadRecipes } from "./recipes";
import { SpreadTokens, SpreadTypography } from "./tokens";

export const SpreadPreset: Preset = {
  theme: {
    extend: {
      breakpoints: {
        compact: "640px",
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
