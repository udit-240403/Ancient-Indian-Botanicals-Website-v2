type ApiRequest = {
  method?: string;
  body?: Record<string, unknown>;
};

type ApiResponse = {
  status: (code: number) => ApiResponse;
  json: (body: Record<string, unknown>) => void;
  setHeader: (name: string, value: string) => void;
};

const text = (value: unknown, max = 600) => String(value ?? '').trim().slice(0, max);
const html = (value: unknown) => text(value, 2000).replace(/[&<>'\"]/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '\"': '&quot;',
}[character] ?? character));

const makeReference = () => {
  const now = new Date();
  const year = now.getUTCFullYear();
  const stamp = now.toISOString().replace(/\D/g, '').slice(4, 14);
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return 'AIB-' + year + '-' + stamp + '-' + random;
};

export default async function handler(request: ApiRequest, response: ApiResponse) {
  response.setHeader('Cache-Control', 'no-store');

  if (request.method !== 'POST') {
    response.status(405).json({ ok: false, error: 'Method not allowed' });
    return;
  }

  const body = request.body ?? {};
  const requestType = text(body.requestType, 20) === 'sample' ? 'sample' : 'quote';
  const fullName = text(body.fullName, 120);
  const companyName = text(body.companyName, 160);
  const country = text(body.country, 120);
  const email = text(body.email, 180).toLowerCase();
  const product = text(body.selectedProduct, 220);
  const consent = body.consent === true;
  const documentationNeeds = Array.isArray(body.documentationNeeds)
    ? body.documentationNeeds.map((item) => text(item, 120)).filter(Boolean).slice(0, 20)
    : [];

  if (!fullName || !companyName || !country || !product || !consent || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    response.status(400).json({ ok: false, error: 'Please provide the required enquiry details.' });
    return;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    response.status(503).json({ ok: false, error: 'Lead storage is not configured.' });
    return;
  }

  const reference = makeReference();
  const lead = {
    enquiry_id: reference,
    request_type: requestType,
    full_name: fullName,
    company_name: companyName,
    country,
    email,
    phone_whatsapp: text(body.phoneWhatsapp, 180) || null,
    selected_product: product,
    preferred_form: text(body.preferredForm, 180) || null,
    estimated_quantity: text(body.estimatedQuantity, 160) || 'Not sure yet',
    application_use: text(body.applicationUse, 300) || null,
    destination_port: text(body.destinationPort, 220) || null,
    packaging_preference: text(body.packagingPreference, 300) || null,
    documentation_needs: documentationNeeds,
    additional_notes: text(body.additionalNotes, 1800) || null,
    status: 'new',
    source: 'website',
    consent: true,
  };

  try {
    const storage = await fetch(supabaseUrl.replace(/\/$/, '') + '/rest/v1/website_enquiries', {
      method: 'POST',
      headers: {
        apikey: supabaseServiceKey,
        Authorization: 'Bearer ' + supabaseServiceKey,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(lead),
    });

    if (!storage.ok) {
      response.status(502).json({ ok: false, error: 'We could not securely store this enquiry.' });
      return;
    }
  } catch {
    response.status(502).json({ ok: false, error: 'We could not securely store this enquiry.' });
    return;
  }

  const resendKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.ENQUIRY_FROM_EMAIL;
  const recipient = process.env.ENQUIRY_RECIPIENT || 'sales@ancientindianbotanicals.com';
  let notificationSent = false;

  if (resendKey && fromEmail) {
    const rows = [
      ['Reference', reference],
      ['Request type', requestType === 'sample' ? 'Sample request' : 'Quotation request'],
      ['Name', fullName],
      ['Company', companyName],
      ['Country', country],
      ['Business email', email],
      ['Phone / WhatsApp', text(body.phoneWhatsapp, 180) || 'Not provided'],
      ['Product or requirement', product],
      ['Preferred form', text(body.preferredForm, 180) || 'To be confirmed'],
      ['Approximate quantity', text(body.estimatedQuantity, 160) || 'Not sure yet'],
      ['Application', text(body.applicationUse, 300) || 'Not provided'],
      ['Destination', text(body.destinationPort, 220) || 'To be confirmed'],
      ['Packaging', text(body.packagingPreference, 300) || 'To be confirmed'],
      ['Documents', documentationNeeds.join(', ') || 'To be confirmed'],
      ['Buyer notes', text(body.additionalNotes, 1800) || 'None provided'],
    ];

    try {
      const tableRows = rows.map(([label, value]) => '<tr><td style="padding:10px;border-bottom:1px solid #dfcfad;width:32%;font-weight:bold">' + html(label) + '</td><td style="padding:10px;border-bottom:1px solid #dfcfad">' + html(value) + '</td></tr>').join('');
      const delivery = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: 'Bearer ' + resendKey, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: 'Ancient Indian Botanicals Website <' + fromEmail + '>',
          to: [recipient],
          reply_to: email,
          subject: (requestType === 'sample' ? 'Sample request' : 'New enquiry') + ' — ' + product + ' — ' + companyName,
          html: '<div style="font-family:Arial,sans-serif;color:#17231e;max-width:720px"><p style="color:#967020;text-transform:uppercase;letter-spacing:.12em;font-size:11px">Stored website lead · ' + html(reference) + '</p><h1 style="font-family:Georgia,serif;color:#062b23">' + html(product) + '</h1><p style="color:#526d64">This enquiry has already been stored in the AIB lead database. Email is a notification channel only.</p><table style="width:100%;border-collapse:collapse">' + tableRows + '</table></div>',
        }),
      });
      notificationSent = delivery.ok;
    } catch {
      notificationSent = false;
    }
  }

  response.status(200).json({ ok: true, enquiryId: reference, notificationSent });
}
