export class FlexibilityTracker {
  private readonly OPTIMAL_ADHERENCE = 0.8;

  calculateFlexibilityScore(weeklyAdherence: number[]): number {
    const average = weeklyAdherence.reduce((a, b) => a + b, 0) / weeklyAdherence.length;
    if (average > 0.95) return 0.7;
    if (average < 0.6) return 0.5;
    const deviation = Math.abs(average - this.OPTIMAL_ADHERENCE);
    return Math.max(0, 1 - deviation * 2);
  }
}

export interface PlannedIndulgence {
  type: 'alcohol' | 'cheat-meal' | 'rest-day' | 'late-night';
  date: Date;
  intensity: 'light' | 'moderate' | 'heavy';
  notes?: string;
}

export class RecoveryProtocol {
  getRecoveryRecommendations(indulgence: PlannedIndulgence): RecoveryPlan {
    const base = {
      hydrationMultiplier: 1.0,
      exerciseIntensityReduction: 0,
      sleepTargetIncrease: 0,
      nutritionFocus: [] as string[],
    };

    switch (indulgence.type) {
      case 'alcohol':
        return {
          ...base,
          hydrationMultiplier: indulgence.intensity === 'heavy' ? 1.5 : 1.3,
          exerciseIntensityReduction: indulgence.intensity === 'heavy' ? 0.5 : 0.2,
          sleepTargetIncrease: 1,
          nutritionFocus: ['electrolytes', 'b-vitamins', 'antioxidants'],
        };
      case 'cheat-meal':
        return {
          ...base,
          hydrationMultiplier: 1.2,
          nutritionFocus: ['fiber', 'lean-protein', 'vegetables'],
        };
      case 'late-night':
        return {
          ...base,
          sleepTargetIncrease: 0.5,
          exerciseIntensityReduction: 0.3,
          nutritionFocus: ['complex-carbs', 'magnesium'],
        };
      default:
        return base;
    }
  }

  getAlcoholRecommendations(gender: 'male' | 'female'): AlcoholGuideline {
    const weeklyLimit = gender === 'male' ? 14 : 9;
    const dailyLimit = gender === 'male' ? 3 : 2;
    return {
      weeklyLimit,
      dailyLimit,
      alcoholFreeDays: 2,
      hydrationRatio: 1.5,
    };
  }
}

interface RecoveryPlan {
  hydrationMultiplier: number;
  exerciseIntensityReduction: number;
  sleepTargetIncrease: number;
  nutritionFocus: string[];
}

interface AlcoholGuideline {
  weeklyLimit: number;
  dailyLimit: number;
  alcoholFreeDays: number;
  hydrationRatio: number;
}
