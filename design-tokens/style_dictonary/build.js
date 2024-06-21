import StyleDictionary from "style-dictionary-utils";
import { SerendieParser } from "./parser.js";
import "./formatter.js";

StyleDictionary.registerParser(SerendieParser);

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
          format: "serendie-module",
        },
        {
          destination: "dist/tokens.d.ts",
          format: "serendie-module-declarations",
        },
        {
          destination: "dist/panda-tokens.js",
          format: "panda-css-module",
        },
        {
          destination: "dist/panda-tokens.d.ts",
          format: "panda-css-module-declarations",
        },
      ],
    },
  },
});

myStyleDictionary.buildAllPlatforms();
