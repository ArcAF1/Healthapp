/**
 * Simplified microbiome recommendations
 * In production, would integrate with actual testing services
 */
export class MicrobiomeAdvisor {
  private readonly FIBER_SOURCES = [
    { name: 'Oats', type: 'beta-glucan', benefits: ['cholesterol', 'gut-health'] },
    { name: 'Apples', type: 'pectin', benefits: ['gut-health', 'satiety'] },
    { name: 'Legumes', type: 'resistant-starch', benefits: ['blood-sugar', 'microbiome'] },
    { name: 'Berries', type: 'polyphenols', benefits: ['antioxidant', 'gut-health'] },
    { name: 'Artichokes', type: 'inulin', benefits: ['prebiotic', 'mineral-absorption'] },
  ];

  private readonly FERMENTED_FOODS = [
    { name: 'Filmjölk', origin: 'swedish', benefits: ['probiotics', 'protein'] },
    { name: 'Sauerkraut', origin: 'nordic', benefits: ['probiotics', 'vitamin-c'] },
    { name: 'Kefir', origin: 'international', benefits: ['diverse-probiotics', 'calcium'] },
    { name: 'Kimchi', origin: 'international', benefits: ['probiotics', 'spice-metabolism'] },
  ];

  getDiversityScore(weeklyFoods: string[]): number {
    const uniqueFibers = new Set(
      weeklyFoods.filter((f) => this.FIBER_SOURCES.some((source) => f.includes(source.name.toLowerCase())))
    );
    return Math.min(uniqueFibers.size / 30, 1);
  }

  getPersonalizedRecommendations(profile: {
    currentDiversity: number;
    preferences: string[];
    symptoms?: string[];
  }): MicrobiomeRecommendation {
    const recommendations: MicrobiomeRecommendation = {
      targetFoods: [],
      fermentedFoods: [],
      avoidances: [],
      diversityTarget: 30,
      weeklyPlan: this.generateWeeklyPlan(),
    };

    if (profile.currentDiversity < 0.5) {
      recommendations.targetFoods = this.FIBER_SOURCES.slice(0, 3);
      recommendations.fermentedFoods = this.FERMENTED_FOODS.filter((f) => f.origin === 'swedish');
      recommendations.message = 'Start small: Add one new plant food each day this week.';
    } else {
      recommendations.targetFoods = this.FIBER_SOURCES;
      recommendations.fermentedFoods = this.FERMENTED_FOODS;
      recommendations.message = 'Great diversity! Try exotic vegetables and new fermented foods.';
    }

    return recommendations;
  }

  private generateWeeklyPlan(): string[] {
    return [
      'Monday: Add berries to breakfast',
      'Tuesday: Include legumes at lunch',
      'Wednesday: Try a new vegetable at dinner',
      'Thursday: Have filmjölk as snack',
      'Friday: Experiment with a new grain',
      'Weekend: Visit farmers market for variety',
    ];
  }
}

export interface MicrobiomeRecommendation {
  targetFoods: any[];
  fermentedFoods: any[];
  avoidances: string[];
  diversityTarget: number;
  weeklyPlan: string[];
  message?: string;
}
