import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ICONS_ROOT = path.resolve(__dirname, "../assets");
const OUTPUT_FILE = path.resolve(__dirname, "../src/generated/iconNames.ts");

const generateIconNames = () => {
  const outlinedIcons = fs
    .readdirSync(path.join(ICONS_ROOT, "outlined"))
    .filter((file) => file.endsWith(".svg"))
    .map((file) => file.replace(".svg", ""));

  const filledIcons = fs
    .readdirSync(path.join(ICONS_ROOT, "filled"))
    .filter((file) => file.endsWith(".svg"))
    .map((file) => file.replace(".svg", ""));

  const allIconNames = [...new Set([...outlinedIcons, ...filledIcons])];

  const content = `// This file is auto-generated. Do not edit manually
export const iconNames = ${JSON.stringify(allIconNames)} as const;
export type IconName = typeof iconNames[number];

export const iconVariants = ['outlined', 'filled'] as const;
export type IconVariant = typeof iconVariants[number];

export const availableIcons = {
  outlined: ${JSON.stringify(outlinedIcons)},
  filled: ${JSON.stringify(filledIcons)}
} as const;
`;

  fs.writeFileSync(OUTPUT_FILE, content);
};

generateIconNames();
