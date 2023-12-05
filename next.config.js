/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'meta-trust-api.spb.lichishop.com',
            },
            {
                protocol: 'https',
                hostname: 'meta-trust-api.spb.lichishop.comundefined',
            },
            {
                protocol: 'https',
                hostname: 'meta-trust-api.spb.lichishop.com/undefined',
            },
        ],
    },
}

module.exports = nextConfig
