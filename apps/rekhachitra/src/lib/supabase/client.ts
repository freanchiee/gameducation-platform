import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Browser Supabase client (anon key). Reuses the learnbook-platform project.
// Returns null when env is absent so the data layer can fall back to localStorage
// instead of crashing — the app stays usable offline / unconfigured.
let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  cached = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return cached;
}
