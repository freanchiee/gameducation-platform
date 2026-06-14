export interface BadgeRuleInput {
  totalXp: number;
  scoreValue: number;
  artifactCount: number;
}

export function computeBadgeKeys(input: BadgeRuleInput): string[] {
  const badges: string[] = [];
  if (input.artifactCount >= 1) badges.push("first_submission");
  if (input.totalXp >= 50) badges.push("xp_50");
  if (input.totalXp >= 100) badges.push("xp_100");
  if (input.scoreValue >= 90) badges.push("high_accuracy");
  return badges;
}

export function computeStreakDays(submissionDates: string[]): number {
  if (submissionDates.length === 0) return 0;

  const uniqueDays = Array.from(
    new Set(
      submissionDates.map((iso) => {
        const date = new Date(iso);
        return new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())).toISOString();
      })
    )
  ).sort((a, b) => (a < b ? 1 : -1));

  let streak = 1;
  for (let i = 1; i < uniqueDays.length; i += 1) {
    const prev = new Date(uniqueDays[i - 1]);
    const current = new Date(uniqueDays[i]);
    const diffDays = Math.round((prev.getTime() - current.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays === 1) streak += 1;
    else break;
  }

  return streak;
}
