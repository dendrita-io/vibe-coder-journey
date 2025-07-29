'use client'

import { useState } from 'react'
import { getAllModules } from '@/utils/courseContent'
import { useAuth } from '@/utils/AuthContext'
import Navigation from '@/components/Navigation'
import ProtectedRoute from '@/components/ProtectedRoute'

export default function ResourcesPage() {
  return (
    <ProtectedRoute>
      <ResourcesContent />
    </ProtectedRoute>
  )
}

function ResourcesContent() {
  const { user } = useAuth()
  const [selectedModule, setSelectedModule] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedType, setSelectedType] = useState<string>('all')
  
  const modules = getAllModules()
  
  // Get all resources from all modules
  const allResources = modules.flatMap(module => 
    module.resources.map(resource => ({
      ...resource,
      moduleTitle: module.title,
      moduleId: module.id
    }))
  )

  // Filter resources based on search and filters
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesModule = selectedModule === 'all' || resource.moduleId === selectedModule
    const matchesType = selectedType === 'all' || resource.type === selectedType
    
    return matchesSearch && matchesModule && matchesType
  })

  const resourceTypes = ['all', 'video', 'article', 'tool', 'documentation']
  const typeLabels = {
    all: 'Todos',
    video: 'Videos',
    article: 'Artículos',
    tool: 'Herramientas',
    documentation: 'Documentación'
  }

  const getResourceTypeIcon = (type: string) => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Biblioteca de Recursos
          </h1>
          <p className="text-gray-600 text-lg">
            Accede a todos los recursos, herramientas y materiales de aprendizaje del curso
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buscar recursos
              </label>
              <input
                type="text"
                placeholder="Buscar por título o descripción..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Module Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por módulo
              </label>
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">Todos los módulos</option>
                {modules.map(module => (
                  <option key={module.id} value={module.id}>
                    {module.title}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filtrar por tipo
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {resourceTypes.map(type => (
                  <option key={type} value={type}>
                    {typeLabels[type as keyof typeof typeLabels]}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-purple-600">{allResources.length}</div>
                <div className="text-sm text-gray-600">Total de recursos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{modules.length}</div>
                <div className="text-sm text-gray-600">Módulos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{filteredResources.length}</div>
                <div className="text-sm text-gray-600">Resultados</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">
                  {allResources.filter(r => r.type === 'video').length}
                </div>
                <div className="text-sm text-gray-600">Videos</div>
              </div>
            </div>
          </div>

          {/* Resources by Module */}
          {selectedModule === 'all' ? (
            // Show resources grouped by module
            <div className="space-y-6">
              {modules.map(module => {
                const moduleResources = allResources.filter(r => r.moduleId === module.id)
                const filteredModuleResources = moduleResources.filter(resource => {
                  const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                       resource.description.toLowerCase().includes(searchTerm.toLowerCase())
                  const matchesType = selectedType === 'all' || resource.type === selectedType
                  return matchesSearch && matchesType
                })

                if (filteredModuleResources.length === 0) return null

                return (
                  <div key={module.id} className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      {module.title}
                    </h3>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredModuleResources.map(resource => (
                        <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start space-x-3">
                            <span className="text-2xl">{getResourceTypeIcon(resource.type)}</span>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-800 mb-1">{resource.title}</h4>
                              <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                              <div className="flex items-center justify-between">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  resource.type === 'video' ? 'bg-red-100 text-red-800' :
                                  resource.type === 'article' ? 'bg-blue-100 text-blue-800' :
                                  resource.type === 'tool' ? 'bg-green-100 text-green-800' :
                                  'bg-purple-100 text-purple-800'
                                }`}>
                                  {resource.type}
                                </span>
                                <a
                                  href={resource.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                                >
                                  Ver →
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            // Show filtered resources
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Recursos filtrados ({filteredResources.length})
              </h3>
              {filteredResources.length === 0 ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-gray-400 text-2xl">🔍</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">No se encontraron recursos</h3>
                  <p className="text-gray-600">Intenta ajustar los filtros de búsqueda</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredResources.map(resource => (
                    <div key={resource.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start space-x-3">
                        <span className="text-2xl">{getResourceTypeIcon(resource.type)}</span>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-800 mb-1">{resource.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{resource.description}</p>
                          <div className="flex items-center justify-between">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              resource.type === 'video' ? 'bg-red-100 text-red-800' :
                              resource.type === 'article' ? 'bg-blue-100 text-blue-800' :
                              resource.type === 'tool' ? 'bg-green-100 text-green-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {resource.type}
                            </span>
                            <a
                              href={resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                            >
                              Ver →
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 