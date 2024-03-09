import * as fs from "fs";
import { readJsonFiles } from "./token_import.js";

const main = () => {
  const TOKENS_DIR = "tokens";
  const tokensFiles = fs
    .readdirSync(TOKENS_DIR)
    .map((file: string) => `${TOKENS_DIR}/${file}`);

  const tokensByFile = readJsonFiles(tokensFiles);

  console.log("Read tokens files:", Object.keys(tokensByFile));
};

main();
