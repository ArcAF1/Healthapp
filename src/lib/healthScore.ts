export interface ScoreInput {
  physicalActivity: number
  sleepConsistency: number
  nutritionQuality: number
  stressBalance: number
  lagomMultiplier: number
}

export function calculateHealthScore(input: ScoreInput): number {
  const base =
    input.physicalActivity * 0.25 +
    input.sleepConsistency * 0.25 +
    input.nutritionQuality * 0.25 +
    input.stressBalance * 0.25
  return base * input.lagomMultiplier
}
