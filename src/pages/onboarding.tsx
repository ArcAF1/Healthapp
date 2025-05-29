import { useState } from 'react'
import { useRouter } from 'next/router'
import { ChevronRight, ChevronLeft, Sun, Moon, Zap } from 'lucide-react'
import { supabase } from '@/lib/supabase'

const ONBOARDING_STEPS = [
  { id: 'welcome', title: 'V\u00E4lkommen to H\u00E4lsa Lagom', subtitle: 'Your science-based Swedish health companion', fields: ['name'] },
  { id: 'basics', title: 'Tell us about yourself', subtitle: 'This helps us personalize your experience', fields: ['age', 'gender', 'weight', 'height'] },
  { id: 'chronotype', title: 'When do you naturally wake up?', subtitle: "We'll optimize your schedule based on your circadian rhythm", fields: ['wakeTime', 'chronotype'] },
  { id: 'goals', title: 'What brings you here?', subtitle: 'Select all that apply', fields: ['goals'] },
  { id: 'lifestyle', title: 'Your current lifestyle', subtitle: "Be honest - we're here to help, not judge", fields: ['activityLevel', 'stressLevel', 'alcoholFrequency'] },
] as const

export default function Onboarding() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
    wakeTime: '06:30',
    chronotype: '',
    goals: [] as string[],
    activityLevel: '',
    stressLevel: 5,
    alcoholFrequency: '',
  })

  const handleNext = async () => {
    if (currentStep < ONBOARDING_STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      await saveUserProfile(userData)
      router.push('/')
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const saveUserProfile = async (data: any) => {
    const user = await supabase.auth.getUser()
    if (!user.data.user) return
    const { error } = await supabase.from('user_profiles').upsert({
      user_id: user.data.user.id,
      ...data,
      flexibility_mode: 'balanced',
      updated_at: new Date().toISOString(),
    })
    if (error) console.error('Error saving profile:', error)
  }

  const renderStepContent = () => {
    const step = ONBOARDING_STEPS[currentStep]
    switch (step.id) {
      case 'welcome':
        return (
          <div className="space-y-6">
            <input
              type="text"
              placeholder="Your name"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
              className="w-full p-4 text-lg border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              autoFocus
            />
            <div className="text-center py-8">
              <div className="flex justify-center gap-4 mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">\uD83E\uDDEC</div>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">\uD83C\uDF32</div>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">\u2696\uFE0F</div>
              </div>
              <p className="text-gray-600">Science-based \u2022 Nature-focused \u2022 Balanced living</p>
            </div>
          </div>
        )
      case 'basics':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="number"
                placeholder="Age"
                value={userData.age}
                onChange={e => setUserData({ ...userData, age: e.target.value })}
                className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={userData.gender}
                onChange={e => setUserData({ ...userData, gender: e.target.value })}
                className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Weight (kg)</label>
                <input
                  type="number"
                  placeholder="70"
                  value={userData.weight}
                  onChange={e => setUserData({ ...userData, weight: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">Height (cm)</label>
                <input
                  type="number"
                  placeholder="175"
                  value={userData.height}
                  onChange={e => setUserData({ ...userData, height: e.target.value })}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        )
      case 'chronotype':
        return (
          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">What time do you naturally wake up without an alarm?</label>
              <input
                type="time"
                value={userData.wakeTime}
                onChange={e => setUserData({ ...userData, wakeTime: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-600">Are you more of a...</p>
              {[
                { value: 'morning', label: 'Morning person', icon: Sun, time: 'Most alert before noon' },
                { value: 'evening', label: 'Night owl', icon: Moon, time: 'Most alert after 8 PM' },
                { value: 'intermediate', label: 'Somewhere in between', icon: Zap, time: 'Flexible schedule' },
              ].map(({ value, label, icon: Icon, time }) => (
                <button
                  key={value}
                  onClick={() => setUserData({ ...userData, chronotype: value })}
                  className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-4 ${
                    userData.chronotype === value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-8 h-8 text-gray-600" />
                  <div className="text-left">
                    <div className="font-medium">{label}</div>
                    <div className="text-sm text-gray-600">{time}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )
      case 'goals':
        return (
          <div className="space-y-3">
            {[
              { value: 'weight-loss', label: 'Lose weight sustainably', emoji: '⚖️' },
              { value: 'muscle-gain', label: 'Build strength & muscle', emoji: '💪' },
              { value: 'stress-management', label: 'Manage stress better', emoji: '🧘' },
              { value: 'better-sleep', label: 'Improve sleep quality', emoji: '😴' },
              { value: 'more-energy', label: 'Have more energy', emoji: '⚡' },
              { value: 'healthy-habits', label: 'Build healthy habits', emoji: '🌱' },
              { value: 'prevent-disease', label: 'Prevent chronic disease', emoji: '🛡️' },
              { value: 'longevity', label: 'Live longer & healthier', emoji: '🌟' },
            ].map(({ value, label, emoji }) => (
              <button
                key={value}
                onClick={() => {
                  const goals = userData.goals.includes(value)
                    ? userData.goals.filter(g => g !== value)
                    : [...userData.goals, value]
                  setUserData({ ...userData, goals })
                }}
                className={`w-full p-4 rounded-lg border-2 transition-all flex items-center gap-3 ${
                  userData.goals.includes(value) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <span className="text-2xl">{emoji}</span>
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        )
      case 'lifestyle':
        return (
          <div className="space-y-6">
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Current activity level</label>
              <select
                value={userData.activityLevel}
                onChange={e => setUserData({ ...userData, activityLevel: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select activity level</option>
                <option value="sedentary">Sedentary (little/no exercise)</option>
                <option value="light">Light (1-3 days/week)</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (6-7 days/week)</option>
                <option value="veryActive">Very Active (physical job + exercise)</option>
              </select>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">Typical stress level (1-10)</label>
              <div className="flex items-center gap-4">
                <span className="text-sm">Low</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={userData.stressLevel}
                  onChange={e => setUserData({ ...userData, stressLevel: parseInt(e.target.value) })}
                  className="flex-1"
                />
                <span className="text-sm">High</span>
                <span className="font-bold text-lg w-8">{userData.stressLevel}</span>
              </div>
            </div>
            <div>
              <label className="text-sm text-gray-600 mb-2 block">How often do you drink alcohol?</label>
              <select
                value={userData.alcoholFrequency}
                onChange={e => setUserData({ ...userData, alcoholFrequency: e.target.value })}
                className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select frequency</option>
                <option value="never">Never</option>
                <option value="occasional">Occasionally (1-2 times/month)</option>
                <option value="weekly">Weekly (1-2 times/week)</option>
                <option value="frequent">Frequently (3+ times/week)</option>
              </select>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{ONBOARDING_STEPS[currentStep].title}</h2>
            <span className="text-sm text-gray-500">{currentStep + 1} / {ONBOARDING_STEPS.length}</span>
          </div>
          <p className="text-gray-600 mb-4">{ONBOARDING_STEPS[currentStep].subtitle}</p>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / ONBOARDING_STEPS.length) * 100}%` }}
            />
          </div>
        </div>
        {renderStepContent()}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            className={`px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors flex items-center gap-2 ${currentStep === 0 ? 'invisible' : ''}`}
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 ml-auto"
          >
            {currentStep === ONBOARDING_STEPS.length - 1 ? 'Complete' : 'Next'}
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
