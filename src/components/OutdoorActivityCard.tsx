import React from 'react';
import { Sun, TreePine, Clock } from 'lucide-react';

interface OutdoorActivityCardProps {
  plan?: any;
  weather?: any;
}

export function OutdoorActivityCard({ plan, weather }: OutdoorActivityCardProps) {
  const mockPlan = plan || {
    recommendedTime: new Date(Date.now() + 4 * 60 * 60 * 1000),
    duration: 60,
    activities: ['hiking', 'forest-walk'],
    message: '8.5 hours of daylight today. Perfect for afternoon friluftsliv!'
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TreePine className="w-5 h-5 text-green-600" />
          Friluftsliv Time
        </h3>
        <Sun className="w-5 h-5 text-yellow-500" />
      </div>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <Clock className="w-5 h-5 text-gray-400" />
          <div>
            <p className="font-semibold">
              {mockPlan.recommendedTime.toLocaleTimeString('sv-SE', { 
                hour: '2-digit', 
                minute: '2-digit' 
              })}
            </p>
            <p className="text-sm text-gray-600">{mockPlan.duration} minutes</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {mockPlan.activities.map((activity: string, idx: number) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm"
            >
              {activity}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
