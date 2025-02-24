// Rollup 타입스크립트 컴파일러 플러그인
import typescript from '@rollup/plugin-typescript';
// 문자열 치환을 위한 Rollup 플러그인
import replace from '@rollup/plugin-replace';
import { glob } from 'glob';
import path from 'path';

// src/components 디렉토리의 모든 컴포넌트 파일을 찾습니다
const componentEntries = glob.sync('src/components/**/*.{ts,tsx}').reduce((acc, file) => {
  // 파일 경로에서 파일명(확장자 제외)을 추출
  const name = path.basename(file, path.extname(file));
  return {
    ...acc,
    [name]: file,
  };
}, {});

export default {
  // 번들링할 시작점 설정
  input: {
    // 메인 진입점
    index: 'src/index.ts',
    // 컴포넌트 엔트리들을 자동으로 추가
    ...componentEntries,
  },
  output: {
    // 출력 디렉토리
    dir: 'dist',
    // 출력 형식
    format: 'esm',
    // 모듈 구조 유지
    preserveModules: true,
    // 모듈 루트 디렉토리 설정
    preserveModulesRoot: 'src',
    // 컴포넌트 파일은 components/ 디렉토리에 평평하게 출력
    entryFileNames: (chunk) => {
      if (chunk.facadeModuleId.includes('/components/')) {
        return `components/${chunk.name}.js`;
      }

      // 그 외 파일은 원래 구조 유지
      return '[name].js';
    },
  },
  // 외부 의존성 설정 (번들에 포함하지 않음)
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
    // 'use client' 지시어 제거 플러그인
    replace({
      preventAssignment: true, // 할당문 치환 방지
      values: {
        'use client': '', // 'use client' 문자열을 빈 문자열로 치환
      },
    }),
    // TypeScript 컴파일러 설정
    typescript({
      tsconfig: './tsconfig.json', // TypeScript 설정 파일
      declaration: true, // 타입 선언 파일(.d.ts) 생성
      declarationDir: 'dist', // 타입 선언 파일 출력 디렉토리
      exclude: ['**/*.test.ts', '**/*.test.tsx'], // 테스트 파일 제외
      outDir: 'dist', // 컴파일된 JS 파일 출력 디렉토리
      rootDir: 'src', // 소스 파일 루트 디렉토리
    }),
  ],
};
