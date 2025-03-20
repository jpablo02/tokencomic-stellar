import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gateway.lighthouse.storage"
      },
      {
        protocol: "https",
        hostname: "**.ipfs.dweb.link" // Usamos comodín para todos los subdominios IPFS
      },
      {
        protocol: "https",
        hostname: "chocolate-legislative-lamprey-152.mypinata.cloud"
      }
    ],
  },
  /* config options here */
};

export default nextConfig;
