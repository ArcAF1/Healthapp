

import { useState } from 'react'
import { calculateSchedule, phaseForTime } from '../lib/circadian'

export default function Home() {
  const [wakeTime, setWakeTime] = useState('07:00')
  const wake = new Date()
  const [h, m] = wakeTime.split(':').map(Number)
  wake.setHours(h, m, 0, 0)
  const schedule = calculateSchedule(wake, 59.3)
  const phase = phaseForTime(wake, new Date())

  return (
    <main className="p-4 font-sans">
      <h1 className="text-xl mb-2">Circadian Schedule</h1>
      <label>
        Wake Time:
        <input
          type="time"
          value={wakeTime}
          onChange={(e) => setWakeTime(e.target.value)}
          className="border ml-2"
        />
      </label>
      <ul className="mt-4 space-y-1">
        <li>Core Temp Min: {schedule.coreBodyTempMin.toLocaleTimeString()}</li>
        <li>First Meal: {schedule.firstMeal.toLocaleTimeString()}</li>
        <li>Last Meal: {schedule.lastMeal.toLocaleTimeString()}</li>
        <li>Exercise: {schedule.exercise.toLocaleTimeString()}</li>
        <li>Wind Down: {schedule.windDown.toLocaleTimeString()}</li>
      </ul>
      <p className="mt-4">Current Phase: {phase}</p>
    </main>
  )
}
