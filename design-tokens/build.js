import StyleDictionary from "style-dictionary-utils";
import { w3cTokenJsonParser } from "style-dictionary-utils/dist/parser/w3c-token-json-parser.js";

StyleDictionary.registerParser(w3cTokenJsonParser);

const myStyleDictionary = StyleDictionary.extend({
  source: ["tokens/**/*.json"],
  platforms: {
    ts: {
      transforms: [
        "attribute/cti",
        "name/cti/camel",
        "time/seconds",
        "content/icon",
        "dimension/pixelToRem",
        "color/css",
      ],
      files: [
        {
          destination: "dist/tokens.ts",
          format: "javascript/esm",
        },
        {
          format: "typescript/es6-declarations",
          destination: "dist/tokens.d.ts",
        },
      ],
    },
  },
});

myStyleDictionary.buildAllPlatforms();
