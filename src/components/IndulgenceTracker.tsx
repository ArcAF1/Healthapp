import React, { useState } from 'react';
import { PlannedIndulgence } from '@/lib/flexibility';

export function IndulgenceTracker({ onSave }: { onSave: (indulgence: PlannedIndulgence) => void }) {
  const [indulgence, setIndulgence] = useState<Partial<PlannedIndulgence>>({
    type: 'cheat-meal',
    intensity: 'moderate',
    date: new Date(),
  });

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 max-w-md mx-auto">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Plan Your Indulgence</h3>
      <p className="text-sm text-gray-600 mb-6">Life is about balance. Planning ahead helps you enjoy without guilt.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
          <select
            value={indulgence.type}
            onChange={(e) => setIndulgence({ ...indulgence, type: e.target.value as any })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="cheat-meal">Favorite Meal 🍕</option>
            <option value="alcohol">Drinks with Friends 🍷</option>
            <option value="rest-day">Full Rest Day 🏋️</option>
            <option value="late-night">Late Night Out 🌙</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Intensity</label>
          <div className="flex gap-2">
            {['light', 'moderate', 'heavy'].map((i) => (
              <button
                key={i}
                onClick={() => setIndulgence({ ...indulgence, intensity: i as any })}
                className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                  indulgence.intensity === i ? 'bg-blue-50 border-blue-500 text-blue-700' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {i.charAt(0).toUpperCase() + i.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes (optional)</label>
          <input
            type="text"
            placeholder="Birthday party, date night, etc."
            value={indulgence.notes || ''}
            onChange={(e) => setIndulgence({ ...indulgence, notes: e.target.value })}
            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={() => indulgence.date && indulgence.intensity && indulgence.type && onSave(indulgence as PlannedIndulgence)}
          className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors font-medium"
        >
          Save Plan
        </button>
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">💚 Tomorrow's recommendations will automatically adjust for optimal recovery</p>
      </div>
    </div>
  );
}
