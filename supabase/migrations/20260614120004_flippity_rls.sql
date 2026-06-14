-- =============================================================================
-- Row-Level Security for the flippity-clone tables.
--
-- This closes the "RLS disabled" gap that shipped with flippity-clone.
--
-- Live-session tables (strandhoot_sessions / strandhoot_participants / responses)
-- use a deliberately PERMISSIVE model: the session_code IS the access control,
-- because students join live sessions anonymously by code (no enrollment).
-- Tightening these onto the unified identity model is tracked for Phase 5.
-- Idempotent: safe to apply multiple times.
-- =============================================================================

ALTER TABLE profiles                ENABLE ROW LEVEL SECURITY;
ALTER TABLE games                   ENABLE ROW LEVEL SECURITY;
ALTER TABLE strandhoots             ENABLE ROW LEVEL SECURITY;
ALTER TABLE strandhoot_sessions     ENABLE ROW LEVEL SECURITY;
ALTER TABLE strandhoot_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE responses               ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- profiles: a user manages only their own profile row.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "profiles_self_all" ON profiles;
CREATE POLICY "profiles_self_all"
  ON profiles FOR ALL
  USING (id = auth.uid())
  WITH CHECK (id = auth.uid());

-- ---------------------------------------------------------------------------
-- games: a user manages only their own games.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "games_owner_all" ON games;
CREATE POLICY "games_owner_all"
  ON games FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- ---------------------------------------------------------------------------
-- strandhoots: public read (shareable content); writes are service-role only.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "strandhoots_read_all" ON strandhoots;
CREATE POLICY "strandhoots_read_all"
  ON strandhoots FOR SELECT
  USING (true);

-- ---------------------------------------------------------------------------
-- strandhoot_sessions: anyone can look up a session by code (to join);
-- only the creator can create / modify / delete it.
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "ss_read_all" ON strandhoot_sessions;
DROP POLICY IF EXISTS "ss_owner_insert" ON strandhoot_sessions;
DROP POLICY IF EXISTS "ss_owner_update" ON strandhoot_sessions;
DROP POLICY IF EXISTS "ss_owner_delete" ON strandhoot_sessions;
CREATE POLICY "ss_read_all"
  ON strandhoot_sessions FOR SELECT USING (true);
CREATE POLICY "ss_owner_insert"
  ON strandhoot_sessions FOR INSERT WITH CHECK (created_by = auth.uid());
CREATE POLICY "ss_owner_update"
  ON strandhoot_sessions FOR UPDATE USING (created_by = auth.uid());
CREATE POLICY "ss_owner_delete"
  ON strandhoot_sessions FOR DELETE USING (created_by = auth.uid());

-- ---------------------------------------------------------------------------
-- strandhoot_participants: open join-by-code model (see file header).
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "sp_read_all" ON strandhoot_participants;
DROP POLICY IF EXISTS "sp_insert_any" ON strandhoot_participants;
DROP POLICY IF EXISTS "sp_update_any" ON strandhoot_participants;
CREATE POLICY "sp_read_all"
  ON strandhoot_participants FOR SELECT USING (true);
CREATE POLICY "sp_insert_any"
  ON strandhoot_participants FOR INSERT WITH CHECK (true);
CREATE POLICY "sp_update_any"
  ON strandhoot_participants FOR UPDATE USING (true);

-- ---------------------------------------------------------------------------
-- responses: open within the session model (see file header).
-- ---------------------------------------------------------------------------
DROP POLICY IF EXISTS "responses_read_all" ON responses;
DROP POLICY IF EXISTS "responses_insert_any" ON responses;
DROP POLICY IF EXISTS "responses_update_any" ON responses;
CREATE POLICY "responses_read_all"
  ON responses FOR SELECT USING (true);
CREATE POLICY "responses_insert_any"
  ON responses FOR INSERT WITH CHECK (true);
CREATE POLICY "responses_update_any"
  ON responses FOR UPDATE USING (true);
