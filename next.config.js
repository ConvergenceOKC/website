import { withPayload } from '@payloadcms/next/withPayload';

import redirects from './redirects.js';

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000';

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
      {
        // All subdomains
        hostname: '**.convergenceokc.church',
        protocol: 'https',
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
