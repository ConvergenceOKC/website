import { withPayload } from '@payloadcms/next/withPayload';

import redirects from './redirects.js';

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

console.log('🔍 NEXT_PUBLIC_SERVER_URL:', NEXT_PUBLIC_SERVER_URL);

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowLocalIP:
      process.env.NODE_ENV === 'development' ? true : false,
    remotePatterns: [
      // Current domain (production, staging, or localhost)
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item);
        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        };
      }),
      // Explicit production domain (for fallback images)
      {
        hostname: 'convergenceokc.church',
        protocol: 'https',
      },
      // Explicit staging domain
      {
        hostname: 'staging.convergenceokc.church',
        protocol: 'https',
      },
      // All other subdomains as fallback
      {
        protocol: 'https',
        hostname: '*.convergenceokc.church',
      },
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

export default withPayload(nextConfig);
