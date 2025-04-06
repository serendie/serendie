import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dts from "vite-plugin-dts";

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
      entry: ["src/index.ts", "src/styles.css"],
      name: "Serendie",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
      },
    },
    cssCodeSplit: true,
  },
});
