import { withPayload } from '@payloadcms/next/withPayload';

import redirects from './redirects.js';

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      ...[NEXT_PUBLIC_SERVER_URL /* 'https://example.com' */].map((item) => {
        const url = new URL(item);

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        };
      }),
    ],
    qualities: [100],
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
  experimental: {
    staticGenerationRetryCount: 1,
    staticGenerationMaxConcurrency: 2,
    staticGenerationMinPagesPerWorker: 25,
  },
  // Add noindex header for  staging/preview environments
  async headers() {
    const headers = [];

    if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview') {
      headers.push({
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'noindex',
          },
        ],
        source: '/:path*',
      });
    }

    return headers;
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
