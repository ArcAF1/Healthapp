import { useEffect, useState } from 'react'
import { calculateSchedule, phaseForTime } from '../lib/circadian'
import { calculateBMR } from '../lib/metabolic'
import { mockUser, mockHealthData } from '../lib/mockData'
import { getUserData, saveUserData } from '../lib/localStorage'

export default function Dashboard() {
  const [user] = useState(() => getUserData() || mockUser)
  const [health, setHealth] = useState(mockHealthData)

  useEffect(() => {
    saveUserData(user)
  }, [user])

  const wake = new Date()
  const [h, m] = user.preferences.wakeTime.split(':').map(Number)
  wake.setHours(h, m, 0, 0)
  const schedule = calculateSchedule(wake, user.location?.lat || 59.3)

  const bmr = calculateBMR({
    weightKg: 70,
    heightCm: 175,
    age: 30,
    sex: 'male',
    activity: 'moderate',
  })

  const phase = phaseForTime(wake, new Date())

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Welcome, {user.firstName}</h1>
      <p>Current phase: {phase}</p>
      <div className="bg-white shadow p-4 rounded">
        <h2 className="font-semibold mb-2">Daily Schedule</h2>
        <ul className="space-y-1 text-sm">
          <li>First Meal: {schedule.firstMeal.toLocaleTimeString()}</li>
          <li>Last Meal: {schedule.lastMeal.toLocaleTimeString()}</li>
          <li>Exercise: {schedule.exercise.toLocaleTimeString()}</li>
          <li>Wind Down: {schedule.windDown.toLocaleTimeString()}</li>
        </ul>
      </div>
      <div className="bg-white shadow p-4 rounded">
        <h2 className="font-semibold mb-2">Metrics</h2>
        <p>Lagom Score: {health.lagomScore}</p>
        <p>Stress Level: {health.stressLevel}</p>
        <p>BMR: {Math.round(bmr)} kcal/day</p>
      </div>
    </div>
  )
}
