import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    /* config options here */
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
    async redirects() {
        return [
            {
                source: '/',
                destination: '/',
                has: [{ type: 'host', value: 'app.linkmetur.com.br' }],
                permanent: false,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: '/',
                destination: '/',
                has: [{ type: 'host', value: 'app.linkmetur.com.br' }],
            },
        ];
    },
};

export default nextConfig;
