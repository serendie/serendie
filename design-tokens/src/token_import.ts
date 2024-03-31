import * as fs from "fs";
import * as path from "path";

import { Token, TokenOrTokenGroup, TokensFile } from "./token_types";
import {
  GetLocalVariablesResponse,
  LocalVariable,
  LocalVariableCollection,
  PostVariablesRequestBody,
} from "@figma/rest-api-spec";

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

export const generatePostVariablesPayload = (
  tokensByFile: FlattenedTokensByFile,
  localVariables: GetLocalVariablesResponse
) => {
  const localVariableCollectionsByName: {
    [name: string]: LocalVariableCollection;
  } = {};
  const localVariablesByCollectionAndName: {
    [variableCollectionId: string]: { [variableName: string]: LocalVariable };
  } = {};

  for (const collection of Object.values(
    localVariables.meta.variableCollections
  )) {
    if (collection.remote) {
      throw new Error("Remote collection is included in local variables.");
    }

    if (localVariableCollectionsByName[collection.name]) {
      throw new Error(
        `Duplicate variable collection in file: ${collection.name}`
      );
    }

    localVariableCollectionsByName[collection.name] = collection;
  }

  for (const variable of Object.values(localVariables.meta.variables)) {
    if (variable.remote) {
      throw new Error("Remote collection is included in local variables.");
    }

    if (!localVariablesByCollectionAndName[variable.variableCollectionId]) {
      localVariablesByCollectionAndName[variable.variableCollectionId] = {};
    }

    localVariablesByCollectionAndName[variable.variableCollectionId][
      variable.name
    ] = variable;
  }

  console.log(
    "Local variable collections in Figma file:",
    localVariableCollectionsByName,
    localVariablesByCollectionAndName
  );

  const postVariablesPayload: PostVariablesRequestBody = {
    variableCollections: [],
    variableModes: [],
    variables: [],
    variableModeValues: [],
  };

  for (const [fileName, tokens] of Object.entries(tokensByFile)) {
    const { collectionName, modeName } =
      collectionAndModeFromFileName(fileName);

    const variableCollection = localVariableCollectionsByName[collectionName];
    // Use the actual variable collection id or use the name as the temporary id
    const variableCollectionId = variableCollection
      ? variableCollection.id
      : collectionName;
    const variableMode = variableCollection?.modes.find(
      (mode) => mode.name === modeName
    );
    // Use the actual mode id or use the name as the temporary id
    const modeId = variableMode ? variableMode.modeId : modeName;

    if (
      !variableCollection &&
      !postVariablesPayload.variableCollections?.find(
        (c) => c.id === variableCollectionId
      )
    ) {
      postVariablesPayload.variableCollections?.push({
        action: "CREATE",
        id: variableCollectionId,
        name: variableCollectionId,
        initialModeId: modeId, // Use the initial mode as the first mode
      });

      // Rename the initial mode, since we're using it as our first mode in the collection
      postVariablesPayload.variableModes?.push({
        action: "UPDATE",
        id: modeId,
        name: modeId,
        variableCollectionId,
      });
    }

    // Add a new mode if it doesn't exist in the Figma file
    // and it's not the initial mode in the collection
    if (
      !variableMode &&
      !postVariablesPayload.variableCollections?.find(
        (c) =>
          c.id === variableCollectionId &&
          "initialModeId" in c &&
          c.initialModeId === modeId
      )
    ) {
      postVariablesPayload.variableModes?.push({
        action: "CREATE",
        id: modeId,
        name: modeId,
        variableCollectionId,
      });
    }
  }

  console.log("Post variables payload:", postVariablesPayload);

  return postVariablesPayload;
};
