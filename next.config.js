/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode : true,
  swcMinify : true,
  env : {
    INFURA_API_KEY : process.env.INFURA_API_KEY,
    COMMUNITY_FACTORY : process.env.COMMUNITY_FACTORY,
  },
};

module.exports = nextConfig;
