# Enquiry database setup

The website can preserve a buyer enquiry in Supabase and send a Resend email notification. A submission is shown as received only when at least one of those two channels succeeds.

## 1. Create the private table

1. Create or open the Ancient Indian Botanicals project in Supabase.
2. Open **SQL Editor**.
3. Run `supabase/schema.sql` once.
4. Confirm that **Table Editor → aib_enquiries** exists.

Row Level Security is enabled and no public browser policy is created. Website visitors cannot read the table.

## 2. Connect Vercel

Add these encrypted environment variables under the Vercel project’s **Settings → Environment Variables** for Production, Preview and Development:

```text
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your private service-role key
```

Do not place the service-role key in GitHub, frontend code, screenshots or chat. After saving the variables, redeploy the latest production deployment.

## 3. Optional email notification

For an immediate email in addition to database storage, configure:

```text
RESEND_API_KEY=re_...
ENQUIRY_FROM_EMAIL=website@ancientindianbotanicals.com
ENQUIRY_RECIPIENT=sales@ancientindianbotanicals.com
```

The sending domain and `ENQUIRY_FROM_EMAIL` must be verified in Resend.

## 4. Review enquiries

Open **Supabase → Table Editor → aib_enquiries** and sort `created_at` descending. The `status` field supports:

- `new`
- `reviewing`
- `replied`
- `qualified`
- `closed`

Use Supabase’s authenticated dashboard rather than exposing buyer details in a public website admin page.

## 5. Acceptance test

Submit one clearly labelled internal test enquiry from the production website. Verify that:

1. The website shows **Enquiry received** and a reference.
2. A new row appears in `aib_enquiries`.
3. The sales notification email arrives if Resend is configured.
4. The record’s `source_path` identifies the page from which the enquiry was submitted.
