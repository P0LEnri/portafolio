import type { NextConfig } from "next";

// Base path is configurable so the same source can publish to a project
// subpath (e.g. /portafolio) or to the root of a user page (empty string).
// Set NEXT_PUBLIC_BASE_PATH='' for a root deploy; defaults to /portafolio.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '/portafolio';

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Ignora los errores de ESLint al hacer next build
    ignoreDuringBuilds: true,
  },
  output: 'export',
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  images: {
    unoptimized: true, // para evitar errores con imágenes en export
  },
  trailingSlash: true,
  // Añadir el manejo de rutas estáticas
  distDir: 'out',
  cleanDistDir: true,
};

export default nextConfig;
