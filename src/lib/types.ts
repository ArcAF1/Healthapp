


export type Chronotype = 'morning' | 'evening' | 'intermediate'

export interface UserProfile {
  chronotype: Chronotype
  location: { lat: number; lng: number }
  preferences: {
    outdoorActivity: string[]
    dietaryRestrictions: string[]
    stressManagement: ('meditation' | 'exercise' | 'nature' | 'social')[]
  }
}

export interface DailyMetrics {



  circadianAlignment: number // 0-100
  metabolicFlexibility: number // 0-100
  greenExerciseMinutes: number
  stressLevel: number // 0-10
  lagomScore: number // rewards consistency
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
