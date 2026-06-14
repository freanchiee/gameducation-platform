/**
 * Guest token utilities.
 * Guest tokens are signed browser tokens (httpOnly cookie, 24h TTL) that encode a student_id.
 * They are issued by POST /api/join when a guest joins a class via join code.
 *
 * @stub Full implementation requires a signing secret and cookie handling (Phase 2).
 */

/**
 * Creates a signed guest token encoding the given student ID.
 * The token is stored as an httpOnly cookie with a 24-hour TTL.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function createGuestToken(_studentId: string): string {
  throw new Error('createGuestToken: not implemented — requires signing secret (Phase 2)');
}

/**
 * Validates a guest token and returns the encoded student ID.
 * Returns null if the token is invalid, expired, or tampered with.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function validateGuestToken(_token: string): { studentId: string } | null {
  throw new Error('validateGuestToken: not implemented — requires signing secret (Phase 2)');
}
