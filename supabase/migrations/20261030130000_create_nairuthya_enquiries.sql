-- ==============================================================================
-- Earth Heritage — Dedicated Nairuthya Lead Capture Migration
-- Migration: 20261030130000_create_nairuthya_enquiries.sql
-- Target: public.nairuthya_enquiries
-- Purpose: Create an isolated, dedicated database table for the Nairuthya
--          Whispering Wood lead capture system (/form/nairuthya-whispering-wood).
--
-- STRICT ISOLATION NOTICE:
-- - The existing public.enquiries table remains 100% UNTOUCHED and unchanged.
-- - No modifications to existing tables, functions, or indexes.
-- - Only server-side applications using the service_role key can insert records.
-- - Row Level Security (RLS) is enabled with default-deny for all public/anon access.
-- ==============================================================================

BEGIN;

-- 1. Ensure pgcrypto extension is enabled for gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Create the dedicated nairuthya_enquiries table
CREATE TABLE IF NOT EXISTS public.nairuthya_enquiries (
  -- Primary Key (UUID)
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  -- Contact Information
  full_name TEXT NOT NULL CHECK (length(btrim(full_name)) >= 2),
  phone TEXT NOT NULL CHECK (length(btrim(phone)) >= 10),
  raw_phone TEXT,
  email TEXT CHECK (
    email IS NULL 
    OR length(btrim(email)) = 0 
    OR email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
  ),

  -- Lead & Scheduling Attributes
  location TEXT,
  interest TEXT NOT NULL DEFAULT 'Nairuthya Whispering Wood',
  preferred_visit_date DATE,
  consent BOOLEAN NOT NULL DEFAULT false CHECK (consent = true),

  -- Attribution & CRM Pipeline Metadata
  source TEXT NOT NULL DEFAULT 'Dedicated Form - Nairuthya Whispering Wood',
  page_url TEXT DEFAULT '/form/nairuthya-whispering-wood',
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),

  -- Submission Timestamp (with timezone)
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. Targeted Performance & Operational Indexes
-- Index for chronological sorting and recent lead triage
CREATE INDEX IF NOT EXISTS idx_nairuthya_enquiries_created_at 
  ON public.nairuthya_enquiries (created_at DESC);

-- Index for contact lookup and phone duplicate identification
CREATE INDEX IF NOT EXISTS idx_nairuthya_enquiries_phone 
  ON public.nairuthya_enquiries (phone);

-- Index for sales pipeline filtering (new, contacted, qualified, closed)
CREATE INDEX IF NOT EXISTS idx_nairuthya_enquiries_status 
  ON public.nairuthya_enquiries (status);

-- Partial index for site visit schedule management
CREATE INDEX IF NOT EXISTS idx_nairuthya_enquiries_visit_date 
  ON public.nairuthya_enquiries (preferred_visit_date) 
  WHERE preferred_visit_date IS NOT NULL;

-- 4. Row Level Security (RLS) Configuration
-- Enabling RLS establishes default-deny for all unauthorized roles
ALTER TABLE public.nairuthya_enquiries ENABLE ROW LEVEL SECURITY;

-- 5. Hardened Permissions & Role Grants
-- Revoke all direct privileges from public, anonymous, and standard authenticated users
REVOKE ALL ON TABLE public.nairuthya_enquiries FROM PUBLIC, anon, authenticated;

-- Grant full table access strictly to the service_role
-- (Used by the server-side Next.js route handler via supabaseAdmin)
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.nairuthya_enquiries TO service_role;

COMMIT;


-- ==============================================================================
-- POST-MIGRATION VERIFICATION QUERIES (Run after executing above script)
-- ==============================================================================
/*
-- 1. Verify Table Columns, Data Types, and Defaults
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'nairuthya_enquiries'
ORDER BY ordinal_position;

-- 2. Verify Table Constraints
SELECT 
  conname AS constraint_name,
  contype AS constraint_type,
  pg_get_constraintdef(oid) AS definition
FROM pg_constraint
WHERE conrelid = 'public.nairuthya_enquiries'::regclass;

-- 3. Verify Table Indexes
SELECT 
  indexname, 
  indexdef 
FROM pg_indexes 
WHERE schemaname = 'public' 
  AND tablename = 'nairuthya_enquiries';

-- 4. Verify RLS and Role Privileges
SELECT 
  relname AS table_name,
  relrowsecurity AS rls_enabled
FROM pg_class
WHERE relname = 'nairuthya_enquiries'
  AND relnamespace = 'public'::regnamespace;

SELECT 
  grantee, 
  privilege_type 
FROM information_schema.role_table_grants 
WHERE table_schema = 'public' 
  AND table_name = 'nairuthya_enquiries';
*/


-- ==============================================================================
-- ROLLBACK PLAN (Emergency Reversal Script)
-- ==============================================================================
/*
BEGIN;
DROP TABLE IF EXISTS public.nairuthya_enquiries CASCADE;
COMMIT;
*/
