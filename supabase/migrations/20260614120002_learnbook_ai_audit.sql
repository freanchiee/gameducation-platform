CREATE TABLE IF NOT EXISTS ai_score_audit (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  artifact_id uuid REFERENCES artifacts(id) ON DELETE SET NULL,
  score_id uuid REFERENCES scores(id) ON DELETE SET NULL,
  event_type text NOT NULL,
  provider text NOT NULL DEFAULT 'openai',
  model text,
  input_payload jsonb NOT NULL DEFAULT '{}',
  output_payload jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE ai_score_audit ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "ai_score_audit_teacher_read" ON ai_score_audit;
CREATE POLICY "ai_score_audit_teacher_read"
  ON ai_score_audit FOR SELECT
  USING (
    EXISTS (
      SELECT 1
      FROM scores sc
      JOIN artifacts a ON a.id = sc.artifact_id
      JOIN classes c ON c.id = a.class_id
      WHERE sc.id = ai_score_audit.score_id
        AND c.teacher_id = auth.uid()
    )
  );

CREATE INDEX IF NOT EXISTS idx_ai_score_audit_artifact_id ON ai_score_audit(artifact_id);
CREATE INDEX IF NOT EXISTS idx_ai_score_audit_score_id ON ai_score_audit(score_id);
