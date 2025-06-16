import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    allowedDevOrigins: ['https://linkmetur-api.vercel.app'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'linkmeturimages2025.s3.sa-east-1.amazonaws.com',
                pathname: '/**',
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
