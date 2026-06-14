import type { ScoreOutput } from './score';
import { generateJson } from './json';

export interface FeedbackInput {
  artifactPayload: Record<string, unknown>;
  scoreOutput: ScoreOutput;
  studentDisplayName: string;
}

export interface FeedbackOutput {
  /** 2–4 sentence personalised narrative for the student. */
  feedbackText: string;
  /** Ordered list of actionable improvement suggestions. */
  suggestedImprovements: string[];
}

const feedbackSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['feedbackText', 'suggestedImprovements'],
  properties: {
    feedbackText: { type: 'string' },
    suggestedImprovements: {
      type: 'array',
      items: { type: 'string' },
    },
  },
};

export async function generateFeedback(input: FeedbackInput): Promise<FeedbackOutput> {
  return generateJson<FeedbackOutput>({
    schemaName: 'learnbook_feedback',
    schema: feedbackSchema,
    system:
      'You are a supportive science teacher. Produce encouraging, specific feedback based on the score. Keep it age-appropriate and actionable.',
    user: input,
  });
}
