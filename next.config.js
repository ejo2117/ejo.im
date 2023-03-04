/** @type {import('next').NextConfig} */
const path = require("path");
const nextConfig = {
  sassOptions: {
    includePaths: [path.resolve(__dirname, "src/app")],
    prependData: `@import 'variables.scss';`,
  },
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;
