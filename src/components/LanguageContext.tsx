'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TRANSLATIONS } from '@/data/translations';

type Language = 'NL' | 'EN';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('NL');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Sync language from localStorage on client mount
    const savedLang = localStorage.getItem('app_lang') as Language;
    if (savedLang === 'NL' || savedLang === 'EN') {
      setLanguageState(savedLang);
    } else {
      // Intelligent browser language fallback
      const browserLang = navigator.language.substring(0, 2).toUpperCase();
      if (browserLang === 'EN') {
        setLanguageState('EN');
      }
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('app_lang', lang);
  };

  const t = (key: string): string => {
    const keys = key.split('.');
    let current: any = TRANSLATIONS[language];

    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        // Fallback to Dutch key if the language is English and translation is missing
        let nlFallback: any = TRANSLATIONS['NL'];
        for (const fallbackK of keys) {
          if (nlFallback && typeof nlFallback === 'object' && fallbackK in nlFallback) {
            nlFallback = nlFallback[fallbackK];
          } else {
            nlFallback = null;
            break;
          }
        }
        return typeof nlFallback === 'string' ? nlFallback : key;
      }
    }

    return typeof current === 'string' ? current : key;
  };

  // Prevent hydration mismatch by holding rendering or providing standard attributes
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
