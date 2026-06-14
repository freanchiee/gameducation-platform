import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';
import type { Role } from '../auth/roles';

/**
 * Creates a Supabase server client using the service-role key.
 * This client bypasses RLS entirely — use only in Next.js API routes and Server Actions.
 * Never expose the service-role key to the browser.
 */
export function createServerClient(): SupabaseClient<Database> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables.'
    );
  }

  return createClient<Database>(url, serviceRoleKey, {
    auth: { persistSession: false },
  });
}

/**
 * Resolves the role for the current server-side request by inspecting the session JWT.
 * Returns one of: 'teacher' | 'student' | 'guest'.
 *
 * @stub Full implementation requires reading the request cookies/headers (Phase 2).
 */
export async function getSessionRole(): Promise<Role> {
  throw new Error('getSessionRole: not implemented — requires request context (Phase 2)');
}
