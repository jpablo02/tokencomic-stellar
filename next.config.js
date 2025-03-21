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
        hostname: "**.ipfs.dweb.link" // Usamos comodín para todos los subdominios IPFS
      },
      {
        protocol: "https",
        hostname: "chocolate-legislative-lamprey-152.mypinata.cloud"
      }
    ],
  },
  reactStrictMode: true,
  // Agrega esto para el error de módulos ESM
  experimental: {
    esmExternals: 'loose' // o 'true' si 'loose' no funciona
  }
}

module.exports = nextConfig