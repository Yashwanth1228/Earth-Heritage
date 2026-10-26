-- ==============================================================================
-- Earth Heritage — Database Migration Specification
-- File: supabase/migrations/20261026153000_enquiry_duplicate_detection.sql
-- Target: public.enquiries
-- Purpose: Implement safe duplicate detection, re-enquiry tracking, and concurrency control.
-- Status: PREPARED ONLY — DO NOT EXECUTE UNTIL EXPLICITLY APPROVED.
-- ==============================================================================
--
-- EXECUTION NOTICE:
-- This migration is organized into distinct, reviewable stages:
--   Stage 0: Pre-Migration Read-Only Audit (Run first to inspect existing data)
--   Stage 1: DDL Column Evolution (Transactional: BEGIN ... COMMIT)
--   Stage 2: Covering Index Creation (NON-Transactional: must run outside transaction block)
--   Stage 3: Controlled Historical Backfill (Transactional: BEGIN ... COMMIT)
--   Stage 4: Hardened Stored Procedure & Role Grants (Transactional: BEGIN ... COMMIT)
--   Stage 5: Post-Migration Verification Queries
--   Stage 6: Rollback Plan & Recovery Procedures
-- ==============================================================================

-- ==============================================================================
-- STAGE 0: PRE-MIGRATION READ-ONLY AUDIT & SAFETY CHECKS
-- Run these queries first. They perform zero writes.
-- ==============================================================================

-- Audit 0.1: Baseline Row Count
SELECT count(*) AS total_existing_enquiries FROM public.enquiries;

-- Audit 0.2: Detect Non-Standard & Ambiguous Phone Numbers
-- Identifies records that do not strictly match 10-digit Indian mobile or E.164 international
SELECT 
  id,
  created_at,
  full_name,
  phone_number AS raw_phone,
  regexp_replace(phone_number, '\D', '', 'g') AS cleaned_digits
FROM public.enquiries
WHERE NOT (
  -- Valid 10-digit Indian mobile starting with 6-9
  regexp_replace(phone_number, '\D', '', 'g') ~ '^[6-9]\d{9}$'
  -- Valid 11-digit Indian with leading trunk 0
  OR regexp_replace(phone_number, '\D', '', 'g') ~ '^0[6-9]\d{9}$'
  -- Valid 12-digit Indian with country code 91
  OR regexp_replace(phone_number, '\D', '', 'g') ~ '^91[6-9]\d{9}$'
  -- Valid E.164 international
  OR phone_number ~ '^\+[1-9]\d{6,14}$'
)
ORDER BY created_at DESC;

-- Audit 0.3: Detect Phone Number Format Collisions in Historical Data
-- Identifies records where two different historical strings normalize to the same digits
WITH formatted AS (
  SELECT 
    id,
    phone_number AS raw_phone,
    CASE
      WHEN length(regexp_replace(phone_number, '\D', '', 'g')) = 12 
           AND regexp_replace(phone_number, '\D', '', 'g') ~ '^91[6-9]' 
        THEN substr(regexp_replace(phone_number, '\D', '', 'g'), 3)
      WHEN length(regexp_replace(phone_number, '\D', '', 'g')) = 11 
           AND regexp_replace(phone_number, '\D', '', 'g') ~ '^0[6-9]' 
        THEN substr(regexp_replace(phone_number, '\D', '', 'g'), 2)
      WHEN length(regexp_replace(phone_number, '\D', '', 'g')) = 10 
           AND regexp_replace(phone_number, '\D', '', 'g') ~ '^[6-9]'
        THEN regexp_replace(phone_number, '\D', '', 'g')
      ELSE phone_number
    END AS norm_phone
  FROM public.enquiries
)
SELECT 
  norm_phone,
  count(DISTINCT raw_phone) AS distinct_formats_count,
  string_agg(DISTINCT raw_phone, ' | ') AS format_variants,
  count(*) AS total_matching_rows
FROM formatted
GROUP BY norm_phone
HAVING count(DISTINCT raw_phone) > 1;

