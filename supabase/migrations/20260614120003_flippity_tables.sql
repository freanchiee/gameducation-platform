-- =============================================================================
-- Flippity-clone (gameducation-platform) tables, folded into the unified schema.
--
-- Name collisions with the LearnBook schema are renamed:
--   flippity "sessions"     -> "strandhoot_sessions"
--   flippity "participants" -> "strandhoot_participants"
--
-- Identity note: LearnBook models learners via the `students` table; flippity
-- uses `profiles(id, role)` keyed to auth.users. Both are kept side-by-side for
-- now and converge in Phase 5 (see supabase/SCHEMA_NOTES.md).
-- Idempotent: safe to apply multiple times.
-- =============================================================================

-- profiles: lightweight role record keyed directly to an auth user.
CREATE TABLE IF NOT EXISTS profiles (
  id         uuid        PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role       text        NOT NULL DEFAULT 'student',
  created_at timestamptz NOT NULL DEFAULT now()
);

-- games: a saved game built from a Google Sheet.
CREATE TABLE IF NOT EXISTS games (
  id             uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid        REFERENCES auth.users(id) ON DELETE CASCADE,
  title          text,
  type           text,
  spreadsheet_id text,
  created_at     timestamptz NOT NULL DEFAULT now()
);

-- strandhoots: published, shareable strandhoot content (templates/definitions).
CREATE TABLE IF NOT EXISTS strandhoots (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        text        NOT NULL,
  slug        text        NOT NULL UNIQUE,
  url         text        NOT NULL,
  description text,
  thumbnail   text,
  created_at  timestamptz NOT NULL DEFAULT now()
);

-- strandhoot_sessions: a live strandhoot session (was flippity "sessions").
-- session_code is the short, human-friendly join key (UNIQUE so it can be an FK target).
CREATE TABLE IF NOT EXISTS strandhoot_sessions (
  id               uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_code     text        NOT NULL UNIQUE,
  created_by       uuid        NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status           text        DEFAULT 'lobby',
  strandhoot       text,
  strandhoot_title text,
  created_at       timestamptz NOT NULL DEFAULT now()
);

-- strandhoot_participants: a participant in a live session (was flippity "participants").
-- student_id defaults to a generated uuid to support anonymous join-by-code.
CREATE TABLE IF NOT EXISTS strandhoot_participants (
  session_code text        NOT NULL REFERENCES strandhoot_sessions(session_code) ON DELETE CASCADE,
  student_id   uuid        NOT NULL DEFAULT gen_random_uuid(),
  name         text,
  player_name  text,
  role         text,
  avatar_svg   text,
  joined_at    timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (session_code, student_id)
);

-- responses: a participant's strand-by-strand responses within a session.
CREATE TABLE IF NOT EXISTS responses (
  id            uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  session_code  text        REFERENCES strandhoot_sessions(session_code) ON DELETE CASCADE,
  student_id    uuid        NOT NULL,
  experiment    text        NOT NULL DEFAULT '',
  strandhoot    text,
  strand1       text,
  strand1_level integer,
  strand2       text,
  strand2_level integer,
  strand3       text,
  strand3_level integer,
  strand4       text,
  strand4_level integer,
  strand5       text,
  strand5_level integer,
  updated_at    timestamptz NOT NULL DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_games_user_id                     ON games(user_id);
CREATE INDEX IF NOT EXISTS idx_strandhoots_slug                  ON strandhoots(slug);
CREATE INDEX IF NOT EXISTS idx_strandhoot_sessions_created_by    ON strandhoot_sessions(created_by);
CREATE INDEX IF NOT EXISTS idx_strandhoot_sessions_session_code  ON strandhoot_sessions(session_code);
CREATE INDEX IF NOT EXISTS idx_strandhoot_participants_session   ON strandhoot_participants(session_code);
CREATE INDEX IF NOT EXISTS idx_responses_session_code            ON responses(session_code);
CREATE INDEX IF NOT EXISTS idx_responses_student_id              ON responses(student_id);
