import reactHooks from "eslint-plugin-react-hooks";
import pandaCss from "@pandacss/eslint-plugin";
import reactRefresh from "eslint-plugin-react-refresh";
import prettierRecommended from "eslint-plugin-prettier/recommended";
import eslint from "@eslint/js";
import tsESLint from "typescript-eslint";
import { FlatCompat } from "@eslint/eslintrc";

const compat = new FlatCompat();

export default tsESLint.config(
  ...compat.extends("plugin:storybook/recommended"),
  {
    plugins: {
      "react-refresh": reactRefresh,
      "@pandacss": pandaCss,
      "react-hooks": reactHooks,
    },
    rules: {
      ...pandaCss.configs.recommended.rules,
      "@pandacss/file-not-included": "off",
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
    },
  },
  eslint.configs.recommended,
  ...tsESLint.configs.recommended,
  prettierRecommended,
  {
    ignores: [
      "**/generated/",
      "**/dist/",
      "**/styled-system/",
      "**/*.cjs",
      "**/public/storybook/",
      "**/.astro/",
      "**/.storybook/",
      "**/env.d.ts",
    ],
  }
);
