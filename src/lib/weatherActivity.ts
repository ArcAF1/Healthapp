import { WeatherData, UserProfile } from './types'

export async function fetchWeather(lat: number, lon: number, apiKey: string): Promise<WeatherData> {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
  const res = await fetch(url)
  if (!res.ok) throw new Error('weather fetch failed')
  const data = await res.json()
  return {
    condition: data.weather[0].main,
    temperature: data.main.temp,
    sunrise: data.sys.sunrise * 1000,
    sunset: data.sys.sunset * 1000
  }
}

export function suggestOutdoorActivities(profile: UserProfile, weather: WeatherData, date: Date): string[] {
  const daylightHours = [new Date(weather.sunrise), new Date(weather.sunset)]
  const suggestions: string[] = []
  if (weather.condition === 'Rain') suggestions.push('Plan indoor training')
  else suggestions.push(...profile.preferences.outdoorActivity)
  const hour = date.getHours()
  if (hour < 10 && weather.condition === 'Clear') suggestions.push('Morning walk')
  if (hour >= 10 && hour < 16) suggestions.push('Midday outdoor time')
  return suggestions
}

export function greenExercisePoints(minutes: number, isOutdoor: boolean): number {
  return isOutdoor ? minutes * 1.5 : minutes
}
