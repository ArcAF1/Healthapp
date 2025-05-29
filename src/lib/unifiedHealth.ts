import { CircadianEngine, Schedule } from './circadian';
import { calculateBMR, metabolicFlexibilityScore } from './metabolic';
import { StressAdaptiveSystem, StressMetrics } from './stress';
import { FriluftslivOptimizer, OutdoorPlan } from './friluftsliv';
import { FlexibilityTracker, RecoveryProtocol, PlannedIndulgence } from './flexibility';
import { calculateHealthScore } from './healthScore';

export interface UserProfile {
  wakeTime: number;
  age: number;
  gender: 'male' | 'female';
  weight: number;
  height: number;
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active';
  goal: string;
}

export interface DailyContext {
  lastNightSleep: number;
  exercisedYesterday: boolean;
  caffeineToday: number;
  hadAlcoholYesterday: boolean;
  lastMealTime: number;
  currentFastingHours: number;
  lastExerciseTime: number;
  plannedIndulgence: PlannedIndulgence | null;
}

export interface PersonalizedDailyPlan {
  schedule: Schedule;
  nutrition: NutritionPlan;
  exercise: ExercisePlan;
  supplements: { name: string; timing: string }[];
  lagomScore: number;
  primaryFocus: string;
  adaptiveMessage: string;
  currentPhase?: string;
  weather?: any;
}

export interface NutritionPlan {
  targetCalories: number;
  macros: { protein: number; carbs: number; fat: number };
  mealTiming: string;
  focusFoods: string[];
  microbiome?: any;
}

export interface ExercisePlan {
  intensity: number;
  outdoor: OutdoorPlan;
}

export class UnifiedHealthIntelligence {
  private circadian = new CircadianEngine();
  private stress = new StressAdaptiveSystem();
  private outdoor = new FriluftslivOptimizer();
  private flexibility = new FlexibilityTracker();
  private recovery = new RecoveryProtocol();

  async generateDailyPlan(user: UserProfile, context: DailyContext): Promise<PersonalizedDailyPlan> {
    const stressMetrics = this.stress.calculateStressLevel({
      sleepQuality: context.lastNightSleep / 8,
      yesterdayExercise: context.exercisedYesterday,
      caffeineIntake: context.caffeineToday,
      alcoholYesterday: context.hadAlcoholYesterday,
    });

    const schedule = this.circadian.calculateSchedule(new Date(user.wakeTime));
    const metabolicScore = metabolicFlexibilityScore(context.currentFastingHours, !!context.lastExerciseTime, context.lastNightSleep);

    const outdoorPlan = await this.outdoor.getOptimalOutdoorTime(new Date());
    const recovery = context.plannedIndulgence ? this.recovery.getRecoveryRecommendations(context.plannedIndulgence) : null;

    const nutrition = this.integrateNutrition({ bmr: calculateBMR({ weightKg: user.weight, heightCm: user.height, age: user.age, sex: user.gender, activity: user.activityLevel }) }, stressMetrics, recovery);

    const plan: PersonalizedDailyPlan = {
      schedule: this.adjustScheduleForStress(schedule, stressMetrics),
      nutrition,
      exercise: {
        intensity: stressMetrics.recommendation.exerciseMultiplier,
        outdoor: outdoorPlan,
      },
      supplements: [],
      lagomScore: this.calculateIntegratedLagomScore(stressMetrics, metabolicScore),
      primaryFocus: this.determinePrimaryFocus(stressMetrics, recovery),
      adaptiveMessage: this.generateAdaptiveMessage(stressMetrics, outdoorPlan, recovery),
      currentPhase: this.circadian.phaseForNow(new Date(user.wakeTime)),
      weather: outdoorPlan,
    };

    return plan;
  }

  private adjustScheduleForStress(schedule: Schedule, stress: StressMetrics): Schedule {
    if (stress.stressLevel > 7) {
      return Object.entries(schedule).reduce((acc, [key, time]) => {
        acc[key as keyof Schedule] = new Date((time as Date).getTime() + 30 * 60 * 1000);
        return acc;
      }, {} as Schedule);
    }
    return schedule;
  }

  private integrateNutrition(meta: { bmr: number }, stress: StressMetrics, recovery: any): NutritionPlan {
    let calories = meta.bmr;
    if (stress.stressLevel > 7) calories *= 0.9;
    return {
      targetCalories: Math.round(calories),
      macros: { protein: 0.3 * calories / 4, carbs: 0.4 * calories / 4, fat: 0.3 * calories / 9 },
      mealTiming: stress.stressLevel > 7 ? 'small frequent meals' : 'standard 3 meals',
      focusFoods: [...stress.recommendation.nutritionFocus, ...(recovery?.nutritionFocus || [])],
    };
  }

  private determinePrimaryFocus(stress: StressMetrics, recovery: any): string {
    if (stress.stressLevel > 7) return 'stress-recovery';
    if (recovery) return 'post-indulgence-recovery';
    return 'balanced-progress';
  }

  private calculateIntegratedLagomScore(stress: StressMetrics, metabolicScore: number): number {
    const base = 0.5 * (10 - stress.stressLevel) + 0.5 * (metabolicScore / 10);
    return Math.max(0, Math.min(10, base));
  }

  private generateAdaptiveMessage(stress: StressMetrics, outdoor: OutdoorPlan, recovery: any): string {
    if (stress.stressLevel > 7) return stress.recommendation.message;
    if (recovery) return 'Easy day planned after indulgence.';
    return `Great weather expected. Consider ${outdoor.activities[0]} around ${outdoor.recommendedTime.toLocaleTimeString('sv-SE', {hour:'2-digit',minute:'2-digit'})}.`;
  }
}
