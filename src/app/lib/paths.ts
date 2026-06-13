// basePath is not auto-applied to plain <a href> / <img src> in static export,
// so every public asset URL must go through this helper.
export const BASE_PATH = '/portafolio';

export const asset = (p: string) => `${BASE_PATH}${p.startsWith('/') ? p : `/${p}`}`;
