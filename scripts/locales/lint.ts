import { loadUi } from "./uiStore";
import { isEmptyTranslationValue } from "./translationHelpers";

function extractPlaceholders(text: string): Set<string> {
  const matches = text.matchAll(/\{\{(\w+)\}\}/g);
  return new Set(Array.from(matches, (m) => m[1]));
}

function areSetsEqual<T>(a: Set<T>, b: Set<T>): boolean {
  if (a.size !== b.size) return false;
  for (const item of a) {
    if (!b.has(item)) return false;
  }
  return true;
}

async function main() {
  const ui = await loadUi();
  const languages = Object.keys(ui);

  if (!languages.length) {
    throw new Error("ui.ts does not contain any languages.");
  }

  const baseLanguage = ui.ja ? "ja" : languages[0];
  const baseKeys = new Set(Object.keys(ui[baseLanguage]));

  const errors: string[] = [];

  for (const lang of languages) {
    const keys = Object.keys(ui[lang]);

    for (const key of keys) {
      if (!baseKeys.has(key)) {
        errors.push(`"${key}" exists in ${lang} but not in ${baseLanguage}`);
      }

      const value = ui[lang][key];
      if (typeof value !== "string") {
        errors.push(`"${key}" in ${lang} must be a string.`);
      } else if (isEmptyTranslationValue(value)) {
        errors.push(`"${key}" in ${lang} is empty or placeholder "#".`);
      } else {
        // プレースホルダーの整合性チェック
        const baseValue = ui[baseLanguage][key];
        if (baseValue && typeof baseValue === "string") {
          const basePlaceholders = extractPlaceholders(baseValue);
          const langPlaceholders = extractPlaceholders(value);
          if (!areSetsEqual(basePlaceholders, langPlaceholders)) {
            errors.push(
              `"${key}": Placeholder mismatch. ${baseLanguage} has [${Array.from(basePlaceholders).join(", ")}] but ${lang} has [${Array.from(langPlaceholders).join(", ")}]`
            );
          }
        }
      }
    }

    for (const key of baseKeys) {
      if (!(key in ui[lang])) {
        errors.push(`"${key}" is missing in ${lang}.`);
      }
    }
  }

  if (errors.length) {
    console.error("❌ Translation lint failed:\n");
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(
    `✅ Translation lint passed. Checked ${baseKeys.size} keys across ${languages.length} languages.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
