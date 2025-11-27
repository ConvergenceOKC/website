import { withPayload } from '@payloadcms/next/withPayload';

import redirects from './redirects.js';

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined || process.env.__NEXT_PRIVATE_ORIGIN || 'http://localhost:3000';

console.log('🔍 NEXT_PUBLIC_SERVER_URL:', NEXT_PUBLIC_SERVER_URL);
console.log(
  '🔍 VERCEL_PROJECT_PRODUCTION_URL:',
  process.env.VERCEL_PROJECT_PRODUCTION_URL,
);
console.log('🔍 NODE_ENV:', process.env.NODE_ENV);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
    dangerouslyAllowLocalIP:
      process.env.NODE_ENV === 'development' ||
      NEXT_PUBLIC_SERVER_URL === 'http://localhost:3000'
        ? true
        : false,
    remotePatterns: [
      // Current domain (production, staging, or localhost)
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
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
        pathname: '/api/media/**',
      },
    ],
  },
  reactStrictMode: true,
  redirects,
  reactCompiler: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

console.log('🔍 Allow Local IP:', nextConfig.images.dangerouslyAllowLocalIP);
console.log('🔍 Remote Patterns:', nextConfig.images.remotePatterns);
console.log('🔍 Local Patterns:', nextConfig.images.localPatterns);

export default withPayload(nextConfig);
