/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          'bafybeifgvjz7fx7q7ubbbos32ffliiu7c7lsykcsdkvcmitjfkt3gksvge.ipfs.dweb.link',
          'chocolate-legislative-lamprey-152.mypinata.cloud', // Agrega el nuevo dominio aquí
          'http://bafybeifwsboe5yzko55vjtw4r5mlg6dxry6vi4wnkaetrfbukwz3cc3jx4.ipfs.dweb.link/',
        ],
      },
      reactStrictMode: true,
}

module.exports = nextConfig
