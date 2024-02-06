import { definePreset } from "@pandacss/dev";
import { Recipes } from "./recipes";
import { Tokens } from "./tokens";

export const SpreadPreset = definePreset({
  theme: {
    extend: {
      recipes: Recipes,
      tokens: Tokens,
    },
  },
});

export { Button } from "./components/Button";
