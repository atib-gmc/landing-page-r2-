/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-d7a73e6000ba49538bb3449e97697686.r2.dev',
        pathname: '/**',
      },
      // Kamu bisa tambahkan yang lain di sini
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },
};

export default nextConfig;