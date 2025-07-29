'use client'

import { useState } from 'react'
import { CourseModule, Topic, Activity, Resource } from '@/utils/courseContent'
import { useAuth } from '@/utils/AuthContext'
import { db } from '@/utils/supabase'

interface ModuleDetailProps {
  module: CourseModule
  onProgressUpdate?: (progress: number) => void
}

export default function ModuleDetail({ module, onProgressUpdate }: ModuleDetailProps) {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'overview' | 'topics' | 'activities' | 'resources'>('overview')
  const [completedTopics, setCompletedTopics] = useState<string[]>([])
  const [completedActivities, setCompletedActivities] = useState<string[]>([])

  const handleTopicComplete = async (topicId: string) => {
    if (!user) return

    const newCompletedTopics = completedTopics.includes(topicId)
      ? completedTopics.filter(id => id !== topicId)
      : [...completedTopics, topicId]

    setCompletedTopics(newCompletedTopics)

    // Calculate progress
    const totalTopics = module.topics.length
    const progress = Math.round((newCompletedTopics.length / totalTopics) * 100)

    // Update progress in database
    try {
      await db.updateUserProgress(user.id, module.id, {
        progress_percentage: progress,
        completed: progress === 100
      })
      onProgressUpdate?.(progress)
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  const handleActivityComplete = async (activityId: string) => {
    if (!user) return

    const newCompletedActivities = completedActivities.includes(activityId)
      ? completedActivities.filter(id => id !== activityId)
      : [...completedActivities, activityId]

    setCompletedActivities(newCompletedActivities)
  }

  const getTopicTypeIcon = (type: Topic['type']) => {
    switch (type) {
      case 'theory':
        return '📚'
      case 'practice':
        return '💻'
      case 'demo':
        return '🎬'
      case 'workshop':
        return '👥'
      default:
        return '📝'
    }
  }

  const getActivityTypeIcon = (type: Activity['type']) => {
    switch (type) {
      case 'exercise':
        return '✏️'
      case 'challenge':
        return '🏆'
      case 'workshop':
        return '👥'
      case 'demo':
        return '🎬'
      default:
        return '📝'
    }
  }

  const getResourceTypeIcon = (type: Resource['type']) => {
    switch (type) {
      case 'video':
        return '🎥'
      case 'article':
        return '📄'
      case 'tool':
        return '🛠️'
      case 'documentation':
        return '📚'
      default:
        return '🔗'
    }
  }

  return (
    <div className="space-y-6">
      {/* Module Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
              {module.title}
            </h1>
            <p className="text-gray-600 text-lg mb-4">{module.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>📅 Semana {module.week}</span>
              <span>⏱️ {module.estimatedTime}</span>
              <span>📚 {module.topics.length} temas</span>
              <span>🎯 {module.activities.length} actividades</span>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round((completedTopics.length / module.topics.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Completado</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-purple-600 to-blue-600 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(completedTopics.length / module.topics.length) * 100}%` }}
          ></div>
        </div>

        {/* Objectives */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Objetivos de aprendizaje</h3>
          <ul className="space-y-2">
            {module.objectives.map((objective, index) => (
              <li key={index} className="flex items-start space-x-2">
                <span className="text-green-500 mt-1">✓</span>
                <span className="text-gray-700">{objective}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Resumen', icon: '📋' },
              { id: 'topics', label: 'Temas', icon: '📚' },
              { id: 'activities', label: 'Actividades', icon: '🎯' },
              { id: 'resources', label: 'Recursos', icon: '🔗' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Resumen del módulo</h3>
                <p className="text-gray-600 leading-relaxed">
                  Este módulo te guiará a través de los conceptos fundamentales y prácticas necesarias 
                  para desarrollar las habilidades requeridas. Cada tema está diseñado para construir 
                  sobre el anterior, creando una base sólida de conocimiento.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">📚 Temas principales</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {module.topics.slice(0, 3).map((topic) => (
                      <li key={topic.id} className="flex items-center space-x-2">
                        <span>{getTopicTypeIcon(topic.type)}</span>
                        <span>{topic.title}</span>
                      </li>
                    ))}
                    {module.topics.length > 3 && (
                      <li className="text-purple-600">+{module.topics.length - 3} temas más</li>
                    )}
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-800 mb-2">🎯 Actividades prácticas</h4>
                  <ul className="space-y-1 text-sm text-gray-600">
                    {module.activities.slice(0, 3).map((activity) => (
                      <li key={activity.id} className="flex items-center space-x-2">
                        <span>{getActivityTypeIcon(activity.type)}</span>
                        <span>{activity.title}</span>
                      </li>
                    ))}
                    {module.activities.length > 3 && (
                      <li className="text-purple-600">+{module.activities.length - 3} actividades más</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Topics Tab */}
          {activeTab === 'topics' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Temas del módulo</h3>
              {module.topics.map((topic) => (
                <div key={topic.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getTopicTypeIcon(topic.type)}</span>
                        <h4 className="text-lg font-semibold text-gray-800">{topic.title}</h4>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {topic.duration}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{topic.content}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span className={`px-2 py-1 rounded-full ${
                          topic.type === 'theory' ? 'bg-blue-100 text-blue-800' :
                          topic.type === 'practice' ? 'bg-green-100 text-green-800' :
                          topic.type === 'demo' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {topic.type}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleTopicComplete(topic.id)}
                      className={`ml-4 p-2 rounded-full transition-colors ${
                        completedTopics.includes(topic.id)
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                      }`}
                    >
                      {completedTopics.includes(topic.id) ? '✓' : '○'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Activities Tab */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Actividades prácticas</h3>
              {module.activities.map((activity) => (
                <div key={activity.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-2xl">{getActivityTypeIcon(activity.type)}</span>
                        <h4 className="text-lg font-semibold text-gray-800">{activity.title}</h4>
                        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                          {activity.estimatedTime}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-3">{activity.description}</p>
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-800">Instrucciones:</h5>
                        <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                          {activity.instructions.map((instruction, index) => (
                            <li key={index}>{instruction}</li>
                          ))}
                        </ol>
                      </div>
                    </div>
                    <button
                      onClick={() => handleActivityComplete(activity.id)}
                      className={`ml-4 p-2 rounded-full transition-colors ${
                        completedActivities.includes(activity.id)
                          ? 'bg-green-100 text-green-600'
                          : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
                      }`}
                    >
                      {completedActivities.includes(activity.id) ? '✓' : '○'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Recursos adicionales</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {module.resources.map((resource) => (
                  <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start space-x-3">
                      <span className="text-2xl">{getResourceTypeIcon(resource.type)}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800 mb-1">{resource.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                        >
                          Ver recurso →
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 