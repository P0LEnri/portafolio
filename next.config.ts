import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Ignora los errores de ESLint al hacer next build
    ignoreDuringBuilds: true,
  },
  
};

export default nextConfig;
