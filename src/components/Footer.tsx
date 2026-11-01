import React from 'react';
import { MapPin, Mail, Phone, ShieldCheck, ArrowRight, Linkedin } from 'lucide-react';
import { PAGE_ROUTES } from '../siteRoutes';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  openQuoteModal: (productName?: string) => void;
  openCoaModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  setActiveTab,
  openQuoteModal,
  openCoaModal
}) => {
  const { language } = useBuyerLanguage();
  const copy = {
    en: {
      tagline: 'Pure Botanical Sourcing',
      description: 'Connecting buyer specifications with suitable Indian botanical, aromatic and food-ingredient supply routes. Lot-level documentation coordination, transparent communication and export support.',
      meaning: '— May all be free from illness.', catalogue: 'Catalogue Routes',
      routes: ['Complete Product Catalogue', 'International & Common Names', 'Standardized Botanical Extracts', 'Essential Oils & Accords', 'Indian Botanicals, Herbs & Roots', 'Seeds, Nuts & Food Ingredients', 'Export Packaging Options', 'Quality Assurance & Testing', 'Company Verification', 'About Our Sourcing House', 'Contact the Trade Desk', 'Buyer Due-Diligence FAQ'],
      desk: 'Verification & Desk', requestDocs: 'Request Lot Documents', requestQuote: 'Request B2B Quote', commercialTerms: 'Commercial Terms',
      hub: 'Indian Trade Hub', region: 'Mandsaur–Neemuch sourcing region, Madhya Pradesh, India', contact: 'Email-first trade desk · direct call or WhatsApp arranged after brief review.', linkedin: 'Ancient Indian Botanicals on LinkedIn',
      noticeLabel: 'Commercial notice:', notice: 'Ancient Indian Botanicals Private Limited is incorporated in India and maintains GST, Udyam, IEC, APEDA RCMC, ICEGATE and ISO 9001:2015 credentials. Product information is supplied for commercial evaluation and does not constitute therapeutic claims or medical advice. Specifications, origin, availability, certifications and supporting documents are confirmed in writing for each approved lot and enquiry.',
      rights: 'All rights reserved.', legal: ['Terms of Trade', 'Export Shipping Policy', 'Privacy Policy', 'Claims & Quality Resolution', 'Buyer FAQ'],
      logoAlt: 'Ancient Indian Botanicals official circular botanical emblem',
    },
    de: {
      tagline: 'Reine botanische Beschaffung',
      description: 'Wir verbinden Käuferspezifikationen mit geeigneten indischen Lieferwegen für botanische, aromatische und Lebensmittelzutaten. Chargendokumentation, transparente Kommunikation und Exportunterstützung.',
      meaning: '— Mögen alle frei von Krankheit sein.', catalogue: 'Katalogrouten',
      routes: ['Vollständiger Produktkatalog', 'Internationale & gebräuchliche Namen', 'Standardisierte Pflanzenextrakte', 'Ätherische Öle & Aromaqualitäten', 'Indische Botanicals, Kräuter & Wurzeln', 'Saaten, Nüsse & Lebensmittelzutaten', 'Exportverpackungen', 'Qualitätssicherung & Prüfung', 'Unternehmensverifizierung', 'Über unser Beschaffungshaus', 'Handelsdesk kontaktieren', 'Käufer-Due-Diligence-FAQ'],
      desk: 'Verifizierung & Desk', requestDocs: 'Chargendokumente anfordern', requestQuote: 'B2B-Angebot anfordern', commercialTerms: 'Handelsbedingungen',
      hub: 'Indischer Handelsknoten', region: 'Beschaffungsregion Mandsaur–Neemuch, Madhya Pradesh, Indien', contact: 'E-Mail-orientierter Handelsdesk · direkter Anruf oder WhatsApp nach Prüfung des Briefs.', linkedin: 'Ancient Indian Botanicals auf LinkedIn',
      noticeLabel: 'Handelshinweis:', notice: 'Ancient Indian Botanicals Private Limited ist in Indien eingetragen und verfügt über GST-, Udyam-, IEC-, APEDA-RCMC-, ICEGATE- und ISO-9001:2015-Nachweise. Produktinformationen dienen der geschäftlichen Bewertung und sind keine therapeutischen oder medizinischen Aussagen. Spezifikationen, Herkunft, Verfügbarkeit, Zertifizierungen und Belege werden für jede freigegebene Charge und Anfrage schriftlich bestätigt.',
      rights: 'Alle Rechte vorbehalten.', legal: ['Handelsbedingungen', 'Exportversandrichtlinie', 'Datenschutzrichtlinie', 'Reklamations- & Qualitätslösung', 'Käufer-FAQ'],
      logoAlt: 'Offizielles kreisförmiges botanisches Emblem von Ancient Indian Botanicals',
    },
    fr: {
      tagline: 'Sourcing botanique pur',
      description: 'Nous relions les spécifications acheteur aux filières indiennes adaptées pour ingrédients botaniques, aromatiques et alimentaires. Coordination documentaire par lot, communication transparente et appui export.',
      meaning: '— Que tous soient libérés de la maladie.', catalogue: 'Filières du catalogue',
      routes: ['Catalogue produits complet', 'Noms internationaux & usuels', 'Extraits botaniques standardisés', 'Huiles essentielles & qualités aromatiques', 'Botaniques, plantes & racines indiennes', 'Graines, noix & ingrédients alimentaires', 'Options d’emballage export', 'Assurance qualité & analyses', 'Vérification de l’entreprise', 'À propos de notre maison de sourcing', 'Contacter le service commercial', 'FAQ de diligence acheteur'],
      desk: 'Vérification & service', requestDocs: 'Demander les documents du lot', requestQuote: 'Demander un devis B2B', commercialTerms: 'Conditions commerciales',
      hub: 'Pôle commercial indien', region: 'Région de sourcing Mandsaur–Neemuch, Madhya Pradesh, Inde', contact: 'Service commercial prioritairement par e-mail · appel direct ou WhatsApp après examen du brief.', linkedin: 'Ancient Indian Botanicals sur LinkedIn',
      noticeLabel: 'Avis commercial :', notice: 'Ancient Indian Botanicals Private Limited est constituée en Inde et détient les références GST, Udyam, IEC, APEDA RCMC, ICEGATE et ISO 9001:2015. Les informations produits servent à l’évaluation commerciale et ne constituent ni allégations thérapeutiques ni conseils médicaux. Spécifications, origine, disponibilité, certifications et documents sont confirmés par écrit pour chaque lot et demande approuvés.',
      rights: 'Tous droits réservés.', legal: ['Conditions commerciales', 'Politique d’expédition export', 'Politique de confidentialité', 'Réclamations & résolution qualité', 'FAQ acheteur'],
      logoAlt: 'Emblème botanique circulaire officiel d’Ancient Indian Botanicals',
    },
    es: {
      tagline: 'Abastecimiento botánico puro',
      description: 'Conectamos las especificaciones del comprador con rutas indias adecuadas de ingredientes botánicos, aromáticos y alimentarios. Coordinación documental por lote, comunicación transparente y apoyo a la exportación.',
      meaning: '— Que todos estén libres de enfermedad.', catalogue: 'Rutas del catálogo',
      routes: ['Catálogo completo de productos', 'Nombres internacionales y comunes', 'Extractos botánicos estandarizados', 'Aceites esenciales y grados aromáticos', 'Botánicos, hierbas y raíces de India', 'Semillas, frutos secos e ingredientes alimentarios', 'Opciones de embalaje de exportación', 'Aseguramiento de calidad y análisis', 'Verificación de la empresa', 'Sobre nuestra casa de abastecimiento', 'Contactar con la mesa comercial', 'Preguntas de diligencia del comprador'],
      desk: 'Verificación y mesa', requestDocs: 'Solicitar documentos del lote', requestQuote: 'Solicitar cotización B2B', commercialTerms: 'Condiciones comerciales',
      hub: 'Centro comercial de India', region: 'Región de abastecimiento Mandsaur–Neemuch, Madhya Pradesh, India', contact: 'Mesa comercial prioritaria por correo · llamada directa o WhatsApp tras revisar la solicitud.', linkedin: 'Ancient Indian Botanicals en LinkedIn',
      noticeLabel: 'Aviso comercial:', notice: 'Ancient Indian Botanicals Private Limited está constituida en India y mantiene credenciales GST, Udyam, IEC, APEDA RCMC, ICEGATE e ISO 9001:2015. La información de productos se facilita para evaluación comercial y no constituye afirmaciones terapéuticas ni asesoramiento médico. Las especificaciones, el origen, la disponibilidad, las certificaciones y los documentos se confirman por escrito para cada lote y consulta aprobados.',
      rights: 'Todos los derechos reservados.', legal: ['Condiciones comerciales', 'Política de envíos de exportación', 'Política de privacidad', 'Reclamaciones y resolución de calidad', 'FAQ del comprador'],
      logoAlt: 'Emblema botánico circular oficial de Ancient Indian Botanicals',
    },
  }[language];

  const handleNav = (event: React.MouseEvent<HTMLAnchorElement>, tab: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#031a15] text-[#fbf7ed] border-t border-[#b88a2c]/25 pt-20 pb-10">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-14">
          
          {/* Col 1: Brand & Provenance Statement (2 Cols wide on LG) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-[#d4a43d] bg-[#f4efd3] p-1.5 shadow-[0_8px_28px_rgba(0,0,0,.28)]">
                <img
                  src="/assets/images/aib-official-logo.webp"
                  alt={copy.logoAlt}
                  width="512"
                  height="512"
                  onError={(event) => { event.currentTarget.src = '/assets/images/aib-official-symbol.webp'; }}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
              <div>
                <span className="block font-serif text-xl font-semibold text-[#fbf7ed]">
                  Ancient Indian Botanicals Private Limited
                </span>
                <span className="block text-[10px] tracking-eyebrow uppercase text-[#82966f]">
                  {copy.tagline}
                </span>
              </div>
            </div>

            <p className="text-xs text-[#f2ead9]/80 font-light leading-relaxed max-w-sm">
              {copy.description}
            </p>

            <div className="flex items-center gap-2 text-xs text-[#b88a2c] font-serif pt-1">
              <span>सर्वे सन्तु निरामयाः</span>
              <span className="text-[#7f7b6f] font-sans text-[11px]">{copy.meaning}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#b88a2c] border-b border-[#b88a2c]/20 pb-1">
              {copy.catalogue}
            </h4>
            <ul className="space-y-2 text-xs uppercase tracking-eyebrow font-medium text-[#f2ead9]/80">
              <li>
                <a href={PAGE_ROUTES.catalogue} onClick={(event) => handleNav(event, 'catalogue')} className="text-[#b88a2c] hover:text-[#fbf7ed] transition-colors">
                  {copy.routes[0]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES['international-product-names']} onClick={(event) => handleNav(event, 'international-product-names')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[1]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES['standardized-extracts']} onClick={(event) => handleNav(event, 'standardized-extracts')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[2]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES['essential-oils']} onClick={(event) => handleNav(event, 'essential-oils')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[3]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.botanicals} onClick={(event) => handleNav(event, 'botanicals')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[4]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES['food-ingredients']} onClick={(event) => handleNav(event, 'food-ingredients')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[5]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.packaging} onClick={(event) => handleNav(event, 'packaging')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[6]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.quality} onClick={(event) => handleNav(event, 'quality')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[7]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.verification} onClick={(event) => handleNav(event, 'verification')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[8]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.about} onClick={(event) => handleNav(event, 'about')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[9]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.contact} onClick={(event) => handleNav(event, 'contact')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[10]}
                </a>
              </li>
              <li>
                <a href={PAGE_ROUTES.faq} onClick={(event) => handleNav(event, 'faq')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.routes[11]}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Quality Controls */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#b88a2c] border-b border-[#b88a2c]/20 pb-1">
              {copy.desk}
            </h4>
            <ul className="space-y-2 text-xs font-medium text-[#f2ead9]/80">
              <li>
                <button onClick={openCoaModal} className="hover:text-[#b88a2c] transition-colors flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#b88a2c]" />
                  <span>{copy.requestDocs}</span>
                </button>
              </li>
              <li>
                <button onClick={() => openQuoteModal()} className="hover:text-[#b88a2c] transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-[#b88a2c]" />
                  <span>{copy.requestQuote}</span>
                </button>
              </li>
              <li>
                <a href={PAGE_ROUTES.payments} onClick={(event) => handleNav(event, 'payments')} className="hover:text-[#b88a2c] transition-colors">
                  {copy.commercialTerms}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Trade Desk & Hub */}
          <div className="space-y-3">
            <h4 className="font-serif text-lg font-semibold text-[#b88a2c] border-b border-[#b88a2c]/20 pb-1">
              {copy.hub}
            </h4>
            <div className="space-y-2 text-xs text-[#f2ead9]/80 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#b88a2c] shrink-0 mt-0.5" />
                <span>{copy.region}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#b88a2c] shrink-0" />
                <div className="space-y-1 font-mono text-[10px]"><a href="mailto:sales@ancientindianbotanicals.com" className="block hover:text-[#b88a2c]">sales@ancientindianbotanicals.com</a><a href="mailto:office@ancientindianbotanicals.com" className="block hover:text-[#b88a2c]">office@ancientindianbotanicals.com</a></div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#b88a2c] shrink-0" />
                <span className="text-[11px] text-[#82966f]">{copy.contact}</span>
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-[#b88a2c] shrink-0" />
                <a href="https://www.linkedin.com/company/ancient-indian-botanicals/" target="_blank" rel="noreferrer" className="text-[11px] hover:text-[#b88a2c]">{copy.linkedin}</a>
              </div>
              <div className="flex items-center gap-2 border-t border-[#b88a2c]/20 pt-2 font-semibold uppercase tracking-[0.12em] text-[#dfcfad]">
                <ShieldCheck className="w-4 h-4 text-[#d4a43d] shrink-0" />
                <span>GST · Udyam · IEC · APEDA RCMC · ISO 9001:2015</span>
              </div>
            </div>
          </div>

        </div>

        {/* Regulatory Disclaimer */}
        <div className="p-5 bg-[#062b23] border border-[#b88a2c]/20 text-[11px] text-[#a9b2ac] font-light leading-relaxed mb-8">
          <strong className="text-[#dfcfad]">{copy.noticeLabel}</strong> {copy.notice}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#b88a2c]/30 text-xs text-[#82966f]">
          <p>© {new Date().getFullYear()} Ancient Indian Botanicals Private Limited. {copy.rights}</p>
          <div className="flex flex-wrap gap-4 text-[11px]">
            <a href={PAGE_ROUTES.terms} onClick={(event) => handleNav(event, 'terms')} className="hover:text-[#fbf7ed]">{copy.legal[0]}</a>
            <a href={PAGE_ROUTES.shipping} onClick={(event) => handleNav(event, 'shipping')} className="hover:text-[#fbf7ed]">{copy.legal[1]}</a>
            <a href={PAGE_ROUTES.privacy} onClick={(event) => handleNav(event, 'privacy')} className="hover:text-[#fbf7ed]">{copy.legal[2]}</a>
            <a href={PAGE_ROUTES.refunds} onClick={(event) => handleNav(event, 'refunds')} className="hover:text-[#fbf7ed]">{copy.legal[3]}</a>
            <a href={PAGE_ROUTES.faq} onClick={(event) => handleNav(event, 'faq')} className="hover:text-[#fbf7ed]">{copy.legal[4]}</a>
          </div>
        </div>

      </div>
    </footer>
  );
};
