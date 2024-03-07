import { Tokens } from "@pandacss/dev";
import dt from "@spread/design-token";

export const SpreadTokens: Tokens = {
  colors: {
    secondary: { value: "#00ff00" },
    tertiary: { value: "#00ffff" },
    spreadPrimaryColor: { value: "#ff00ff" },
    ...dt.color,
  },
};
