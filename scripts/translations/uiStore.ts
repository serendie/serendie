import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import prettier from "prettier";

export type UiDictionary = Record<string, Record<string, string>>;

const UI_FILE_PATH = path.resolve(process.cwd(), "src/i18n/ui.ts");

export async function loadUi(): Promise<UiDictionary> {
  const moduleUrl = `${pathToFileURL(UI_FILE_PATH).href}?update=${Date.now()}`;
  const mod = (await import(moduleUrl)) as { ui?: UiDictionary };

  if (!mod.ui) {
    throw new Error(`ui export was not found in ${UI_FILE_PATH}`);
  }

  return mod.ui;
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

  const source = `export const ui = ${JSON.stringify(
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
