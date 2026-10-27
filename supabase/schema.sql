-- Run once in the Supabase SQL Editor. Browser users receive no direct table
-- access; the Vercel server function writes with the private service-role key.
create extension if not exists pgcrypto;

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

comment on table public.aib_enquiries is 'B2B enquiries submitted through ancientindianbotanicals.com';
