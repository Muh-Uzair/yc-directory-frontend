import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "5mb", // change to whatever you need
    },
  },
};

export default nextConfig;
