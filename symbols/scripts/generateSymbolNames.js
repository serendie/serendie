import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILES_ROOT = path.resolve(__dirname, "../assets");
const OUTPUT_FILE = path.resolve(__dirname, "../src/generated/symbolNames.ts");

const generateSymbolNames = () => {
  const outlinedSymbols = fs
    .readdirSync(path.join(FILES_ROOT, "outlined"))
    .filter((file) => file.endsWith(".svg"))
    .map((file) => file.replace(".svg", ""));

  const filledSymbols = fs
    .readdirSync(path.join(FILES_ROOT, "filled"))
    .filter((file) => file.endsWith(".svg"))
    .map((file) => file.replace(".svg", ""));

  const allSymbolNames = [...new Set([...outlinedSymbols, ...filledSymbols])];

  const content = `// This file is auto-generated. Do not edit manually
export const symbolNames = ${JSON.stringify(allSymbolNames)} as const;
export type SymbolName = typeof symbolNames[number];

export const symbolVariants = ['outlined', 'filled'] as const;
export type SymbolVariant = typeof symbolVariants[number];

export const availableSymbols = {
  outlined: ${JSON.stringify(outlinedSymbols)},
  filled: ${JSON.stringify(filledSymbols)}
} as const;
`;

  fs.writeFileSync(OUTPUT_FILE, content);
};

generateSymbolNames();
