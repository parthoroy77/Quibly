// eslint.config.js
import js from "@eslint/js";
import path from "node:path";
import { fileURLToPath } from "node:url";
import tseslint from "typescript-eslint";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const project = path.resolve(__dirname, "tsconfig.json");

export const backendConfig = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "only-warn": {
        rules: {}, // plugin only-warn transforms all errors to warnings at runtime
      },
    },
    rules: {
      // Vercel style guide-compatible rules
      "no-console": "off",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": ["off"],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
    },
  },

  {
    files: ["**/__tests__/**/*", "**/*.test.ts"],
    languageOptions: {
      env: {
        jest: true,
        node: true,
      },
    },
  },
];
