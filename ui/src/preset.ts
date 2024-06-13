import { Preset } from "@pandacss/dev";
import { SerendieRecipes } from "./recipes";
import { SerendieTokens, SerendieTypography } from "./tokens";
import { getToken } from "./tokens/getToken";

const { sd } = getToken();

export const SerendiePreset: Preset = {
  theme: {
    extend: {
      breakpoints: {
        expanded: sd.system.dimension.breakpoint.expanded,
      },
      recipes: SerendieRecipes,
      tokens: {
        ...SerendieTokens,
        sizes: {
          ...SerendieTokens["spacing"],
        },
      },
      textStyles: {
        ...SerendieTypography,
      },
    },
  },
};
