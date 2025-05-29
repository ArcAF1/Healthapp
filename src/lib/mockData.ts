export const mockUser = {
  id: '1',
  email: 'demo@halsalagom.com',
  firstName: 'Demo',
  lastName: 'User',
  dateOfBirth: '1990-01-01',
  preferences: {
    wakeTime: '07:00',
    sleepTime: '22:30',
    exercisePreference: 'moderate',
    dietaryRestrictions: [] as string[],
  },
}

export const mockHealthData = {
  lagomScore: 0.78,
  stressLevel: 4,
  todayPhase: 'Peak Energy',
  weeklyProgress: [
    { date: new Date(), score: 0.8, hasIndulgence: false, isRestDay: false },
  ],
}
