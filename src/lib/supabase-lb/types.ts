/**
 * LearnBook database types.
 *
 * REGENERATION COMMAND (run after any schema migration):
 *   supabase gen types typescript --local > lib/supabase/types.ts
 *
 * Until the Supabase CLI is run against the live schema, these are hand-maintained stubs
 * that match docs/SUPABASE_SCHEMA_PLAN.md exactly. Column names and types are authoritative.
 *
 * NOTE: The `Score` interface intentionally omits `ai_raw_response` because the column is
 * revoked from the `authenticated` and `anon` roles via column-level privilege. Use
 * `ScoreWithRaw` (below) exclusively in service-role API routes that need the raw column.
 */

// ---------------------------------------------------------------------------
// Enum types
// ---------------------------------------------------------------------------

export type ArtifactStatus = 'draft' | 'submitted' | 'scored';
export type ScoreSource = 'ai' | 'teacher';
export type SessionStatus = 'lobby' | 'active' | 'ended';

// ---------------------------------------------------------------------------
// Table interfaces
// ---------------------------------------------------------------------------

export interface World {
  id: string;
  slug: string;
  display_name: string;
  subject_accent: Record<string, unknown>;
  artifact_schema_version: number;
  created_at: string;
}

export interface Class {
  id: string;
  teacher_id: string;
  world_id: string;
  name: string;
  join_code: string;
  is_active: boolean;
  created_at: string;
}

export interface Student {
  id: string;
  auth_user_id: string | null;
  display_name: string;
  email: string | null;
  created_at: string;
}

export interface ClassEnrollment {
  id: string;
  class_id: string;
  student_id: string;
  enrolled_at: string;
}

export interface Artifact {
  id: string;
  student_id: string;
  class_id: string;
  world_id: string;
  artifact_type: string;
  payload: Record<string, unknown>;
  status: ArtifactStatus;
  version: number;
  created_at: string;
  updated_at: string;
}

export interface Score {
  id: string;
  artifact_id: string;
  score_value: number;
  max_score: number;
  rubric_id: string;
  source: ScoreSource;
  /** Excluded from non-admin queries — only accessible via service-role client. */
  ai_raw_response: Record<string, unknown> | null;
  teacher_override_note: string | null;
  created_at: string;
}

/**
 * Score row with ai_raw_response included.
 * Use ONLY in service-role API routes (e.g. POST /api/ai/score, POST /api/scores/override).
 * Never use in client components or browser-client queries.
 */
export interface ScoreWithRaw extends Score {
  ai_raw_response: Record<string, unknown> | null;
}

export interface FeedPost {
  id: string;
  artifact_id: string;
  class_id: string;
  student_id: string;
  caption: string | null;
  reaction_counts: Record<string, number>;
  created_at: string;
}

export interface Session {
  id: string;
  class_id: string;
  world_id: string;
  teacher_id: string;
  status: SessionStatus;
  started_at: string | null;
  ended_at: string | null;
  created_at: string;
}

export interface SessionParticipant {
  id: string;
  session_id: string;
  student_id: string;
  joined_at: string;
  completed_at: string | null;
}

export interface Badge {
  id: string;
  student_id: string;
  badge_type: string;
  world_id: string | null;
  awarded_at: string;
  metadata: Record<string, unknown>;
}

export interface XpEvent {
  id: string;
  student_id: string;
  class_id: string;
  world_id: string | null;
  action_type: string;
  xp_delta: number;
  reference_id: string | null;
  created_at: string;
}

export interface AiScoreAudit {
  id: string;
  artifact_id: string | null;
  score_id: string | null;
  event_type: string;
  provider: string;
  model: string | null;
  input_payload: Record<string, unknown>;
  output_payload: Record<string, unknown>;
  created_at: string;
}

// ---------------------------------------------------------------------------
// View row types
// ---------------------------------------------------------------------------

/** Row type for the leaderboard view. */
export interface LeaderboardRow {
  class_id: string;
  student_id: string;
  display_name: string;
  total_xp: number;
  rank: number;
}

/** Row type for the teacher_summary view. */
export interface TeacherSummaryRow {
  class_id: string;
  student_id: string;
  display_name: string;
  artifact_count: number;
  score_count: number;
  avg_score: number | null;
  max_score: number | null;
}

// ---------------------------------------------------------------------------
// Supabase Database type (used to type the Supabase client)
// ---------------------------------------------------------------------------

export interface Database {
  public: {
    Tables: {
      worlds: { Row: World; Insert: Omit<World, 'id' | 'created_at'>; Update: Partial<Omit<World, 'id'>> };
      classes: { Row: Class; Insert: Omit<Class, 'id' | 'created_at'>; Update: Partial<Omit<Class, 'id'>> };
      students: { Row: Student; Insert: Omit<Student, 'id' | 'created_at'>; Update: Partial<Omit<Student, 'id'>> };
      class_enrollments: { Row: ClassEnrollment; Insert: Omit<ClassEnrollment, 'id' | 'enrolled_at'>; Update: Partial<Omit<ClassEnrollment, 'id'>> };
      artifacts: { Row: Artifact; Insert: Omit<Artifact, 'id' | 'created_at' | 'updated_at'>; Update: Partial<Omit<Artifact, 'id'>> };
      scores: { Row: Score; Insert: Omit<Score, 'id' | 'created_at'>; Update: Partial<Omit<Score, 'id'>> };
      feed_posts: { Row: FeedPost; Insert: Omit<FeedPost, 'id' | 'created_at'>; Update: Partial<Omit<FeedPost, 'id'>> };
      sessions: { Row: Session; Insert: Omit<Session, 'id' | 'created_at'>; Update: Partial<Omit<Session, 'id'>> };
      session_participants: { Row: SessionParticipant; Insert: Omit<SessionParticipant, 'id' | 'joined_at'>; Update: Partial<Omit<SessionParticipant, 'id'>> };
      badges: { Row: Badge; Insert: Omit<Badge, 'id' | 'awarded_at'>; Update: Partial<Omit<Badge, 'id'>> };
      xp_events: { Row: XpEvent; Insert: Omit<XpEvent, 'id' | 'created_at'>; Update: Partial<Omit<XpEvent, 'id'>> };
      ai_score_audit: { Row: AiScoreAudit; Insert: Omit<AiScoreAudit, 'id' | 'created_at'>; Update: Partial<Omit<AiScoreAudit, 'id'>> };
    };
    Views: {
      leaderboard: { Row: LeaderboardRow };
      teacher_summary: { Row: TeacherSummaryRow };
    };
    Functions: Record<string, never>;
    Enums: {
      artifact_status: ArtifactStatus;
      score_source: ScoreSource;
      session_status: SessionStatus;
    };
  };
}
