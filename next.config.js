/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gateway.lighthouse.storage"
      },
      {
        protocol: "https",
        hostname: "**.ipfs.dweb.link"
      },
      {
        protocol: "https",
        hostname: "chocolate-legislative-lamprey-152.mypinata.cloud"
      }
    ],
  },
  reactStrictMode: true,
  // Nueva configuración para paquetes externos
  serverExternalPackages: [
    'sodium-native',
    '@stellar/stellar-sdk',
    'require-addon'
  ],
  webpack: (config) => {
    config.externals.push({
      'sodium-native': 'commonjs sodium-native'
    });
    return config;
  }
};

module.exports = nextConfig;