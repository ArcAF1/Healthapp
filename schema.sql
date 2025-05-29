-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User profiles with preferences
CREATE TABLE user_profiles (
  user_id UUID REFERENCES users(id) PRIMARY KEY,
  name TEXT,
  age INTEGER,
  gender TEXT,
  weight DECIMAL,
  height DECIMAL,
  activity_level TEXT,
  goal TEXT,
  flexibility_mode TEXT DEFAULT 'balanced',
  alcohol_preference TEXT DEFAULT 'occasional',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily metrics
CREATE TABLE daily_metrics (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  date DATE NOT NULL,
  circadian_alignment DECIMAL,
  metabolic_flexibility DECIMAL,
  green_exercise_minutes INTEGER,
  stress_level DECIMAL,
  lagom_score DECIMAL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Planned indulgences
CREATE TABLE planned_indulgences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  type TEXT NOT NULL,
  date DATE NOT NULL,
  intensity TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE planned_indulgences ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON users
  FOR ALL USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON user_profiles
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own metrics" ON daily_metrics
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own indulgences" ON planned_indulgences
  FOR ALL USING (auth.uid() = user_id);
