import createBundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = createBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@repo/ui'],
  modularizeImports: {
    '@repo/ui': {
      transform: '@repo/ui/{{member}}',
      skipDefaultConversion: true,
    },
  },
};

export default withBundleAnalyzer(nextConfig);
