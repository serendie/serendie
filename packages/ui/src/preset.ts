import { definePreset } from "@pandacss/dev";
import { SpreadRecipes } from "./recipes";
import { SpreadTokens, SpreadTypography } from "./tokens";

export const SpreadPreset = definePreset({
  theme: {
    extend: {
      recipes: SpreadRecipes,
      tokens: SpreadTokens,
      textStyles: SpreadTypography,
    },
  },
});
