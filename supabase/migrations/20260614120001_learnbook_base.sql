-- LearnBook Phase 2 — Initial Schema Migration
-- Apply with: supabase db reset (local) or supabase db push (remote)
-- This file is idempotent: safe to apply multiple times.
-- DDL order: enums → tables → indexes → helper functions → RLS → column privilege → views

-- =============================================================================
-- 1. ENUM TYPES
-- =============================================================================

DO $$ BEGIN
  CREATE TYPE artifact_status AS ENUM ('draft', 'submitted', 'scored');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE score_source AS ENUM ('ai', 'teacher');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE session_status AS ENUM ('lobby', 'active', 'ended');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- =============================================================================
-- 2. TABLES (FK dependency order)
-- =============================================================================

-- worlds (no FK dependencies on application tables)
CREATE TABLE IF NOT EXISTS worlds (
  id                      uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                    text        NOT NULL UNIQUE,
  display_name            text        NOT NULL,
  subject_accent          jsonb       NOT NULL DEFAULT '{}',
  artifact_schema_version integer     NOT NULL DEFAULT 1,
  created_at              timestamptz NOT NULL DEFAULT now()
);

-- classes (depends on: worlds, auth.users)
CREATE TABLE IF NOT EXISTS classes (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id  uuid        NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  world_id    uuid        NOT NULL REFERENCES worlds(id)     ON DELETE RESTRICT,
  name        text        NOT NULL,
  join_code   text        NOT NULL UNIQUE,
  is_active   boolean     NOT NULL DEFAULT true,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- students (depends on: auth.users — nullable FK for guests)
CREATE TABLE IF NOT EXISTS students (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id  uuid        UNIQUE REFERENCES auth.users(id) ON DELETE SET NULL,
  display_name  text        NOT NULL,
  email         text,
  created_at    timestamptz NOT NULL DEFAULT now()
);

-- class_enrollments (depends on: classes, students)
CREATE TABLE IF NOT EXISTS class_enrollments (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id    uuid        NOT NULL REFERENCES classes(id)  ON DELETE CASCADE,
  student_id  uuid        NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  enrolled_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (class_id, student_id)
);

-- artifacts (depends on: students, classes, worlds)
CREATE TABLE IF NOT EXISTS artifacts (
  id            uuid            PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id    uuid            NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id      uuid            NOT NULL REFERENCES classes(id)  ON DELETE CASCADE,
  world_id      uuid            NOT NULL REFERENCES worlds(id)   ON DELETE RESTRICT,
  artifact_type text            NOT NULL,
  payload       jsonb           NOT NULL DEFAULT '{}',
  status        artifact_status NOT NULL DEFAULT 'draft',
  version       integer         NOT NULL DEFAULT 1,
  created_at    timestamptz     NOT NULL DEFAULT now(),
  updated_at    timestamptz     NOT NULL DEFAULT now()
);

-- scores (depends on: artifacts)
CREATE TABLE IF NOT EXISTS scores (
  id                    uuid         PRIMARY KEY DEFAULT gen_random_uuid(),
  artifact_id           uuid         NOT NULL REFERENCES artifacts(id) ON DELETE CASCADE,
  score_value           numeric(5,2) NOT NULL,
  max_score             numeric(5,2) NOT NULL DEFAULT 100,
  rubric_id             text         NOT NULL,
  source                score_source NOT NULL,
  ai_raw_response       jsonb,
  teacher_override_note text,
  created_at            timestamptz  NOT NULL DEFAULT now()
);

-- feed_posts (depends on: artifacts, classes, students)
CREATE TABLE IF NOT EXISTS feed_posts (
  id              uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  artifact_id     uuid        NOT NULL REFERENCES artifacts(id) ON DELETE CASCADE,
  class_id        uuid        NOT NULL REFERENCES classes(id)   ON DELETE CASCADE,
  student_id      uuid        NOT NULL REFERENCES students(id)  ON DELETE CASCADE,
  caption         text,
  reaction_counts jsonb       NOT NULL DEFAULT '{}',
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- sessions (depends on: classes, worlds, auth.users)
CREATE TABLE IF NOT EXISTS sessions (
  id          uuid           PRIMARY KEY DEFAULT gen_random_uuid(),
  class_id    uuid           NOT NULL REFERENCES classes(id)    ON DELETE CASCADE,
  world_id    uuid           NOT NULL REFERENCES worlds(id)     ON DELETE RESTRICT,
  teacher_id  uuid           NOT NULL REFERENCES auth.users(id) ON DELETE RESTRICT,
  status      session_status NOT NULL DEFAULT 'lobby',
  started_at  timestamptz,
  ended_at    timestamptz,
  created_at  timestamptz    NOT NULL DEFAULT now()
);

-- session_participants (depends on: sessions, students)
CREATE TABLE IF NOT EXISTS session_participants (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   uuid        NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  student_id   uuid        NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  joined_at    timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  UNIQUE (session_id, student_id)
);

-- badges (depends on: students, worlds — world_id nullable)
CREATE TABLE IF NOT EXISTS badges (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id  uuid        NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  badge_type  text        NOT NULL,
  world_id    uuid        REFERENCES worlds(id) ON DELETE SET NULL,
  awarded_at  timestamptz NOT NULL DEFAULT now(),
  metadata    jsonb       NOT NULL DEFAULT '{}'
);

-- xp_events (depends on: students, classes, worlds — world_id nullable)
CREATE TABLE IF NOT EXISTS xp_events (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   uuid        NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  class_id     uuid        NOT NULL REFERENCES classes(id)  ON DELETE CASCADE,
  world_id     uuid        REFERENCES worlds(id) ON DELETE SET NULL,
  action_type  text        NOT NULL,
  xp_delta     integer     NOT NULL,
  reference_id uuid,
  created_at   timestamptz NOT NULL DEFAULT now()
);

-- =============================================================================
-- 3. INDEXES
-- =============================================================================

CREATE INDEX IF NOT EXISTS idx_worlds_slug                     ON worlds(slug);
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id              ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_classes_join_code               ON classes(join_code);
CREATE INDEX IF NOT EXISTS idx_classes_world_id                ON classes(world_id);
CREATE INDEX IF NOT EXISTS idx_students_auth_user_id           ON students(auth_user_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_class_id      ON class_enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_student_id    ON class_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_student_id            ON artifacts(student_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_class_id              ON artifacts(class_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_world_id              ON artifacts(world_id);
CREATE INDEX IF NOT EXISTS idx_scores_artifact_id              ON scores(artifact_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_class_id             ON feed_posts(class_id);
CREATE INDEX IF NOT EXISTS idx_feed_posts_student_id           ON feed_posts(student_id);
CREATE INDEX IF NOT EXISTS idx_sessions_class_id               ON sessions(class_id);
CREATE INDEX IF NOT EXISTS idx_sessions_teacher_id             ON sessions(teacher_id);
CREATE INDEX IF NOT EXISTS idx_session_participants_session_id ON session_participants(session_id);
CREATE INDEX IF NOT EXISTS idx_session_participants_student_id ON session_participants(student_id);
CREATE INDEX IF NOT EXISTS idx_badges_student_id               ON badges(student_id);
CREATE INDEX IF NOT EXISTS idx_xp_events_student_id            ON xp_events(student_id);
CREATE INDEX IF NOT EXISTS idx_xp_events_class_id              ON xp_events(class_id);

-- =============================================================================
-- 4. HELPER FUNCTIONS (SECURITY DEFINER — run as function owner, not caller)
-- =============================================================================

-- Returns the students.id for the current session.
-- Resolves via auth.uid() for authenticated users, or via the student_id JWT claim for guests.
-- Returns null when both are absent (safe default — all policies evaluate to false).
CREATE OR REPLACE FUNCTION current_student_id()
RETURNS uuid
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT CASE
    WHEN auth.uid() IS NOT NULL
      THEN (SELECT id FROM students WHERE auth_user_id = auth.uid())
    ELSE (auth.jwt() ->> 'student_id')::uuid
  END;
$$;

-- Returns true if the current authenticated user owns the given class.
-- Returns false for non-existent class UUIDs (EXISTS returns false on empty result).
CREATE OR REPLACE FUNCTION teacher_owns_class(p_class_id uuid)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM classes
    WHERE id = p_class_id
      AND teacher_id = auth.uid()
  );
$$;

-- =============================================================================
-- 5. ROW LEVEL SECURITY
-- =============================================================================

-- ---------------------------------------------------------------------------
-- worlds: public read, service-role-only writes
-- ---------------------------------------------------------------------------
ALTER TABLE worlds ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "worlds_read_all" ON worlds;
CREATE POLICY "worlds_read_all"
  ON worlds FOR SELECT
  USING (true);

-- ---------------------------------------------------------------------------
-- classes
-- ---------------------------------------------------------------------------
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "classes_teacher_all" ON classes;
DROP POLICY IF EXISTS "classes_student_read" ON classes;

CREATE POLICY "classes_teacher_all"
  ON classes FOR ALL
  USING (teacher_id = auth.uid());

CREATE POLICY "classes_student_read"
  ON classes FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM class_enrollments ce
      WHERE ce.class_id = id
        AND ce.student_id = current_student_id()
    )
  );

-- ---------------------------------------------------------------------------
-- students
-- ---------------------------------------------------------------------------
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "students_own_read" ON students;
DROP POLICY IF EXISTS "students_teacher_read" ON students;

CREATE POLICY "students_own_read"
  ON students FOR SELECT
  USING (id = current_student_id());

CREATE POLICY "students_teacher_read"
  ON students FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM class_enrollments ce
      JOIN classes c ON c.id = ce.class_id
      WHERE ce.student_id = students.id
        AND c.teacher_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- class_enrollments: service-role-only INSERT
-- ---------------------------------------------------------------------------
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "enrollments_own_read" ON class_enrollments;
DROP POLICY IF EXISTS "enrollments_teacher_read" ON class_enrollments;

CREATE POLICY "enrollments_own_read"
  ON class_enrollments FOR SELECT
  USING (student_id = current_student_id());

CREATE POLICY "enrollments_teacher_read"
  ON class_enrollments FOR SELECT
  USING (teacher_owns_class(class_id));

-- ---------------------------------------------------------------------------
-- artifacts
-- ---------------------------------------------------------------------------
ALTER TABLE artifacts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "artifacts_own_all" ON artifacts;
DROP POLICY IF EXISTS "artifacts_teacher_read" ON artifacts;

CREATE POLICY "artifacts_own_all"
  ON artifacts FOR ALL
  USING (student_id = current_student_id());

CREATE POLICY "artifacts_teacher_read"
  ON artifacts FOR SELECT
  USING (teacher_owns_class(class_id));

-- ---------------------------------------------------------------------------
-- scores: service-role-only INSERT/UPDATE
-- ---------------------------------------------------------------------------
ALTER TABLE scores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "scores_student_read" ON scores;
DROP POLICY IF EXISTS "scores_teacher_read" ON scores;

CREATE POLICY "scores_student_read"
  ON scores FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM artifacts a
      WHERE a.id = artifact_id
        AND a.student_id = current_student_id()
    )
  );

CREATE POLICY "scores_teacher_read"
  ON scores FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM artifacts a
      WHERE a.id = artifact_id
        AND teacher_owns_class(a.class_id)
    )
  );

