import React, { createContext, useContext, useState } from 'react';
import { translations } from '../data/translations';

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    return localStorage.getItem('camper_lang') || 'es';
  });

  const setLanguage = (lang) => {
    if (translations[lang]) {
      setLanguageState(lang);
      localStorage.setItem('camper_lang', lang);
    }
  };

  // Safe nested translation getter
  const t = (path) => {
    const keys = path.split('.');
    let current = translations[language];
    
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Fallback to Spanish, then English, then path itself if missing
        let fallback = translations['es'];
        for (const k of keys) {
          fallback = fallback ? fallback[k] : undefined;
        }
        if (fallback !== undefined) return fallback;
        
        let fallbackEn = translations['en'];
        for (const k of keys) {
          fallbackEn = fallbackEn ? fallbackEn[k] : undefined;
        }
        if (fallbackEn !== undefined) return fallbackEn;

        console.warn(`Translation path "${path}" not found.`);
        return path;
      }
    }
    return current;
  };

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
