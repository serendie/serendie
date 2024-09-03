import { SerendiePreset } from "@serendie/ui";
import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ["./src/**/*.{tsx,astro,mdx}"],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {},

  // The output directory for your css system
  outdir: "styled-system",
  outExtension: "js",
  jsxFramework: "react",
  importMap: "@serendie/ui",
  presets: [SerendiePreset],
});