-- Audit 0.4: Preview Scope and Interest Classification on Historical Records
-- Previews how existing records will be classified by the backfill logic
WITH normalized_inputs AS (
  SELECT 
    id,
    created_at,
    full_name,
    phone_number,
    interested_in,
    source,
    page_url,
    CASE
      WHEN length(regexp_replace(phone_number, '\D', '', 'g')) = 12 
           AND regexp_replace(phone_number, '\D', '', 'g') ~ '^91[6-9]' 
        THEN substr(regexp_replace(phone_number, '\D', '', 'g'), 3)
      WHEN length(regexp_replace(phone_number, '\D', '', 'g')) = 11 
           AND regexp_replace(phone_number, '\D', '', 'g') ~ '^0[6-9]' 
        THEN substr(regexp_replace(phone_number, '\D', '', 'g'), 2)
      WHEN length(regexp_replace(phone_number, '\D', '', 'g')) = 10 
           AND regexp_replace(phone_number, '\D', '', 'g') ~ '^[6-9]'
        THEN regexp_replace(phone_number, '\D', '', 'g')
      WHEN phone_number ~ '^\+[1-9]' AND length(regexp_replace(phone_number, '\D', '', 'g')) BETWEEN 7 AND 15
           AND regexp_replace(phone_number, '\D', '', 'g') !~ '^91[6-9]\d{9}$'
        THEN '+' || regexp_replace(substr(phone_number, 2), '\D', '', 'g')
      ELSE phone_number
    END AS norm_phone,
    CASE 
      WHEN raw_path = '' THEN '/'
      WHEN raw_path NOT LIKE '/%' THEN '/' || raw_path
      ELSE raw_path
    END AS clean_path,
    lower(btrim(coalesce(source, ''))) AS src,
    lower(btrim(coalesce(interested_in, ''))) AS interest
  FROM (
    SELECT 
      id,
      created_at,
      full_name,
      phone_number,
      interested_in,
      source,
      page_url,
      regexp_replace(
        regexp_replace(
          regexp_replace(
            lower(btrim(coalesce(page_url, ''))),
            '^(https?://)?(www\.)?earthheritage\.in(:\d+)?(?=/|$)|^https?://[^/]+',
            ''
          ),
          '[?#].*$', ''
        ),
        '/+$', ''
      ) AS raw_path
    FROM public.enquiries
  ) p
),
classified AS (
  SELECT
    id,
    created_at,
    full_name,
    phone_number,
    interested_in,
    source,
    page_url,
    norm_phone,
    clean_path,
    src,
    interest,
    CASE
      -- 1. Projects (Isolated by confirmed project keywords)
      WHEN (clean_path LIKE '%nairuthya%' OR src LIKE '%nairuthya%' OR interest LIKE '%nairuthya%')
        THEN 'project:nairuthya-whispering-wood'
      WHEN (clean_path LIKE '%coconut%' OR src LIKE '%coconut%' OR interest LIKE '%coconut%')
        THEN 'project:coconut-garden'
      WHEN (
        clean_path LIKE '%concept-iii%' OR src LIKE '%concept-iii%' OR interest LIKE '%concept-iii%' OR
        clean_path LIKE '%land-and-legacy%' OR src LIKE '%land-and-legacy%' OR
        (interest LIKE '%legacy%' AND (clean_path LIKE '%concept%' OR src LIKE '%concept%' OR interest LIKE '%concept%'))
      ) THEN 'project:concept-iii'

      -- 2. Dedicated Services
      WHEN (clean_path = '/farm-management' OR interest = 'farm management')
        THEN 'service:farm-management'
      WHEN (clean_path IN ('/managed-farmland', '/lp/managed-farmland') OR interest = 'managed farmland')
        THEN 'service:managed-farmland'
      WHEN (clean_path IN ('/lp/land-ownership', '/land-ownership') OR interest = 'land ownership')
        THEN 'service:land-ownership'

      -- 3. Events
      WHEN (clean_path LIKE '/events%' OR interest LIKE 'event attendance:%')
        THEN CASE
          WHEN NULLIF(split_part(regexp_replace(clean_path, '^/events/?', ''), '/', 1), '') IS NOT NULL
            THEN 'event:' || split_part(regexp_replace(clean_path, '^/events/?', ''), '/', 1)
          ELSE 'event:general'
        END

      -- 4. Blogs
      WHEN (clean_path LIKE '/blogs/%')
        THEN CASE
          WHEN NULLIF(split_part(regexp_replace(clean_path, '^/blogs/?', ''), '/', 1), '') IS NOT NULL
            THEN 'blog:' || split_part(regexp_replace(clean_path, '^/blogs/?', ''), '/', 1)
          ELSE 'blog:general'
        END

      -- 5. Corporate Homepage Form
      WHEN (src LIKE '%corporate home page%')
        THEN 'corporate:home'

      -- 6. Global Modal Generic Inquiry (header / floating CTA with no project context)
      WHEN (clean_path = '/' AND (src LIKE '%modal%' OR interest = 'general enquiry'))
        THEN 'corporate:general'

      -- Homepage fallback
      WHEN (clean_path = '/')
        THEN 'corporate:home'

      -- 7. Known Static Pages (Clean kebab-case matching JS)
      WHEN (clean_path IN ('/about', '/contact', '/how-it-works', '/gallery', '/disclaimer', '/privacy-policy', '/terms', '/projects'))
        THEN 'page:' || regexp_replace(clean_path, '^/+', '')

      -- 8. Explicit Ambiguity Protection (Never guessed as corporate)
      ELSE 'ambiguous:unclassified'
    END AS calculated_scope
  FROM normalized_inputs
)
SELECT 
  calculated_scope,
  CASE
    WHEN interest ~ 'site visit|visit enquiry|schedule visit|estate visit' THEN 'site-visit'
    WHEN calculated_scope LIKE 'project:%' THEN 'project-enquiry'
    WHEN interest = 'farm management' OR calculated_scope = 'service:farm-management' THEN 'service-farm-management'
    WHEN interest = 'managed farmland' OR calculated_scope = 'service:managed-farmland' THEN 'service-managed-farmland'
    WHEN interest = 'land ownership' OR calculated_scope = 'service:land-ownership' THEN 'service-land-ownership'
    WHEN interest LIKE 'event attendance:%' OR calculated_scope LIKE 'event:%' THEN 'event-attendance'
    WHEN interest IN ('general enquiry', 'general inquiry', 'projects inquiry', 'general', '') OR interest IS NULL THEN 'general-enquiry'
    WHEN NULLIF(regexp_replace(regexp_replace(interest, '[^a-z0-9]+', '-', 'g'), '^-+|-+$', '', 'g'), '') IS NOT NULL
      THEN 'custom-' || regexp_replace(regexp_replace(interest, '[^a-z0-9]+', '-', 'g'), '^-+|-+$', '', 'g')
    ELSE 'general-enquiry'
  END AS calculated_interest,
  count(*) AS total_records,
  count(DISTINCT norm_phone) AS unique_contacts
