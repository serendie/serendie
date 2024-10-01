import StyleDictionary from "style-dictionary-utils";
import { SerendieParser } from "./parser";
import "./formatter";
import "./transformer/cssShadow";
import "./transformer/cssTypography";
import { customFileHeader } from "./customFileHeader";

StyleDictionary.registerParser(SerendieParser);

StyleDictionary.registerFilter({
  name: "excludeInternal",
  matcher: (token) => !token.filePath.includes("internal"),
});

const myStyleDictionary = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "color/css",
        "cssShadow",
        "cssTypography",
      ],
      buildPath: "dist/",
      options: {
        fileHeader: customFileHeader,
      },
      files: [
        {
          destination: "tokens.css",
          format: "css/variables",
          filter: "excludeInternal",
        },
      ],
    },
    js: {
      options: {
        fileHeader: customFileHeader,
      },
      transforms: [
        "attribute/cti",
        "name/cti/camel",
        "time/seconds",
        "content/icon",
        "color/css",
      ],
      files: [
        {
          destination: "dist/tokens.js",
          format: "serendie-module",
          filter: "excludeInternal",
        },
        {
          destination: "dist/tokens.d.ts",
          format: "serendie-module-declarations",
          filter: "excludeInternal",
        },
        {
          destination: "dist/panda-tokens.js",
          format: "panda-css-module",
          filter: "excludeInternal",
        },
        {
          destination: "dist/panda-tokens.d.ts",
          format: "panda-css-module-declarations",
          filter: "excludeInternal",
        },
        {
          destination: "dist/token-list.js",
          format: "serendie-token-list",
          filter: "excludeInternal",
        },
        {
          destination: "dist/token-list.d.ts",
          format: "serendie-token-list-declarations",
          filter: "excludeInternal",
        },
      ],
    },
  },
});

myStyleDictionary.buildAllPlatforms();
