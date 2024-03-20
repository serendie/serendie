import { definePreset } from "@pandacss/dev";
import { SpreadRecipes } from "./recipes";

export const SpreadPreset = definePreset({
  theme: {
    extend: {
      recipes: SpreadRecipes,
    },
  },
});
