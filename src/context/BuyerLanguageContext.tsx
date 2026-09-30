import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type BuyerLanguage = 'en' | 'de' | 'fr' | 'es';

export const BUYER_LANGUAGES: Array<{ code: BuyerLanguage; shortLabel: string; label: string }> = [
  { code: 'en', shortLabel: 'EN', label: 'English' },
  { code: 'de', shortLabel: 'DE', label: 'Deutsch' },
  { code: 'fr', shortLabel: 'FR', label: 'Français' },
  { code: 'es', shortLabel: 'ES', label: 'Español' },
];

interface BuyerLanguageContextValue {
  language: BuyerLanguage;
  setLanguage: (language: BuyerLanguage) => void;
}

const BuyerLanguageContext = createContext<BuyerLanguageContextValue | null>(null);

const detectInitialLanguage = (): BuyerLanguage => {
  if (typeof window === 'undefined') return 'en';

  const stored = window.localStorage.getItem('aib-buyer-language');
  if (stored && BUYER_LANGUAGES.some((language) => language.code === stored)) {
    return stored as BuyerLanguage;
  }

  const browserLanguage = window.navigator.language.toLowerCase().split('-')[0];
  return BUYER_LANGUAGES.some((language) => language.code === browserLanguage)
    ? (browserLanguage as BuyerLanguage)
    : 'en';
};

export const BuyerLanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<BuyerLanguage>(detectInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem('aib-buyer-language', language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <BuyerLanguageContext.Provider value={value}>{children}</BuyerLanguageContext.Provider>;
};

export const useBuyerLanguage = () => {
  const context = useContext(BuyerLanguageContext);
  if (!context) throw new Error('useBuyerLanguage must be used inside BuyerLanguageProvider');
  return context;
};