-- ---------------------------------------------------------------------------
-- feed_posts
-- ---------------------------------------------------------------------------
ALTER TABLE feed_posts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "feed_class_read" ON feed_posts;
DROP POLICY IF EXISTS "feed_own_write" ON feed_posts;

CREATE POLICY "feed_class_read"
  ON feed_posts FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM class_enrollments ce
      WHERE ce.class_id = feed_posts.class_id
        AND ce.student_id = current_student_id()
    )
    OR teacher_owns_class(class_id)
  );

CREATE POLICY "feed_own_write"
  ON feed_posts FOR INSERT
  WITH CHECK (student_id = current_student_id());

-- ---------------------------------------------------------------------------
-- sessions
-- ---------------------------------------------------------------------------
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "sessions_teacher_all" ON sessions;
DROP POLICY IF EXISTS "sessions_student_read" ON sessions;

CREATE POLICY "sessions_teacher_all"
  ON sessions FOR ALL
  USING (teacher_id = auth.uid());

CREATE POLICY "sessions_student_read"
  ON sessions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM class_enrollments ce
      WHERE ce.class_id = sessions.class_id
        AND ce.student_id = current_student_id()
    )
  );

-- ---------------------------------------------------------------------------
-- session_participants
-- ---------------------------------------------------------------------------
ALTER TABLE session_participants ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "sp_own_all" ON session_participants;
DROP POLICY IF EXISTS "sp_teacher_read" ON session_participants;