FROM classified
GROUP BY 1, 2
ORDER BY total_records DESC;

-- Audit 0.5: Inspect Rows that will be Flagged as ambiguous:unclassified
WITH normalized_inputs AS (
  SELECT 
    id,
    created_at,
    full_name,
    phone_number,
    interested_in,
    source,
    page_url,
    CASE 
      WHEN raw_path = '' THEN '/'
      WHEN raw_path NOT LIKE '/%' THEN '/' || raw_path
      ELSE raw_path
    END AS clean_path,
    lower(btrim(coalesce(source, ''))) AS src,
    lower(btrim(coalesce(interested_in, ''))) AS interest
  FROM (
    SELECT 
      id,
      created_at,
      full_name,
      phone_number,
      interested_in,
      source,
      page_url,
      regexp_replace(
        regexp_replace(
          regexp_replace(
            lower(btrim(coalesce(page_url, ''))),
            '^(https?://)?(www\.)?earthheritage\.in(:\d+)?(?=/|$)|^https?://[^/]+',
            ''
          ),
          '[?#].*$', ''
        ),
        '/+$', ''
      ) AS raw_path
    FROM public.enquiries
  ) p
)
SELECT 
  id,
  created_at,
  full_name,
  phone_number,
  interested_in,
  source,
  page_url,
  clean_path
FROM normalized_inputs
WHERE NOT (
  clean_path LIKE '%nairuthya%' OR src LIKE '%nairuthya%' OR interest LIKE '%nairuthya%' OR
  clean_path LIKE '%coconut%' OR src LIKE '%coconut%' OR interest LIKE '%coconut%' OR
  clean_path LIKE '%concept-iii%' OR src LIKE '%concept-iii%' OR interest LIKE '%concept-iii%' OR
  clean_path LIKE '%land-and-legacy%' OR src LIKE '%land-and-legacy%' OR
  (interest LIKE '%legacy%' AND (clean_path LIKE '%concept%' OR src LIKE '%concept%' OR interest LIKE '%concept%')) OR
  clean_path = '/farm-management' OR interest = 'farm management' OR
  clean_path IN ('/managed-farmland', '/lp/managed-farmland') OR interest = 'managed farmland' OR
  clean_path IN ('/lp/land-ownership', '/land-ownership') OR interest = 'land ownership' OR
  clean_path LIKE '/events%' OR interest LIKE 'event attendance:%' OR
  clean_path LIKE '/blogs/%' OR
  src LIKE '%corporate home page%' OR
  clean_path = '/' OR
  clean_path IN ('/about', '/contact', '/how-it-works', '/gallery', '/disclaimer', '/privacy-policy', '/terms', '/projects')
)
ORDER BY created_at DESC;


-- ==============================================================================
-- STAGE 1: DDL COLUMN EVOLUTION (Transactional)
-- Adds tracking columns with safe defaults (O(1) metadata operation, no table rewrite)
-- Preserves raw historical phone numbers in raw_phone_number before any updates
-- ==============================================================================

