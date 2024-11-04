import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-config-prettier";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.node, parser: tseslint.parser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
  },
  prettier,
  {
    ignores: ["dist/*", "node_modules/*"],
  },
];