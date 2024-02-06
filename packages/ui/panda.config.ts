import { SpreadPreset } from "./src/preset";
import pandaPreset from "@pandacss/preset-panda";

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
  presets: [pandaPreset, SpreadPreset],
});
