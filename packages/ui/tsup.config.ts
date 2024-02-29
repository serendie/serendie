import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    minify: !options.watch,
    entry: ["src/index.ts", "src/styles.css"],
    external: ["react", "react-dom"],
    platform: "browser",
    splitting: false,
    format: ["cjs", "esm"],
    sourcemap: options.watch ? "inline" : false,
    dts: "src/index.ts",
  };
});
