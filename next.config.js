/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export', // Enable static export for Netlify
  images: {
    unoptimized: true, // Required for static export
    domains: [],
    formats: ['image/avif', 'image/webp'],
  },
  experimental: {
    optimizePackageImports: ['@fortawesome/fontawesome-svg-core', '@fortawesome/free-brands-svg-icons'],
  },
}

module.exports = nextConfig


