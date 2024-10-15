import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: { fetches: { fullUrl: true } },
  images: {
    remotePatterns: [
      { hostname: 'via.placeholder.com' },
      { hostname: '"randomuser.me"' },
    ],
  },
};

export default withNextIntl(nextConfig);