BEGIN;

-- 1.1 Preserve original phone numbers safely in a dedicated backup column
ALTER TABLE public.enquiries 
  ADD COLUMN IF NOT EXISTS raw_phone_number text;

-- 1.2 Add the 6 core tracking columns
ALTER TABLE public.enquiries 
  ADD COLUMN IF NOT EXISTS canonical_scope text NOT NULL DEFAULT 'ambiguous:pending_backfill',
  ADD COLUMN IF NOT EXISTS normalized_interest text NOT NULL DEFAULT 'general-enquiry',
  ADD COLUMN IF NOT EXISTS is_re_enquiry boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS repeat_count integer NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS last_enquired_at timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS submission_history jsonb NOT NULL DEFAULT '[]'::jsonb;

COMMIT;


-- ==============================================================================
-- STAGE 2: COVERING INDEX CREATION (NON-Transactional)
-- MUST be executed outside any transaction block.
-- Builds the index concurrently without locking live table reads or writes.
-- ==============================================================================

CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_enquiries_matching_v5 
  ON public.enquiries (phone_number, canonical_scope, normalized_interest, created_at DESC);

-- Verify Index Validity (Proceed only if is_valid is TRUE):
SELECT 
  c.relname AS index_name,
  i.indisvalid AS is_valid,
  i.indisready AS is_ready
FROM pg_index i
JOIN pg_class c ON c.oid = i.indexrelid
WHERE c.relname = 'idx_enquiries_matching_v5'
  AND c.relnamespace = 'public'::regnamespace;


-- ==============================================================================
-- STAGE 3: CONTROLLED HISTORICAL BACKFILL (Transactional)
-- Updates historical rows safely.
-- Backs up raw phone numbers, normalizes only standard Indian formats,
-- aligns timestamps, and applies scope & interest classification matching the JS module.
-- ==============================================================================

BEGIN;

-- 3.1 Backup raw phone numbers for all historical rows
UPDATE public.enquiries 
SET raw_phone_number = phone_number 
WHERE raw_phone_number IS NULL;

-- 3.2 Align last_enquired_at with initial created_at for historical rows
UPDATE public.enquiries 
SET last_enquired_at = created_at 
WHERE last_enquired_at != created_at;

-- 3.3 Controlled phone normalization for standard Indian numbers and E.164 international
-- Leaves non-standard, international, or ambiguous numbers untouched in phone_number
UPDATE public.enquiries
SET phone_number = CASE
  WHEN length(regexp_replace(phone_number, '\D', '', 'g')) = 12 
       AND regexp_replace(phone_number, '\D', '', 'g') ~ '^91[6-9]' 
    THEN substr(regexp_replace(phone_number, '\D', '', 'g'), 3)
  WHEN length(regexp_replace(phone_number, '\D', '', 'g')) = 11 
       AND regexp_replace(phone_number, '\D', '', 'g') ~ '^0[6-9]' 
    THEN substr(regexp_replace(phone_number, '\D', '', 'g'), 2)
  WHEN length(regexp_replace(phone_number, '\D', '', 'g')) = 10 
       AND regexp_replace(phone_number, '\D', '', 'g') ~ '^[6-9]'
    THEN regexp_replace(phone_number, '\D', '', 'g')
  -- E.164 International: preserve leading + and strip visual separators
  WHEN phone_number ~ '^\+[1-9]' AND length(regexp_replace(phone_number, '\D', '', 'g')) BETWEEN 7 AND 15
       AND regexp_replace(phone_number, '\D', '', 'g') !~ '^91[6-9]\d{9}$'
    THEN '+' || regexp_replace(substr(phone_number, 2), '\D', '', 'g')
  ELSE phone_number
END
WHERE phone_number ~ '\D' OR length(phone_number) IN (11, 12);

