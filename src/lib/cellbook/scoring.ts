export interface CellbookProfilePayload {
  organelle: string;
  functionText: string;
  locationText: string;
}

export interface CellbookScoreResult {
  scoreValue: number;
  maxScore: number;
  rubricId: string;
  source: "ai";
  dimensionScores: Array<{
    dimension: string;
    score: number;
    maxScore: number;
    rationale: string;
  }>;
  overallFeedback: string;
}

const FUNCTION_KEYWORDS = ["atp", "energy", "protein", "transport", "synthesis", "membrane"];
const LOCATION_KEYWORDS = ["cytoplasm", "nucleus", "er", "golgi", "membrane", "inside"];

function keywordScore(text: string, keywords: string[], maxScore: number) {
  const normalized = text.toLowerCase();
  const hits = keywords.filter((k) => normalized.includes(k)).length;
  const ratio = Math.min(1, hits / Math.max(1, Math.ceil(keywords.length / 2)));
  return Math.round(ratio * maxScore);
}

export function scoreCellbookProfile(input: CellbookProfilePayload): CellbookScoreResult {
  const functionScore = keywordScore(input.functionText, FUNCTION_KEYWORDS, 60);
  const locationScore = keywordScore(input.locationText, LOCATION_KEYWORDS, 40);
  const total = functionScore + locationScore;

  return {
    scoreValue: total,
    maxScore: 100,
    rubricId: "cellbook-organelle-card-v1",
    source: "ai",
    dimensionScores: [
      {
        dimension: "function_accuracy",
        score: functionScore,
        maxScore: 60,
        rationale: "Function description checked against expected organelle vocabulary.",
      },
      {
        dimension: "location_accuracy",
        score: locationScore,
        maxScore: 40,
        rationale: "Location description checked against expected cellular context terms.",
      },
    ],
    overallFeedback:
      total >= 75
        ? "Strong profile. You used accurate function and location language."
        : "Good start. Add more precise biological terms to improve accuracy.",
  };
}
