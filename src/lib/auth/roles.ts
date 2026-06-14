/**
 * The three roles that can be assigned to a LearnBook session.
 * Every authenticated or guest session holds exactly one of these values.
 */
export type Role = 'teacher' | 'student' | 'guest';

/**
 * Resolves the role for the current server-side request.
 * Inspects the session JWT claims:
 *   - auth.uid() present + teacher lookup → 'teacher'
 *   - auth.uid() present + students match → 'student'
 *   - no auth.uid(), guest token present  → 'guest'
 *
 * @stub Full implementation requires Supabase server client (Phase 2).
 */
export async function getSessionRole(): Promise<Role> {
  throw new Error('getSessionRole: not implemented — requires Supabase server client');
}
