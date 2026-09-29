import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // CDN Farello.vn — ảnh kính mắt thật từ thương hiệu Việt
      {
        protocol: 'https',
        hostname: 'cdn.farello.vn',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.kinhmatlily.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
