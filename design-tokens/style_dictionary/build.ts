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
      buildPath: "dist/",
      transforms: [
        "attribute/cti",
        "name/cti/kebab",
        "color/css",
        "serendie/cssShadow",
        "serendie/cssTypography",
        "serendie/robotoToInherit",
      ],
      options: {
        fileHeader: customFileHeader,
      },
      files: [
        {
          destination: "tokens.css",
          format: "serendie/cssWithTheme",
        },
      ],
    },
    js: {
      buildPath: "dist/",
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
          destination: "tokens.js",
          format: "serendie/jsModule",
        },
        {
          destination: "tokens.d.ts",
          format: "serendie/jsModuleDeclarations",
        },
        {
          destination: "panda-tokens.js",
          format: "serendie/pandaToken",
        },
        {
          destination: "panda-tokens.d.ts",
          format: "serendie/pandaTokenDeclarations",
        },
        {
          destination: "token-list.js",
          format: "serendie/tokenList",
        },
        {
          destination: "token-list.d.ts",
          format: "serendie/tokenListDeclarations",
        },
      ],
    },
  },
}).buildAllPlatforms();
