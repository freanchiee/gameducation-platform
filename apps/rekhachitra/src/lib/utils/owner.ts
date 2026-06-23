import { nanoid } from "nanoid";

// Stable per-browser owner id, the bridge until real auth (Phase 3) replaces it
// with the authenticated user's id. ponytail: client-supplied identity, no
// security — fine because the whole app is currently client-trusted.
const OWNER_KEY = "rk_owner_id";

export function getOwnerId(): string {
  if (typeof window === "undefined") return "local-teacher";
  try {
    let id = localStorage.getItem(OWNER_KEY);
    if (!id) {
      id = `t_${nanoid(12)}`;
      localStorage.setItem(OWNER_KEY, id);
    }
    return id;
  } catch {
    return "local-teacher";
  }
}
