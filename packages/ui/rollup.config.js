import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import { glob } from 'glob';
import path from 'path';

// src/components 디렉토리의 모든 컴포넌트 파일을 찾습니다
const componentEntries = glob.sync('src/components/**/*.{ts,tsx}').reduce((acc, file) => {
  const name = path.basename(file, path.extname(file));
  return {
    ...acc,
    [name]: file,
  };
}, {});

export default {
  input: {
    index: 'src/index.ts',
    ...componentEntries,
  },
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: (chunk) => {
      if (chunk.facadeModuleId?.includes('/components/')) {
        return `components/${chunk.name}.js`;
      }
      return '[name].js';
    },
  },
  external: [
    'react',
    'react/jsx-runtime',
    '@radix-ui/react-accordion',
    '@radix-ui/react-slot',
    'class-variance-authority',
    'clsx',
    'tailwind-merge',
    'lucide-react',
  ],
  plugins: [
    // 'use client' 지시어 제거
    replace({
      preventAssignment: true,
      delimiters: ['', ''],
      values: {
        "'use client';": '',
        '"use client";': '',
        "'use client'": '',
        '"use client"': '',
      },
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
      outDir: 'dist',
      rootDir: 'src',
    }),
  ],
};
