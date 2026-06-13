'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Locale, DEFAULT_LOCALE, STORAGE_KEY, detectLocale } from './config';
import { translations, Translation } from './translations';

interface LanguageContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  // Always start from DEFAULT_LOCALE so the client matches the statically
  // prerendered HTML (no hydration mismatch); switch after mount if needed.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  useEffect(() => {
    const stored = (typeof localStorage !== 'undefined'
      ? (localStorage.getItem(STORAGE_KEY) as Locale | null)
      : null);
    const initial = stored && (stored === 'en' || stored === 'es') ? stored : detectLocale();
    if (initial !== locale) setLocaleState(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, next);
  };

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t: translations[locale] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
};
