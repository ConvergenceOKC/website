import { withPayload } from '@payloadcms/next/withPayload';

import redirects from './redirects.js';

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP: NEXT_PUBLIC_SERVER_URL === 'http://localhost:3000',
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        };
      }),
      {
        hostname: 'staging.convergenceokc.church',
        protocol: 'https',
        search: '**',
        pathname: '/**',
      },
    ],
    qualities: [100],
    imageSizes: [1280, 1536, 2048, 2560, 3072, 3840],
    localPatterns: [
      {
        pathname: '/api/media/file/**',
      },
    ],
  },
  webpack: (webpackConfig) => {
    webpackConfig.resolve.extensionAlias = {
      '.cjs': ['.cts', '.cjs'],
      '.js': ['.ts', '.tsx', '.js', '.jsx'],
      '.mjs': ['.mts', '.mjs'],
    };

    return webpackConfig;
  },
  reactCompiler: true,
  reactStrictMode: true,
  redirects,
  typescript: {
    ignoreBuildErrors: true,
  },
};

console.log(
  'dangerouslyAllowLocalIP:',
  nextConfig.images.dangerouslyAllowLocalIP,
);
console.log('remotePatterns:', nextConfig.images.remotePatterns);

export default withPayload(nextConfig, { devBundleServerPackages: false });
