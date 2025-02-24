import { glob } from 'glob';
import path from 'path';
import fs from 'fs';

// package.json 읽기
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));

// 컴포넌트 파일 찾기
const componentFiles = glob.sync('src/components/**/*.{ts,tsx}');

// exports 객체 생성 (기존 고정 exports 포함)
const exports = {
  '.': {
    import: './dist/index.mjs',
    require: './dist/index.cjs',
  },
  // 기존 고정 exports 유지
  './postcss.config': './postcss.config.mjs',
  './styles.css': './src/globals.css',
  './lib/utils': {
    types: './dist/lib/utils.d.ts',
    default: './dist/lib/utils.js',
  },
  './tailwind.config': './tailwind.config.ts',
};

// 각 컴포넌트에 대한 export 설정 추가
componentFiles.forEach((file) => {
  const name = path.basename(file, path.extname(file));
  exports[`./components/${name}`] = {
    import: `./dist/${name}.mjs`,
    require: `./dist/${name}.cjs`,
  };
});

// package.json 업데이트
packageJson.exports = exports;
packageJson.types = './dist/index.d.ts';

// 수정된 package.json 저장
fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 2) + '\n');
