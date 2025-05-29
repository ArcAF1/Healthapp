import React from 'react';

interface ProgressPathProps {
  days: Array<{
    date: Date;
    score: number;
    hasIndulgence: boolean;
    isRestDay: boolean;
  }>;
}

export function ProgressPath({ days }: ProgressPathProps) {
  const mockDays = days?.length > 0 ? days : Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - (6 - i) * 24 * 60 * 60 * 1000),
    score: 0.6 + Math.random() * 0.3,
    hasIndulgence: i === 5,
    isRestDay: i === 3,
  }));

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Week</h3>
      
      <div className="flex items-end gap-1 h-24">
        {mockDays.map((day, index) => {
          const height = day.score * 100;
          let bgColor = 'bg-blue-400';
          
          if (day.isRestDay) bgColor = 'bg-green-400';
          else if (day.hasIndulgence) bgColor = 'bg-purple-400';
          else if (day.score > 0.8) bgColor = 'bg-blue-500';
          
          return (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className={`w-full ${bgColor} rounded-t transition-all`}
                style={{ height: `${height}%` }}
              />
              <span className="text-xs text-gray-500 mt-1">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
