import React from 'react';
import { MicrobiomeRecommendation } from '@/lib/microbiome';

export function MicrobiomeTracker({ diversityScore, recommendations }: { diversityScore: number; recommendations: MicrobiomeRecommendation }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Microbiome Diversity</h3>
      <p className="text-2xl font-bold text-green-600 mb-2">{Math.round(diversityScore * 100)}%</p>
      <p className="text-sm text-gray-600 mb-4">{recommendations.message}</p>
      <ul className="list-disc list-inside space-y-1 text-sm">
        {recommendations.weeklyPlan.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ul>
    </div>
  );
}