-- 3.4 Contextual Scope Backfill (Identical to JS resolveCanonicalScope)
UPDATE public.enquiries e
SET canonical_scope = sub.resolved_scope
FROM (
  SELECT 
    id,
    CASE
      -- 1. Projects (Isolated by confirmed project keywords)
      WHEN (clean_path LIKE '%nairuthya%' OR src LIKE '%nairuthya%' OR interest LIKE '%nairuthya%')
        THEN 'project:nairuthya-whispering-wood'
      WHEN (clean_path LIKE '%coconut%' OR src LIKE '%coconut%' OR interest LIKE '%coconut%')
        THEN 'project:coconut-garden'
      WHEN (
        clean_path LIKE '%concept-iii%' OR src LIKE '%concept-iii%' OR interest LIKE '%concept-iii%' OR
        clean_path LIKE '%land-and-legacy%' OR src LIKE '%land-and-legacy%' OR
        (interest LIKE '%legacy%' AND (clean_path LIKE '%concept%' OR src LIKE '%concept%' OR interest LIKE '%concept%'))
      ) THEN 'project:concept-iii'

      -- 2. Dedicated Services
      WHEN (clean_path = '/farm-management' OR interest = 'farm management')
        THEN 'service:farm-management'
      WHEN (clean_path IN ('/managed-farmland', '/lp/managed-farmland') OR interest = 'managed farmland')
        THEN 'service:managed-farmland'
      WHEN (clean_path IN ('/lp/land-ownership', '/land-ownership') OR interest = 'land ownership')
        THEN 'service:land-ownership'

      -- 3. Events
      WHEN (clean_path LIKE '/events%' OR interest LIKE 'event attendance:%')
        THEN CASE
          WHEN NULLIF(split_part(regexp_replace(clean_path, '^/events/?', ''), '/', 1), '') IS NOT NULL
            THEN 'event:' || split_part(regexp_replace(clean_path, '^/events/?', ''), '/', 1)
          ELSE 'event:general'
        END

      -- 4. Blogs
      WHEN (clean_path LIKE '/blogs/%')
        THEN CASE
          WHEN NULLIF(split_part(regexp_replace(clean_path, '^/blogs/?', ''), '/', 1), '') IS NOT NULL
            THEN 'blog:' || split_part(regexp_replace(clean_path, '^/blogs/?', ''), '/', 1)
          ELSE 'blog:general'
        END

      -- 5. Corporate Homepage Form
      WHEN (src LIKE '%corporate home page%')
        THEN 'corporate:home'

      -- 6. Global Modal Generic Inquiry (header / floating CTA with no project context)
      WHEN (clean_path = '/' AND (src LIKE '%modal%' OR interest = 'general enquiry'))
        THEN 'corporate:general'

      -- Homepage fallback
      WHEN (clean_path = '/')
        THEN 'corporate:home'

      -- 7. Known Static Pages (Clean kebab-case matching JS)
      WHEN (clean_path IN ('/about', '/contact', '/how-it-works', '/gallery', '/disclaimer', '/privacy-policy', '/terms', '/projects'))
        THEN 'page:' || regexp_replace(clean_path, '^/+', '')

      -- 8. Explicit Ambiguity Protection (Never guessed as corporate)
      ELSE 'ambiguous:unclassified'
    END AS resolved_scope
  FROM (
    SELECT 
      id,
      CASE 
        WHEN raw_path = '' THEN '/'
        WHEN raw_path NOT LIKE '/%' THEN '/' || raw_path
        ELSE raw_path
      END AS clean_path,
      lower(btrim(coalesce(source, ''))) AS src,
      lower(btrim(coalesce(interested_in, ''))) AS interest
    FROM (
      SELECT 
        id,
        source,
        interested_in,
        regexp_replace(
          regexp_replace(
            regexp_replace(
              lower(btrim(coalesce(page_url, ''))),
              '^(https?://)?(www\.)?earthheritage\.in(:\d+)?(?=/|$)|^https?://[^/]+',
              ''
            ),
            '[?#].*$', ''
          ),
          '/+$', ''
        ) AS raw_path
      FROM public.enquiries
    ) p
  ) parsed
) sub
WHERE e.id = sub.id;

-- 3.5 Backfill normalized_interest (Identical to JS normalizeInterest)
UPDATE public.enquiries
SET normalized_interest = CASE
  WHEN lower(btrim(coalesce(interested_in, ''))) ~ 'site visit|visit enquiry|schedule visit|estate visit' 
    THEN 'site-visit'
  WHEN canonical_scope LIKE 'project:%' 
    THEN 'project-enquiry'
  WHEN lower(btrim(coalesce(interested_in, ''))) = 'farm management' OR canonical_scope = 'service:farm-management' 
    THEN 'service-farm-management'
  WHEN lower(btrim(coalesce(interested_in, ''))) = 'managed farmland' OR canonical_scope = 'service:managed-farmland' 
    THEN 'service-managed-farmland'
  WHEN lower(btrim(coalesce(interested_in, ''))) = 'land ownership' OR canonical_scope = 'service:land-ownership' 
    THEN 'service-land-ownership'
  WHEN lower(btrim(coalesce(interested_in, ''))) LIKE 'event attendance:%' OR canonical_scope LIKE 'event:%' 
    THEN 'event-attendance'
  WHEN lower(btrim(coalesce(interested_in, ''))) IN ('general enquiry', 'general inquiry', 'projects inquiry', 'general', '') 
       OR interested_in IS NULL 
    THEN 'general-enquiry'
  WHEN NULLIF(regexp_replace(regexp_replace(lower(btrim(coalesce(interested_in, ''))), '[^a-z0-9]+', '-', 'g'), '^-+|-+$', '', 'g'), '') IS NOT NULL
    THEN 'custom-' || regexp_replace(regexp_replace(lower(btrim(coalesce(interested_in, ''))), '[^a-z0-9]+', '-', 'g'), '^-+|-+$', '', 'g')
  ELSE 'general-enquiry'
