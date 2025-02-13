import { SerendieRecipes } from "./recipes";
import { SerendieTokens, SerendieTypography } from "./tokens";
import { getToken } from "./tokens/getToken";
import { SerendieKeyframes } from "./tokens/keyframes";

const { sd } = getToken();

const { themes, ...defaultTokens } = SerendieTokens;

export { themes };

export const themeNames = Object.keys(themes);

export const SerendiePreset = {
  name: "serendie",
  theme: {
    extend: {
      breakpoints: {
        expanded: sd.system.dimension.breakpoint.expanded,
      },
      recipes: SerendieRecipes,
      tokens: {
        ...defaultTokens,
      },
      textStyles: {
        ...SerendieTypography,
      },
      keyframes: {
        ...SerendieKeyframes,
      },
    },
  },
};
