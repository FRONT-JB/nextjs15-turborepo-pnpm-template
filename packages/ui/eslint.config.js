import reactInternalConfig from '@repo/eslint-config/react-internal.js';

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...reactInternalConfig,
  {
    rules: {
      'no-redeclare': 'off',
    },
  },
  {
    ignores: [
      'eslint.config.js',
      'postcss.config.mjs',
      'rollup.config.js',
      'tailwind.config.ts',
      'scripts/**',
    ],
  },
];