END;

COMMIT;


-- ==============================================================================
-- STAGE 4: HARDENED STORED PROCEDURE & ROLE PERMISSIONS (Transactional)
-- Stored procedure submit_enquiry_safe with:
--   - Empty search_path (SET search_path = '')
--   - Schema-qualified system functions and tables
--   - Unqualified standard SQL constructs (COALESCE, NULLIF)
--   - Concurrency serialization via 64-bit advisory lock
--   - Attempt 1 capture upon first repeat
--   - Sales status preservation (status is never overwritten)
--   - Ownership set to postgres
--   - Execution granted strictly to service_role
-- ==============================================================================

BEGIN;

CREATE OR REPLACE FUNCTION public.submit_enquiry_safe(
  p_full_name pg_catalog.text,
  p_phone_number pg_catalog.text,
  p_email pg_catalog.text,
  p_interested_in pg_catalog.text,
  p_normalized_interest pg_catalog.text,
  p_message pg_catalog.text,
  p_source pg_catalog.text,
  p_page_url pg_catalog.text,
  p_canonical_scope pg_catalog.text
)
RETURNS pg_catalog.jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_lock_key pg_catalog.bigint;
  v_existing record;
  v_result pg_catalog.jsonb;
  v_history pg_catalog.jsonb;
  v_norm_phone pg_catalog.text;
  v_clean_name pg_catalog.text;
  v_clean_msg pg_catalog.text;
  v_clean_email pg_catalog.text;
