interface BMRInput {
  weightKg: number
  heightCm: number
  age: number
  sex: 'male' | 'female'
  activity: 'sedentary' | 'light' | 'moderate' | 'active' | 'very-active'
}

const activityMap = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  'very-active': 1.9
} as const

export function calculateBMR(input: BMRInput): number {
  const s = input.sex === 'male' ? 5 : -161
  const base = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.age + s
  return base * activityMap[input.activity]
}

export function metabolicFlexibilityScore(timeSinceMeal: number, exercised: boolean, sleepQuality: number): number {
  let score = 50
  score += Math.max(0, 12 - timeSinceMeal) * 2
  if (exercised) score += 10
  score += (sleepQuality - 5) * 5
  return Math.max(0, Math.min(100, score))
}

export function glucoseImpact(carbs: number, protein: number, fiber: number, exercisedWithin2h: boolean): number {
  let impact = carbs * 4 + protein * 1.5 - fiber * 2
  if (exercisedWithin2h) impact -= 20
  return impact
}

export function predictEnergyLevel(hoursSinceMeal: number, carbLoad: number): number {
  let level = 50
  level += -carbLoad / 10
  level += -hoursSinceMeal * 5
  return Math.max(0, Math.min(100, level))
}

export type { BMRInput }
