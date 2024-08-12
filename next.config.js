/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'bafybeihv6rzseuad62u67gtsihwwlx6mhia22cxudc3i7xia4gka4mzaxi.ipfs.dweb.link', // Añade este dominio
      'bafybeiexjn4b7ewg2a7embuyrfooxqk7nsbkds3chcbqdgxkz3gbbybmuq.ipfs.dweb.link', // Añade este dominio
      'chocolate-legislative-lamprey-152.mypinata.cloud',
      'bafybeifgvjz7fx7q7ubbbos32ffliiu7c7lsykcsdkvcmitjfkt3gksvge.ipfs.dweb.link',
      // Agrega otros dominios si es necesario
    ],
  },
  reactStrictMode: true,
}

module.exports = nextConfig
