import "dotenv/config";

import FigmaApi from "./figma_api.js";

import { generatePostVariablesPayload, readJsonFiles } from "./token_import.js";
import { green, tokenFiles } from "./utils.js";

const main = async () => {
  if (!process.env.PERSONAL_ACCESS_TOKEN || !process.env.FILE_KEY) {
    throw new Error(
      "PERSONAL_ACCESS_TOKEN and FILE_KEY environemnt variables are required"
    );
  }
  const fileKey = process.env.FILE_KEY;

  const TOKENS_DIR = "tokens";
  const tokensFiles = tokenFiles(TOKENS_DIR);

  const tokensByFile = readJsonFiles(tokensFiles);

  console.log("Read tokens files:", Object.keys(tokensByFile));

  const api = new FigmaApi(process.env.PERSONAL_ACCESS_TOKEN);
  const localVariables = await api.getLocalVariables(fileKey);

  const postVariablesPayload = generatePostVariablesPayload(
    tokensByFile,
    localVariables
  );

  if (
    Object.values(postVariablesPayload).every((value) => value.length === 0)
  ) {
    console.log(green("✅ Tokens are already up to date with the Figma file"));
    return;
  }

  const apiResp = await api.postVariables(fileKey, postVariablesPayload);

  console.log("POST variables API response:", apiResp);

  if (postVariablesPayload.variableCollections?.length) {
    console.log(
      "Update variable collections",
      postVariablesPayload.variableCollections
    );
  }

  if (postVariablesPayload.variableModes?.length) {
    console.log("Update variable modes", postVariablesPayload.variableModes);
  }

  if (postVariablesPayload.variables?.length) {
    console.log("Update variables", postVariablesPayload.variables);
  }

  if (postVariablesPayload.variableModeValues?.length) {
    console.log(
      "Update variable mode values",
      postVariablesPayload.variableModeValues
    );
  }

  console.log(green("✅ Figma file has been updated with the new tokens"));
};

main();
