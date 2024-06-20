import { defineKeyframes } from "@pandacss/dev";

export const SerendieKeyframes = defineKeyframes({
  spin: {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
});
