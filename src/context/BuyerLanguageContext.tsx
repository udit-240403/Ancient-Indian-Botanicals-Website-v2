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
  languageLabel: string;
}

const BuyerLanguageContext = createContext<BuyerLanguageContextValue | null>(null);

const detectInitialLanguage = (): BuyerLanguage => {
  const stored = window.localStorage.getItem('aib-buyer-language');
  if (stored && BUYER_LANGUAGES.some((item) => item.code === stored)) return stored as BuyerLanguage;
  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith('de')) return 'de';
  if (browserLanguage.startsWith('fr')) return 'fr';
  if (browserLanguage.startsWith('es')) return 'es';
  return 'en';
};

export const BuyerLanguageProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [language, setLanguage] = useState<BuyerLanguage>(detectInitialLanguage);

  useEffect(() => {
    window.localStorage.setItem('aib-buyer-language', language);
    document.documentElement.lang = 'en';
    document.documentElement.dataset.buyerLanguage = language;
  }, [language]);

  const languageLabel = BUYER_LANGUAGES.find((item) => item.code === language)?.label ?? 'English';
  const value = useMemo(() => ({ language, setLanguage, languageLabel }), [language, languageLabel]);

  return <BuyerLanguageContext.Provider value={value}>{children}</BuyerLanguageContext.Provider>;
};

export const useBuyerLanguage = () => {
  const context = useContext(BuyerLanguageContext);
  if (!context) throw new Error('useBuyerLanguage must be used inside BuyerLanguageProvider');
  return context;
};
