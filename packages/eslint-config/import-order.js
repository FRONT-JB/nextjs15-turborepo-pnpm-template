/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['simple-import-sort', 'import'],
  rules: {
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // React and Next related packages come first
          ['^react$', '^next'],
          // Internal packages with @
          ['^@'],
          // Other external packages
          ['^[a-z]'],
          // Parent imports
          ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
          // Other relative imports
          ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
          // Style imports
          ['^.+\\.s?css$'],
          // Side effect imports
          ['^\\u0000'],
        ],
      },
    ],
    'simple-import-sort/exports': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
