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
          format: "serendie/cssWithTheme",
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
          format: "serendie/jsModule",
          filter: "excludeInternal",
        },
        {
          destination: "dist/tokens.d.ts",
          format: "serendie/jsModuleDeclarations",
          filter: "excludeInternal",
        },
        {
          destination: "dist/panda-tokens.js",
          format: "serendie/pandaToken",
          filter: "excludeInternal",
        },
        {
          destination: "dist/panda-tokens.d.ts",
          format: "serendie/pandaTokenDeclarations",
          filter: "excludeInternal",
        },
        {
          destination: "dist/token-list.js",
          format: "serendie/tokenList",
          filter: "excludeInternal",
        },
        {
          destination: "dist/token-list.d.ts",
          format: "serendie/tokenListDeclarations",
          filter: "excludeInternal",
        },
      ],
    },
  },
});

myStyleDictionary.buildAllPlatforms();
