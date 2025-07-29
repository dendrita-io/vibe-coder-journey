import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth helper functions
export const auth = {
  // Sign up with email and password
  signUp: async (email: string, password: string, userData?: any) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData
      }
    })
    return { data, error }
  },

  // Sign in with email and password
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  },

  // Sign out
  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current user
  getCurrentUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Get session
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Listen to auth changes
  onAuthStateChange: (callback: (event: string, session: any) => void) => {
    return supabase.auth.onAuthStateChange(callback)
  }
}

// Database helper functions
export const db = {
  // User profile operations
  getUserProfile: async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    return { data, error }
  },

  // Update user profile
  updateUserProfile: async (userId: string, updates: any) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
    return { data, error }
  },

  // Course progress operations
  getUserProgress: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_progress')
      .select('*')
      .eq('user_id', userId)
    return { data, error }
  },

  // Update user progress
  updateUserProgress: async (userId: string, moduleId: string, progress: any) => {
    const { data, error } = await supabase
      .from('user_progress')
      .upsert({
        user_id: userId,
        module_id: moduleId,
        ...progress
      })
    return { data, error }
  },

  // Goals operations
  getUserGoals: async (userId: string) => {
    const { data, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
    return { data, error }
  },

  // Create/update goal
  upsertGoal: async (goal: any) => {
    const { data, error } = await supabase
      .from('user_goals')
      .upsert(goal)
    return { data, error }
  },

  // Project submissions
  getUserProjects: async (userId: string) => {
    const { data, error } = await supabase
      .from('project_submissions')
      .select('*')
      .eq('user_id', userId)
    return { data, error }
  },

  // Submit project
  submitProject: async (project: any) => {
    const { data, error } = await supabase
      .from('project_submissions')
      .insert(project)
    return { data, error }
  },

  // Quiz attempts
  getUserQuizAttempts: async (userId: string) => {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('user_id', userId)
    return { data, error }
  },

  // Save quiz attempt
  saveQuizAttempt: async (attempt: any) => {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .insert(attempt)
    return { data, error }
  }
} 