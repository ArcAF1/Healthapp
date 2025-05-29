import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';

interface DailyDashboardProps {
  schedule: any;
  lagomScore: number;
  currentPhase: string;
}

export function DailyDashboard({ schedule, lagomScore, currentPhase }: DailyDashboardProps) {
  const getLagomMessage = (score: number) => {
    if (score > 0.8) return "Perfect balance - lagom! \u2728";
    if (score > 0.6) return "Good balance, room to adjust";
    return "Time to recalibrate";
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Today's Rhythm</h2>
          <p className="text-gray-600 flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4" />
            Current phase: {currentPhase}
          </p>
        </div>

        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">
            {(lagomScore * 100).toFixed(0)}%
          </div>
          <p className="text-sm text-gray-600">{getLagomMessage(lagomScore)}</p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-xs text-blue-600 mb-1">Next Meal</p>
            <p className="font-semibold">12:30</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <p className="text-xs text-green-600 mb-1">Exercise Window</p>
            <p className="font-semibold">16:00</p>
          </div>
        </div>
      </div>
    </div>
  );
}
