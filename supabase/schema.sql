-- ==============================================================================
-- Earth Heritage — Supabase Database Schema & Migration
-- ==============================================================================
-- Table: public.enquiries
-- Purpose: Secure storage for visitor enquiries, site visit requests, and contact forms.
-- Architecture: Protected by Row Level Security (RLS). Server-side API ingestion only.
-- ==============================================================================

-- 1. Enable pgcrypto extension for gen_random_uuid()
create extension if not exists pgcrypto;

-- 2. Create the enquiries table
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone_number text not null,
  email text,
  interested_in text not null,
  message text,
  source text not null,
  page_url text,
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamptz not null default now()
);

-- 3. Targeted indexes for enquiry querying and triage workflow
-- Index on created_at for sorting recent submissions chronologically
create index if not exists idx_enquiries_created_at on public.enquiries (created_at desc);

-- Index on status for operational filtering ('new', 'contacted', 'qualified', 'closed')
create index if not exists idx_enquiries_status on public.enquiries (status);

-- 4. Row Level Security (RLS) Configuration
-- Enabling RLS ensures default-deny for all unauthorized operations.
alter table public.enquiries enable row level security;

-- SECURITY NOTICE:
-- - No public SELECT policy is defined: anonymous browser users cannot read enquiry records.
-- - No public INSERT/UPDATE/DELETE policy is defined for the anon key.
-- - Submissions will be performed server-side via a Next.js Route Handler using the
--   privileged Supabase service-role client, which securely bypasses RLS.
