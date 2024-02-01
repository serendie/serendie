import { defineConfig } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";

export default defineConfig({
  presets: [pandaPreset, "@spread/preset"],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  importMap: "@spread/ui-lib",
  jsxFramework: "react",
  outExtension: "js",
  jsxFactory: "panda",
});
