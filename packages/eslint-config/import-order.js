/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['import'],
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin', // Node.js 내장 모듈
          'external', // npm 패키지
          'internal', // 프로젝트 내부 모듈
          ['parent', 'sibling'], // 상위 및 형제 디렉토리
          'index', // 현재 디렉토리
          'object', // object-imports
          'type', // type imports
        ],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        // ... existing code ...
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@repo/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: '@/*',
            group: 'internal',
            position: 'after',
          },
        ],
        // ... existing code ...
        pathGroupsExcludedImportTypes: ['react'],
        distinctGroup: false,
      },
    ],
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
  },
};
