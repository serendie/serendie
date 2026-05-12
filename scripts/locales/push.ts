import "dotenv/config";
import { keyToFigmaName } from "./keyUtils";
import {
  getLocalVariables,
  postVariables,
  resolveFigmaEnv,
  type VariableCollection,
  type LocalVariable,
  type PostVariablesRequestBody,
} from "./figma";
import { loadUi } from "./uiStore";
import {
  ensureFigmaSafeValue,
  isEmptyTranslationValue,
  normalizeFigmaValue,
} from "./translationHelpers";

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

function collectVariables(
  variables: Record<string, LocalVariable>,
  collectionId: string
) {
  return Object.values(variables)
    .filter(
      (variable) =>
        variable.variableCollectionId === collectionId && !variable.remote
    )
    .reduce<Record<string, LocalVariable>>((acc, variable) => {
      acc[variable.name] = variable;
      return acc;
    }, {});
}

async function main() {
  const collectionName = process.env.FIGMA_TRANSLATION_COLLECTION ?? "_i18n";

  const ui = await loadUi();
  const languages = Object.keys(ui);
  if (!languages.length) {
    throw new Error("ui.ts does not contain any languages.");
  }

  const baseLanguage = ui.ja ? "ja" : languages[0];
  const keys = Object.keys(ui[baseLanguage]);

  const { token, fileKey } = resolveFigmaEnv();
  const response = await getLocalVariables(token, fileKey);
  const collection = pickCollection(
    response.meta.variableCollections,
    collectionName
  );

  const modeByName = new Map(collection.modes.map((mode) => [mode.name, mode]));
  const missingModes = languages.filter((lang) => !modeByName.has(lang));
  if (missingModes.length) {
    throw new Error(
      `Missing modes in Figma collection "${collectionName}": ${missingModes.join(
        ", "
      )}. Please add modes for all languages before pushing.`
    );
  }

  const figmaVariables = collectVariables(
    response.meta.variables,
    collection.id
  );

  const payload: PostVariablesRequestBody = {
    variables: [],
    variableModeValues: [],
  };

  for (const key of keys) {
    const figmaName = keyToFigmaName(key);
    const existing = figmaVariables[figmaName];
    const variableId = existing?.id ?? figmaName;

    if (!existing) {
      payload.variables?.push({
        action: "CREATE",
        id: variableId,
        name: figmaName,
        variableCollectionId: collection.id,
        resolvedType: "STRING",
        description: ui[baseLanguage][key],
      });
    }

    for (const lang of languages) {
      const mode = modeByName.get(lang);
      if (!mode) continue;
      const value = ui[lang]?.[key] ?? "";
      const desiredNormalized = isEmptyTranslationValue(value) ? "" : value;
      const currentValue = existing?.valuesByMode?.[mode.modeId];
      const normalizedCurrent =
        typeof currentValue === "string"
          ? normalizeFigmaValue(currentValue)
          : undefined;

      if (normalizedCurrent === desiredNormalized) {
        continue;
      }

      payload.variableModeValues?.push({
        variableId,
        modeId: mode.modeId,
        value: ensureFigmaSafeValue(value),
      });
    }
  }

  if (!payload.variables?.length && !payload.variableModeValues?.length) {
    console.log("✅ Figma translations are already up to date.");
    return;
  }

  await postVariables(token, fileKey, payload);

  console.log(
    `✅ Synced ${payload.variableModeValues?.length ?? 0} values (${
      payload.variables?.length ?? 0
    } new variables) to Figma collection "${collectionName}".`
  );
}

main().catch((error) => {
  console.error("❌ Failed to push translations to Figma.");
  console.error(error);
  process.exit(1);
});
