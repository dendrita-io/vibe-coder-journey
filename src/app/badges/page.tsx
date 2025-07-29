'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Badge {
  id: string
  name: string
  description: string
  icon: string
  category: string
  earned: boolean
  earnedAt?: string
  progress?: number
  requirement: string
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export default function BadgesPage() {
  const [badges] = useState<Badge[]>([
    {
      id: '1',
      name: 'Digital Explorer',
      description: 'Completed your first digital ecosystem analysis',
      icon: '🌐',
      category: 'Learning',
      earned: true,
      earnedAt: '2024-01-10',
      requirement: 'Complete Digital Ecosystem module',
      rarity: 'common'
    },
    {
      id: '2',
      name: 'Design Thinker',
      description: 'Mastered the fundamentals of product design',
      icon: '🎨',
      category: 'Skills',
      earned: true,
      earnedAt: '2024-01-15',
      requirement: 'Complete Product Design module',
      rarity: 'common'
    },
    {
      id: '3',
      name: 'Prototype Pioneer',
      description: 'Created your first working prototype',
      icon: '⚡',
      category: 'Projects',
      earned: false,
      progress: 75,
      requirement: 'Complete a prototype project',
      rarity: 'rare'
    },
    {
      id: '4',
      name: 'AI Enthusiast',
      description: 'Successfully integrated AI tools in your workflow',
      icon: '🤖',
      category: 'Technology',
      earned: false,
      progress: 30,
      requirement: 'Use AI tools in 3 projects',
      rarity: 'rare'
    },
    {
      id: '5',
      name: 'MVP Builder',
      description: 'Built and launched your first MVP',
      icon: '🚀',
      category: 'Achievement',
      earned: false,
      progress: 0,
      requirement: 'Complete MVP development project',
      rarity: 'epic'
    },
    {
      id: '6',
      name: 'Community Helper',
      description: 'Provided helpful feedback to 10 peers',
      icon: '🤝',
      category: 'Community',
      earned: false,
      progress: 40,
      requirement: 'Give feedback to 10 peer projects',
      rarity: 'common'
    },
    {
      id: '7',
      name: 'Quiz Master',
      description: 'Achieved perfect scores on all module quizzes',
      icon: '🏆',
      category: 'Academic',
      earned: false,
      progress: 60,
      requirement: 'Get 100% on all quizzes',
      rarity: 'epic'
    },
    {
      id: '8',
      name: 'Market Validator',
      description: 'Successfully validated your product in the market',
      icon: '📊',
      category: 'Business',
      earned: false,
      progress: 0,
      requirement: 'Complete market validation project',
      rarity: 'legendary'
    }
  ])

  const earnedBadges = badges.filter(badge => badge.earned)
  const unearnedBadges = badges.filter(badge => !badge.earned)

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-700'
      case 'rare': return 'bg-blue-100 text-blue-700'
      case 'epic': return 'bg-purple-100 text-purple-700'
      case 'legendary': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getRarityBorder = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-200'
      case 'rare': return 'border-blue-200'
      case 'epic': return 'border-purple-200'
      case 'legendary': return 'border-yellow-200'
      default: return 'border-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Your Badges
          </h1>
          <p className="text-xl text-gray-600">Track your achievements and celebrate your progress</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{badges.length}</div>
            <div className="text-gray-600">Total Badges</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{earnedBadges.length}</div>
            <div className="text-gray-600">Earned</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{unearnedBadges.length}</div>
            <div className="text-gray-600">Available</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">
              {Math.round((earnedBadges.length / badges.length) * 100)}%
            </div>
            <div className="text-gray-600">Completion</div>
          </div>
        </div>

        {/* Earned Badges */}
        {earnedBadges.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Earned Badges</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earnedBadges.map((badge) => (
                <div 
                  key={badge.id}
                  className={`bg-white rounded-2xl shadow-lg p-6 border-2 ${getRarityBorder(badge.rarity)} transition-all duration-200 hover:shadow-xl`}
                >
                  <div className="text-center">
                    <div className="text-6xl mb-4">{badge.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{badge.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{badge.description}</p>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                        {badge.rarity}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                        {badge.category}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Earned: {new Date(badge.earnedAt!).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Available Badges */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Available Badges</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {unearnedBadges.map((badge) => (
              <div 
                key={badge.id}
                className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
              >
                <div className="text-center">
                  <div className="text-6xl mb-4 opacity-50">{badge.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{badge.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{badge.description}</p>
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(badge.rarity)}`}>
                      {badge.rarity}
                    </span>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                      {badge.category}
                    </span>
                  </div>
                  
                  {badge.progress && badge.progress > 0 && (
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Progress</span>
                        <span>{badge.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${badge.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-gray-500">
                    {badge.requirement}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Badge Categories */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Badge Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">🎓</div>
              <h3 className="font-semibold text-gray-800 mb-1">Learning</h3>
              <p className="text-sm text-gray-600">
                {badges.filter(b => b.category === 'Learning' && b.earned).length} earned
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">💻</div>
              <h3 className="font-semibold text-gray-800 mb-1">Projects</h3>
              <p className="text-sm text-gray-600">
                {badges.filter(b => b.category === 'Projects' && b.earned).length} earned
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">👥</div>
              <h3 className="font-semibold text-gray-800 mb-1">Community</h3>
              <p className="text-sm text-gray-600">
                {badges.filter(b => b.category === 'Community' && b.earned).length} earned
              </p>
            </div>
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h3 className="font-semibold text-gray-800 mb-1">Achievement</h3>
              <p className="text-sm text-gray-600">
                {badges.filter(b => b.category === 'Achievement' && b.earned).length} earned
              </p>
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
              href="/analytics"
              className="flex flex-col items-center p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <span className="text-2xl mb-2">📈</span>
              <span className="text-sm font-medium text-gray-700">Analytics</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 