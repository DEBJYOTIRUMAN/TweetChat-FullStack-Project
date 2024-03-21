/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tweetchat-1y3f.onrender.com',
        pathname: '**',
      },
    ],
  },
};
