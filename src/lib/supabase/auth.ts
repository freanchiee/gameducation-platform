import { createClient } from "./server"

export type Profile = { id: string; role: string }

/**
 * Resolve the current authenticated user and their profile (role) on the server.
 * Uses getUser() (not getSession) so the token is verified — per Supabase guidance.
 */
export async function getUserAndProfile() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { user: null, profile: null as Profile | null }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, role")
    .eq("id", user.id)
    .maybeSingle()

  return { user, profile: (profile as Profile | null) ?? null }
}
