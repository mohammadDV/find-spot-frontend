import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/next-intl.config.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "finybo-prod.s3.ir-thr-at1.arvanstorage.ir",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig as any);