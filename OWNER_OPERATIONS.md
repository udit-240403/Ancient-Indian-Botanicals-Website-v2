# Ancient Indian Botanicals — Owner Operations

This repository contains the complete website source. All design, catalogue, search metadata, enquiry code and analytics integration remain editable in your GitHub account. No secret keys are committed to the repository.

## 1. Production domain and ownership

The production website uses `https://www.ancientindianbotanicals.com/`. GitHub is the editable source of truth and Vercel deploys the production build from the repository.

- Keep the `www` domain as the canonical website address.
- Redirect `ancientindianbotanicals.com` to `www.ancientindianbotanicals.com` if both remain connected.
- Preserve all Google Workspace email records in Hostinger: MX, SPF, DKIM and DMARC must not be removed when website DNS records change.
- After every GitHub merge, confirm that the Vercel production deployment succeeds.
- Do not publish temporary Vercel deployment addresses as canonical URLs.

## 2. Submit the website to Google

1. Open Google Search Console and add a **Domain property** for `ancientindianbotanicals.com`.
2. Copy the Google verification TXT record into Hostinger DNS. Keep that record after verification.
3. Submit `https://www.ancientindianbotanicals.com/sitemap.xml` in **Sitemaps**. The production build generates 146 real URLs: 14 main pages and 132 product pages.
4. Use **URL Inspection** for the home page and select **Request indexing**.
5. Repeat URL Inspection for `/catalogue`, `/essential-oils`, `/botanicals`, `/packaging`, `/quality`, `/about`, `/contact` and priority product URLs such as `/products/ashwagandha`.

Indexing and ranking are controlled by Google and are not immediate or guaranteed. Search Console will show whether Google can crawl the site and whether any page has an indexing problem.

The old hash addresses are retained only as backward-compatible redirects. New links and Search Console submissions must use real paths such as `/contact`, never `/#contact`.

## 3. Activate the private traffic dashboard

The production build includes Vercel Web Analytics. In Vercel:

1. Open the project.
2. Select **Analytics** and enable Web Analytics for Production.
3. Redeploy if Vercel asks for a new deployment.
4. Visit the live site from a separate browser, then allow time for the first events to appear.

The owner dashboard can report aggregate visits, pages, referrers, devices and visitor countries. It is not displayed publicly on the website.

## 4. Activate reliable website enquiry delivery

The website sends structured enquiries through the server-side `/api/enquiry` route. Resend is the configured delivery provider.

1. Create or open the owner-controlled Resend account.
2. Verify `ancientindianbotanicals.com` as a sending domain using the DNS records Resend supplies.
3. Create a restricted production API key.
4. In **Vercel → Project → Settings → Environment Variables**, add:

   - `RESEND_API_KEY` — the production API key
   - `ENQUIRY_FROM_EMAIL` — for example `website@ancientindianbotanicals.com`
   - `ENQUIRY_RECIPIENT` — `sales@ancientindianbotanicals.com`

5. Apply the values to Production and redeploy.
6. Submit a test enquiry using an email address you control. Confirm it reaches the sales inbox and that Reply goes to the visitor's address.
7. Check Spam once and mark the test as legitimate if necessary.

Until these variables are configured, the form clearly offers a prepared-email fallback and does not claim that the website received the enquiry.

## 5. Routine owner checks

- Review the Vercel deployment status after each GitHub merge.
- Test the enquiry form monthly and after any DNS or email change.
- Review Search Console indexing and Vercel Analytics monthly.
- Keep catalogue claims lot-specific; do not imply universal certification, fixed capacity or medical outcomes.
- Never commit API keys, DNS credentials or email passwords to GitHub.
