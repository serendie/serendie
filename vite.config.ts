import react from "@vitejs/plugin-react";
import { globbySync } from "globby";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({
      exclude: ["**/*.stories.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: globbySync(["src/styles.css", "src/**/index.ts"]),
      name: "Serendie",
      formats: ["es"],
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "@serendie/symbols",
      ],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
    cssCodeSplit: true,
  },
});
