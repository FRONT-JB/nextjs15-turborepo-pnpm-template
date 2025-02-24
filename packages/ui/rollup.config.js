import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

export default {
  input: {
    index: 'src/index.ts',
    button: 'src/components/button.tsx',
    accordion: 'src/components/accordion.tsx',
  },
  output: {
    dir: 'dist',
    format: 'esm',
    preserveModules: true,
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
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
    replace({
      // "use client" 지시어를 제거하기 위해서 사용함
      preventAssignment: true,
      values: {
        'use client': '',
      },
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist',
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
    }),
  ],
};
