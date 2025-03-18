import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"],
    languageOptions: { 
      sourceType: "commonjs",
      globals: globals.node 
    },
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      ...pluginJs.configs.recommended.rules, // Keep ESLint's recommended rules
      "prettier/prettier": "error", // Enforce Prettier formatting
      "no-unused-vars": "warn",
      "eqeqeq": "error",
      "semi": ["error", "always"],
      "quotes": ["error", "double"]
    }
  },
  prettierConfig // Disable conflicting ESLint rules via Prettier
];
