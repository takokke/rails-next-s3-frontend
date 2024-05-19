/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}`,
      },
    ],    
  },
};

export default nextConfig;
