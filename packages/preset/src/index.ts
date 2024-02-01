import { definePreset } from "@pandacss/dev";
import { Recipes } from "./recipes";
import { Tokens } from "./tokens";

const SpreadPreset = definePreset({
  theme: {
    extend: {
      recipes: Recipes,
      tokens: Tokens,
    },
  },
});

export default SpreadPreset;
