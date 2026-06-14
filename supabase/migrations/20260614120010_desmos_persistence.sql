-- =============================================================================
-- Desmos (Rekhachitra) persistence — moves off localStorage + in-memory relay.
--
-- 1. activities         — teacher-owned activities (slides as JSONB). RLS: owner
--                         manages own; public read when is_public.
-- 2. desmos_live_sessions — persistent backing for the /api/live relay: one row
--                         per normalized join code holding the live JSON blobs.
--                         Server-relay-only (service role); RLS on, no policies,
--                         so it is unreachable via the anon/authenticated Data API.
-- Idempotent.
-- =============================================================================

CREATE TABLE IF NOT EXISTS activities (
  id          text        PRIMARY KEY,
  user_id     uuid        REFERENCES auth.users(id) ON DELETE CASCADE,
  title       text        NOT NULL DEFAULT 'Untitled activity',
  description text,
  status      text        NOT NULL DEFAULT 'draft',
  is_public   boolean     NOT NULL DEFAULT false,
  slides      jsonb       NOT NULL DEFAULT '[]',
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS idx_activities_user_id ON activities(user_id);

ALTER TABLE activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "activities_owner_all" ON activities;
CREATE POLICY "activities_owner_all"
  ON activities FOR ALL
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());
DROP POLICY IF EXISTS "activities_public_read" ON activities;
CREATE POLICY "activities_public_read"
  ON activities FOR SELECT
  USING (is_public = true);

CREATE TABLE IF NOT EXISTS desmos_live_sessions (
  code       text        PRIMARY KEY,
  session    jsonb       NOT NULL DEFAULT '{}',
  activity   jsonb       NOT NULL DEFAULT '{}',
  students   jsonb       NOT NULL DEFAULT '{}',
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE desmos_live_sessions ENABLE ROW LEVEL SECURITY;
-- Intentionally no policies: only the server relay (service role) touches this.
