'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getModuleById } from '@/utils/courseContent'
import { useAuth } from '@/utils/AuthContext'
import { db } from '@/utils/supabase'
import ModuleDetail from '@/components/ModuleDetail'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'
import { CourseModule } from '@/utils/courseContent'

export default function ModulePage() {
  return (
    <ProtectedRoute>
      <ModuleContent />
    </ProtectedRoute>
  )
}

function ModuleContent() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()
  const [module, setModule] = useState<CourseModule | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const moduleId = params.id as string
    const foundModule = getModuleById(moduleId)
    
    if (!foundModule) {
      setError('Módulo no encontrado')
      setLoading(false)
      return
    }

    setModule(foundModule)
    setLoading(false)
  }, [params.id])

  const handleProgressUpdate = async (progress: number) => {
    if (!user || !module) return

    try {
      await db.updateUserProgress(user.id, module.id, {
        progress_percentage: progress,
        completed: progress === 100
      })
    } catch (error) {
      console.error('Error updating progress:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Cargando módulo...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !module) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
        <Navigation />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Error</h3>
            <p className="text-gray-600 mb-4">{error || 'Módulo no encontrado'}</p>
            <button
              onClick={() => router.push('/progress')}
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Volver al progreso
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.push('/progress')}
            className="flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <span>←</span>
            <span>Volver al progreso</span>
          </button>
        </div>
        
        <ModuleDetail 
          module={module} 
          onProgressUpdate={handleProgressUpdate}
        />
      </div>
    </div>
  )
} 