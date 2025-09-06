import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: {
    buildActivity: true,
    buildActivityPosition: 'top-right', // or 'top-left', 'bottom-left', 'bottom-right'
  },
};

export default nextConfig;
