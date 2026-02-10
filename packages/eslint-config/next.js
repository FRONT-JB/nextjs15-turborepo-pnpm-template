import js from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next/dist/index.js';
import turboPlugin from 'eslint-config-turbo/flat';
import tseslint from 'typescript-eslint';
import importOrderConfig from './import-order.js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  js.configs.recommended,
  ...turboPlugin,
  ...importOrderConfig,
  ...tseslint.configs.recommended,
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
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
    ignores: ['.*.js', 'node_modules/', '.next/'],
  },
];
