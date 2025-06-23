
/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/gondolas/:path*',
        destination: '/gondolas/:path*',
      },
    ]
  },
}

module.exports = nextConfig