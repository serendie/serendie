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
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "color/css",
        "serendie/cssShadow",
        "serendie/cssTypography",
      ],
      buildPath: "dist/",
      options: {
        fileHeader: customFileHeader,
      },
      files: [
        {
          destination: "tokens.css",
          format: "serendie/cssWithTheme",
          filter: "serendie/excludeInternal",
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
          format: "serendie/jsModule",
          filter: "serendie/excludeInternal",
        },
        {
          destination: "dist/tokens.d.ts",
          format: "serendie/jsModuleDeclarations",
          filter: "serendie/excludeInternal",
        },
        {
          destination: "dist/panda-tokens.js",
          format: "serendie/pandaToken",
          filter: "serendie/excludeInternal",
        },
        {
          destination: "dist/panda-tokens.d.ts",
          format: "serendie/pandaTokenDeclarations",
          filter: "serendie/excludeInternal",
        },
        {
          destination: "dist/token-list.js",
          format: "serendie/tokenList",
          filter: "serendie/excludeInternal",
        },
        {
          destination: "dist/token-list.d.ts",
          format: "serendie/tokenListDeclarations",
          filter: "serendie/excludeInternal",
        },
      ],
    },
  },
}).buildAllPlatforms();
