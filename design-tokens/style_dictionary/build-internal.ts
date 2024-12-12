import StyleDictionary from "style-dictionary-utils";
import "./parser";
import "./formatter";
import "./transformer";
import "./filter";
import { customFileHeader } from "./customFileHeader";

StyleDictionary.extend({
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
        "serendie/cssShadow",
        "serendie/cssTypography",
      ],
      files: [
        {
          destination: "tokens.css",
          format: "serendie/cssWithTheme",
          filter: "serendie/onlyInternal",
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
          format: "serendie/pandaToken",
          filter: "serendie/onlyInternal",
        },
        {
          destination: "panda-tokens.d.ts",
          format: "serendie/pandaTokenDeclarations",
          filter: "serendie/onlyInternal",
        },
      ],
    },
  },
}).buildAllPlatforms();
