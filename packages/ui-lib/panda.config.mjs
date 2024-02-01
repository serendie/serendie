import { defineConfig } from "@pandacss/dev";

export default defineConfig({
  presets: ["@spread/preset"],
  include: ["./src/**/*.{js,jsx,ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  jsxFramework: "react",
  jsxFactory: "panda",
});
