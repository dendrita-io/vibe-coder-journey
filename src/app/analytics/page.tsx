'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Metric {
  id: string
  name: string
  value: number
  unit: string
  change: number
  trend: 'up' | 'down' | 'stable'
  category: string
}

interface ModulePerformance {
  id: string
  name: string
  progress: number
  quizScore: number
  projectScore: number
  timeSpent: number
  completed: boolean
}

export default function AnalyticsPage() {
  const [metrics] = useState<Metric[]>([
    {
      id: '1',
      name: 'Overall Progress',
      value: 42,
      unit: '%',
      change: 8,
      trend: 'up',
      category: 'Learning'
    },
    {
      id: '2',
      name: 'Average Quiz Score',
      value: 85,
      unit: '%',
      change: 5,
      trend: 'up',
      category: 'Academic'
    },
    {
      id: '3',
      name: 'Projects Completed',
      value: 2,
      unit: '',
      change: 1,
      trend: 'up',
      category: 'Projects'
    },
    {
      id: '4',
      name: 'Study Time',
      value: 24,
      unit: 'hours',
      change: -2,
      trend: 'down',
      category: 'Time'
    },
    {
      id: '5',
      name: 'Peer Feedback Given',
      value: 5,
      unit: '',
      change: 2,
      trend: 'up',
      category: 'Community'
    },
    {
      id: '6',
      name: 'Badges Earned',
      value: 2,
      unit: '',
      change: 1,
      trend: 'up',
      category: 'Achievement'
    }
  ])

  const [modulePerformance] = useState<ModulePerformance[]>([
    {
      id: '1',
      name: 'Digital Ecosystem Fundamentals',
      progress: 100,
      quizScore: 80,
      projectScore: 85,
      timeSpent: 8,
      completed: true
    },
    {
      id: '2',
      name: 'Productive Mindset & Design',
      progress: 100,
      quizScore: 90,
      projectScore: 88,
      timeSpent: 10,
      completed: true
    },
    {
      id: '3',
      name: 'Prototyping & Early Testing',
      progress: 75,
      quizScore: 85,
      projectScore: 0,
      timeSpent: 6,
      completed: false
    },
    {
      id: '4',
      name: 'AI Tools & Development Kit',
      progress: 0,
      quizScore: 0,
      projectScore: 0,
      timeSpent: 0,
      completed: false
    },
    {
      id: '5',
      name: 'MVP Construction',
      progress: 0,
      quizScore: 0,
      projectScore: 0,
      timeSpent: 0,
      completed: false
    },
    {
      id: '6',
      name: 'Market Validation',
      progress: 0,
      quizScore: 0,
      projectScore: 0,
      timeSpent: 0,
      completed: false
    }
  ])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return '📈'
      case 'down': return '📉'
      case 'stable': return '➡️'
      default: return '➡️'
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return 'text-green-600'
      case 'down': return 'text-red-600'
      case 'stable': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const completedModules = modulePerformance.filter(m => m.completed)
  const averageQuizScore = completedModules.length > 0 
    ? Math.round(completedModules.reduce((sum, m) => sum + m.quizScore, 0) / completedModules.length)
    : 0
  const averageProjectScore = completedModules.filter(m => m.projectScore > 0).length > 0
    ? Math.round(completedModules.filter(m => m.projectScore > 0).reduce((sum, m) => sum + m.projectScore, 0) / completedModules.filter(m => m.projectScore > 0).length)
    : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Performance Analytics
          </h1>
          <p className="text-xl text-gray-600">Track your learning progress and performance metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
          {metrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-2xl font-bold text-gray-800 mb-2">
                {metric.value}{metric.unit}
              </div>
              <div className="text-sm text-gray-600 mb-2">{metric.name}</div>
              <div className={`flex items-center justify-center gap-1 text-xs ${getTrendColor(metric.trend)}`}>
                <span>{getTrendIcon(metric.trend)}</span>
                <span>{metric.change > 0 ? '+' : ''}{metric.change}%</span>
              </div>
            </div>
          ))}
        </div>

        {/* Performance Overview */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Overall Progress */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Overall Progress</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Course Completion</span>
                  <span>{Math.round((completedModules.length / modulePerformance.length) * 100)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${(completedModules.length / modulePerformance.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{averageQuizScore}%</div>
                  <div className="text-sm text-gray-600">Avg Quiz Score</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{averageProjectScore}%</div>
                  <div className="text-sm text-gray-600">Avg Project Score</div>
                </div>
              </div>
            </div>
          </div>

          {/* Time Tracking */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Study Time</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Total Study Time</span>
                  <span>{modulePerformance.reduce((sum, m) => sum + m.timeSpent, 0)} hours</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((modulePerformance.reduce((sum, m) => sum + m.timeSpent, 0) / 60) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(modulePerformance.reduce((sum, m) => sum + m.timeSpent, 0) / completedModules.length || 0)}
                  </div>
                  <div className="text-sm text-gray-600">Avg Hours/Module</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(modulePerformance.reduce((sum, m) => sum + m.timeSpent, 0) / 7)}
                  </div>
                  <div className="text-sm text-gray-600">Hours/Week</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Module Performance */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Module Performance</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Module
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Progress
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quiz Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Project Score
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time Spent
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {modulePerformance.map((module) => (
                    <tr key={module.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{module.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-500 ${
                                module.completed ? 'bg-green-500' : 'bg-gradient-to-r from-purple-500 to-blue-500'
                              }`}
                              style={{ width: `${module.progress}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-900">{module.progress}%</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${
                          module.quizScore >= 80 ? 'text-green-600' : 
                          module.quizScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {module.quizScore > 0 ? `${module.quizScore}%` : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`text-sm font-medium ${
                          module.projectScore >= 80 ? 'text-green-600' : 
                          module.projectScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {module.projectScore > 0 ? `${module.projectScore}%` : '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {module.timeSpent}h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          module.completed 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {module.completed ? 'Completed' : 'In Progress'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Performance Insights</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Strengths</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span className="text-gray-700">Strong quiz performance (85% average)</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span className="text-gray-700">Consistent study time commitment</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span className="text-gray-700">Active participation in community</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Areas for Improvement</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">💡</span>
                  <span className="text-gray-700">Focus on project completion</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">💡</span>
                  <span className="text-gray-700">Increase study time for current module</span>
                </li>
                <li className="flex items-center">
                  <span className="text-blue-500 mr-2">💡</span>
                  <span className="text-gray-700">Seek more peer feedback</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/progress"
              className="flex flex-col items-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
            >
              <span className="text-2xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-700">Progress</span>
            </Link>
            <Link 
              href="/projects"
              className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl mb-2">💻</span>
              <span className="text-sm font-medium text-gray-700">Projects</span>
            </Link>
            <Link 
              href="/quizzes"
              className="flex flex-col items-center p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl mb-2">📝</span>
              <span className="text-sm font-medium text-gray-700">Quizzes</span>
            </Link>
            <Link 
              href="/badges"
              className="flex flex-col items-center p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <span className="text-2xl mb-2">🏆</span>
              <span className="text-sm font-medium text-gray-700">Badges</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 