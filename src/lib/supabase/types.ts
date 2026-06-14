/**
 * Unified database types — hand-authored to match supabase/migrations
 * (LearnBook base + flippity tables). Faithful to the live schema in project
 * cvdoishawxaqiizbryuh.
 *
 * To regenerate canonically later (adds Relationships metadata):
 *   npx supabase login && npx supabase link --project-ref cvdoishawxaqiizbryuh
 *   npx supabase gen types typescript --linked > src/lib/supabase/types.ts
 * (or `--db-url <conn>` if Docker is installed)
 */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      ai_score_audit: {
        Row: {
          artifact_id: string | null
          created_at: string
          event_type: string
          id: string
          input_payload: Json
          model: string | null
          output_payload: Json
          provider: string
          score_id: string | null
        }
        Insert: {
          artifact_id?: string | null
          created_at?: string
          event_type: string
          id?: string
          input_payload?: Json
          model?: string | null
          output_payload?: Json
          provider?: string
          score_id?: string | null
        }
        Update: {
          artifact_id?: string | null
          created_at?: string
          event_type?: string
          id?: string
          input_payload?: Json
          model?: string | null
          output_payload?: Json
          provider?: string
          score_id?: string | null
        }
        Relationships: []
      }
      artifacts: {
        Row: {
          artifact_type: string
          class_id: string
          created_at: string
          id: string
          payload: Json
          status: Database["public"]["Enums"]["artifact_status"]
          student_id: string
          updated_at: string
          version: number
          world_id: string
        }
        Insert: {
          artifact_type: string
          class_id: string
          created_at?: string
          id?: string
          payload?: Json
          status?: Database["public"]["Enums"]["artifact_status"]
          student_id: string
          updated_at?: string
          version?: number
          world_id: string
        }
        Update: {
          artifact_type?: string
          class_id?: string
          created_at?: string
          id?: string
          payload?: Json
          status?: Database["public"]["Enums"]["artifact_status"]
          student_id?: string
          updated_at?: string
          version?: number
          world_id?: string
        }
        Relationships: []
      }
      badges: {
        Row: {
          awarded_at: string
          badge_type: string
          id: string
          metadata: Json
          student_id: string
          world_id: string | null
        }
        Insert: {
          awarded_at?: string
          badge_type: string
          id?: string
          metadata?: Json
          student_id: string
          world_id?: string | null
        }
        Update: {
          awarded_at?: string
          badge_type?: string
          id?: string
          metadata?: Json
          student_id?: string
          world_id?: string | null
        }
        Relationships: []
      }
      class_enrollments: {
        Row: {
          class_id: string
          enrolled_at: string
          id: string
          student_id: string
        }
        Insert: {
          class_id: string
          enrolled_at?: string
          id?: string
          student_id: string
        }
        Update: {
          class_id?: string
          enrolled_at?: string
          id?: string
          student_id?: string
        }
        Relationships: []
      }
      classes: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          join_code: string
          name: string
          teacher_id: string
          world_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          join_code: string
          name: string
          teacher_id: string
          world_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          join_code?: string
          name?: string
          teacher_id?: string
          world_id?: string
        }
        Relationships: []
      }
      feed_posts: {
        Row: {
          artifact_id: string
          caption: string | null
          class_id: string
          created_at: string
          id: string
          reaction_counts: Json
          student_id: string
        }
        Insert: {
          artifact_id: string
          caption?: string | null
          class_id: string
          created_at?: string
          id?: string
          reaction_counts?: Json
          student_id: string
        }
        Update: {
          artifact_id?: string
          caption?: string | null
          class_id?: string
          created_at?: string
          id?: string
          reaction_counts?: Json
          student_id?: string
        }
        Relationships: []
      }
      games: {
        Row: {
          created_at: string
          id: string
          spreadsheet_id: string | null
          title: string | null
          type: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          spreadsheet_id?: string | null
          title?: string | null
          type?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          spreadsheet_id?: string | null
          title?: string | null
          type?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string
          id: string
          role?: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
      responses: {
        Row: {
          experiment: string
          id: string
          session_code: string | null
          strand1: string | null
          strand1_level: number | null
          strand2: string | null
          strand2_level: number | null
          strand3: string | null
          strand3_level: number | null
          strand4: string | null
          strand4_level: number | null
          strand5: string | null
          strand5_level: number | null
          strandhoot: string | null
          student_id: string
          updated_at: string
        }
        Insert: {
          experiment?: string
          id?: string
          session_code?: string | null
          strand1?: string | null
          strand1_level?: number | null
          strand2?: string | null
          strand2_level?: number | null
          strand3?: string | null
          strand3_level?: number | null
          strand4?: string | null
          strand4_level?: number | null
          strand5?: string | null
          strand5_level?: number | null
          strandhoot?: string | null
          student_id: string
          updated_at?: string
        }
        Update: {
          experiment?: string
          id?: string
          session_code?: string | null
          strand1?: string | null
          strand1_level?: number | null
          strand2?: string | null
          strand2_level?: number | null
          strand3?: string | null
          strand3_level?: number | null
          strand4?: string | null
          strand4_level?: number | null
          strand5?: string | null
          strand5_level?: number | null
          strandhoot?: string | null
          student_id?: string
          updated_at?: string
        }
        Relationships: []
      }
      scores: {
        Row: {
          ai_raw_response: Json | null
          artifact_id: string
          created_at: string
          id: string
          max_score: number
          rubric_id: string
          score_value: number
          source: Database["public"]["Enums"]["score_source"]
          teacher_override_note: string | null
        }
        Insert: {
          ai_raw_response?: Json | null
          artifact_id: string
          created_at?: string
          id?: string
          max_score?: number
          rubric_id: string
          score_value: number
          source: Database["public"]["Enums"]["score_source"]
          teacher_override_note?: string | null
        }
        Update: {
          ai_raw_response?: Json | null
          artifact_id?: string
          created_at?: string
          id?: string
          max_score?: number
          rubric_id?: string
          score_value?: number
          source?: Database["public"]["Enums"]["score_source"]
          teacher_override_note?: string | null
        }
        Relationships: []
      }
      session_participants: {
        Row: {
          completed_at: string | null
          id: string
          joined_at: string
          session_id: string
          student_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          joined_at?: string
          session_id: string
          student_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          joined_at?: string
          session_id?: string
          student_id?: string
        }
        Relationships: []
      }
      sessions: {
        Row: {
          class_id: string
          created_at: string
          ended_at: string | null
          id: string
          started_at: string | null
          status: Database["public"]["Enums"]["session_status"]
          teacher_id: string
          world_id: string
        }
        Insert: {
          class_id: string
          created_at?: string
          ended_at?: string | null
          id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["session_status"]
          teacher_id: string
          world_id: string
        }
        Update: {
          class_id?: string
          created_at?: string
          ended_at?: string | null
          id?: string
          started_at?: string | null
          status?: Database["public"]["Enums"]["session_status"]
          teacher_id?: string
          world_id?: string
        }
        Relationships: []
      }
      strandhoot_participants: {
        Row: {
          avatar_svg: string | null
          joined_at: string
          name: string | null
          player_name: string | null
          role: string | null
          session_code: string
          student_id: string
        }
        Insert: {
          avatar_svg?: string | null
          joined_at?: string
          name?: string | null
          player_name?: string | null
          role?: string | null
          session_code: string
          student_id?: string
        }
        Update: {
          avatar_svg?: string | null
          joined_at?: string
          name?: string | null
          player_name?: string | null
          role?: string | null
          session_code?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "strandhoot_participants_session_code_fkey"
            columns: ["session_code"]
            isOneToOne: false
            referencedRelation: "strandhoot_sessions"
            referencedColumns: ["session_code"]
          },
        ]
      }
      strandhoot_sessions: {
        Row: {
          created_at: string
          created_by: string
          id: string
          session_code: string
          status: string | null
          strandhoot: string | null
          strandhoot_title: string | null
        }
        Insert: {
          created_at?: string
          created_by: string
          id?: string
          session_code: string
          status?: string | null
          strandhoot?: string | null
          strandhoot_title?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          session_code?: string
          status?: string | null
          strandhoot?: string | null
          strandhoot_title?: string | null
        }
        Relationships: []
      }
      strandhoots: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
          slug: string
          thumbnail: string | null
          url: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
          slug: string
          thumbnail?: string | null
          url: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          slug?: string
          thumbnail?: string | null
          url?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          auth_user_id: string | null
          created_at: string
          display_name: string
          email: string | null
          id: string
        }
        Insert: {
          auth_user_id?: string | null
          created_at?: string
          display_name: string
          email?: string | null
          id?: string
        }
        Update: {
          auth_user_id?: string | null
          created_at?: string
          display_name?: string
          email?: string | null
          id?: string
        }
        Relationships: []
      }
      worlds: {
        Row: {
          artifact_schema_version: number
          created_at: string
          display_name: string
          id: string
          slug: string
          subject_accent: Json
        }
        Insert: {
          artifact_schema_version?: number
          created_at?: string
          display_name: string
          id?: string
          slug: string
          subject_accent?: Json
        }
        Update: {
          artifact_schema_version?: number
          created_at?: string
          display_name?: string
          id?: string
          slug?: string
          subject_accent?: Json
        }
        Relationships: []
      }
      xp_events: {
        Row: {
          action_type: string
          class_id: string
          created_at: string
          id: string
          reference_id: string | null
          student_id: string
          world_id: string | null
          xp_delta: number
        }
        Insert: {
          action_type: string
          class_id: string
          created_at?: string
          id?: string
          reference_id?: string | null
          student_id: string
          world_id?: string | null
          xp_delta: number
        }
        Update: {
          action_type?: string
          class_id?: string
          created_at?: string
          id?: string
          reference_id?: string | null
          student_id?: string
          world_id?: string | null
          xp_delta?: number
        }
        Relationships: []
      }
    }
    Views: {
      leaderboard: {
        Row: {
          class_id: string | null
          display_name: string | null
          rank: number | null
          student_id: string | null
          total_xp: number | null
        }
        Relationships: []
      }
      teacher_summary: {
        Row: {
          artifact_count: number | null
          avg_score: number | null
          class_id: string | null
          display_name: string | null
          max_score: number | null
          score_count: number | null
          student_id: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      current_student_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      teacher_owns_class: {
        Args: { p_class_id: string }
        Returns: boolean
      }
      ensure_current_student: {
        Args: { p_display_name?: string }
        Returns: string
      }
    }
    Enums: {
      artifact_status: "draft" | "submitted" | "scored"
      score_source: "ai" | "teacher"
      session_status: "lobby" | "active" | "ended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      artifact_status: ["draft", "submitted", "scored"],
      score_source: ["ai", "teacher"],
      session_status: ["lobby", "active", "ended"],
    },
  },
} as const
