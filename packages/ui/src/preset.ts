import { definePreset } from "@pandacss/dev";
import { SpreadRecipes } from "./recipes";
import { SpreadTokens } from "./tokens";
export const SpreadPreset = definePreset({
  theme: {
    extend: {
      recipes: SpreadRecipes,
      tokens: SpreadTokens,
    },
  },
});
