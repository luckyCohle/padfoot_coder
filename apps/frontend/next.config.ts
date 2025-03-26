import MiniCssExtractPlugin from "mini-css-extract-plugin";

/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  webpack: (config: { plugins: any[]; }, { isServer }: any) => {
    if (!isServer) {
      config.plugins.push(new MiniCssExtractPlugin());
    }
    return config;
  },
};

module.exports = nextConfig;