CREATE POLICY "sp_own_all"
  ON session_participants FOR ALL
  USING (student_id = current_student_id());

CREATE POLICY "sp_teacher_read"
  ON session_participants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM sessions s
      WHERE s.id = session_id
        AND s.teacher_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- badges: service-role-only INSERT
-- ---------------------------------------------------------------------------
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "badges_own_read" ON badges;
DROP POLICY IF EXISTS "badges_teacher_read" ON badges;

CREATE POLICY "badges_own_read"
  ON badges FOR SELECT
  USING (student_id = current_student_id());

CREATE POLICY "badges_teacher_read"
  ON badges FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM class_enrollments ce
      JOIN classes c ON c.id = ce.class_id
      WHERE ce.student_id = badges.student_id
        AND c.teacher_id = auth.uid()
    )
  );

-- ---------------------------------------------------------------------------
-- xp_events: service-role-only INSERT
-- ---------------------------------------------------------------------------
ALTER TABLE xp_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "xp_own_read" ON xp_events;
DROP POLICY IF EXISTS "xp_teacher_read" ON xp_events;

CREATE POLICY "xp_own_read"
  ON xp_events FOR SELECT
  USING (student_id = current_student_id());

CREATE POLICY "xp_teacher_read"
  ON xp_events FOR SELECT
  USING (teacher_owns_class(class_id));

