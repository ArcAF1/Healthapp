import { UnifiedHealthIntelligence, UserProfile, DailyContext } from '@/lib/unifiedHealth';

const mockUser: UserProfile = {
  wakeTime: new Date().setHours(7, 0, 0, 0),
  age: 30,
  gender: 'male',
  weight: 80,
  height: 180,
  activityLevel: 'moderate',
  goal: 'balanced',
};

const normalContext: DailyContext = {
  lastNightSleep: 8,
  exercisedYesterday: false,
  caffeineToday: 2,
  hadAlcoholYesterday: false,
  lastMealTime: new Date().setHours(20, 0, 0, 0),
  currentFastingHours: 10,
  lastExerciseTime: new Date().setHours(18, 0, 0, 0),
  plannedIndulgence: null,
};

describe('UnifiedHealthIntelligence', () => {
  let healthSystem: UnifiedHealthIntelligence;

  beforeEach(() => {
    healthSystem = new UnifiedHealthIntelligence();
  });

  test('high stress overrides exercise recommendations', async () => {
    const stressedContext: DailyContext = {
      ...normalContext,
      lastNightSleep: 5,
      caffeineToday: 5,
      hadAlcoholYesterday: true,
    };

    const plan = await healthSystem.generateDailyPlan(mockUser, stressedContext);
    expect(plan.exercise.intensity).toBeLessThan(1);
    expect(plan.primaryFocus).toBe('stress-recovery');
    expect(plan.adaptiveMessage).toContain('recovery');
  });

  test('integrates outdoor recommendations', async () => {
    const plan = await healthSystem.generateDailyPlan(mockUser, normalContext);
    expect(plan.exercise.outdoor).toBeDefined();
    expect(plan.exercise.outdoor.activities.length).toBeGreaterThan(0);
  });
});
