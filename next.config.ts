import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Ignora los errores de ESLint al hacer next build
    ignoreDuringBuilds: true,
  },
  output: 'export',
  basePath: '/portafolio',
  assetPrefix: '/portafolio',
  images: {
    unoptimized: true, // para evitar errores con imágenes en export
  },
  trailingSlash: true,
  // Añadir el manejo de rutas estáticas
  distDir: 'out',
  cleanDistDir: true,
  // Especificar una ruta pública estática 
  publicRuntimeConfig: {
    staticFolder: '/portafolio',
  },
  
};

export default nextConfig;
