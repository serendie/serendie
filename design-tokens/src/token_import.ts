import * as fs from "fs";
import * as path from "path";

import { Token, TokenOrTokenGroup, TokensFile } from "./token_types";

export type FlattenedTokensByFile = {
  [fileName: string]: {
    [tokenName: string]: Token;
  };
};

export const readJsonFiles = (files: string[]) => {
  const tokensJsonByFile: FlattenedTokensByFile = {};

  const seenCollectionsAndModes = new Set<string>();

  for (const file of files) {
    const baseFileName = path.basename(file);
    const { collectionName, modeName } =
      collectionAndModeFromFileName(baseFileName);

    if (seenCollectionsAndModes.has(`${collectionName}.${modeName}`)) {
      throw new Error(`Duplicate collection and mode in file: ${file}`);
    }

    seenCollectionsAndModes.add(`${collectionName}.${modeName}`);

    const fileContent = fs.readFileSync(file, { encoding: "utf-8" });

    if (!fileContent) {
      throw new Error(`Invalid tokens file: ${file}. File is empty.`);
    }

    const tokensFile: TokensFile = JSON.parse(fileContent);

    tokensJsonByFile[baseFileName] = flattenTokensFile(tokensFile);
  }

  return tokensJsonByFile;
};

const flattenTokensFile = (tokensFile: TokensFile) => {
  const flattenedTokens: { [tokenName: string]: Token } = {};

  for (const [tokenGroup, groupValues] of Object.entries(tokensFile)) {
    traverseCollection({
      key: tokenGroup,
      object: groupValues,
      tokens: flattenedTokens,
    });
  }

  return flattenedTokens;
};

const traverseCollection = ({
  key,
  object,
  tokens,
}: {
  key: string;
  object: TokenOrTokenGroup;
  tokens: { [tokenName: string]: Token };
}) => {
  if (key.charAt(0) === "$") {
    return;
  }

  if (object.$value) {
    tokens[key] = object;
  } else {
    for (const [_key, _object] of Object.entries(object)) {
      if (_key.charAt(0) !== "$" && typeof _object === "object") {
        traverseCollection({ key: `${key}/${_key}`, object: _object, tokens });
      }
    }
  }
};

const collectionAndModeFromFileName = (fileName: string) => {
  const fileNameParts = fileName.split(".");
  if (fileNameParts.length < 3) {
    throw new Error(
      `Invalid tokens file name: ${fileName}. File names must be in the format: {collectionName}.{modeName}.json`
    );
  }
  const [collectionName, modeName] = fileNameParts;
  return { collectionName, modeName };
};
