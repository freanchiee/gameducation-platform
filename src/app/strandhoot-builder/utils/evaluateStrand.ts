type EvaluationLogic = {
  keywords: string[];
  concepts: string[];
  exemplars?: string[];
  suggestions?: string[];
};

type EvaluationResult = {
  level: number;
  keywords: string[];
  concepts: string[];
  suggestions?: string[];
};

export function evaluateStrand(
  input: string,
  strandId: string,
  evaluationLogic: EvaluationLogic | undefined
): EvaluationResult {
  if (!input || !evaluationLogic) {
    return { level: 1, keywords: [], concepts: [], suggestions: [] };
  }

  const lowerInput = input.toLowerCase();
  const keywordMatches = evaluationLogic.keywords.filter((kw) =>
    lowerInput.includes(kw.toLowerCase())
  );

  const conceptMatches = evaluationLogic.concepts.filter((concept) =>
    lowerInput.includes(concept.toLowerCase())
  );

  const totalMatch = keywordMatches.length + conceptMatches.length;

  let level = 1;
  if (totalMatch >= 5) level = 8;
  else if (totalMatch === 4) level = 6;
  else if (totalMatch === 3) level = 5;
  else if (totalMatch === 2) level = 4;
  else if (totalMatch === 1) level = 3;

  return {
    level,
    keywords: keywordMatches,
    concepts: conceptMatches,
    suggestions: evaluationLogic.suggestions ?? [],
  };
}
