-- =============================================================================
-- Security hardening: lock down RLS-bypassing views.
--
-- Postgres views bypass RLS by default and are exposed through the Data API.
-- LearnBook's `leaderboard` and `teacher_summary` views aggregate xp_events /
-- scores across ALL classes, so leaving them readable by anon/authenticated
-- would leak cross-class data once real rows exist.
--
-- Lock them to service-role only for now. Phase 4 (porting the leaderboard /
-- teacher dashboard) wires feature access through a safe server-side path
-- (service-role query) or a security-invoker redesign scoped to the caller.
-- Idempotent.
-- =============================================================================

REVOKE ALL ON TABLE public.leaderboard      FROM anon, authenticated;
REVOKE ALL ON TABLE public.teacher_summary  FROM anon, authenticated;
