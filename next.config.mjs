/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
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
  experimental: {
    scrollRestoration: true
  },
  i18n: {
    locales: ['default', 'en', 'ru'],
    defaultLocale: 'default',
    localeDetection: false,
  },
  trailingSlash: true,
};

export default nextConfig;
