/**
 * HRV-based stress system that adjusts ALL recommendations
 * Uses mock data for MVP, ready for real HRV integration
 */
export class StressAdaptiveSystem {
  private readonly STRESS_THRESHOLD = 7; // 0-10 scale

  /**
   * Mock HRV calculation - replace with real device data later
   * Research shows RMSSD 20-50ms indicates high stress
   */
  calculateStressLevel(mockInputs: {
    sleepQuality: number; // 0-1
    yesterdayExercise: boolean;
    caffeineIntake: number; // cups
    alcoholYesterday: boolean;
  }): StressMetrics {
    let stressScore = 5;
    if (mockInputs.sleepQuality < 0.7) stressScore += 2;
    if (mockInputs.yesterdayExercise) stressScore -= 1;
    if (mockInputs.caffeineIntake > 3) stressScore += 1;
    if (mockInputs.alcoholYesterday) stressScore += 1.5;

    const mockHRV = 50 - stressScore * 5; // 0-50ms range

    return {
      stressLevel: Math.max(0, Math.min(10, stressScore)),
      hrvRMSSD: mockHRV,
      recommendation: this.getStressBasedAdjustment(stressScore),
    };
  }

  getStressBasedAdjustment(stressLevel: number): StressAdjustment {
    if (stressLevel >= this.STRESS_THRESHOLD) {
      return {
        exerciseMultiplier: 0.5,
        prioritizeSleep: true,
        suggestedActivities: ['yoga', 'walking', 'meditation'],
        nutritionFocus: ['magnesium', 'omega-3', 'vitamin-b'],
        avoidances: ['high-intensity', 'caffeine-afternoon', 'alcohol'],
        message:
          "Your body needs recovery. Today's focus: gentle movement and restoration.",
      };
    }

    return {
      exerciseMultiplier: 1.0,
      prioritizeSleep: false,
      suggestedActivities: ['strength', 'cardio', 'sports'],
      nutritionFocus: ['protein', 'complex-carbs'],
      avoidances: [],
      message: "You're well-recovered! Great day for challenging yourself.",
    };
  }
}

export interface StressMetrics {
  stressLevel: number;
  hrvRMSSD: number;
  recommendation: StressAdjustment;
}

export interface StressAdjustment {
  exerciseMultiplier: number;
  prioritizeSleep: boolean;
  suggestedActivities: string[];
  nutritionFocus: string[];
  avoidances: string[];
  message: string;
}