BEGIN
  -- 1. Database-Level Input Verification & Normalization
  IF p_full_name IS NULL OR pg_catalog.length(pg_catalog.btrim(p_full_name)) = 0 THEN
    RAISE EXCEPTION 'Full name is required.' USING ERRCODE = '22023';
  END IF;

  IF p_phone_number IS NULL OR pg_catalog.length(pg_catalog.btrim(p_phone_number)) = 0 THEN
    RAISE EXCEPTION 'Phone number is required.' USING ERRCODE = '22023';
  END IF;

  -- Server-side canonical phone normalization matching normalizeAndValidatePhone()
  IF p_phone_number ~ '^(\+91|91)[6-9]\d{9}$' THEN
    v_norm_phone := pg_catalog.substr(p_phone_number, pg_catalog.length(p_phone_number) - 9);
  ELSIF p_phone_number ~ '^0[6-9]\d{9}$' THEN
    v_norm_phone := pg_catalog.substr(p_phone_number, 2);
  ELSE
    v_norm_phone := pg_catalog.btrim(p_phone_number);
  END IF;

  -- Validate canonical format: strictly 10-digit Indian mobile or E.164 international (excluding +91)
  IF NOT (
       v_norm_phone ~ '^[6-9]\d{9}$' 
       OR (v_norm_phone ~ '^\+[1-9]\d{6,14}$' AND v_norm_phone !~ '^\+91[6-9]\d{9}$')
     ) THEN
    RAISE EXCEPTION 'Invalid canonical phone number: must be 10-digit Indian mobile or E.164 international.'
      USING ERRCODE = '22023';
  END IF;

  IF p_canonical_scope IS NULL OR pg_catalog.length(pg_catalog.btrim(p_canonical_scope)) = 0 THEN
    RAISE EXCEPTION 'Invalid canonical scope.' USING ERRCODE = '22023';
  END IF;

  IF p_normalized_interest IS NULL OR pg_catalog.length(pg_catalog.btrim(p_normalized_interest)) = 0 THEN
    RAISE EXCEPTION 'Invalid normalized interest.' USING ERRCODE = '22023';
  END IF;

  -- Standard SQL syntax constructs (COALESCE and NULLIF are valid ANSI SQL keywords, not schema-qualified)
  v_clean_name := pg_catalog.btrim(p_full_name);
  v_clean_msg := NULLIF(pg_catalog.btrim(p_message), '');
  v_clean_email := NULLIF(pg_catalog.btrim(p_email), '');

  -- 2. Concurrency Serialization: 64-bit advisory transaction lock derived from (phone + scope + interest)
  v_lock_key := pg_catalog.hashtextextended(
    v_norm_phone || ':' || p_canonical_scope || ':' || p_normalized_interest,
    0
  );
  PERFORM pg_catalog.pg_advisory_xact_lock(v_lock_key);

  -- 3. Query for existing matching active enquiry (Row-level lock with FOR UPDATE)
  SELECT 
    id, full_name, phone_number, email, interested_in, message, source, 
    page_url, canonical_scope, normalized_interest, status, repeat_count, 
    created_at, last_enquired_at, submission_history
  INTO v_existing
  FROM public.enquiries
  WHERE phone_number = v_norm_phone
    AND canonical_scope = p_canonical_scope
    AND normalized_interest = p_normalized_interest
  ORDER BY created_at DESC
  LIMIT 1
  FOR UPDATE;

  IF FOUND THEN
    -- REPEAT ENQUIRY DETECTED:
    -- Defend against malformed history in legacy rows
    IF v_existing.submission_history IS NULL 
       OR pg_catalog.jsonb_typeof(v_existing.submission_history) != 'array' THEN
      v_history := pg_catalog.jsonb_build_array();
    ELSE
      v_history := v_existing.submission_history;
    END IF;

    -- If history has 0 entries, record Attempt 1 (Original Submission Snapshot)
    IF pg_catalog.jsonb_array_length(v_history) = 0 THEN
      v_history := pg_catalog.jsonb_build_array(
        pg_catalog.jsonb_build_object(
          'attempt', 1,
          'submitted_at', v_existing.created_at,
          'message', v_existing.message,
          'source', v_existing.source,
          'page_url', v_existing.page_url,
          'email', v_existing.email
        )
      );
    END IF;

    -- Append Attempt N (Incoming Repeat Submission Snapshot)
    v_history := v_history || pg_catalog.jsonb_build_object(
      'attempt', v_existing.repeat_count + 1,
      'submitted_at', pg_catalog.now(),
      'message', v_clean_msg,
      'source', p_source,
      'page_url', p_page_url,
      'email', v_clean_email
    );

    -- Update row
    UPDATE public.enquiries
    SET
      is_re_enquiry = true,
      repeat_count = v_existing.repeat_count + 1,
      last_enquired_at = pg_catalog.now(),
      submission_history = v_history,
      email = COALESCE(v_clean_email, v_existing.email),
      message = COALESCE(v_clean_msg, v_existing.message)
      -- CRITICAL: Existing sales status (new, contacted, qualified, closed) IS NEVER OVERWRITTEN!
    WHERE id = v_existing.id;

    v_result := pg_catalog.jsonb_build_object(
      'id', v_existing.id,
      'is_re_enquiry', true,
      'repeat_count', v_existing.repeat_count + 1,
      'status', v_existing.status,
      'created_at', v_existing.created_at,
      'last_enquired_at', pg_catalog.now(),
      'canonical_scope', p_canonical_scope,
      'normalized_interest', p_normalized_interest
    );
  ELSE
    -- NEW ENQUIRY (First submission for this contact + scope + interest):
    INSERT INTO public.enquiries (
      full_name,
      phone_number,
      raw_phone_number,
      email,
      interested_in,
      normalized_interest,
      message,
      source,
      page_url,
      canonical_scope,
      status,
      is_re_enquiry,
      repeat_count,
      created_at,
      last_enquired_at,
      submission_history
    ) VALUES (
      v_clean_name,
      v_norm_phone,
      p_phone_number,
      v_clean_email,
      p_interested_in,
      p_normalized_interest,
      v_clean_msg,
      p_source,
      p_page_url,
      p_canonical_scope,
      'new',
      false,
      1,
      pg_catalog.now(),
      pg_catalog.now(),
      '[]'::jsonb
    )
    RETURNING pg_catalog.jsonb_build_object(
      'id', id,
      'is_re_enquiry', false,
      'repeat_count', 1,
      'status', status,
      'created_at', created_at,
      'last_enquired_at', last_enquired_at,
      'canonical_scope', canonical_scope,
      'normalized_interest', normalized_interest
    ) INTO v_result;
  END IF;

  RETURN v_result;
END;
$$;

-- Security Hardening: Function Ownership & Privilege Restrictions
ALTER FUNCTION public.submit_enquiry_safe(
  pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text,
  pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text
) OWNER TO postgres;

REVOKE ALL ON FUNCTION public.submit_enquiry_safe(
  pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text,
  pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text
) FROM PUBLIC, anon, authenticated;

GRANT EXECUTE ON FUNCTION public.submit_enquiry_safe(
  pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text,
  pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text
) TO service_role;

COMMIT;


-- ==============================================================================
-- STAGE 5: POST-MIGRATION VERIFICATION QUERIES
-- Run after executing Stages 1–4 to verify database state.
-- ==============================================================================

