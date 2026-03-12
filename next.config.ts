/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb', // Set this to 10MB or more for your art files
    },
  },
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
