import type { RubricTemplate } from './generate-rubric';
import { generateJson } from './json';

export interface ScoreInput {
  artifactPayload: Record<string, unknown>;
  rubricId: string;
  rubricTemplate: RubricTemplate;
}

export interface ScoreOutput {
  scoreValue: number;
  maxScore: number;
  dimensionScores: Array<{
    dimension: string;
    score: number;
    maxScore: number;
    rationale: string;
  }>;
  overallFeedback: string;
  /** Model self-reported confidence, 0.0–1.0 */
  confidence: number;
}

const scoreSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['scoreValue', 'maxScore', 'dimensionScores', 'overallFeedback', 'confidence'],
  properties: {
    scoreValue: { type: 'number' },
    maxScore: { type: 'number' },
    overallFeedback: { type: 'string' },
    confidence: { type: 'number' },
    dimensionScores: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['dimension', 'score', 'maxScore', 'rationale'],
        properties: {
          dimension: { type: 'string' },
          score: { type: 'number' },
          maxScore: { type: 'number' },
          rationale: { type: 'string' },
        },
      },
    },
  },
};

export async function scoreArtifact(input: ScoreInput): Promise<ScoreOutput> {
  return generateJson<ScoreOutput>({
    schemaName: 'learnbook_score',
    schema: scoreSchema,
    system:
      'You are LearnBook scoring engine. Score student science artifacts fairly against the rubric. Award partial credit and keep feedback specific, concise, and classroom-safe.',
    user: input,
  });
}
