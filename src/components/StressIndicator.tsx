import React from 'react';
import { Heart } from 'lucide-react';


interface StressIndicatorProps {
  level: number;
}

export function StressIndicator({ level }: StressIndicatorProps) {
  const getColor = () => {
    if (level < 4) return 'text-green-500';
    if (level < 7) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getMessage = () => {
    if (level < 4) return 'Well recovered';
    if (level < 7) return 'Moderate stress';

    return 'High stress';

  };

  return (
    <div className="flex items-center gap-2">
      <Heart className={`w-5 h-5 ${getColor()} ${level > 7 ? 'animate-pulse' : ''}`} />
      <div className="text-sm">
        <div className="font-medium">HRV Status</div>
        <div className="text-xs text-gray-600">{getMessage()}</div>
      </div>
    </div>
  );
}
