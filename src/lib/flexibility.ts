


/**
 * Implements 80/20 rule for sustainable behavior change
 * Research shows 80% adherence with 20% flexibility has best long-term outcomes
 */
export class FlexibilityTracker {
  private readonly OPTIMAL_ADHERENCE = 0.8; // 80% target

  calculateFlexibilityScore(weeklyAdherence: number[]): number {
    const average = weeklyAdherence.reduce((a, b) => a + b, 0) / weeklyAdherence.length;

    // Penalize both too rigid (>95%) and too loose (<60%) adherence
    if (average > 0.95) return 0.7; // Too rigid, risk of burnout
    if (average < 0.6) return 0.5;   // Too loose, limited progress

    // Optimal range 75-85%
    const deviation = Math.abs(average - this.OPTIMAL_ADHERENCE);
    return Math.max(0, 1 - (deviation * 2));
  }
}

export interface PlannedIndulgence {
  type: 'alcohol' | 'cheat-meal' | 'rest-day' | 'late-night';
  date: Date;
  intensity: 'light' | 'moderate' | 'heavy';
  notes?: string;
}

export class RecoveryProtocol {

  /**
   * Based on research showing recovery needs vary by indulgence type
   */
  getRecoveryRecommendations(indulgence: PlannedIndulgence): RecoveryPlan {
    const baseRecommendations = {

      hydrationMultiplier: 1.0,
      exerciseIntensityReduction: 0,
      sleepTargetIncrease: 0,
      nutritionFocus: [] as string[],
    };

    switch (indulgence.type) {
      case 'alcohol':
        return {
          ...baseRecommendations,
          hydrationMultiplier: indulgence.intensity === 'heavy' ? 1.5 : 1.3,
          exerciseIntensityReduction: indulgence.intensity === 'heavy' ? 0.5 : 0.2,
          sleepTargetIncrease: 1, // Extra hour
          nutritionFocus: ['electrolytes', 'b-vitamins', 'antioxidants'],
        };

      case 'cheat-meal':
        return {
          ...baseRecommendations,
          hydrationMultiplier: 1.2,
          exerciseIntensityReduction: 0, // No reduction needed
          nutritionFocus: ['fiber', 'lean-protein', 'vegetables'],
        };

      case 'late-night':
        return {
          ...baseRecommendations,
          sleepTargetIncrease: 0.5,
          exerciseIntensityReduction: 0.3,
          nutritionFocus: ['complex-carbs', 'magnesium'],
        };

      default:
        return baseRecommendations;
    }
  }

  /**
   * Swedish moderate drinking guidelines
   * Men: ≤14 standard drinks/week, Women: ≤9 standard drinks/week
   */
  getAlcoholRecommendations(gender: 'male' | 'female'): AlcoholGuideline {
    const weeklyLimit = gender === 'male' ? 14 : 9;
    const dailyLimit = gender === 'male' ? 3 : 2;

    return {
      weeklyLimit,
      dailyLimit,
      alcoholFreeDays: 2, // Minimum per week
      hydrationRatio: 1.5, // 1.5 glasses water per alcoholic drink
    };
  }
}

interface RecoveryPlan {
  hydrationMultiplier: number;
  exerciseIntensityReduction: number; // 0-1, where 1 = complete rest
  sleepTargetIncrease: number; // hours
  nutritionFocus: string[];
}

interface AlcoholGuideline {
  weeklyLimit: number;
  dailyLimit: number;
  alcoholFreeDays: number;
  hydrationRatio: number;
}
