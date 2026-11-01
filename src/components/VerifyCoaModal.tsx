import React, { useState } from 'react';
import { X, ShieldCheck, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { useModalAccessibility } from '../hooks/useModalAccessibility';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

interface VerifyCoaModalProps {
  onClose: () => void;
  onOpenQuote: (productName?: string) => void;
  initialProductName?: string;
}

export const VerifyCoaModal: React.FC<VerifyCoaModalProps> = ({ onClose, onOpenQuote, initialProductName = '' }) => {
  const { language } = useBuyerLanguage();
  const copy = {
    en: { eyebrow: 'Lot-level document desk', title: 'Request specification or lot documents', close: 'Close document verification form', notice: 'Specifications and COAs are checked against the proposed product or actual supplier lot and shared privately where applicable. We do not present a demonstration COA as a current commercial record.', name: 'Your name *', company: 'Company *', email: 'Business email *', lot: 'Lot / sample reference', lotPlaceholder: 'Reference shown on your sample', product: 'Product name', productPlaceholder: 'e.g. Ashwagandha root powder', consent: 'You may use these details to contact me about this document request.', documents: 'Documents that may be checked where applicable:', documentList: 'COA · botanical identity · marker or GC/MS analysis · contaminant testing · safety data · origin and packing records', received: 'Your document request has been received. Our trade desk will reply after checking the proposed product or lot reference.', prepared: 'Open the prepared email instead.', noReference: 'No lot reference? Start a general enquiry', sending: 'Sending request…', sent: 'Request received', send: 'Send document request', missing: 'Please enter a lot reference or product name.', consentError: 'Please confirm that we may contact you about this request.', timeout: 'The secure enquiry service did not respond in time.', website: 'Company website' },
    de: { eyebrow: 'Desk für Chargendokumente', title: 'Spezifikation oder Chargendokumente anfordern', close: 'Formular zur Dokumentenprüfung schließen', notice: 'Spezifikationen und COAs werden anhand des vorgeschlagenen Produkts oder der tatsächlichen Lieferantencharge geprüft und gegebenenfalls vertraulich geteilt. Ein Muster-COA wird nicht als aktueller Handelsnachweis dargestellt.', name: 'Ihr Name *', company: 'Unternehmen *', email: 'Geschäftliche E-Mail *', lot: 'Chargen- / Musterreferenz', lotPlaceholder: 'Referenz auf Ihrem Muster', product: 'Produktname', productPlaceholder: 'z. B. Ashwagandha-Wurzelpulver', consent: 'Sie dürfen diese Angaben verwenden, um mich zu dieser Dokumentenanfrage zu kontaktieren.', documents: 'Dokumente, die gegebenenfalls geprüft werden:', documentList: 'COA · botanische Identität · Marker- oder GC/MS-Analyse · Schadstoffprüfung · Sicherheitsdaten · Herkunfts- und Verpackungsnachweise', received: 'Ihre Dokumentenanfrage wurde empfangen. Unser Handelsdesk antwortet nach Prüfung des Produkts oder der Chargenreferenz.', prepared: 'Stattdessen die vorbereitete E-Mail öffnen.', noReference: 'Keine Chargenreferenz? Allgemeine Anfrage starten', sending: 'Anfrage wird gesendet…', sent: 'Anfrage erhalten', send: 'Dokumente anfordern', missing: 'Bitte geben Sie eine Chargenreferenz oder einen Produktnamen ein.', consentError: 'Bitte bestätigen Sie, dass wir Sie zu dieser Anfrage kontaktieren dürfen.', timeout: 'Der sichere Anfragedienst hat nicht rechtzeitig geantwortet.', website: 'Unternehmenswebsite' },
    fr: { eyebrow: 'Service documents par lot', title: 'Demander une spécification ou des documents de lot', close: 'Fermer le formulaire de vérification', notice: 'Les spécifications et COA sont contrôlés par rapport au produit proposé ou au lot réel du fournisseur et partagés de manière confidentielle lorsque pertinent. Un COA de démonstration n’est pas présenté comme document commercial actuel.', name: 'Votre nom *', company: 'Entreprise *', email: 'E-mail professionnel *', lot: 'Référence lot / échantillon', lotPlaceholder: 'Référence indiquée sur votre échantillon', product: 'Nom du produit', productPlaceholder: 'ex. poudre de racine d’ashwagandha', consent: 'Vous pouvez utiliser ces informations pour me contacter au sujet de cette demande documentaire.', documents: 'Documents pouvant être vérifiés selon le cas :', documentList: 'COA · identité botanique · analyse marqueur ou GC/MS · contaminants · données de sécurité · origine et conditionnement', received: 'Votre demande documentaire a été reçue. Notre service commercial répondra après vérification du produit ou du lot.', prepared: 'Ouvrir plutôt l’e-mail préparé.', noReference: 'Pas de référence lot ? Démarrer une demande générale', sending: 'Envoi de la demande…', sent: 'Demande reçue', send: 'Envoyer la demande documentaire', missing: 'Veuillez saisir une référence de lot ou un nom de produit.', consentError: 'Veuillez confirmer que nous pouvons vous contacter au sujet de cette demande.', timeout: 'Le service sécurisé n’a pas répondu à temps.', website: 'Site de l’entreprise' },
    es: { eyebrow: 'Mesa de documentos por lote', title: 'Solicitar especificación o documentos del lote', close: 'Cerrar formulario de verificación', notice: 'Las especificaciones y los COA se verifican con el producto propuesto o el lote real del proveedor y se comparten de forma privada cuando corresponde. No presentamos un COA de demostración como registro comercial actual.', name: 'Su nombre *', company: 'Empresa *', email: 'Correo profesional *', lot: 'Referencia de lote / muestra', lotPlaceholder: 'Referencia indicada en su muestra', product: 'Nombre del producto', productPlaceholder: 'p. ej., polvo de raíz de ashwagandha', consent: 'Puede utilizar estos datos para contactarme sobre esta solicitud de documentos.', documents: 'Documentos que pueden revisarse cuando corresponda:', documentList: 'COA · identidad botánica · análisis de marcador o GC/MS · contaminantes · datos de seguridad · origen y embalaje', received: 'Hemos recibido su solicitud. Nuestra mesa comercial responderá después de verificar el producto o lote.', prepared: 'Abrir el correo preparado.', noReference: '¿Sin referencia de lote? Iniciar una consulta general', sending: 'Enviando solicitud…', sent: 'Solicitud recibida', send: 'Enviar solicitud de documentos', missing: 'Introduzca una referencia de lote o un nombre de producto.', consentError: 'Confirme que podemos contactarle sobre esta solicitud.', timeout: 'El servicio seguro no respondió a tiempo.', website: 'Sitio web de la empresa' },
  }[language];
  const [lotReference, setLotReference] = useState('');
  const [productName, setProductName] = useState(initialProductName);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'fallback'>('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [consent, setConsent] = useState(false);
  const [validationError, setValidationError] = useState('');
  const dialogRef = useModalAccessibility(onClose);

  const buildVerificationEmail = () => {
    const subject = `Lot document verification — ${lotReference.trim() || productName.trim()}`;
    const body = [
      'Hello Ancient Indian Botanicals,', '',
      'Please verify the available documentation for the following material:',
      `Name: ${fullName.trim()}`,
      `Company: ${companyName.trim()}`,
      `Business email: ${email.trim()}`,
      `Lot / reference: ${lotReference.trim() || 'Not available'}`,
      `Product: ${productName.trim() || 'Not specified'}`, '',
      'Please confirm which lot-specific documents are available, such as COA, botanical identity, marker or GC/MS analysis, contaminant testing, safety data and origin records.',
    ].join('\n');
    return `mailto:office@ancientindianbotanicals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const submitVerificationRequest = async (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError('');
    if (!lotReference.trim() && !productName.trim()) {
      setValidationError(copy.missing);
      return;
    }
    if (!consent) {
      setValidationError(copy.consentError);
      return;
    }
    setStatus('sending');
    setStatusMessage('');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          companyName,
          email,
          selectedProduct: `Document request — ${productName.trim() || lotReference.trim()}`,
          additionalNotes: `Lot / sample reference: ${lotReference.trim() || 'Not available'}`,
          documentationNeeds: ['Lot-specific documents', 'COA / specification review'],
          sourcePath: window.location.pathname,
          companyWebsite,
          consent,
        }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'Secure submission is unavailable.');
      setStatus('sent');
    } catch (error) {
      setStatusMessage(error instanceof Error && error.name !== 'AbortError' ? error.message : copy.timeout);
      setStatus('fallback');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="document-request-heading" className="bg-[#062b23] border border-[#b88a2c] text-[#fbf7ed] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative shadow-2xl my-6">
        <div className="sticky top-0 bg-[#083a30] border-b border-[#b88a2c]/40 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#b88a2c]" />
            <div>
              <span className="text-[10px] uppercase tracking-eyebrow text-[#82966f] font-semibold">{copy.eyebrow}</span>
              <h2 id="document-request-heading" className="font-serif text-2xl font-semibold text-[#fbf7ed]">{copy.title}</h2>
            </div>
          </div>
          <button type="button" onClick={onClose} aria-label={copy.close} className="p-2 text-[#82966f] hover:text-[#fbf7ed] transition-colors cursor-pointer">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={submitVerificationRequest} aria-busy={status === 'sending'} className="p-6 md:p-8 space-y-6">
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="document-website">{copy.website}</label>
            <input id="document-website" type="text" tabIndex={-1} autoComplete="off" value={companyWebsite} onChange={(event) => setCompanyWebsite(event.target.value)} />
          </div>
          <div className="p-4 bg-[#083a30] border border-[#b88a2c]/30 text-xs text-[#f2ead9]/90 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#b88a2c] shrink-0 mt-0.5" />
            <p>{copy.notice}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="document-name" className="block text-xs uppercase tracking-eyebrow text-[#82966f] mb-1.5">{copy.name}</label>
              <input id="document-name" data-modal-autofocus required autoComplete="name" type="text" value={fullName} onChange={(event) => setFullName(event.target.value)} className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]" />
            </div>
            <div>
              <label htmlFor="document-company" className="block text-xs uppercase tracking-eyebrow text-[#82966f] mb-1.5">{copy.company}</label>
              <input id="document-company" required autoComplete="organization" type="text" value={companyName} onChange={(event) => setCompanyName(event.target.value)} className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="document-email" className="block text-xs uppercase tracking-eyebrow text-[#82966f] mb-1.5">{copy.email}</label>
              <input id="document-email" required autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]" />
            </div>
            <div>
              <label htmlFor="document-lot-reference" className="block text-xs uppercase tracking-eyebrow text-[#82966f] mb-1.5">{copy.lot}</label>
              <input id="document-lot-reference" type="text" value={lotReference} onChange={(event) => setLotReference(event.target.value)} placeholder={copy.lotPlaceholder} className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]" />
            </div>
            <div>
              <label htmlFor="document-product" className="block text-xs uppercase tracking-eyebrow text-[#82966f] mb-1.5">{copy.product}</label>
              <input id="document-product" type="text" value={productName} onChange={(event) => setProductName(event.target.value)} placeholder={copy.productPlaceholder} className="w-full bg-[#083a30] border border-[#b88a2c]/40 text-xs text-[#fbf7ed] p-3 focus:outline-none focus:border-[#b88a2c]" />
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#f2ead9]/80">
            <input type="checkbox" required checked={consent} onChange={(event) => setConsent(event.target.checked)} className="mt-0.5 h-4 w-4 accent-[#d4a43d]" />
            <span>{copy.consent}</span>
          </label>

          {validationError && <p role="alert" className="border border-[#dc8068]/45 bg-[#321e19] p-3 text-xs text-[#ffd8ce]">{validationError}</p>}

          <div className="p-4 border border-[#b88a2c]/25 text-xs text-[#f2ead9]/80 space-y-2">
            <p className="font-semibold text-[#b88a2c]">{copy.documents}</p>
            <p>{copy.documentList}</p>
          </div>

          {status === 'sent' && (
            <div className="p-4 bg-[#083a30] border border-[#a8c76b]/40 text-xs text-[#f2ead9]/90 flex items-start gap-3" role="status">
              <Mail className="w-5 h-5 text-[#a8c76b] shrink-0" />
              <p>{copy.received} {email}</p>
            </div>
          )}
          {status === 'fallback' && (
            <div className="p-4 bg-[#083a30] border border-[#d4a43d]/40 text-xs text-[#f2ead9]/90 flex items-start gap-3" role="alert">
              <Mail className="w-5 h-5 text-[#d4a43d] shrink-0" />
              <p>{statusMessage} <a href={buildVerificationEmail()} className="font-bold text-[#d4a43d] underline">{copy.prepared}</a></p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2 border-t border-[#b88a2c]/25">
            <button type="button" onClick={() => { onClose(); onOpenQuote(productName || 'Lot-specific documentation request'); }} className="text-xs text-[#f2ead9]/85 hover:text-[#b88a2c] transition-colors cursor-pointer">
              {copy.noReference}
            </button>
            <button type="submit" disabled={status === 'sending' || status === 'sent'} className="bg-[#b88a2c] hover:bg-[#967020] disabled:cursor-wait disabled:opacity-60 text-[#062b23] font-bold text-xs uppercase tracking-eyebrow px-6 py-3 flex items-center justify-center gap-2 cursor-pointer">
              <span>{status === 'sending' ? copy.sending : status === 'sent' ? copy.sent : copy.send}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
