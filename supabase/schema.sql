-- Run once in the Supabase SQL Editor. Browser users cannot read enquiries.
-- The Vercel server function writes through a publishable key plus a separate
-- high-entropy server-only key whose SHA-256 hash is stored in the private schema.
create extension if not exists pgcrypto;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists public.aib_enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  company_name text not null,
  country text not null default '',
  email text not null,
  phone_whatsapp text not null default '',
  product_requirement text not null,
  preferred_form text not null default '',
  estimated_quantity text not null default '',
  application_use text not null default '',
  destination text not null default '',
  packaging_preference text not null default '',
  documentation_needs text[] not null default '{}',
  additional_notes text not null default '',
  source_path text not null default '/',
  consent boolean not null default false,
  status text not null default 'new' check (status in ('new', 'reviewing', 'replied', 'qualified', 'closed'))
);

create index if not exists aib_enquiries_created_at_idx on public.aib_enquiries (created_at desc);
create index if not exists aib_enquiries_status_idx on public.aib_enquiries (status);

alter table public.aib_enquiries enable row level security;

revoke all on table public.aib_enquiries from public, anon, authenticated;
grant insert on table public.aib_enquiries to anon;
grant select, insert on table public.aib_enquiries to service_role;

create table if not exists private.aib_runtime_settings (
  setting_name text primary key,
  value_hash text not null check (length(value_hash) = 64)
);

revoke all on table private.aib_runtime_settings from public, anon, authenticated, service_role;

create or replace function private.aib_enquiry_write_key_is_valid()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, extensions
as $$
  select exists (
    select 1
    from private.aib_runtime_settings
    where setting_name = 'enquiry_write_key_sha256'
      and value_hash = encode(
        extensions.digest(
          coalesce(current_setting('request.headers', true)::jsonb ->> 'x-aib-write-key', ''),
          'sha256'
        ),
        'hex'
      )
  );
$$;

revoke all on function private.aib_enquiry_write_key_is_valid() from public, anon, authenticated, service_role;
grant usage on schema private to anon;
grant execute on function private.aib_enquiry_write_key_is_valid() to anon;

drop policy if exists "Vercel server may create enquiries" on public.aib_enquiries;
create policy "Vercel server may create enquiries"
  on public.aib_enquiries
  for insert
  to anon
  with check (
    private.aib_enquiry_write_key_is_valid()
    and consent is true
    and length(trim(full_name)) between 1 and 120
    and length(trim(company_name)) between 1 and 160
    and length(trim(email)) between 3 and 180
    and length(trim(product_requirement)) between 1 and 220
  );

comment on table public.aib_enquiries is 'Private B2B enquiries submitted through ancientindianbotanicals.com';
