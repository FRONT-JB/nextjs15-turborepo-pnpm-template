import { readFileSync } from 'fs';
import { join } from 'path';

import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

const uiPackageJson = JSON.parse(
  readFileSync(join(process.cwd(), '../../packages/ui/package.json'), 'utf8')
);

// src 파일을 읽어서 export된 모든 컴포넌트 찾기
const transforms = Object.keys(uiPackageJson.exports).reduce((acc, key) => {
  // components로 시작하는 export만 처리
  if (!key.startsWith('./components/')) {
    return acc;
  }

  const srcPath = key.replace('./', '') + '.tsx';
  const sourceFile = readFileSync(join(process.cwd(), '../../packages/ui/src', srcPath), 'utf8');

  // export 구문 찾기 (예: export { Button, buttonVariants })
  const exportMatches = sourceFile.match(/export\s+{([^}]+)}/);
  if (exportMatches) {
    const exports = exportMatches[1].split(',').map((e) => e.trim());
    exports.forEach((exportName) => {
      // @repo/ui 경로 추가
      acc[exportName] = '@repo/ui' + key.slice(1); // './' 제거하고 앞에 @repo/ui 추가
    });
  }

  return acc;
}, {});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  modularizeImports: {
    '@repo/ui': {
      transform: transforms,
      skipDefaultConversion: true,
    },
  },
};

export default withBundleAnalyzer(nextConfig);
