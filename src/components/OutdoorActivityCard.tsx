import React from 'react';
import { Sun, Cloud, Snowflake, TreePine } from 'lucide-react';
import { OutdoorPlan } from '@/lib/friluftsliv';

export function OutdoorActivityCard({ plan, weather }: { plan: OutdoorPlan; weather: { temp: number } }) {
  const getWeatherIcon = (temp: number) => {
    if (temp < 0) return <Snowflake className="w-6 h-6 text-blue-400" />;
    if (temp < 15) return <Cloud className="w-6 h-6 text-gray-400" />;
    return <Sun className="w-6 h-6 text-yellow-500" />;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <TreePine className="w-5 h-5 text-green-600" /> Friluftsliv Plan
        </h3>
        {getWeatherIcon(weather.temp)}
      </div>
      <div className="space-y-4">
        <div>
          <p className="text-sm text-gray-600">Optimal time</p>
          <p className="text-xl font-semibold text-gray-900">
            {plan.recommendedTime.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-2">Suggested activities</p>
          <div className="flex flex-wrap gap-2">
            {plan.activities.map((activity, idx) => (
              <span key={idx} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {activity}
              </span>
            ))}
          </div>
        </div>
        <div className="pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">{plan.message}</p>
        </div>
      </div>
    </div>
  );
}
