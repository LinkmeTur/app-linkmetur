import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    allowedDevOrigins: ['https://linkmetur-api.vercel.app'],
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
