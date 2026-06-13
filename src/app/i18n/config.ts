export type Locale = 'en' | 'es';

export const LOCALES: Locale[] = ['en', 'es'];
export const DEFAULT_LOCALE: Locale = 'en';
export const STORAGE_KEY = 'preferred-locale';

// Detect the locale from the browser/device; falls back to English.
export const detectLocale = (): Locale => {
  if (typeof navigator === 'undefined') return DEFAULT_LOCALE;
  const lang = (navigator.languages?.[0] || navigator.language || '').toLowerCase();
  return lang.startsWith('es') ? 'es' : 'en';
};
