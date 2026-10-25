import React from 'react';
import { Languages } from 'lucide-react';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

const NOTICE = {
  de: {
    title: 'KI-gestützte Übersetzung',
    body: 'Diese Fassung dient der Orientierung. Für Spezifikationen, Angebote, Verträge und Rechtsauslegung ist die englische Fassung maßgeblich.',
  },
  fr: {
    title: 'Traduction préparée avec l’IA',
    body: 'Cette version facilite la lecture. La version anglaise prévaut pour les spécifications, devis, contrats et l’interprétation juridique.',
  },
  es: {
    title: 'Traducción preparada con IA',
    body: 'Esta versión facilita la lectura. La versión inglesa prevalece para especificaciones, cotizaciones, contratos e interpretación jurídica.',
  },
};

export const BuyerTranslationNotice: React.FC = () => {
  const { language } = useBuyerLanguage();
  if (language === 'en') return null;
  const notice = NOTICE[language];

  return (
    <aside className="border-b border-[#b88a2c]/30 bg-[#efe5cc] px-4 py-2.5 text-[#24352f] md:px-8" role="note">
      <div className="mx-auto flex max-w-[1440px] items-start gap-2.5 text-[10px] leading-relaxed sm:text-[11px]">
        <Languages className="mt-0.5 h-4 w-4 shrink-0 text-[#8f6224]" />
        <p><strong className="mr-1.5 font-bold uppercase tracking-[0.08em] text-[#173f34]">{notice.title}.</strong>{notice.body}</p>
      </div>
    </aside>
  );
};
