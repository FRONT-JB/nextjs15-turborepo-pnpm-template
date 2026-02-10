import js from '@eslint/js';
import turboPlugin from 'eslint-config-turbo/flat';
import tseslint from 'typescript-eslint';
import importOrderConfig from './import-order.js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  js.configs.recommended,
  ...turboPlugin,
  ...tseslint.configs.recommended,
  ...importOrderConfig,
  {
    languageOptions: {
      globals: {
        React: 'readonly',
        JSX: 'readonly',
      },
      parserOptions: {
        projectService: true,
      },
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
    },
  },
  {
    ignores: ['.*.js', 'node_modules/', 'dist/'],
  },
];
