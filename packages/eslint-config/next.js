const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
    require.resolve('@vercel/style-guide/eslint/next'),
    'turbo',
    './import-order.js',
  ],
  globals: {
    React: true,
    JSX: true,
  },
  env: {
    node: true,
    browser: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  ignorePatterns: [
    // Ignore dotfiles
    '.*.js',
    'node_modules/',
  ],
  overrides: [{ files: ['*.js?(x)', '*.ts?(x)'] }],
};
