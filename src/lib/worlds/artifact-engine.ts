import { WORLD_TEMPLATES } from './templates';
import type { WorldSlug } from './registry';

export interface GenericArtifactInput {
  title: string;
  explanation: string;
  evidence: string;
}

export function scoreWorldArtifact(worldSlug: WorldSlug, input: GenericArtifactInput) {
  const template = WORLD_TEMPLATES[worldSlug];
  const combined = `${input.title} ${input.explanation} ${input.evidence}`.toLowerCase();
  const hintHits = template.rubricHints.filter((hint) =>
    hint
      .toLowerCase()
      .split(/\W+/)
      .some((word) => word.length > 4 && combined.includes(word))
  ).length;
  const lengthScore = Math.min(50, Math.round((input.explanation.length + input.evidence.length) / 8));
  const conceptScore = Math.min(50, 20 + hintHits * 15);
  const scoreValue = Math.min(100, lengthScore + conceptScore);

  return {
    scoreValue,
    maxScore: 100,
    rubricId: `${worldSlug}-${template.artifactType}-v1`,
    feedback:
      scoreValue >= 75
        ? 'Strong artifact. The explanation is specific and connected to the subject world.'
        : 'Good start. Add more precise vocabulary and clearer evidence to strengthen it.',
  };
}
