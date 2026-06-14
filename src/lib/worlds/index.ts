import type { World } from '../supabase-lb/types';
import { WORLD_SLUGS, type WorldSlug } from './registry';

export { WORLD_SLUGS, type WorldSlug } from './registry';

/**
 * Returns true if the given string is a valid V1 world slug.
 * Use this in [world]/layout.tsx to guard against unknown slugs.
 */
export function validateWorldSlug(slug: string): slug is WorldSlug {
  return (WORLD_SLUGS as readonly string[]).includes(slug);
}

/**
 * Fetches a world record from the database by slug.
 * @stub Full implementation requires Supabase client (Phase 2).
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function getWorld(_slug: WorldSlug): Promise<World> {
  throw new Error('getWorld: not implemented — requires Supabase client (Phase 2)');
}
