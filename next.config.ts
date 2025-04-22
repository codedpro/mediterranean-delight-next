import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ["@heroicons/react"],
  },
};

export default nextConfig;
