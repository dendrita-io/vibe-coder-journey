-- El Camino del Vibe Coder Database Schema
-- Execute this in your Supabase SQL Editor

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (id)
);

-- Create user_progress table
CREATE TABLE IF NOT EXISTS user_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  module_id TEXT NOT NULL,
  module_title TEXT,
  completed BOOLEAN DEFAULT FALSE,
  progress_percentage INTEGER DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create user_goals table
CREATE TABLE IF NOT EXISTS user_goals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  target_date DATE,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create project_submissions table
CREATE TABLE IF NOT EXISTS project_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  project_id TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  github_url TEXT,
  live_url TEXT,
  status TEXT DEFAULT 'submitted',
  instructor_feedback TEXT,
  peer_feedback JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  quiz_id TEXT NOT NULL,
  quiz_title TEXT,
  score INTEGER,
  total_questions INTEGER,
  answers JSONB,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create badges table
CREATE TABLE IF NOT EXISTS badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  badge_type TEXT NOT NULL,
  badge_name TEXT NOT NULL,
  badge_description TEXT,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create forum_posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'general',
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create forum_replies table
CREATE TABLE IF NOT EXISTS forum_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES forum_posts ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_replies ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for user_progress
CREATE POLICY "Users can view own progress" ON user_progress FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_goals
CREATE POLICY "Users can view own goals" ON user_goals FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own goals" ON user_goals FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own goals" ON user_goals FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own goals" ON user_goals FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for project_submissions
CREATE POLICY "Users can view own projects" ON project_submissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own projects" ON project_submissions FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own projects" ON project_submissions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own projects" ON project_submissions FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for quiz_attempts
CREATE POLICY "Users can view own quiz attempts" ON quiz_attempts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own quiz attempts" ON quiz_attempts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for badges
CREATE POLICY "Users can view own badges" ON badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own badges" ON badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for forum_posts
CREATE POLICY "Anyone can view forum posts" ON forum_posts FOR SELECT USING (true);
CREATE POLICY "Users can create forum posts" ON forum_posts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own forum posts" ON forum_posts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own forum posts" ON forum_posts FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for forum_replies
CREATE POLICY "Anyone can view forum replies" ON forum_replies FOR SELECT USING (true);
CREATE POLICY "Users can create forum replies" ON forum_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own forum replies" ON forum_replies FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own forum replies" ON forum_replies FOR DELETE USING (auth.uid() = user_id);

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, full_name)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    new.raw_user_meta_data->>'full_name'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Insert sample data for testing
INSERT INTO user_progress (user_id, module_id, module_title, completed, progress_percentage) VALUES
  ('00000000-0000-0000-0000-000000000001', '1', 'Fundamentos del Ecosistema Digital', true, 100),
  ('00000000-0000-0000-0000-000000000001', '2', 'Mentalidad Productiva y Diseño de Producto', true, 100),
  ('00000000-0000-0000-0000-000000000001', '3', 'Prototipado y Pruebas Tempranas', false, 75),
  ('00000000-0000-0000-0000-000000000001', '4', 'Tu Kit de Herramientas IA y Desarrollo', false, 50),
  ('00000000-0000-0000-0000-000000000001', '5', 'Construcción del MVP Paso a Paso', false, 25),
  ('00000000-0000-0000-0000-000000000001', '6', 'Validación de Mercado y Siguientes Pasos', false, 0);

INSERT INTO user_goals (user_id, title, description, target_date, completed) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Completar el curso completo', 'Terminar todas las unidades del curso', '2024-12-31', false),
  ('00000000-0000-0000-0000-000000000001', 'Crear mi primer proyecto', 'Desarrollar una aplicación web completa', '2024-11-30', false),
  ('00000000-0000-0000-0000-000000000001', 'Aprender React', 'Dominar los fundamentos de React', '2024-10-31', true),
  ('00000000-0000-0000-0000-000000000001', 'Mejorar mis habilidades de CSS', 'Practicar con Tailwind CSS', '2024-09-30', true);

INSERT INTO badges (user_id, badge_type, badge_name, badge_description) VALUES
  ('00000000-0000-0000-0000-000000000001', 'completion', 'Primer Módulo', 'Completaste tu primer módulo'),
  ('00000000-0000-0000-0000-000000000001', 'quiz', 'Maestro del Quiz', 'Obtuviste 100% en un quiz'),
  ('00000000-0000-0000-0000-000000000001', 'project', 'Desarrollador', 'Completaste tu primer proyecto'); 