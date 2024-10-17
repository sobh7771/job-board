import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: { fetches: { fullUrl: true } },
  images: {
    remotePatterns: [{ hostname: 'placehold.co' }],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    typedRoutes: true,
  },
};

export default withNextIntl(nextConfig);
