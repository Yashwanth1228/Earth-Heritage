import { createClient } from '@supabase/supabase-js';

// Server-only environment variables (strictly private, never prefixed with NEXT_PUBLIC_)
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

/**
 * Check whether server-side Supabase credentials are configured
 */
export const isSupabaseAdminConfigured = Boolean(supabaseUrl && supabaseSecretKey);

/**
 * Server-only Supabase client initialized with the privileged Secret Key.
 * 
 * SECURITY NOTICE:
 * - This client operates with administrative privileges and bypasses Row Level Security (RLS).
 * - MUST NEVER be imported into or executed within client components or browser bundles.
 * - Used exclusively in secure server-side Route Handlers and Server Actions.
 */
export const supabaseAdmin = isSupabaseAdminConfigured
  ? createClient(supabaseUrl, supabaseSecretKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    })
  : null;

export default supabaseAdmin;
