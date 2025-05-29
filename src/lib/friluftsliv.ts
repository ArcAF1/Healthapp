import { fetchWeather } from './weatherActivity';

/**
 * Swedish outdoor activity optimizer
 * Research shows 50% greater mental health benefits from green exercise
 */
export class FriluftslivOptimizer {
  private readonly SWEDISH_LATITUDE = 59.3293; // Stockholm
  private readonly DARKNESS_THRESHOLD = 8; // hours of daylight

  async getOptimalOutdoorTime(date: Date, lat: number = this.SWEDISH_LATITUDE): Promise<OutdoorPlan> {
    const daylight = this.calculateDaylight(date, lat);
    const weather = await fetchWeather(lat, 18.0686, process.env.OPENWEATHER_KEY || '');

    if (daylight.hours < this.DARKNESS_THRESHOLD) {
      return {
        recommendedTime: daylight.solarNoon,
        duration: Math.min(60, daylight.hours * 10),
        activities: this.getWinterActivities(weather.temperature),
        uvWindow: daylight.uvPeak,
        message: `Only ${daylight.hours.toFixed(1)} hours of daylight. Prioritize outdoor time at ${this.formatTime(daylight.solarNoon)} for vitamin D.`,
      };
    }

    return {
      recommendedTime: new Date(daylight.sunrise.getTime() + 2 * 60 * 60 * 1000),
      duration: 90,
      activities: this.getSummerActivities(weather.temperature),
      uvWindow: null,
      message: `${daylight.hours.toFixed(1)} hours of daylight! Best outdoor time: early morning or evening.`,
    };
  }

  private calculateDaylight(date: Date, latitude: number): DaylightInfo {
    const dayOfYear = this.getDayOfYear(date);
    const P = Math.asin(0.39795 * Math.cos((0.98563 * (dayOfYear - 173) * Math.PI) / 180));

    const sunriseFactor = -Math.cos((latitude * Math.PI) / 180) * Math.tan(P);
    const daylightHours =
      sunriseFactor < -1 ? 0 : sunriseFactor > 1 ? 24 : 12 * (1 + (2 / Math.PI) * Math.asin(sunriseFactor));

    const solarNoon = new Date(date);
    solarNoon.setHours(12, 0, 0, 0);

    return {
      hours: daylightHours,
      sunrise: new Date(solarNoon.getTime() - (daylightHours / 2) * 60 * 60 * 1000),
      sunset: new Date(solarNoon.getTime() + (daylightHours / 2) * 60 * 60 * 1000),
      solarNoon,
      uvPeak:
        daylightHours > 6
          ? { start: new Date(solarNoon.getTime() - 60 * 60 * 1000), end: new Date(solarNoon.getTime() + 60 * 60 * 1000) }
          : null,
    };
  }

  private getWinterActivities(temp: number): string[] {
    if (temp < -5) return ['cross-country-skiing', 'ice-skating', 'winter-hiking'];
    if (temp < 5) return ['brisk-walking', 'nordic-walking', 'trail-running'];
    return ['hiking', 'cycling', 'outdoor-gym'];
  }

  private getSummerActivities(temp: number): string[] {
    if (temp > 25) return ['swimming', 'kayaking', 'forest-yoga'];
    if (temp > 15) return ['trail-running', 'mountain-biking', 'outdoor-climbing'];
    return ['hiking', 'mushroom-picking', 'berry-picking'];
  }

  private getDayOfYear(date: Date): number {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  private formatTime(date: Date): string {
    return date.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  }
}

export interface OutdoorPlan {
  recommendedTime: Date;
  duration: number;
  activities: string[];
  uvWindow: { start: Date; end: Date } | null;
  message: string;
}

interface DaylightInfo {
  hours: number;
  sunrise: Date;
  sunset: Date;
  solarNoon: Date;
  uvPeak: { start: Date; end: Date } | null;
}
