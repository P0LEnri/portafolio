// basePath is not auto-applied to plain <a href> / <img src> in static export,
// so every public asset URL must go through this helper. Kept in sync with
// next.config.ts via NEXT_PUBLIC_BASE_PATH (empty string = root deploy).
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '/portafolio';

export const asset = (p: string) => `${BASE_PATH}${p.startsWith('/') ? p : `/${p}`}`;
