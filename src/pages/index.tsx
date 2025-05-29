import { useState, useEffect } from 'react';
import { UnifiedHealthIntelligence, UserProfile, DailyContext } from '@/lib/unifiedHealth';
import { DailyDashboard } from '@/components/DailyDashboard';
import { IndulgenceTracker } from '@/components/IndulgenceTracker';
import { ProgressPath } from '@/components/ProgressPath';
import { OutdoorActivityCard } from '@/components/OutdoorActivityCard';
import { StressIndicator } from '@/components/StressIndicator';
import { MicrobiomeTracker } from '@/components/MicrobiomeTracker';
import { MicrobiomeAdvisor } from '@/lib/microbiome';

export default function Home() {
  const [dailyPlan, setDailyPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const healthSystem = new UnifiedHealthIntelligence();
  const microbiome = new MicrobiomeAdvisor();

  useEffect(() => {
    generateTodaysPlan();
  }, []);

  const generateTodaysPlan = async () => {
    setLoading(true);

    const userProfile: UserProfile = {
      wakeTime: new Date().setHours(6, 30, 0, 0),
      age: 35,
      gender: 'female',
      weight: 65,
      height: 170,
      activityLevel: 'moderate',
      goal: 'balanced-health',
    };

    const context: DailyContext = {
      lastNightSleep: 7.5,
      exercisedYesterday: true,
      caffeineToday: 2,
      hadAlcoholYesterday: false,
      lastMealTime: new Date().setHours(19, 0, 0, 0),
      currentFastingHours: 12,
      lastExerciseTime: new Date().setHours(17, 0, 0, 0),
      plannedIndulgence: null,
    };

    const plan = await healthSystem.generateDailyPlan(userProfile, context);
    plan.nutrition.microbiome = microbiome.getPersonalizedRecommendations({ currentDiversity: 0.6, preferences: [] });
    setDailyPlan(plan);
    setLoading(false);
  };

  const handleIndulgenceSave = (indulgence: any) => {
    console.log('Indulgence planned', indulgence);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-4xl mb-4">🇸🇪</div>
          <p className="text-gray-600">Calculating your optimal day...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Hälsa <span className="text-blue-600">Lagom</span>
            </h1>
            <div className="flex items-center gap-4">
              <StressIndicator level={dailyPlan?.lagomScore || 5} />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-blue-900">{dailyPlan.adaptiveMessage}</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <DailyDashboard schedule={dailyPlan.schedule} lagomScore={dailyPlan.lagomScore / 10} currentPhase={dailyPlan.currentPhase || ''} />
          <OutdoorActivityCard plan={dailyPlan.exercise.outdoor} weather={{ temp: 10 }} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <MicrobiomeTracker diversityScore={0.7} recommendations={dailyPlan.nutrition.microbiome} />
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Today's Focus</h3>
            <div className="space-y-3">
              {dailyPlan.supplements.map((supp: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{supp.name}</span>
                  <span className="text-sm font-medium">{supp.timing}</span>
                </div>
              ))}
            </div>
          </div>
          <IndulgenceTracker onSave={handleIndulgenceSave} />
        </div>
        <ProgressPath days={[{ date: new Date(), score: 0.8, hasIndulgence: false, isRestDay: false }]} />
      </main>
    </div>
  );
}
