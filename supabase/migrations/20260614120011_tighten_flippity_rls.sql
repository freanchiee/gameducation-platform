-- =============================================================================
-- Tighten the permissive flippity live-session write policies.
--
-- The anonymous join-by-code model stays (the session_code is the access
-- control, like Kahoot), but writes are now scoped to rows belonging to an
-- EXISTING strandhoot_session — you can no longer insert/update rows for a
-- non-existent code. This also clears the advisor `rls_policy_always_true`
-- warnings (the expressions are no longer literal `true`). SELECT stays open
-- (public live leaderboard / roster). Idempotent.
-- =============================================================================

-- strandhoot_participants (session_code is NOT NULL — part of the PK)
DROP POLICY IF EXISTS "sp_insert_any" ON strandhoot_participants;
DROP POLICY IF EXISTS "sp_insert_valid_session" ON strandhoot_participants;
CREATE POLICY "sp_insert_valid_session"
  ON strandhoot_participants FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM strandhoot_sessions s
      WHERE s.session_code = strandhoot_participants.session_code
    )
  );

DROP POLICY IF EXISTS "sp_update_any" ON strandhoot_participants;
DROP POLICY IF EXISTS "sp_update_valid_session" ON strandhoot_participants;
CREATE POLICY "sp_update_valid_session"
  ON strandhoot_participants FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM strandhoot_sessions s
      WHERE s.session_code = strandhoot_participants.session_code
    )
  );

-- responses (session_code is nullable — allow null, else require a valid session)
DROP POLICY IF EXISTS "responses_insert_any" ON responses;
DROP POLICY IF EXISTS "responses_insert_valid_session" ON responses;
CREATE POLICY "responses_insert_valid_session"
  ON responses FOR INSERT
  WITH CHECK (
    session_code IS NULL
    OR EXISTS (
      SELECT 1 FROM strandhoot_sessions s
      WHERE s.session_code = responses.session_code
    )
  );

DROP POLICY IF EXISTS "responses_update_any" ON responses;
DROP POLICY IF EXISTS "responses_update_valid_session" ON responses;
CREATE POLICY "responses_update_valid_session"
  ON responses FOR UPDATE
  USING (
    session_code IS NULL
    OR EXISTS (
      SELECT 1 FROM strandhoot_sessions s
      WHERE s.session_code = responses.session_code
    )
  );
