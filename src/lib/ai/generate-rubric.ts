export interface GenerateRubricInput {
  worldSlug: string;
  artifactType: string;
  /** Free-text description of the subject area, used for prompt context. */
  subjectDescription: string;
}

import { generateJson } from './json';

export interface RubricTemplate {
  /** UUID stored in worlds config and referenced by scores.rubric_id */
  rubricId: string;
  worldSlug: string;
  artifactType: string;
  /** Incremented when the rubric is regenerated. */
  version: number;
  dimensions: Array<{
    name: string;
    description: string;
    maxScore: number;
    /** Criteria for full, partial, and zero credit. */
    scoringGuide: string;
  }>;
}

const rubricSchema = {
  type: 'object',
  additionalProperties: false,
  required: ['rubricId', 'worldSlug', 'artifactType', 'version', 'dimensions'],
  properties: {
    rubricId: { type: 'string' },
    worldSlug: { type: 'string' },
    artifactType: { type: 'string' },
    version: { type: 'integer' },
    dimensions: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        required: ['name', 'description', 'maxScore', 'scoringGuide'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          maxScore: { type: 'number' },
          scoringGuide: { type: 'string' },
        },
      },
    },
  },
};

export async function generateRubric(input: GenerateRubricInput): Promise<RubricTemplate> {
  return generateJson<RubricTemplate>({
    schemaName: 'learnbook_rubric',
    schema: rubricSchema,
    system:
      'You generate compact science-learning rubrics for LearnBook. Rubrics should total 100 points across 3-5 dimensions.',
    user: {
      ...input,
      requiredRubricId: `${input.worldSlug}-${input.artifactType}-v1`,
      version: 1,
    },
  });
}
