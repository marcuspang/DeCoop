/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    INFURA_API_KEY: process.env.INFURA_API_KEY,
  },
};

module.exports = nextConfig;
