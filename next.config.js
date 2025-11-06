/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-brands-svg-icons'],
  },
}

module.exports = nextConfig


