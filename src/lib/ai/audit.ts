import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/lib/supabase-lb/types';
import { getOpenAIModel } from './provider';

interface AuditInput {
  artifactId?: string | null;
  scoreId?: string | null;
  eventType: string;
  inputPayload: Record<string, unknown>;
  outputPayload: Record<string, unknown>;
}

export async function writeAiAudit(
  supabase: SupabaseClient<Database>,
  input: AuditInput
): Promise<void> {
  await supabase.from('ai_score_audit').insert({
    artifact_id: input.artifactId ?? null,
    score_id: input.scoreId ?? null,
    event_type: input.eventType,
    provider: 'openai',
    model: getOpenAIModel(),
    input_payload: input.inputPayload,
    output_payload: input.outputPayload,
  });
}
