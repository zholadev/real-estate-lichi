/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'meta-trust-api.spb.lichishop.com',
            },
        ],
    },
}

module.exports = nextConfig
