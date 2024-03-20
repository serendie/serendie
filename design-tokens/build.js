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
          destination: "dist/tokens.js",
          format: "spread-module",
        },
        {
          destination: "dist/tokens.d.ts",
          format: "spread-module-declarations",
        },
      ],
    },
  },
});

myStyleDictionary.buildAllPlatforms();
