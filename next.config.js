/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  // Expose Supabase environment variables at build time (fallback to empty strings)
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
  },

  // Skip ESLint errors during production builds to avoid build-blockers
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Enable React strict mode for highlighting potential problems
  reactStrictMode: true,

  // Next.js Image Optimization domains
  images: {
    domains: ['images.unsplash.com', 'cdn.yoister.app'],
  },

  // Customize Webpack config for aliasing
  webpack(config) {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  },
};

module.exports = nextConfig;
