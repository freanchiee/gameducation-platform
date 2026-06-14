/**
 * lib/ai — AI provider abstraction layer.
 * All four AI operations are server-side only. Import from this module in API routes only.
 * Never import lib/ai in client components.
 */

export { getOpenAIClient, getOpenAIModel } from './provider';

export { scoreArtifact } from './score';
export type { ScoreInput, ScoreOutput } from './score';

export { generateFeedback } from './feedback';
export type { FeedbackInput, FeedbackOutput } from './feedback';

export { generateRubric } from './generate-rubric';
export type { GenerateRubricInput, RubricTemplate } from './generate-rubric';

export { generateExemplar } from './generate-exemplar';
export type { GenerateExemplarInput, ExemplarOutput } from './generate-exemplar';

export { generateClaudeExemplarDraft } from './claude';
