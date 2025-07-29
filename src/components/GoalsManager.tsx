'use client'

import { useState, useEffect } from 'react'

interface Goal {
  id: string
  moduleId: string
  moduleTitle: string
  description: string
  targetDate: string
  completed: boolean
  progress: number
}

interface GoalsManagerProps {
  onGoalUpdate?: (goals: Goal[]) => void
}

export default function GoalsManager({ onGoalUpdate }: GoalsManagerProps) {
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      moduleId: '1',
      moduleTitle: 'Fundamentals of Digital Ecosystem',
      description: 'Complete all readings and exercises',
      targetDate: '2024-01-15',
      completed: true,
      progress: 100
    },
    {
      id: '2',
      moduleId: '2',
      moduleTitle: 'Productive Mindset & Product Design',
      description: 'Finish the design thinking workshop',
      targetDate: '2024-01-22',
      completed: true,
      progress: 100
    },
    {
      id: '3',
      moduleId: '3',
      moduleTitle: 'Prototyping & Early Testing',
      description: 'Create 3 prototypes and test with users',
      targetDate: '2024-01-29',
      completed: false,
      progress: 60
    },
    {
      id: '4',
      moduleId: '4',
      moduleTitle: 'AI Tools & Development Kit',
      description: 'Master 5 AI tools and complete mini-projects',
      targetDate: '2024-02-05',
      completed: false,
      progress: 0
    },
    {
      id: '5',
      moduleId: '5',
      moduleTitle: 'MVP Construction Step by Step',
      description: 'Build and deploy a functional MVP',
      targetDate: '2024-02-12',
      completed: false,
      progress: 0
    },
    {
      id: '6',
      moduleId: '6',
      moduleTitle: 'Market Validation & Next Steps',
      description: 'Conduct user interviews and validate market fit',
      targetDate: '2024-02-19',
      completed: false,
      progress: 0
    }
  ])

  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [editingGoal, setEditingGoal] = useState<Partial<Goal>>({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call to fetch goals
    const fetchGoals = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 800))
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching goals:', error)
        setIsLoading(false)
      }
    }

    fetchGoals()
  }, [])

  const handleEditGoal = (goal: Goal) => {
    setIsEditing(goal.id)
    setEditingGoal(goal)
  }

  const handleSaveGoal = async () => {
    if (!editingGoal.description || !editingGoal.targetDate) {
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500))

      const updatedGoals = goals.map(goal =>
        goal.id === editingGoal.id
          ? { ...goal, ...editingGoal }
          : goal
      )

      setGoals(updatedGoals)
      onGoalUpdate?.(updatedGoals)
      setIsEditing(null)
      setEditingGoal({})
    } catch (error) {
      console.error('Error updating goal:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(null)
    setEditingGoal({})
  }

  const handleInputChange = (field: keyof Goal, value: string) => {
    setEditingGoal(prev => ({ ...prev, [field]: value }))
  }

  const getDaysUntilTarget = (targetDate: string) => {
    const today = new Date()
    const target = new Date(targetDate)
    const diffTime = target.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return 'text-green-600'
    if (progress >= 50) return 'text-yellow-600'
    return 'text-red-600'
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Learning Goals</h2>
          <div className="text-right">
            <div className="text-3xl font-bold text-purple-600">
              {goals.filter(g => g.completed).length}/{goals.length}
            </div>
            <div className="text-sm text-gray-600">Goals Completed</div>
          </div>
        </div>
        <p className="text-gray-600">
          Set and track your learning goals for each module. Stay motivated by setting clear objectives!
        </p>
      </div>

      {/* Goals List */}
      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="bg-white rounded-2xl shadow-lg p-6">
            {isEditing === goal.id ? (
              // Edit Mode
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Module
                  </label>
                  <div className="text-gray-800 font-medium">{goal.moduleTitle}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Goal Description
                  </label>
                  <textarea
                    value={editingGoal.description || ''}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Describe your learning goal..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Date
                  </label>
                  <input
                    type="date"
                    value={editingGoal.targetDate || ''}
                    onChange={(e) => handleInputChange('targetDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleSaveGoal}
                    disabled={isLoading}
                    className="px-6 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Goal'}
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              // View Mode
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {goal.moduleTitle}
                    </h3>
                    <p className="text-gray-600 mb-3">{goal.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span>🎯 Target: {new Date(goal.targetDate).toLocaleDateString()}</span>
                      <span className={getProgressColor(goal.progress)}>
                        📊 {goal.progress}% Complete
                      </span>
                    </div>
                  </div>
                  
                  <div className="ml-4">
                    {goal.completed ? (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-lg">✅</span>
                      </div>
                    ) : (
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                        <span className="text-gray-400 text-lg">⏳</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        goal.completed 
                          ? 'bg-green-500' 
                          : 'bg-gradient-to-r from-purple-500 to-blue-500'
                      }`}
                      style={{ width: `${goal.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {getDaysUntilTarget(goal.targetDate) > 0 ? (
                      <span>⏰ {getDaysUntilTarget(goal.targetDate)} days remaining</span>
                    ) : getDaysUntilTarget(goal.targetDate) === 0 ? (
                      <span className="text-orange-600">⏰ Due today!</span>
                    ) : (
                      <span className="text-red-600">⏰ {Math.abs(getDaysUntilTarget(goal.targetDate))} days overdue</span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => handleEditGoal(goal)}
                    className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg font-medium hover:bg-purple-50 transition-colors"
                  >
                    Edit Goal
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Goal Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {goals.filter(g => g.completed).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {goals.filter(g => !g.completed && getDaysUntilTarget(g.targetDate) > 0).length}
            </div>
            <div className="text-sm text-gray-600">On Track</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {goals.filter(g => !g.completed && getDaysUntilTarget(g.targetDate) <= 0).length}
            </div>
            <div className="text-sm text-gray-600">Overdue</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(goals.reduce((acc, goal) => acc + goal.progress, 0) / goals.length)}%
            </div>
            <div className="text-sm text-gray-600">Avg Progress</div>
          </div>
        </div>
      </div>
    </div>
  )
} 