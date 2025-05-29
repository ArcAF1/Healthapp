




import { DailyMetrics, Recommendation, UserProfile } from './types'

export function lagomScore(metrics: DailyMetrics): number {
  const variancePenalty = Math.abs(metrics.stressLevel - 5) * 2
  return Math.max(0, 100 - variancePenalty)
}

export function generateRecommendations(profile: UserProfile, metrics: DailyMetrics): Recommendation[] {
  const recs: Recommendation[] = []
  if (metrics.circadianAlignment < 70) {
    recs.push({
      text: 'Try waking and sleeping at consistent times',
      source: 'RCT',
      effectSize: 0.3,
      confidence: 0.8
    })
  }
  if (metrics.metabolicFlexibility < 60) {
    recs.push({
      text: 'Increase daily activity to improve metabolic flexibility',
      source: 'meta-analysis',
      effectSize: 0.4,
      confidence: 0.7
    })
  }
  if (profile.preferences.stressManagement.includes('nature')) {
    recs.push({
      text: 'Spend time in nature for stress reduction',
      source: 'observational',
      effectSize: 0.2,
      confidence: 0.6
    })
  }
  return recs
}
