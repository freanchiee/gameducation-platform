// Compatibility shim for ported flippity-clone code that imports `@/utils/supabase`.
//
// Deliberately UNTYPED (no <Database> generic), matching flippity's original
// `createClient(url, key)`. Ported flippity code was written against an untyped
// client, so typing it here would surface ~150 false-positive errors. Our own
// (new) code uses the typed client in `@/lib/supabase/client` instead.
//
// Backed by @supabase/ssr's browser client so it still shares the cookie session.
import { createBrowserClient } from "@supabase/ssr"

export const createSupabaseClient = () =>
  createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

// Singleton browser client (matches flippity's original `supabase` export).
export const supabase = createSupabaseClient()
