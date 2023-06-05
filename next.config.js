/** @type {import('next').NextConfig} */
const path = require("path");
const withMDX = require('@next/mdx')({
	extension: /\.mdx?$/,
})
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  sassOptions: {
    includePaths: [path.resolve(__dirname, "src/app")],
    prependData: `@import 'variables.scss';`,
  },
  experimental: {
    appDir: true,
    mdxRs: true,
  },
};

module.exports = withMDX(nextConfig);
