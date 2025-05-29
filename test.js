require('ts-node/register')
const { calculateSchedule } = require('./src/lib/circadian')
const { calculateBMR } = require('./src/lib/metabolic')

const wake = new Date('2024-01-01T07:00:00Z')
const schedule = calculateSchedule(wake, 59.3)
console.log('firstMeal', schedule.firstMeal.toISOString())

const bmr = calculateBMR({ weightKg: 70, heightCm: 175, age: 30, sex: 'male', activity: 'moderate' })
console.log('bmr', bmr)
