import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import mdx from "@astrojs/mdx";
import svgr from "vite-plugin-svgr";
import { getSiteUrl, BASE_PATH } from "./src/utils";

// https://astro.build/config
export default defineConfig({
  site: getSiteUrl(),
  base: BASE_PATH,
  integrations: [react(), mdx()],
  markdown: {
    shikiConfig: {
      theme: "github-light",
    },
  },
  vite: {
    plugins: [svgr()],
  },
  trailingSlash: "never",
});
