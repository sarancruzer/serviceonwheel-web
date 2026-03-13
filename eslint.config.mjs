import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

import js from "@eslint/js";
import nextPlugin from "@next/eslint-plugin-next";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";
import tseslint from "typescript-eslint";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default tseslint.config(
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "public/assets/**",
      "public/template/**",
      "coverage/**",
      "dist/**",
      "eslint.config.mjs",
      "prettier.config.mjs",
      "next-env.d.ts"
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
  ...tseslint.configs.recommendedTypeChecked,
  {
    files: ["**/*.{ts,tsx,mts,cts}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "@next/next": nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs["core-web-vitals"].rules,
      "@next/next/no-css-tags": "off",
      "@next/next/no-img-element": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
  eslintConfigPrettier,
);
