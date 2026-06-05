import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true
  },
  reactStrictMode: true,
  trailingSlash: true
};

export default nextConfig;