-- =============================================================================
-- 6. COLUMN-LEVEL PRIVILEGE — hide ai_raw_response from non-service-role clients
-- =============================================================================

REVOKE SELECT (ai_raw_response) ON scores FROM authenticated;
REVOKE SELECT (ai_raw_response) ON scores FROM anon;

-- =============================================================================
-- 7. VIEWS
-- =============================================================================

-- leaderboard: XP per student per class, ranked within each class
CREATE OR REPLACE VIEW leaderboard AS
SELECT
  xe.class_id,
  xe.student_id,
  s.display_name,
  SUM(xe.xp_delta)                                          AS total_xp,
  RANK() OVER (
    PARTITION BY xe.class_id
    ORDER BY SUM(xe.xp_delta) DESC
  )                                                          AS rank
FROM xp_events xe
JOIN students s ON s.id = xe.student_id
GROUP BY xe.class_id, xe.student_id, s.display_name;

-- teacher_summary: artifact and score counts per student per class
-- LEFT JOIN ensures students with no scores still appear (score_count = 0, avg/max = null)
CREATE OR REPLACE VIEW teacher_summary AS
SELECT
  a.class_id,
  a.student_id,
  s.display_name,
  COUNT(DISTINCT a.id)    AS artifact_count,
  COUNT(DISTINCT sc.id)   AS score_count,
  AVG(sc.score_value)     AS avg_score,
  MAX(sc.score_value)     AS max_score
FROM artifacts a
JOIN  students s  ON s.id  = a.student_id
LEFT JOIN scores sc ON sc.artifact_id = a.id
GROUP BY a.class_id, a.student_id, s.display_name;
