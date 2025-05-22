{/*  lib/prediction-engine.ts */}

export interface MinimalVote {
  choice: string;
  showdown: {
    optionA: string;
    optionB: string;
  };
}

export interface PredictionResult {
  topChoice: string;
  confidence: number;
  reason: string;
}

export function predictFromRecentVotes(votes: MinimalVote[]): PredictionResult {
  const choices = votes.map((v) => v.choice);
  const frequency: Record<string, number> = {};

  choices.forEach((c) => {
    frequency[c] = (frequency[c] || 0) + 1;
  });

  const top = Object.entries(frequency).sort((a, b) => b[1] - a[1])[0];
  const confidence = top ? Math.min(1, top[1] / votes.length) : 0;

  return {
    topChoice: top?.[0] || "unknown",
    confidence,
    reason: `Most recent picks skew toward '${top?.[0]}'`,
  };
}
