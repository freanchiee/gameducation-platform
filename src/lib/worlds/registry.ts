/**
 * Canonical list of V1 world slugs.
 * A world is valid if and only if its slug exists in this array AND in the worlds table.
 * Any code referencing a world slug must validate against WORLD_SLUGS at startup or request time.
 */
export const WORLD_SLUGS = ['cellbook', 'organistagram', 'reactagram', 'physigram'] as const;

/** Union type of all valid world slugs. */
export type WorldSlug = (typeof WORLD_SLUGS)[number];
