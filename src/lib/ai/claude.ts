import type { ExemplarOutput, GenerateExemplarInput } from './generate-exemplar';

/**
 * Optional content-drafting hook for Claude.
 * OpenAI remains the primary scoring/feedback provider; this adapter exists only
 * for future exemplar or card-library generation experiments.
 */
export async function generateClaudeExemplarDraft(
  input: GenerateExemplarInput
): Promise<ExemplarOutput> {
  void input;
  throw new Error('Claude exemplar drafting is optional and not configured in this environment.');
}
