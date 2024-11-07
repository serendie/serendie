import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import dts from "vite-plugin-dts";

export default defineConfig(({ command }) => {
  const config = {
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: 24,
          replaceAttrValues: {
            black: "currentColor",
          },
        },
      }),
      dts({ include: ["src"] }),
    ],
  };

  if (command === "build") {
    return {
      ...config,
      build: {
        lib: {
          entry: "./src/index.ts",
          formats: ["es"],
        },
        rollupOptions: {
          external: ["react", "react-dom"],
          output: {
            preserveModules: true,
            preserveModulesRoot: "src",
            entryFileNames: "[name].js",
          },
        },
      },
    };
  }

  return {
    ...config,
    root: "./example",
  };
});
