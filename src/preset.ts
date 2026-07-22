import { SerendieTokens, SerendieTypography } from "./tokens";
import { getToken } from "./tokens/getToken";
import { SerendieKeyframes } from "./tokens/keyframes";

const { sd } = getToken();

const { themes, ...defaultTokens } = SerendieTokens;

export { themes };

export const themeNames = Object.keys(themes);

export const SerendiePreset = {
  name: "serendie",
  conditions: {
    extend: {
      expanded: `@media screen and (min-width: ${sd.system.dimension.breakpoint.expanded})`,
      ariaExpanded:
        "&:is([aria-expanded=true], [data-expanded], [data-state=expanded])",
    },
  },
  theme: {
    extend: {
      breakpoints: {
        expanded: sd.system.dimension.breakpoint.expanded,
      },
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
