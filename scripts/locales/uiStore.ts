import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import prettier from "prettier";

export type Language = string;
export type TranslationKey = string;
export type UiDictionary = Record<Language, Record<TranslationKey, string>>;

const UI_FILE_PATH = path.resolve(process.cwd(), "src/i18n/dictionary.ts");

function isValidUiDictionary(value: unknown): value is UiDictionary {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  for (const langValue of Object.values(value)) {
    if (typeof langValue !== "object" || langValue === null) {
      return false;
    }
    for (const translation of Object.values(langValue)) {
      if (typeof translation !== "string") {
        return false;
      }
    }
  }

  return true;
}

export async function loadUi(): Promise<UiDictionary> {
  const moduleUrl = `${pathToFileURL(UI_FILE_PATH).href}?update=${Date.now()}`;
  const mod = (await import(moduleUrl)) as { dictionary?: unknown };

  if (!mod.dictionary) {
    throw new Error(`dictionary export was not found in ${UI_FILE_PATH}`);
  }

  if (!isValidUiDictionary(mod.dictionary)) {
    throw new Error(
      `dictionary export in ${UI_FILE_PATH} has invalid structure. Expected Record<Language, Record<TranslationKey, string>>`
    );
  }

  return mod.dictionary;
}

function sortRecord<T extends Record<string, string>>(record: T) {
  return Object.fromEntries(
    Object.keys(record)
      .sort()
      .map((key) => [key, record[key]])
  ) as T;
}

export async function writeUi(ui: UiDictionary) {
  const normalized = Object.fromEntries(
    Object.keys(ui).map((lang) => [lang, sortRecord(ui[lang])])
  );

  const source = `export const dictionary = ${JSON.stringify(
    normalized,
    null,
    2
  )} as const;\n`;

  const formatted = await prettier.format(source, {
    filepath: UI_FILE_PATH,
  });

  await fs.writeFile(UI_FILE_PATH, formatted, { encoding: "utf-8" });
}

export function cloneUi(ui: UiDictionary): UiDictionary {
  return JSON.parse(JSON.stringify(ui)) as UiDictionary;
}
