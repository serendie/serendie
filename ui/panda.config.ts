import { SerendiePreset, themeNames, themes } from "./src/preset";

import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // The output directory for your css system
  outdir: "styled-system",
  outExtension: "js",
  jsxFramework: "react",
  theme: {
    extend: {
      tokens: {
        colors: {
          transparent: {
            value: "transparent",
          },
          currentColor: {
            value: "currentColor",
          },
        },
      },
    },
  },
  presets: [
    SerendiePreset,
    {
      themes,
    },
  ],
  staticCss: {
    // theme needs static css
    themes: themeNames,
  },
});
