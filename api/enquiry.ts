import { ApiRequest, ApiResponse, crmFetch } from './_crm';

const text = (value: unknown, max = 600) => String(value ?? '').trim().slice(0, max);
const html = (value: unknown) => text(value, 2000).replace(/[&<>'"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;',
}[character] ?? character));

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const body = request.body ?? {};
  const fullName = text(body.fullName, 120);
  const companyName = text(body.companyName, 160);
  const email = text(body.email, 180).toLowerCase();
  const product = text(body.selectedProduct, 220);
  const consent = body.consent === true;

  if (text(body.website, 200)) {
    response.status(200).json({ ok: true });
    return;
  }

  if (!fullName || !companyName || !product || !consent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    response.status(400).json({ ok: false, error: 'Please provide the required enquiry details.' });
    return;
  }

  const enquiryRecord = {
    full_name: fullName,
    company_name: companyName,
    business_email: email,
    phone_whatsapp: text(body.phoneWhatsapp, 180),
    product_requirement: product,
    estimated_quantity: text(body.estimatedQuantity, 160) || 'Not sure yet',
    destination: text(body.destinationPort, 220),
    buyer_notes: text(body.additionalNotes, 1800),
    source_path: text(body.sourcePath, 300) || '/',
    status: 'new',
    email_status: 'pending',
    consent_recorded_at: new Date().toISOString(),
  };

  let enquiryId = '';
  try {
    const stored = await crmFetch('enquiries?select=id', {
      method: 'POST',
      headers: { Prefer: 'return=representation' },
      body: JSON.stringify(enquiryRecord),
    });
    if (!stored.ok) throw new Error('Database rejected the enquiry.');
    const records = await stored.json() as Array<{ id?: string }>;
    enquiryId = records[0]?.id ?? '';
    if (!enquiryId) throw new Error('Enquiry reference was not created.');
  } catch {
    response.status(503).json({ ok: false, error: 'The enquiry could not be saved. Please use the prepared email.' });
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL;
  const recipient = process.env.ENQUIRY_RECIPIENT || 'sales@ancientindianbotanicals.com';

  const rows = [
    ['Name', fullName],
    ['Company', companyName],
    ['Business email', email],
    ['Phone / WhatsApp', text(body.phoneWhatsapp, 180) || 'Not provided'],
    ['Product or requirement', product],
    ['Approximate quantity', text(body.estimatedQuantity, 160) || 'Not sure yet'],
    ['Destination', text(body.destinationPort, 220) || 'To be confirmed'],
    ['Buyer notes', text(body.additionalNotes, 1800) || 'None provided'],
  ];

  let notified = false;
  if (resendKey && fromEmail) try {
    const delivery = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${resendKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Ancient Indian Botanicals Website <${fromEmail}>`,
        to: [recipient],
        reply_to: email,
        subject: `New enquiry — ${product} — ${companyName}`,
        html: `<div style="font-family:Arial,sans-serif;color:#17231e;max-width:720px"><p style="color:#967020;text-transform:uppercase;letter-spacing:.12em;font-size:11px">New website enquiry · CRM ${html(enquiryId)}</p><h1 style="font-family:Georgia,serif;color:#062b23">${html(product)}</h1><p style="color:#526d64">This enquiry is saved in the private website dashboard. Reply directly to confirm specification, packaging, documents and quotation.</p><table style="width:100%;border-collapse:collapse">${rows.map(([label, value]) => `<tr><td style="padding:10px;border-bottom:1px solid #dfcfad;width:32%;font-weight:bold">${html(label)}</td><td style="padding:10px;border-bottom:1px solid #dfcfad">${html(value)}</td></tr>`).join('')}</table><p style="margin-top:24px;font-size:12px;color:#526d64">Submitted with consent through ancientindianbotanicals.com. Reply directly to the buyer using the Reply-To address.</p></div>`,
      }),
    });

    if (!delivery.ok) throw new Error('Delivery provider rejected the enquiry');
    notified = true;
  } catch {
    notified = false;
  }

  await crmFetch(`enquiries?id=eq.${encodeURIComponent(enquiryId)}`, {
    method: 'PATCH',
    body: JSON.stringify({ email_status: notified ? 'sent' : 'failed', updated_at: new Date().toISOString() }),
  }).catch(() => undefined);

  response.status(200).json({ ok: true, enquiryId, notified });
}
