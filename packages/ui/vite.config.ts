import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "Spread", // グローバル変数としてアクセスする際の名前
      fileName: "index", // 出力されるファイル名
    },
    rollupOptions: {
      // 外部化する依存関係
      external: ["react", "react-dom"],
      output: {
        // グローバル変数として依存関係を利用するための設定
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