-- 5.1 Verify Columns Exist with Proper Types and Defaults
SELECT 
  column_name, 
  data_type, 
  is_nullable, 
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
  AND table_name = 'enquiries'
  AND column_name IN (
    'raw_phone_number', 'canonical_scope', 'normalized_interest',
    'is_re_enquiry', 'repeat_count', 'last_enquired_at', 'submission_history'
  );

-- 5.2 Verify Index Validity
SELECT 
  c.relname AS index_name,
  i.indisvalid AS is_valid,
  i.indisready AS is_ready
FROM pg_index i
JOIN pg_class c ON c.oid = i.indexrelid
WHERE c.relname = 'idx_enquiries_matching_v5'
  AND c.relnamespace = 'public'::regnamespace;

-- 5.3 Verify Function Ownership and Security Definer Configuration
SELECT 
  p.proname,
  r.rolname AS owner,
  p.prosecdef AS is_security_definer,
  p.proconfig AS runtime_config
FROM pg_proc p
JOIN pg_roles r ON p.proowner = r.oid
WHERE p.proname = 'submit_enquiry_safe'
  AND p.pronamespace = 'public'::regnamespace;

-- 5.4 Verify Function Permissions (Must be: anon=false, authenticated=false, service_role=true)
SELECT 
  'anon' AS role, 
  has_function_privilege('anon', 'public.submit_enquiry_safe(text,text,text,text,text,text,text,text,text)', 'execute') AS can_execute
UNION ALL
SELECT 
  'authenticated' AS role, 
  has_function_privilege('authenticated', 'public.submit_enquiry_safe(text,text,text,text,text,text,text,text,text)', 'execute')
UNION ALL
SELECT 
  'service_role' AS role, 
  has_function_privilege('service_role', 'public.submit_enquiry_safe(text,text,text,text,text,text,text,text,text)', 'execute');

-- 5.5 Check Backfill Results
SELECT 
  canonical_scope, 
  normalized_interest, 
  is_re_enquiry, 
  repeat_count, 
  count(*) AS row_count
FROM public.enquiries
GROUP BY canonical_scope, normalized_interest, is_re_enquiry, repeat_count
ORDER BY row_count DESC;

-- 5.6 Verify Historical Rows Intact and Original Phone Numbers Preserved
SELECT 
  id,
  created_at,
  full_name,
  raw_phone_number,
  phone_number,
  canonical_scope,
  normalized_interest,
  status,
  is_re_enquiry,
  repeat_count
FROM public.enquiries
ORDER BY created_at DESC;


-- ==============================================================================
-- STAGE 6: ROLLBACK PLAN & RECOVERY PROCEDURES
-- ==============================================================================

-- 6.1 Application Rollback:
-- Revert app/api/enquiries/route.js to previous git commit. The application
-- resumes inserting standard rows via .insert([record]).

-- 6.2 Pre-Traffic Database Rollback (If rolling back before live submissions):
/*
-- Step 1 (NON-Transactional): Drop covering index concurrently outside transaction block
DROP INDEX CONCURRENTLY IF EXISTS public.idx_enquiries_matching_v5;

-- Step 2 (Transactional): Drop function, restore phone numbers, and drop added columns
BEGIN;
DROP FUNCTION IF EXISTS public.submit_enquiry_safe(
  pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text,
  pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text
);

-- Restore original phone numbers from backup
UPDATE public.enquiries 
SET phone_number = raw_phone_number 
WHERE raw_phone_number IS NOT NULL;

-- Remove added columns
ALTER TABLE public.enquiries 
  DROP COLUMN IF EXISTS canonical_scope,
  DROP COLUMN IF EXISTS normalized_interest,
  DROP COLUMN IF EXISTS is_re_enquiry,
  DROP COLUMN IF EXISTS repeat_count,
  DROP COLUMN IF EXISTS last_enquired_at,
  DROP COLUMN IF EXISTS submission_history,
  DROP COLUMN IF EXISTS raw_phone_number;
COMMIT;
*/

-- 6.3 Post-Traffic Database Rollback (If repeat submissions have already been received):
-- NOTE: If repeat submissions have arrived, dropping 'submission_history' or 'repeat_count'
-- permanently deletes live audit trail history! In this case, retain the columns:
/*
-- Step 1: Drop stored procedure
DROP FUNCTION IF EXISTS public.submit_enquiry_safe(
  pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text,
  pg_catalog.text, pg_catalog.text, pg_catalog.text, pg_catalog.text
);

-- Step 2 (NON-Transactional): Drop covering index concurrently outside transaction block
DROP INDEX CONCURRENTLY IF EXISTS public.idx_enquiries_matching_v5;
-- Retain the columns so existing live repeat history remains stored in PostgreSQL.
*/
