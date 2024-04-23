import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    lib: {
      entry: ["src/index.ts", "src/styles.css"],
      name: "Spread",
    },
    rollupOptions: {
      // 外部化する依存関係
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: true,
  },
});
