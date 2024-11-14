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
          plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
          svgo: true,
          icon: 24,
          replaceAttrValues: {
            "#000": "currentColor",
          },
        },
      }),
      dts({
        tsconfigPath: "./tsconfig.app.json",
        rollupTypes: true,
      }),
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
