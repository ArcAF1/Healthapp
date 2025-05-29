import type { PlannedIndulgence } from './flexibility'

export type Chronotype = 'morning' | 'evening' | 'intermediate'

export interface UserPreferences {
  flexibilityMode: 'strict' | 'balanced' | 'flexible'
  plannedIndulgenceDays: string[]
  alcoholPreference: 'none' | 'occasional' | 'moderate'
  stressManagement: ('exercise' | 'meditation' | 'social' | 'nature')[]
  outdoorActivity?: string[]
  dietaryRestrictions?: string[]
}

export interface UserProfile {
  chronotype: Chronotype
  location: { lat: number; lng: number }
  preferences: UserPreferences
}

export interface RecoveryStatus {
  isRecovering: boolean
  recoveryType: 'alcohol' | 'overtraining' | 'stress' | 'illness'
  recoveryDay: number
  adjustments: {
    exerciseIntensity: number
    targetCalories: number
    hydrationTarget: number
  }
}

export interface DailyMetrics {
  date: Date
  circadianAlignment: number
  metabolicFlexibility: number
  greenExerciseMinutes: number
  stressLevel: number
  lagomScore: number
  indulgences: PlannedIndulgence[]
  recoveryStatus?: RecoveryStatus
}

export interface Recommendation {
  text: string
  source: 'RCT' | 'meta-analysis' | 'observational'
  effectSize: number // simplified effect magnitude
  confidence: number // 0-1
}

export interface WeatherData {
  condition: string
  temperature: number
  sunrise: number
  sunset: number
}
