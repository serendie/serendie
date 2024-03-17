import "dotenv/config";
import * as fs from "fs";

import FigmaApi from "./figma_api.js";

import { readJsonFiles } from "./token_import.js";

const main = async () => {
  if (!process.env.PERSONAL_ACCESS_TOKEN || !process.env.FILE_KEY) {
    throw new Error(
      "PERSONAL_ACCESS_TOKEN and FILE_KEY environemnt variables are required"
    );
  }
  const fileKey = process.env.FILE_KEY;

  const TOKENS_DIR = "tokens";
  const tokensFiles = fs
    .readdirSync(TOKENS_DIR)
    .map((file: string) => `${TOKENS_DIR}/${file}`);

  const tokensByFile = readJsonFiles(tokensFiles);

  console.log("Read tokens files:", Object.keys(tokensByFile));

  const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN);
  const localVariables = await api.getLocalVariables(fileKey);

  console.log("Local variables:", localVariables);
};

main();
