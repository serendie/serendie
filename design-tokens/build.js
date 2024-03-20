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
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
});

myStyleDictionary.buildAllPlatforms();
