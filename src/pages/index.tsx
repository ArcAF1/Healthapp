import { useState, useEffect } from 'react';
import { DailyDashboard } from '@/components/DailyDashboard';
import { IndulgenceTracker } from '@/components/IndulgenceTracker';
import { ProgressPath } from '@/components/ProgressPath';
import { calculateCircadianSchedule } from '@/lib/circadian';
import { saveIndulgence } from '@/lib/supabase';

export default function Home() {
  const [schedule, setSchedule] = useState<any>(null);
  const [healthData, setHealthData] = useState({
    lagomScore: 0.85,
    currentPhase: 'Morning Peak',
  });

  useEffect(() => {
    const wakeTime = new Date();
    wakeTime.setHours(6, 0, 0, 0);
    const newSchedule = calculateCircadianSchedule(wakeTime, 59.3);
    setSchedule(newSchedule);
  }, []);

  const handleIndulgenceSave = async (indulgence: any) => {
    await saveIndulgence('user-id', indulgence);
    console.log('Indulgence planned:', indulgence);
  };

  if (!schedule) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Swedish Health Tracker</h1>
        <div className="grid md:grid-cols-2 gap-6">
          <DailyDashboard
            schedule={schedule}
            lagomScore={healthData.lagomScore}
            currentPhase={healthData.currentPhase}
          />
          <IndulgenceTracker onSave={handleIndulgenceSave} />
        </div>
        <div className="mt-8">
          <ProgressPath
            days={[
              { date: new Date(), score: 0.8, hasIndulgence: false, isRestDay: false },
              { date: new Date(), score: 0.7, hasIndulgence: true, isRestDay: false },
              { date: new Date(), score: 0.9, hasIndulgence: false, isRestDay: true },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
