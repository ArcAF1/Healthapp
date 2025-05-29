import { differenceInMinutes, addMinutes, addHours } from 'date-fns'

export interface Schedule {
  coreBodyTempMin: Date
  firstMeal: Date
  lastMeal: Date
  exercise: Date
  windDown: Date
}

export function calculateSchedule(wake: Date, latitude: number): Schedule {
  const coreBodyTempMin = addHours(wake, -2)

  // Assume 16h wake period
  const sleep = addHours(wake, 16)

  const firstMeal = addMinutes(wake, 60)
  const lastMeal = addHours(sleep, -3)

  // Morning cortisol peak about 30m after waking
  const exercise = addMinutes(wake, 30)

  // Evening melatonin rise ~2h before sleep
  const windDown = addHours(sleep, -2)

  return { coreBodyTempMin, firstMeal, lastMeal, exercise, windDown }
}

export function phaseForTime(wake: Date, now: Date): string {
  const mins = differenceInMinutes(now, wake)
  if (mins < 120) return 'morning cortisol peak'
  if (mins < 480) return 'daytime active'
  if (mins < 900) return 'afternoon dip'
  return 'evening melatonin rise'
}

// Simple class wrapper for unified system
export class CircadianEngine {
  calculateSchedule(wake: Date, latitude: number = 59.3): Schedule {
    return calculateSchedule(wake, latitude)
  }

  phaseForNow(wake: Date, now: Date = new Date()): string {
    return phaseForTime(wake, now)
  }
}
