import globals from "globals";
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // ...
    plugins: {
      '@stylistic/js': stylisticJs
    },
    rules: {
      '@stylistic/js/indent': [
        'error',
        2
      ],
      '@stylistic/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistic/js/quotes': [
        'error',
        'single'
      ],
      '@stylistic/js/semi': [
        'error',
        'never'
      ],
    },
  },
  js.configs.recommended,
  {files: ["**/*.js"], 
  languageOptions: {sourceType: "commonjs"}},
  {languageOptions: { globals: {...globals.node }, ecmaVersion: "latest"} },
  { 
    ignores: ["dist/**"],
  },
];