import StyleDictionary from "style-dictionary-utils";
import {
  registerAll,
  customFileHeader,
} from "@serendie/style-dictionary-formatter";

registerAll();

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
        "serendie/robotoToInherit",
      ],
      files: [
        {
          destination: "tokens.css",
          format: "serendie/cssWithTheme",
          filter: "serendie/internalOnly",
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
        "serendie/robotoToInherit",
      ],
      files: [
        {
          destination: "panda-tokens.js",
          format: "serendie/pandaToken",
          filter: "serendie/internalOnly",
        },
        {
          destination: "panda-tokens.d.ts",
          format: "serendie/pandaTokenDeclarations",
          filter: "serendie/internalOnly",
        },
      ],
    },
  },
}).buildAllPlatforms();
