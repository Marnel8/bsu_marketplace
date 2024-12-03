import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/uploads/**",
      },
      // {
      //   protocol: "https",
      //   hostname: "your-production-domain.com",
      //   pathname: "/uploads/**",
      // },
    ],
  },
};

export default nextConfig;
