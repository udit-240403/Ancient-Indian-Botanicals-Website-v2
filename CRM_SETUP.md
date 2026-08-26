# Private enquiry desk setup

The website code includes a private CRM at `/admin`. Public form submissions are stored before the website reports success. Employees authenticate by email OTP and remain pending until the owner approves them. The owner authenticates by SMS OTP to the privately configured owner number and can approve or revoke team access.

## 1. Create the database

1. Create a Supabase project owned by the company.
2. Open **SQL Editor** and run `supabase/migrations/202608210001_enquiry_crm.sql`.
3. In **Authentication → URL Configuration**, set the Site URL to `https://ancientindianbotanicals.com`.
4. Keep email authentication enabled for employees. In the email template, use `{{ .Token }}` so employees receive the six-digit OTP expected by the portal rather than only a magic link.
5. Enable phone authentication and connect an SMS provider supported by Supabase. The owner login will not work until real SMS delivery is configured.

## 2. Add private Vercel environment variables

Add these to Production, Preview and Development as appropriate:

| Variable | Value |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase publishable/anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service-role key; server only |
| `OWNER_PHONE_E164` | Authorised owner mobile in E.164 format, such as `+91…` |
| `VITE_SUPABASE_URL` | Same Supabase project URL; public client configuration |
| `VITE_SUPABASE_ANON_KEY` | Same publishable/anon key; public client configuration |

Keep `SUPABASE_SERVICE_ROLE_KEY` and `OWNER_PHONE_E164` private. Never prefix them with `VITE_` and never commit their values.

Existing email notification variables remain supported:

- `RESEND_API_KEY`
- `ENQUIRY_FROM_EMAIL`
- `ENQUIRY_RECIPIENT`

The database is the system of record. If email delivery fails but database storage succeeds, the buyer still receives a success confirmation and the enquiry remains visible in `/admin`.

## 3. First owner login

1. Redeploy after adding the variables.
2. Open `https://ancientindianbotanicals.com/admin`.
3. Select **Owner**, enter the configured mobile number and verify the SMS OTP.
4. The matching phone identity is automatically recorded as the active owner.

## 4. Employee approval and removal

1. The employee opens `/admin`, selects **Employee**, and verifies their work email OTP.
2. Their account appears as **Pending** and cannot see any enquiry data.
3. The owner opens **Team access** and selects **Approve**.
4. Select **Revoke** at any time to remove access immediately. Revocation keeps the audit identity and historical records intact.

## Security model

- The public database API grants no direct access to anonymous or authenticated browser users.
- All CRM reads and changes pass through authenticated Vercel server functions.
- The owner role is derived from a verified Supabase phone identity matching the private `OWNER_PHONE_E164` value.
- Employees cannot approve themselves or other users.
- The owner account cannot be revoked from the employee-management screen.
- The admin page is pre-rendered with `noindex, nofollow, noarchive` and excluded from the sitemap.
