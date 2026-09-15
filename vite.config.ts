import {
  existsSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { join } from "node:path";
import react from "@vitejs/plugin-react";
import { globbySync } from "globby";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    {
      name: "strip-query-from-chunk-filenames",
      closeBundle() {
        const walk = (dir: string): string[] =>
          readdirSync(dir, { withFileTypes: true }).flatMap((entry) =>
            entry.isDirectory()
              ? walk(join(dir, entry.name))
              : [join(dir, entry.name)]
          );
        const dist = join(__dirname, "dist");
        if (!existsSync(dist)) return;
        const files = walk(dist);
        for (const file of files) {
          if (file.endsWith(".js")) {
            const code = readFileSync(file, "utf8");
            const clean = code.replace(/\?react/g, "");
            if (clean !== code) writeFileSync(file, clean);
          }
        }
        for (const file of files) {
          const clean = file.replace(/\?react(?=\.js$)/, "");
          if (clean !== file) {
            renameSync(file, clean);
            rmSync(file, { force: true });
          }
        }
      },
    },
    dts({
      exclude: ["**/*.stories.tsx"],
    }),
  ],
  build: {
    lib: {
      entry: globbySync(["src/styles.css", "src/client.ts", "src/**/index.ts"]),
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
        banner(chunk) {
          if (chunk.facadeModuleId?.endsWith("/client.ts")) {
            return "'use client';\n";
          }
          return "";
        },
      },
    },
    cssCodeSplit: true,
  },
});
