import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock3, X } from 'lucide-react';
import { B2BQuoteRequest } from '../types';
import { useModalAccessibility } from '../hooks/useModalAccessibility';
import { useBuyerLanguage } from '../context/BuyerLanguageContext';

interface QuoteFormModalProps {
  initialProductName?: string;
  onClose: () => void;
}

const inputClassName =
  'w-full rounded-lg border border-[#d7c6a5] bg-white px-4 py-3 text-sm text-[#16352d] outline-none transition placeholder:text-[#7b817b] focus:border-[#b88a2c] focus:ring-2 focus:ring-[#b88a2c]/15';

const labelClassName =
  'mb-1.5 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#50685f]';

export const QuoteFormModal: React.FC<QuoteFormModalProps> = ({
  initialProductName = '',
  onClose,
}) => {
  const { language } = useBuyerLanguage();
  const copy = {
    en: { eyebrow: 'About one minute', title: 'Tell us what you need.', intro: 'A short brief is enough. We will confirm specifications, packaging and documents with you.', close: 'Close enquiry form', received: 'Enquiry received', finalStep: 'One final step', thanks: 'Thank you. We will review your requirement.', prepared: 'Please send the prepared email.', sentLead: 'Our trade desk will reply to', sentTail: 'to confirm the right product, specification and next steps.', reference: 'Reference', fallback: 'Direct submission is temporarily unavailable. Your details are ready in an email addressed to our sales desk.', openEmail: 'Open prepared email', return: 'Return to website', website: 'Company website', basicsStrong: 'Start with the basics.', basics: 'Grade, testing, private-label and export paperwork can be decided after we understand your requirement.', required: 'Please add your name, company, email and product requirement.', consentError: 'Please confirm that we may contact you about this enquiry.', name: 'Your name *', namePlaceholder: 'Full name', company: 'Company *', companyPlaceholder: 'Company name', email: 'Work email *', phone: 'Phone / WhatsApp', optional: '(optional)', phonePlaceholder: 'Country code and number', product: 'Product or requirement *', productPlaceholder: 'e.g. Ashwagandha powder, peppermint oil or private-label packaging', quantity: 'Approximate quantity', destination: 'Destination', destinationPlaceholder: 'Country or port', notes: 'Anything else?', notesPlaceholder: 'Intended use, preferred grade, packaging or documents — only if already known.', consent: 'You may use these details to contact me about this enquiry. This is not an order or payment instruction.', steps: ['1 · We review', '2 · Confirm details', '3 · Share quotation'], sending: 'Sending enquiry…', send: 'Send enquiry', quantities: ['Not sure yet', 'Sample / evaluation', '1–25 kg', '25–100 kg', '100–500 kg', '500 kg–2 MT', 'Above 2 MT'], timeout: 'The secure enquiry service did not respond in time.' },
    de: { eyebrow: 'Etwa eine Minute', title: 'Sagen Sie uns, was Sie benötigen.', intro: 'Ein kurzer Brief genügt. Wir bestätigen Spezifikation, Verpackung und Dokumente mit Ihnen.', close: 'Anfrageformular schließen', received: 'Anfrage erhalten', finalStep: 'Ein letzter Schritt', thanks: 'Vielen Dank. Wir prüfen Ihre Anforderung.', prepared: 'Bitte senden Sie die vorbereitete E-Mail.', sentLead: 'Unser Handelsdesk antwortet an', sentTail: 'und bestätigt Produkt, Spezifikation und nächste Schritte.', reference: 'Referenz', fallback: 'Die direkte Übermittlung ist vorübergehend nicht verfügbar. Ihre Angaben sind in einer E-Mail an unseren Vertrieb vorbereitet.', openEmail: 'Vorbereitete E-Mail öffnen', return: 'Zur Website zurückkehren', website: 'Unternehmenswebsite', basicsStrong: 'Beginnen Sie mit den Grundlagen.', basics: 'Qualität, Prüfung, Private Label und Exportdokumente können nach Prüfung Ihres Bedarfs festgelegt werden.', required: 'Bitte geben Sie Name, Unternehmen, E-Mail und Produktbedarf an.', consentError: 'Bitte bestätigen Sie, dass wir Sie zu dieser Anfrage kontaktieren dürfen.', name: 'Ihr Name *', namePlaceholder: 'Vollständiger Name', company: 'Unternehmen *', companyPlaceholder: 'Unternehmensname', email: 'Geschäftliche E-Mail *', phone: 'Telefon / WhatsApp', optional: '(optional)', phonePlaceholder: 'Ländervorwahl und Nummer', product: 'Produkt oder Anforderung *', productPlaceholder: 'z. B. Ashwagandha-Pulver, Pfefferminzöl oder Private-Label-Verpackung', quantity: 'Ungefähre Menge', destination: 'Zielland', destinationPlaceholder: 'Land oder Hafen', notes: 'Weitere Angaben?', notesPlaceholder: 'Anwendung, gewünschte Qualität, Verpackung oder Dokumente — nur sofern bekannt.', consent: 'Sie dürfen diese Angaben verwenden, um mich zu dieser Anfrage zu kontaktieren. Dies ist keine Bestellung oder Zahlungsanweisung.', steps: ['1 · Wir prüfen', '2 · Details bestätigen', '3 · Angebot senden'], sending: 'Anfrage wird gesendet…', send: 'Anfrage senden', quantities: ['Noch nicht sicher', 'Muster / Bewertung', '1–25 kg', '25–100 kg', '100–500 kg', '500 kg–2 MT', 'Über 2 MT'], timeout: 'Der sichere Anfragedienst hat nicht rechtzeitig geantwortet.' },
    fr: { eyebrow: 'Environ une minute', title: 'Indiquez-nous votre besoin.', intro: 'Un bref descriptif suffit. Nous confirmerons avec vous les spécifications, l’emballage et les documents.', close: 'Fermer le formulaire de demande', received: 'Demande reçue', finalStep: 'Une dernière étape', thanks: 'Merci. Nous allons examiner votre besoin.', prepared: 'Veuillez envoyer l’e-mail préparé.', sentLead: 'Notre service commercial répondra à', sentTail: 'pour confirmer le produit, la spécification et les prochaines étapes.', reference: 'Référence', fallback: 'L’envoi direct est temporairement indisponible. Vos informations sont prêtes dans un e-mail adressé à notre service commercial.', openEmail: 'Ouvrir l’e-mail préparé', return: 'Retour au site', website: 'Site de l’entreprise', basicsStrong: 'Commencez par l’essentiel.', basics: 'Qualité, analyses, marque privée et documents export seront définis après compréhension de votre besoin.', required: 'Veuillez indiquer votre nom, entreprise, e-mail et besoin produit.', consentError: 'Veuillez confirmer que nous pouvons vous contacter au sujet de cette demande.', name: 'Votre nom *', namePlaceholder: 'Nom complet', company: 'Entreprise *', companyPlaceholder: 'Nom de l’entreprise', email: 'E-mail professionnel *', phone: 'Téléphone / WhatsApp', optional: '(facultatif)', phonePlaceholder: 'Indicatif pays et numéro', product: 'Produit ou besoin *', productPlaceholder: 'ex. poudre d’ashwagandha, huile de menthe poivrée ou emballage marque privée', quantity: 'Quantité approximative', destination: 'Destination', destinationPlaceholder: 'Pays ou port', notes: 'Autres précisions ?', notesPlaceholder: 'Usage, qualité, emballage ou documents souhaités — uniquement si connus.', consent: 'Vous pouvez utiliser ces informations pour me contacter au sujet de cette demande. Ceci n’est ni une commande ni une instruction de paiement.', steps: ['1 · Nous examinons', '2 · Confirmer les détails', '3 · Partager le devis'], sending: 'Envoi de la demande…', send: 'Envoyer la demande', quantities: ['Pas encore défini', 'Échantillon / évaluation', '1–25 kg', '25–100 kg', '100–500 kg', '500 kg–2 MT', 'Plus de 2 MT'], timeout: 'Le service sécurisé n’a pas répondu à temps.' },
    es: { eyebrow: 'Aproximadamente un minuto', title: 'Cuéntenos qué necesita.', intro: 'Una breve solicitud es suficiente. Confirmaremos con usted especificaciones, embalaje y documentos.', close: 'Cerrar formulario de consulta', received: 'Consulta recibida', finalStep: 'Un último paso', thanks: 'Gracias. Revisaremos su solicitud.', prepared: 'Envíe el correo preparado.', sentLead: 'Nuestra mesa comercial responderá a', sentTail: 'para confirmar el producto, la especificación y los siguientes pasos.', reference: 'Referencia', fallback: 'El envío directo no está disponible temporalmente. Sus datos están preparados en un correo dirigido a ventas.', openEmail: 'Abrir correo preparado', return: 'Volver al sitio', website: 'Sitio web de la empresa', basicsStrong: 'Empiece por lo básico.', basics: 'El grado, los análisis, la marca privada y los documentos de exportación se definirán después de comprender su necesidad.', required: 'Indique su nombre, empresa, correo y producto requerido.', consentError: 'Confirme que podemos contactarle sobre esta consulta.', name: 'Su nombre *', namePlaceholder: 'Nombre completo', company: 'Empresa *', companyPlaceholder: 'Nombre de la empresa', email: 'Correo profesional *', phone: 'Teléfono / WhatsApp', optional: '(opcional)', phonePlaceholder: 'Código de país y número', product: 'Producto o requisito *', productPlaceholder: 'p. ej., polvo de ashwagandha, aceite de menta o embalaje de marca privada', quantity: 'Cantidad aproximada', destination: 'Destino', destinationPlaceholder: 'País o puerto', notes: '¿Algo más?', notesPlaceholder: 'Uso, grado, embalaje o documentos preferidos — solo si ya se conocen.', consent: 'Puede utilizar estos datos para contactarme sobre esta consulta. Esto no es una orden ni una instrucción de pago.', steps: ['1 · Revisamos', '2 · Confirmar detalles', '3 · Compartir cotización'], sending: 'Enviando consulta…', send: 'Enviar consulta', quantities: ['Aún no estoy seguro', 'Muestra / evaluación', '1–25 kg', '25–100 kg', '100–500 kg', '500 kg–2 MT', 'Más de 2 MT'], timeout: 'El servicio seguro no respondió a tiempo.' },
  }[language];
  const [formData, setFormData] = useState<B2BQuoteRequest>({
    fullName: '',
    companyName: '',
    country: '',
    email: '',
    phoneWhatsapp: '',
    selectedProduct: initialProductName,
    preferredForm: '',
    estimatedQuantity: 'Not sure yet',
    applicationUse: '',
    destinationPort: '',
    packagingPreference: '',
    documentationNeeds: [],
    additionalNotes: '',
    consent: false,
  });

  const [submissionStatus, setSubmissionStatus] = useState<
    'idle' | 'sending' | 'sent' | 'fallback'
  >('idle');
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [referenceId, setReferenceId] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [validationError, setValidationError] = useState('');
  const dialogRef = useModalAccessibility(onClose);

  const buildMailtoUrl = () => {
    const subject = `B2B botanical enquiry — ${formData.selectedProduct}`;
    const body = [
      'Hello Ancient Indian Botanicals,',
      '',
      'I would like to discuss the following requirement:',
      `Name: ${formData.fullName}`,
      `Company: ${formData.companyName}`,
      `Business email: ${formData.email}`,
      `Phone / WhatsApp: ${formData.phoneWhatsapp || 'Not provided'}`,
      `Product or requirement: ${formData.selectedProduct}`,
      `Approximate quantity: ${formData.estimatedQuantity}`,
      `Destination: ${formData.destinationPort || 'To be confirmed'}`,
      `Notes: ${formData.additionalNotes || 'None'}`,
      '',
      'Please contact me to confirm the suitable specification, packaging, documentation and quotation.',
    ].join('\n');

    return `mailto:sales@ancientindianbotanicals.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setValidationError('');

    if (!formData.fullName || !formData.companyName || !formData.email || !formData.selectedProduct) {
      setValidationError(copy.required);
      return;
    }

    if (!formData.consent) {
      setValidationError(copy.consentError);
      return;
    }

    setSubmissionStatus('sending');
    setSubmissionMessage('');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, companyWebsite, sourcePath: window.location.pathname }),
        signal: controller.signal,
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.ok !== true) throw new Error(result.error || 'Enquiry service unavailable');
      setReferenceId(typeof result.reference === 'string' ? result.reference : '');
      setSubmissionStatus('sent');
    } catch (error) {
      setSubmissionMessage(error instanceof Error && error.name !== 'AbortError' ? error.message : copy.timeout);
      setSubmissionStatus('fallback');
    } finally {
      window.clearTimeout(timeout);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#071c17]/80 p-3 backdrop-blur-md sm:p-6">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-heading"
        className="relative my-auto max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#c69a40]/55 bg-[#f7f1e5] shadow-[0_28px_90px_rgba(0,0,0,0.4)]"
      >
        <header className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-[#c69a40]/35 bg-[#073b30] px-5 py-5 text-[#fffaf0] sm:px-8">
          <div>
            <div className="mb-1.5 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#d6ad59]">
              <Clock3 className="h-3.5 w-3.5" aria-hidden="true" />
              {copy.eyebrow}
            </div>
            <h2 id="enquiry-heading" className="font-serif text-2xl font-semibold leading-tight sm:text-3xl">
              {copy.title}
            </h2>
            <p className="mt-1 max-w-lg text-xs leading-relaxed text-[#e8dfcf]/80 sm:text-sm">
              {copy.intro}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label={copy.close}
            className="shrink-0 rounded-full border border-white/15 p-2 text-[#e8dfcf] transition hover:border-[#d6ad59] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {submissionStatus === 'sent' || submissionStatus === 'fallback' ? (
          <div className="px-6 py-12 text-center sm:px-10 sm:py-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#b88a2c]/45 bg-white text-[#9d741f] shadow-sm">
              <CheckCircle2 className="h-9 w-9" />
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9d741f]">
              {submissionStatus === 'sent' ? copy.received : copy.finalStep}
            </p>
            <h3 className="mt-2 font-serif text-3xl font-semibold text-[#17362e]">
              {submissionStatus === 'sent'
                ? copy.thanks
                : copy.prepared}
            </h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-[#50685f]">
              {submissionStatus === 'sent'
                ? `${copy.sentLead} ${formData.email} ${copy.sentTail}${referenceId ? ` ${copy.reference}: ${referenceId}.` : ''}`
                : `${submissionMessage || copy.fallback}`}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {submissionStatus === 'fallback' && (
                <a
                  href={buildMailtoUrl()}
                  className="rounded-full bg-[#b88a2c] px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#062b23] transition hover:bg-[#cda348]"
                >
                  {copy.openEmail}
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="rounded-full border border-[#17362e]/25 px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#17362e] transition hover:border-[#17362e]"
              >
                {copy.return}
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} aria-busy={submissionStatus === 'sending'} className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="enquiry-website">{copy.website}</label>
              <input id="enquiry-website" type="text" tabIndex={-1} autoComplete="off" value={companyWebsite} onChange={(event) => setCompanyWebsite(event.target.value)} />
            </div>
            <div className="mb-6 rounded-xl border border-[#d7c6a5] bg-white/70 px-4 py-3 text-sm leading-relaxed text-[#405b52]">
              <strong className="text-[#17362e]">{copy.basicsStrong}</strong> {copy.basics}
            </div>

            {validationError && (
              <p role="alert" className="mb-5 rounded-lg border border-[#a6503c]/35 bg-[#fff4ef] px-4 py-3 text-sm text-[#8b3525]">
                {validationError}
              </p>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="enquiry-name" className={labelClassName}>{copy.name}</label>
                <input
                  id="enquiry-name"
                  data-modal-autofocus
                  type="text"
                  autoComplete="name"
                  required
                  value={formData.fullName}
                  onChange={(event) => setFormData({ ...formData, fullName: event.target.value })}
                  placeholder={copy.namePlaceholder}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="enquiry-company" className={labelClassName}>{copy.company}</label>
                <input
                  id="enquiry-company"
                  type="text"
                  autoComplete="organization"
                  required
                  value={formData.companyName}
                  onChange={(event) => setFormData({ ...formData, companyName: event.target.value })}
                  placeholder={copy.companyPlaceholder}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="enquiry-email" className={labelClassName}>{copy.email}</label>
                <input
                  id="enquiry-email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                  placeholder="name@company.com"
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="enquiry-phone" className={labelClassName}>{copy.phone} <span className="font-normal normal-case tracking-normal">{copy.optional}</span></label>
                <input
                  id="enquiry-phone"
                  type="tel"
                  autoComplete="tel"
                  value={formData.phoneWhatsapp}
                  onChange={(event) => setFormData({ ...formData, phoneWhatsapp: event.target.value })}
                  placeholder={copy.phonePlaceholder}
                  className={inputClassName}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="enquiry-product" className={labelClassName}>{copy.product}</label>
                <input
                  id="enquiry-product"
                  type="text"
                  required
                  value={formData.selectedProduct}
                  onChange={(event) => setFormData({ ...formData, selectedProduct: event.target.value })}
                  placeholder={copy.productPlaceholder}
                  className={inputClassName}
                />
              </div>

              <div>
                <label htmlFor="enquiry-quantity" className={labelClassName}>{copy.quantity}</label>
                <select
                  id="enquiry-quantity"
                  value={formData.estimatedQuantity}
                  onChange={(event) => setFormData({ ...formData, estimatedQuantity: event.target.value })}
                  className={inputClassName}
                >
                  {['Not sure yet', 'Sample / evaluation', '1–25 kg', '25–100 kg', '100–500 kg', '500 kg–2 MT', 'Above 2 MT'].map((value, index) => <option key={value} value={value}>{copy.quantities[index]}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="enquiry-destination" className={labelClassName}>{copy.destination}</label>
                <input
                  id="enquiry-destination"
                  type="text"
                  autoComplete="country-name"
                  value={formData.destinationPort}
                  onChange={(event) => setFormData({ ...formData, destinationPort: event.target.value })}
                  placeholder={copy.destinationPlaceholder}
                  className={inputClassName}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="enquiry-notes" className={labelClassName}>{copy.notes} <span className="font-normal normal-case tracking-normal">{copy.optional}</span></label>
                <textarea
                  id="enquiry-notes"
                  rows={3}
                  value={formData.additionalNotes}
                  onChange={(event) => setFormData({ ...formData, additionalNotes: event.target.value })}
                  placeholder={copy.notesPlaceholder}
                  className={`${inputClassName} resize-y`}
                />
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-[#50685f]">
              <input
                type="checkbox"
                required
                checked={formData.consent}
                onChange={(event) => setFormData({ ...formData, consent: event.target.checked })}
                className="mt-0.5 h-4 w-4 accent-[#a97c24]"
              />
              <span>{copy.consent}</span>
            </label>

            <div className="mt-7 border-t border-[#d7c6a5] pt-5">
              <div className="mb-5 grid grid-cols-3 gap-2 text-center text-[10px] font-bold uppercase tracking-[0.11em] text-[#60766e]">
                {copy.steps.map((step) => <span key={step}>{step}</span>)}
              </div>

              <button
                type="submit"
                disabled={submissionStatus === 'sending'}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#b88a2c] px-8 py-4 text-xs font-bold uppercase tracking-[0.16em] text-[#062b23] shadow-[0_10px_30px_rgba(184,138,44,0.2)] transition hover:-translate-y-0.5 hover:bg-[#cda348] disabled:cursor-wait disabled:opacity-60 sm:ml-auto sm:w-auto"
              >
                {submissionStatus === 'sending' ? copy.sending : copy.send}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
