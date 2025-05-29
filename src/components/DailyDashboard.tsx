import React from 'react';

import { CircadianSchedule } from '@/lib/circadian';

export function DailyDashboard({
  schedule,
  lagomScore,
  currentPhase,
}: {
  schedule: CircadianSchedule;
  lagomScore: number;
  currentPhase: string;
}) {
  const getLagomMessage = (score: number) => {
    if (score > 0.8) return 'Perfect balance - lagom! 🌟';
    if (score > 0.6) return 'Good balance, room to adjust';
    return 'Time to recalibrate';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Today's Rhythm</h2>
          <p className="text-gray-600">Current phase: {currentPhase}</p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-blue-600">{(lagomScore * 100).toFixed(0)}%</div>
          <p className="text-sm text-gray-600">{getLagomMessage(lagomScore)}</p>
        </div>
      </div>
      <div className="space-y-4">
        {Object.entries(schedule).map(([key, time]) => (
          <div key={key} className="flex justify-between items-center py-2 border-b border-gray-100">
            <span className="text-gray-700 capitalize">
              {key.replace(/([A-Z])/g, ' $1').trim()}
            </span>
            <span className="font-medium text-gray-900">
              {new Date(time).toLocaleTimeString('sv-SE', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
