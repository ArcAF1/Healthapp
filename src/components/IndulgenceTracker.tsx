import React, { useState } from 'react';
import { Wine, Pizza, Coffee, Moon } from 'lucide-react';

interface IndulgenceTrackerProps {
  onSave: (indulgence: any) => void;
}

export function IndulgenceTracker({ onSave }: IndulgenceTrackerProps) {
  const [selectedType, setSelectedType] = useState('');

  const indulgenceTypes = [
    { id: 'cheat-meal', label: 'Favorite Meal', icon: Pizza, color: 'text-orange-600' },
    { id: 'alcohol', label: 'Social Drinks', icon: Wine, color: 'text-purple-600' },
    { id: 'late-night', label: 'Late Night', icon: Moon, color: 'text-indigo-600' },
    { id: 'extra-coffee', label: 'Extra Coffee', icon: Coffee, color: 'text-amber-700' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Plan Ahead, Enjoy Guilt-Free
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        {indulgenceTypes.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => setSelectedType(id)}
            className={`p-4 rounded-lg border-2 transition-all flex flex-col items-center gap-2 ${
              selectedType === id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Icon className={`w-6 h-6 ${color}`} />
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      {selectedType && (
        <button
          onClick={() => onSave({ type: selectedType, date: new Date() })}
          className="w-full mt-4 bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Schedule for Today
        </button>
      )}
    </div>
  );
}
