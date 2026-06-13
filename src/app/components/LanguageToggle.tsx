'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { LOCALES, Locale } from '@/app/i18n/config';
import { useLanguage } from '@/app/i18n/LanguageProvider';

const LanguageToggle = () => {
  const { locale, setLocale } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="fixed top-6 left-6 z-50 flex items-center gap-1 p-1 rounded-full
        bg-gradient-to-r from-white/10 to-white/5 border border-white/10 backdrop-blur-md shadow-lg"
    >
      <span className="pl-2 pr-1 text-white/50" aria-hidden>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18zm0 0c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3M3.6 9h16.8M3.6 15h16.8" />
        </svg>
      </span>
      {LOCALES.map((l: Locale) => (
        <button
          key={l}
          onClick={() => setLocale(l)}
          aria-label={l === 'es' ? 'Cambiar a español' : 'Switch to English'}
          aria-pressed={locale === l}
          className={`relative px-2.5 py-1 text-xs font-semibold uppercase rounded-full transition-colors duration-300 ${
            locale === l ? 'text-white' : 'text-white/50 hover:text-white'
          }`}
        >
          {locale === l && (
            <motion.span
              layoutId="lang-pill"
              className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/40 to-violet-500/40 border border-indigo-400/40"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">{l}</span>
        </button>
      ))}
    </motion.div>
  );
};

export default LanguageToggle;
