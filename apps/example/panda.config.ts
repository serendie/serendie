import { SpreadPreset } from "@spread/ui";
import pandaPreset from "@pandacss/preset-panda";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  // preflight: true,

  // Where to look for your css declarations
  presets: [pandaPreset, SpreadPreset],
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      // Override tokens
      tokens: {
        colors: {
          secondary: { value: "#ee00dd" },
        },
      },
    },
  },

  // The output directory for your css system
  importMap: "@spread/ui",
  outdir: "styled-system",
  outExtension: "js",
  jsxFramework: "react",
});
