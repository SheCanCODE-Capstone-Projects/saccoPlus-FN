/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {},
  images: {
    domains: [],
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_APP_NAME: 'SACCOPlus Rwanda',
  },
  async rewrites() {
    return [
      {
        source: '/api/v1/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8080'}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
