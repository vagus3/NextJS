import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: 'static5.depositphotos.com',
        port: '',
      },
      {
        hostname : "lovable-bloodhound-237.convex.cloud",
        protocol: "https",
        port: '',
      }
    ],
  },
};

export default nextConfig;
