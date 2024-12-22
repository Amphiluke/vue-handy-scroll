import js from "@eslint/js";
import stylisticJs from "@stylistic/eslint-plugin-js";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";

export default [
  {
    ignores: ["dist/*"],
  },
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.nodeBuiltin,
      },
    },
  },
  js.configs.recommended,
  ...pluginVue.configs["flat/recommended"],
  {
    plugins: {
      "@stylistic/js": stylisticJs,
    },
    rules: {
      "@stylistic/js/comma-dangle": ["error", {arrays: "always-multiline",  objects: "always-multiline"}],
      "@stylistic/js/indent": ["error", 2],
      "@stylistic/js/quotes": ["error", "double"],
      "@stylistic/js/semi": "error",
    },
  },
];
