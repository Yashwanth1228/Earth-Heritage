-- ==============================================================================
-- Earth Heritage — Stage 0 Read-Only Historical Audits
-- File: supabase/migrations/PHASE_2A_STAGE_0_AUDITS.sql
-- Target: public.enquiries
-- Purpose: Read-only data audit prior to applying re-enquiry duplicate detection.
-- Safety: READ-ONLY — Contains ONLY SELECT queries. Zero writes, zero DDL, zero DML.
-- ==============================================================================

-- ==============================================================================
-- AUDIT 0.1: Baseline Row Count
-- Inspects the total volume of historical enquiries currently in the database.
-- ==============================================================================
SELECT count(*) AS total_existing_enquiries FROM public.enquiries;


-- ==============================================================================
-- AUDIT 0.2: Detect Non-Standard & Ambiguous Phone Numbers
-- Identifies records that do not strictly match 10-digit Indian mobile or E.164 international.
-- These records will be preserved untouched in phone_number and raw_phone_number.
-- ==============================================================================
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
  -- Valid E.164 international (+ followed by 7-15 digits)
  OR phone_number ~ '^\+[1-9]\d{6,14}$'
)
ORDER BY created_at DESC;


-- ==============================================================================
-- AUDIT 0.3: Detect Phone Number Format Collisions in Historical Data
-- Identifies records where two different historical strings normalize to the same digits.
-- ==============================================================================
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


-- ==============================================================================
-- AUDIT 0.4: Preview Scope and Interest Classification on Historical Records
-- Previews how existing records will be classified by the canonical backfill logic.
-- Supports full URLs, protocol-less domains, relative paths, query strings, and hashes.
-- ==============================================================================
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
      ELSE phone_number
    END AS norm_phone,
    CASE 
      WHEN page_url IS NULL OR btrim(page_url) = '' THEN '/'
      ELSE 
        COALESCE(
          NULLIF(
            regexp_replace(
              regexp_replace(
                regexp_replace(
                  lower(btrim(page_url)),
                  '^(https?://)?(www\.)?earthheritage\.in(:\d+)?(?=/|$)|^https?://[^/]+',
                  ''
                ),
                '[?#].*$', ''
              ),
              '/+$', ''
            ),
            ''
          ),
          '/'
        )
    END AS clean_path,
    lower(btrim(coalesce(source, ''))) AS src,
    lower(btrim(coalesce(interested_in, ''))) AS interest
  FROM public.enquiries
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


-- ==============================================================================
-- AUDIT 0.5: Inspect Rows that will be Flagged as ambiguous:unclassified
-- Surfaces unmapped or irregular rows so sales/admin can review them before backfill.
-- ==============================================================================
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
      WHEN page_url IS NULL OR btrim(page_url) = '' THEN '/'
      ELSE 
        COALESCE(
          NULLIF(
            regexp_replace(
              regexp_replace(
                regexp_replace(
                  lower(btrim(page_url)),
                  '^(https?://)?(www\.)?earthheritage\.in(:\d+)?(?=/|$)|^https?://[^/]+',
                  ''
                ),
                '[?#].*$', ''
              ),
              '/+$', ''
            ),
            ''
          ),
          '/'
        )
    END AS clean_path,
    lower(btrim(coalesce(source, ''))) AS src,
    lower(btrim(coalesce(interested_in, ''))) AS interest
  FROM public.enquiries
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
