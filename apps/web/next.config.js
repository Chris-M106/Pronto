const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  turbopack: {
    root: path.join(__dirname, '..', '..'),
  },
  images: {
    unoptimized: false,
  },
};

module.exports = nextConfig;
