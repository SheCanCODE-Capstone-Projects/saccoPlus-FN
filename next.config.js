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
    const backend = process.env.NEXT_PUBLIC_API_URL ?? 'https://saccoplus-bn-2.onrender.com';
    return [
      {
        source: '/api/auth/:path*',
        destination: `${backend}/api/auth/:path*`,
      },
      {
        source: '/api/v1/:path*',
        destination: `${backend}/api/v1/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;
