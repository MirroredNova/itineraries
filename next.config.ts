import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@mui/material', '@mui/icons-material'],
  },
  images: {
    domains: ['lh3.googleusercontent.com'], // For Google profile images
  },
};

export default nextConfig;
