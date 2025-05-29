import { UserProfile, DailyMetrics } from './types';
import { FlexibilityTracker, RecoveryProtocol, PlannedIndulgence } from './flexibility';

export interface DailyRecommendations {
  actions: string[];
  message: string;
}

export interface FlexibilityReport {
  flexibilityScore: number;
  plannedIndulgences: PlannedIndulgence[];
  recommendation: string;
}

export class AdaptiveRecommendationEngine {
  private flexibilityTracker = new FlexibilityTracker();
  private recoveryProtocol = new RecoveryProtocol();

  generateDailyRecommendations(
    user: UserProfile,
    metrics: DailyMetrics,
    yesterdayIndulgence?: PlannedIndulgence
  ): DailyRecommendations {
    let recommendations = this.getBaseRecommendations(user, metrics);

    if (yesterdayIndulgence) {
      const recovery = this.recoveryProtocol.getRecoveryRecommendations(yesterdayIndulgence);
      recommendations = this.applyRecoveryAdjustments(recommendations, recovery);
    }

    recommendations.message = this.getSupportiveMessage(metrics, yesterdayIndulgence);
    return recommendations;
  }

  private getBaseRecommendations(user: UserProfile, metrics: DailyMetrics): DailyRecommendations {
    const actions: string[] = [];
    if (metrics.circadianAlignment < 70) actions.push('Prioritize consistent sleep times');
    if (metrics.metabolicFlexibility < 60) actions.push('Schedule moderate exercise today');
    if (user.preferences.stressManagement.includes('nature')) actions.push('Spend time in nature');
    return { actions, message: '' };
  }

  private applyRecoveryAdjustments(recs: DailyRecommendations, recovery: any): DailyRecommendations {
    recs.actions.push(`Hydrate ${recovery.hydrationMultiplier}x normal`);
    if (recovery.sleepTargetIncrease) recs.actions.push(`Add ${recovery.sleepTargetIncrease}h extra sleep`);
    if (recovery.exerciseIntensityReduction > 0) recs.actions.push('Reduce exercise intensity');
    return recs;
  }

  private getSupportiveMessage(metrics: DailyMetrics, indulgence?: PlannedIndulgence): string {
    if (indulgence) {
      const messages: Record<string, string> = {
        'alcohol': "Great job planning ahead! Today's lighter intensity will help you bounce back stronger.",
        'cheat-meal': "Enjoyed your meal? Perfect! Today we'll focus on nutrient-dense foods to keep your energy stable.",
        'rest-day': "Rest is part of progress. Your body is rebuilding stronger!",
        'late-night': "Late night? No problem. We've adjusted today's plan to help you feel energized."
      };
      return messages[indulgence.type] || "Today's plan is adjusted for optimal recovery.";
    }
    if (metrics.lagomScore > 0.8) {
      return "You're in perfect balance - lagom at its finest! Keep up this sustainable pace.";
    }
    return "Every step forward counts. Focus on progress, not perfection.";
  }

  getWeeklyFlexibilityReport(weeklyMetrics: DailyMetrics[]): FlexibilityReport {
    const adherenceScores = weeklyMetrics.map(day => {
      const planned = day.indulgences.filter(i => i.date < new Date());
      const score = planned.length > 0 ? 0.7 : 0.9;
      return score;
    });

    return {
      flexibilityScore: this.flexibilityTracker.calculateFlexibilityScore(adherenceScores),
      plannedIndulgences: weeklyMetrics.flatMap(m => m.indulgences),
      recommendation: this.getFlexibilityRecommendation(adherenceScores),
    };
  }

  private getFlexibilityRecommendation(adherenceScores: number[]): string {
    const score = this.flexibilityTracker.calculateFlexibilityScore(adherenceScores);
    if (score > 0.8) return 'Great balance of discipline and enjoyment!';
    if (score < 0.6) return 'Consider planning indulgences to avoid burnout.';
    return 'You are on track. Maintain the 80/20 balance.';
  }
}
