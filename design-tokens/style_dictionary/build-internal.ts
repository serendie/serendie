import StyleDictionary from "style-dictionary-utils";
import { SerendieParser } from "./parser";
import "./formatter";
import "./transformer/cssShadow";
import "./transformer/cssTypography";
import { customFileHeader } from "./customFileHeader";

StyleDictionary.registerParser(SerendieParser);

StyleDictionary.registerFilter({
  name: "onlyInternal",
  matcher: (token) => token.filePath.includes("internal"),
});

const internalDictionary = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    css: {
      buildPath: "dist/internal/",
      options: {
        fileHeader: customFileHeader,
      },
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "color/css",
        "cssShadow",
        "cssTypography",
      ],
      files: [
        {
          destination: "tokens.css",
          format: "css-with-theme",
          filter: "onlyInternal",
        },
      ],
    },
    js: {
      buildPath: "dist/internal/",
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
          destination: "panda-tokens.js",
          format: "panda-css-module",
          filter: "onlyInternal",
        },
        {
          destination: "panda-tokens.d.ts",
          format: "panda-css-module-declarations",
          filter: "onlyInternal",
        },
      ],
    },
  },
});

internalDictionary.buildAllPlatforms();
