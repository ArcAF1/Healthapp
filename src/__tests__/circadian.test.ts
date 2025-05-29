import { calculateCircadianSchedule } from '@/lib/circadian';

test('calculateSchedule returns consistent times', () => {
  const wake = new Date('2024-01-01T07:00:00Z');
  const schedule = calculateCircadianSchedule(wake, 59.3);
  expect(schedule.firstMeal).toBeInstanceOf(Date);
  expect(schedule.lastMeal).toBeInstanceOf(Date);
});
