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
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Journey</h3>
      <div className="flex items-center gap-1 overflow-x-auto pb-2">
        {days.map((day, index) => {
          const height = day.score * 40 + 10; // 10-50px height
          let bgColor = 'bg-blue-400';
          if (day.isRestDay) bgColor = 'bg-green-400';
          else if (day.hasIndulgence) bgColor = 'bg-purple-400';
          else if (day.score > 0.8) bgColor = 'bg-blue-500';
          else if (day.score < 0.5) bgColor = 'bg-gray-300';
          return (
            <div key={index} className="flex flex-col items-center">
              <div className={`w-8 ${bgColor} rounded-t-lg transition-all`} style={{ height: `${height}px` }} />
              <span className="text-xs text-gray-500 mt-1">
                {new Date(day.date).getDate()}
              </span>
            </div>
          );
        })}
      </div>
      <div className="flex gap-4 mt-4 text-xs">
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 bg-blue-500 rounded" /> Progress
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 bg-green-400 rounded" /> Rest
        </span>
        <span className="flex items-center gap-1">
          <div className="w-3 h-3 bg-purple-400 rounded" /> Planned Indulgence
        </span>
      </div>
      <p className="text-sm text-gray-600 mt-4">
        Remember: The path to health isn't a straight line. Every day counts, including rest and celebration.
      </p>
    </div>
  );
}
