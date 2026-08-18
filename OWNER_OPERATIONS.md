# Ancient Indian Botanicals — Owner Operations

This repository contains the complete website source. All design, catalogue, search metadata, enquiry code and analytics integration remain editable in your GitHub account. No secret keys are committed to the repository.

## 1. Put the custom domain on the production website

The public domain `ancientindianbotanicals.com` currently resolves to a Hostinger parking page. Google should not be asked to index that parked page.

1. Open the Ancient Indian Botanicals project in Vercel.
2. Go to **Settings → Domains** and add both `ancientindianbotanicals.com` and `www.ancientindianbotanicals.com`.
3. Vercel will display the exact DNS records it requires.
4. In Hostinger DNS, replace only the existing parked-web records with the records supplied by Vercel.
5. Preserve all email records: MX, SPF, DKIM and DMARC TXT records must not be deleted.
6. Set one domain as primary and redirect the other to it.
7. Confirm the site opens over HTTPS on the custom domain before proceeding to Google Search Console.

After the custom domain is live, update the canonical URL, Open Graph URL, structured-data URL, `robots.txt` and `sitemap.xml` from the temporary Vercel address to the custom domain in one release.

## 2. Submit the website to Google

1. Open Google Search Console and add a **Domain property** for `ancientindianbotanicals.com`.
2. Copy the Google verification TXT record into Hostinger DNS. Keep that record after verification.
3. Submit `https://ancientindianbotanicals.com/sitemap.xml` in **Sitemaps**.
4. Use **URL Inspection** for the home page and select **Request indexing**.
5. Repeat URL Inspection for important catalogue, packaging and contact pages after the custom-domain release is live.

Indexing and ranking are controlled by Google and are not immediate or guaranteed. Search Console will show whether Google can crawl the site and whether any page has an indexing problem.

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
