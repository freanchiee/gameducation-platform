import type { RubricTemplate } from './generate-rubric';
import { generateJson } from './json';

export interface GenerateExemplarInput {
  worldSlug: string;
  artifactType: string;
  rubricTemplate: RubricTemplate;
  targetScoreLevel: 'basic' | 'proficient' | 'exemplary';
}

export interface ExemplarOutput {
  /** Synthetic artifact payload in the world's JSONB schema. */
  artifactPayload: Record<string, unknown>;
  /** Score range the exemplar should achieve when scored against the rubric. */
  expectedScoreRange: { min: number; max: number };
  /** Explanation of why this exemplar meets the target score level. */
  annotationNotes: string;
}

const exemplarSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['artifactPayload', 'expectedScoreRange', 'annotationNotes'],
  properties: {
    artifactPayload: {
      type: 'object',
      additionalProperties: true,
    },
    expectedScoreRange: {
      type: 'object',
      additionalProperties: false,
      required: ['min', 'max'],
      properties: {
        min: { type: 'number' },
        max: { type: 'number' },
      },
    },
    annotationNotes: { type: 'string' },
  },
};

export async function generateExemplar(input: GenerateExemplarInput): Promise<ExemplarOutput> {
  return generateJson<ExemplarOutput>({
    schemaName: 'learnbook_exemplar',
    schema: exemplarSchema,
    strict: false,
    system:
      'You generate synthetic student science artifacts for teacher calibration. Do not use real student data.',
    user: input,
  });
}
