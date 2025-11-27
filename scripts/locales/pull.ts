import "dotenv/config";
import { figmaNameToKey } from "./keyUtils";
import { getLocalVariables, resolveFigmaEnv } from "./figma";
import { cloneUi, loadUi, writeUi } from "./uiStore";
import type { UiDictionary } from "./uiStore";
import { normalizeFigmaValue } from "./translationHelpers";
import type { VariableCollection } from "./figma";

function pickCollection(
  collections: Record<string, VariableCollection>,
  name: string
) {
  const candidates = Object.values(collections).filter(
    (collection) => !collection.remote
  );

  const match = candidates.find((collection) => collection.name === name);

  if (!match) {
    const available = candidates.map((c) => c.name).join(", ") || "none";
    throw new Error(
      `Translation collection "${name}" was not found. Available collections: ${available}`
    );
  }

  return match;
}

function mergeLanguages(
  existing: UiDictionary,
  orderedLanguages: string[]
): UiDictionary {
  const merged: UiDictionary = {};

  for (const lang of orderedLanguages) {
    merged[lang] = { ...(existing[lang] ?? {}) };
  }

  return merged;
}

async function main() {
  const collectionName = process.env.FIGMA_TRANSLATION_COLLECTION ?? "locales";

  const ui = await loadUi();
  const { token, fileKey } = resolveFigmaEnv();
  const response = await getLocalVariables(token, fileKey);

  const collection = pickCollection(
    response.meta.variableCollections,
    collectionName
  );

  const existingOrder = Object.keys(ui);
  const modeOrder = collection.modes.map((mode) => mode.name);
  const languageOrder = Array.from(new Set([...existingOrder, ...modeOrder]));

  const updatedUi = mergeLanguages(cloneUi(ui), languageOrder);

  const variables = Object.values(response.meta.variables).filter(
    (variable) =>
      variable.variableCollectionId === collection.id && !variable.remote
  );

  const modeByName = new Map(collection.modes.map((mode) => [mode.name, mode]));

  for (const variable of variables) {
    const key = figmaNameToKey(variable.name);
    for (const lang of languageOrder) {
      const mode = modeByName.get(lang);
      if (!mode) continue;

      const value = variable.valuesByMode[mode.modeId];
      if (typeof value === "string") {
        updatedUi[lang][key] = normalizeFigmaValue(value);
      } else if (!(key in updatedUi[lang])) {
        updatedUi[lang][key] = "";
      }
    }
  }

  await writeUi(updatedUi);
  const totalKeys = Object.keys(updatedUi[languageOrder[0]] ?? {}).length;
  console.log(
    `✅ Pulled translations from Figma collection "${collectionName}" (${variables.length} variables, ${totalKeys} keys).`
  );
}

main().catch((error) => {
  console.error("❌ Failed to pull translations from Figma.");
  console.error(error);
  process.exit(1);
});
