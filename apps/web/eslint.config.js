import nextConfig from '@repo/eslint-config/next.js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...nextConfig,
  {
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
  {
    ignores: ['eslint.config.js', 'next.config.mjs'],
  },
];
