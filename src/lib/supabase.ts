import { createClient } from '@supabase/supabase-js'
import type { DailyMetrics } from './types'
import type { PlannedIndulgence } from './flexibility'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function saveUserMetrics(userId: string, metrics: DailyMetrics) {
  const { error } = await supabase
    .from('daily_metrics')
    .upsert({
      user_id: userId,
      date: metrics.date,
      circadian_alignment: metrics.circadianAlignment,
      metabolic_flexibility: metrics.metabolicFlexibility,
      green_exercise_minutes: metrics.greenExerciseMinutes,
      stress_level: metrics.stressLevel,
      lagom_score: metrics.lagomScore,
    })
  if (error) throw error
}

export async function saveIndulgence(userId: string, indulgence: PlannedIndulgence) {
  const { error } = await supabase
    .from('planned_indulgences')
    .insert({
      user_id: userId,
      type: indulgence.type,
      date: indulgence.date,
      intensity: indulgence.intensity,
      notes: indulgence.notes,
    })
  if (error) throw error
}
