import StyleDictionary from "style-dictionary-utils";
import { SpreadParser } from "./parser.js";
import "./formatter.js";

StyleDictionary.registerParser(SpreadParser);

const myStyleDictionary = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    ts: {
      transforms: [
        "attribute/cti",
        "name/cti/camel",
        "time/seconds",
        "content/icon",
        "color/css",
      ],
      files: [
        {
          destination: "dist/tokens.cjs",
          format: "javascript/module",
        },
        {
          destination: "dist/tokens.js",
          format: "panda-css-module",
          options: {
            outputReferences: true,
          },
        },
        {
          format: "typescript/module-declarations",
          destination: "dist/tokens.d.ts",
        },
      ],
    },
  },
});

myStyleDictionary.buildAllPlatforms();
