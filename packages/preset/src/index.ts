import { definePreset } from "@pandacss/dev";
import { Recipes } from "./recipes";

const SpreadPreset = definePreset({
  theme: {
    extend: {
      recipes: Recipes,
    },
  },
});

export default SpreadPreset;
