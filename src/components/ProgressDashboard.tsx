'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/utils/AuthContext'
import { db } from '@/utils/supabase'

interface Module {
  id: string
  title: string
  description: string
  completed: boolean
  progress: number
  estimatedTime: string
}

interface ProgressDashboardProps {
  modules?: Module[]
  onModuleClick?: (moduleId: string) => void
}

export default function ProgressDashboard({ modules: propModules, onModuleClick }: ProgressDashboardProps) {
  const { user } = useAuth()
  const router = useRouter()
  const [modules, setModules] = useState<Module[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Default module structure
  const defaultModules: Module[] = [
    {
      id: '1',
      title: 'Fundamentos del Ecosistema Digital',
      description: 'Understanding the basics of modern digital landscape',
      completed: false,
      progress: 0,
      estimatedTime: '1 week'
    },
    {
      id: '2',
      title: 'Mentalidad Productiva y Diseño de Producto',
      description: 'Developing a productive mindset and design thinking',
      completed: false,
      progress: 0,
      estimatedTime: '1 week'
    },
    {
      id: '3',
      title: 'Prototipado y Pruebas Tempranas',
      description: 'Learn to prototype and test your ideas early',
      completed: false,
      progress: 0,
      estimatedTime: '1 week'
    },
    {
      id: '4',
      title: 'Tu Kit de Herramientas IA y Desarrollo',
      description: 'Master AI tools and development workflows',
      completed: false,
      progress: 0,
      estimatedTime: '1 week'
    },
    {
      id: '5',
      title: 'Construcción del MVP Paso a Paso',
      description: 'Build your MVP following proven methodologies',
      completed: false,
      progress: 0,
      estimatedTime: '1 week'
    },
    {
      id: '6',
      title: 'Validación de Mercado y Siguientes Pasos',
      description: 'Validate your product and plan next steps',
      completed: false,
      progress: 0,
      estimatedTime: '1 week'
    }
  ]

  useEffect(() => {
    const fetchProgress = async () => {
      if (!user) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        // If modules are passed as props, use them
        if (propModules) {
          setModules(propModules)
          setIsLoading(false)
          return
        }

        // Fetch user progress from Supabase
        const { data: progressData, error: progressError } = await db.getUserProgress(user.id)

        if (progressError) {
          console.error('Error fetching progress:', progressError)
          setError('Error loading progress data')
          setModules(defaultModules)
        } else {
          // Merge default modules with user progress data
          const updatedModules = defaultModules.map(module => {
            const userProgress = progressData?.find(p => p.module_id === module.id)
            return {
              ...module,
              completed: userProgress?.completed || false,
              progress: userProgress?.progress_percentage || 0,
              title: userProgress?.module_title || module.title
            }
          })
          setModules(updatedModules)
        }
      } catch (error) {
        console.error('Error fetching progress:', error)
        setError('Error loading progress data')
        setModules(defaultModules)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProgress()
  }, [user, propModules])

  const completedModules = modules.filter(module => module.completed)
  const totalProgress = Math.round((completedModules.length / modules.length) * 100)

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
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
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Error Loading Progress</h3>
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
      {/* Overall Progress */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">Overall Progress</h2>
          <span className="text-3xl font-bold text-purple-600">{totalProgress}%</span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-4 rounded-full transition-all duration-500"
            style={{ width: `${totalProgress}%` }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{completedModules.length} of {modules.length} modules completed</span>
          <span>{modules.length - completedModules.length} modules remaining</span>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div 
            key={module.id}
            className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl cursor-pointer ${
              module.completed ? 'border-2 border-green-200' : ''
            }`}
            onClick={() => {
              onModuleClick?.(module.id)
              router.push(`/modules/${module.id}`)
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {module.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {module.description}
                </p>
              </div>
              <div className="ml-4">
                {module.completed ? (
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

            {/* Module Progress */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{module.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    module.completed 
                      ? 'bg-green-500' 
                      : 'bg-gradient-to-r from-purple-500 to-blue-500'
                  }`}
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
            </div>

            {/* Module Actions */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                ⏱️ {module.estimatedTime}
              </span>
              <Link
                href={`/projects?module=${module.id}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  module.completed
                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                    : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                {module.completed ? 'Review' : 'Continue'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link 
            href="/goals"
            className="flex flex-col items-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
          >
            <span className="text-2xl mb-2">🎯</span>
            <span className="text-sm font-medium text-gray-700">Set Goals</span>
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
            <span className="text-2xl mb-2">📊</span>
            <span className="text-sm font-medium text-gray-700">Analytics</span>
          </Link>
        </div>
      </div>
    </div>
  )
} 