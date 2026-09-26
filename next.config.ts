import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/rootdirect.hk",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
