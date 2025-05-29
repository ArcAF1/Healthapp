
import React from 'react'
import { Leaf, TrendingUp } from 'lucide-react'

interface MicrobiomeTrackerProps {
  diversityScore: number
  recommendations: any
}

export function MicrobiomeTracker({ diversityScore, recommendations }: MicrobiomeTrackerProps) {
  const getDiversityColor = (score: number) => {
    if (score > 0.8) return 'text-green-600'
    if (score > 0.5) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          Gut Health
        </h3>
        <TrendingUp className="w-5 h-5 text-gray-400" />
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-end mb-2">
          <span className="text-sm text-gray-600">Fiber Diversity</span>
          <span className={`text-2xl font-bold ${getDiversityColor(diversityScore)}`}>{Math.round(diversityScore * 30)}/30</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full transition-all ${diversityScore > 0.8 ? 'bg-green-500' : diversityScore > 0.5 ? 'bg-yellow-500' : 'bg-red-500'}`}
            style={{ width: `${diversityScore * 100}%` }}
          />
        </div>
      </div>

      <div className="space-y-2">
        <p className="text-sm font-medium text-gray-700">This week, try:</p>
        {recommendations?.targetFoods?.slice(0, 3).map((food: any, idx: number) => (
          <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
            <span className="w-2 h-2 bg-green-400 rounded-full" />
            {food.name} - {food.benefits[0]}
          </div>
        ))}
      </div>
    </div>
  )
}
