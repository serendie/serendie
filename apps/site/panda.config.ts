import { SerendiePreset } from "@serendie/ui";
import { defineConfig } from "@pandacss/dev";
import webTokens from "@serendie/design-token/internal/web";
import { webTypography } from "./src/tokens";
const { themes, ...tokens } = webTokens;
const themeNames = Object.keys(themes);

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{tsx,astro,mdx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  themes,
  theme: {
    extend: {
      keyframes: {
        fadein: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeout: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
      },
      breakpoints: {
        expanded: "768px",
        sm: "768px",
        md: "1280px",
        lg: "1440px",
      },
      textStyles: webTypography.textStyles,
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
  outExtension: "js",
  jsxFramework: "react",
  presets: [SerendiePreset, { theme: { tokens } }],
  staticCss: {
    // theme needs static css
    themes: themeNames,
  },
});
