/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/page-editor/:path*',
        destination: '/page-editor/[...id]',
      },
    ];
  },
}

module.exports = nextConfig
