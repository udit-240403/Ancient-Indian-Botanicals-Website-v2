create extension if not exists pgcrypto;

create table if not exists public.staff_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null default '',
  phone text not null default '',
  display_name text not null default 'Team member',
  role text not null default 'staff' check (role in ('owner', 'staff')),
  status text not null default 'pending' check (status in ('pending', 'active', 'revoked')),
  approved_by uuid references auth.users(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  company_name text not null,
  business_email text not null,
  phone_whatsapp text not null default '',
  product_requirement text not null,
  estimated_quantity text not null default 'Not sure yet',
  destination text not null default '',
  buyer_notes text not null default '',
  internal_notes text not null default '',
  source_path text not null default '/',
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'quoted', 'won', 'lost', 'closed')),
  email_status text not null default 'pending' check (email_status in ('pending', 'sent', 'failed')),
  assigned_to uuid references public.staff_profiles(user_id) on delete set null,
  consent_recorded_at timestamptz not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.enquiry_activity (
  id bigint generated always as identity primary key,
  enquiry_id uuid not null references public.enquiries(id) on delete cascade,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null,
  details jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists enquiries_created_at_idx on public.enquiries(created_at desc);
create index if not exists enquiries_status_idx on public.enquiries(status);
create index if not exists enquiries_business_email_idx on public.enquiries(lower(business_email));
create index if not exists staff_profiles_status_idx on public.staff_profiles(status);
create index if not exists enquiry_activity_enquiry_idx on public.enquiry_activity(enquiry_id, created_at desc);

alter table public.staff_profiles enable row level security;
alter table public.enquiries enable row level security;
alter table public.enquiry_activity enable row level security;

revoke all on public.staff_profiles from anon, authenticated;
revoke all on public.enquiries from anon, authenticated;
revoke all on public.enquiry_activity from anon, authenticated;

grant all on public.staff_profiles to service_role;
grant all on public.enquiries to service_role;
grant all on public.enquiry_activity to service_role;
grant usage, select on all sequences in schema public to service_role;

comment on table public.enquiries is 'Private B2B enquiries submitted through ancientindianbotanicals.com.';
comment on table public.staff_profiles is 'Owner-controlled access list for the private enquiry desk.';
comment on column public.staff_profiles.status is 'pending accounts cannot read data; active accounts can; revoked accounts lose access immediately.';

