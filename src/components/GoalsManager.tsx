'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/utils/AuthContext'
import { db } from '@/utils/supabase'

interface Goal {
  id: string
  title: string
  description: string
  target_date: string
  completed: boolean
  created_at?: string
  updated_at?: string
}

interface GoalsManagerProps {
  onGoalUpdate?: (goals: Goal[]) => void
}

export default function GoalsManager({ onGoalUpdate }: GoalsManagerProps) {
  const { user } = useAuth()
  const [goals, setGoals] = useState<Goal[]>([])
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editingGoal, setEditingGoal] = useState<Partial<Goal>>({})
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGoals = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const { data: goalsData, error: goalsError } = await db.getUserGoals(user.id)

        if (goalsError) {
          console.error('Error fetching goals:', goalsError)
          setError('Error loading goals data')
        } else {
          setGoals(goalsData || [])
        }
      } catch (error) {
        console.error('Error fetching goals:', error)
        setError('Error loading goals data')
      } finally {
        setIsLoading(false)
      }
    }

    fetchGoals()
  }, [user])

  const handleEditGoal = (goal: Goal) => {
    setIsEditing(goal.id)
    setEditingGoal(goal)
  }

  const handleSaveGoal = async () => {
    if (!user || !editingGoal.title?.trim()) return

    try {
      const goalData = {
        id: editingGoal.id,
        user_id: user.id,
        title: editingGoal.title,
        description: editingGoal.description || '',
        target_date: editingGoal.target_date || null,
        completed: editingGoal.completed || false
      }

      const { error } = await db.upsertGoal(goalData)

      if (error) {
        console.error('Error saving goal:', error)
        setError('Error saving goal')
      } else {
        // Refresh goals list
        const { data: goalsData } = await db.getUserGoals(user.id)
        setGoals(goalsData || [])
        setIsEditing(null)
        setEditingGoal({})
        onGoalUpdate?.(goalsData || [])
      }
    } catch (error) {
      console.error('Error saving goal:', error)
      setError('Error saving goal')
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(null)
    setEditingGoal({})
  }

  const handleInputChange = (field: keyof Goal, value: string | boolean) => {
    setEditingGoal(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const getDaysUntilTarget = (targetDate: string) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getStatusColor = (goal: Goal) => {
    if (goal.completed) return 'text-green-600'
    if (!goal.target_date) return 'text-gray-600'
    
    const daysUntil = getDaysUntilTarget(goal.target_date)
    if (daysUntil < 0) return 'text-red-600'
    if (daysUntil <= 7) return 'text-orange-600'
    return 'text-blue-600'
  }

  const getStatusText = (goal: Goal) => {
    if (goal.completed) return 'Completed'
    if (!goal.target_date) return 'No deadline'
    
    const daysUntil = getDaysUntilTarget(goal.target_date)
    if (daysUntil < 0) return `${Math.abs(daysUntil)} days overdue`
    if (daysUntil === 0) return 'Due today'
    if (daysUntil === 1) return 'Due tomorrow'
    return `Due in ${daysUntil} days`
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">⚠️</span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Goals</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Goals List */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Your Learning Goals</h2>
          <button
            onClick={() => {
              setEditingGoal({})
              setIsEditing('new')
            }}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
          >
            Add Goal
          </button>
        </div>

        {goals.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-gray-400 text-2xl">🎯</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">No Goals Yet</h3>
            <p className="text-gray-600 mb-4">Start by creating your first learning goal</p>
            <button
              onClick={() => {
                setEditingGoal({})
                setIsEditing('new')
              }}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create First Goal
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                {isEditing === goal.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editingGoal.title || ''}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Goal title"
                    />
                    <textarea
                      value={editingGoal.description || ''}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Goal description"
                      rows={3}
                    />
                    <input
                      type="date"
                      value={editingGoal.target_date || ''}
                      onChange={(e) => handleInputChange('target_date', e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <div className="flex items-center space-x-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={editingGoal.completed || false}
                          onChange={(e) => handleInputChange('completed', e.target.checked)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">Completed</span>
                      </label>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSaveGoal}
                        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                        {goal.completed && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{goal.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        {goal.target_date && (
                          <span className={getStatusColor(goal)}>
                            {getStatusText(goal)}
                          </span>
                        )}
                        <span className="text-gray-500">
                          Created {new Date(goal.created_at || '').toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEditGoal(goal)}
                      className="text-purple-600 hover:text-purple-700 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add New Goal Form */}
      {isEditing === 'new' && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Add New Goal</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={editingGoal.title || ''}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Goal title"
            />
            <textarea
              value={editingGoal.description || ''}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Goal description"
              rows={3}
            />
            <input
              type="date"
              value={editingGoal.target_date || ''}
              onChange={(e) => handleInputChange('target_date', e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="flex space-x-2">
              <button
                onClick={handleSaveGoal}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Create Goal
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      {goals.length > 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Goal Statistics</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{goals.length}</div>
              <div className="text-sm text-gray-600">Total Goals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {goals.filter(g => g.completed).length}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">
                {goals.filter(g => !g.completed).length}
              </div>
              <div className="text-sm text-gray-600">In Progress</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 