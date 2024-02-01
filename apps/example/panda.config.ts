import { defineConfig } from "@pandacss/dev";
import SpreadPreset from "@spread/preset";

export default defineConfig({
  // Whether to use css reset
  // preflight: true,

  // Where to look for your css declarations
  presets: [SpreadPreset],
  include: ["./src/**/*.{js,jsx,ts,tsx}", "./pages/**/*.{js,jsx,ts,tsx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {},
  },

  // The output directory for your css system
  importMap: "@spread/ui-lib",
  outdir: "styled-system",
  outExtension: "js",
  jsxFramework: "react",
});
