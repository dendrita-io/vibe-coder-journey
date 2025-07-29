'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Resource {
  id: string
  title: string
  description: string
  category: string
  type: 'article' | 'video' | 'tool' | 'documentation' | 'course'
  url: string
  tags: string[]
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export default function ResourcesPage() {
  const [resources] = useState<Resource[]>([
    {
      id: '1',
      title: 'Digital Ecosystem Fundamentals',
      description: 'Comprehensive guide to understanding modern digital ecosystems and their components.',
      category: 'Digital Ecosystem',
      type: 'article',
      url: 'https://example.com/digital-ecosystem',
      tags: ['digital transformation', 'ecosystem', 'fundamentals'],
      difficulty: 'beginner'
    },
    {
      id: '2',
      title: 'Product Design Principles',
      description: 'Learn the core principles of product design and user experience.',
      category: 'Product Design',
      type: 'course',
      url: 'https://example.com/product-design',
      tags: ['UX', 'UI', 'design thinking', 'user research'],
      difficulty: 'intermediate'
    },
    {
      id: '3',
      title: 'Prototyping Tools Comparison',
      description: 'Compare different prototyping tools and choose the right one for your project.',
      category: 'Prototyping',
      type: 'article',
      url: 'https://example.com/prototyping-tools',
      tags: ['prototyping', 'tools', 'comparison', 'wireframing'],
      difficulty: 'beginner'
    },
    {
      id: '4',
      title: 'AI Coding Assistants Guide',
      description: 'Master the use of AI coding assistants to boost your development productivity.',
      category: 'AI Tools',
      type: 'video',
      url: 'https://example.com/ai-coding',
      tags: ['AI', 'coding', 'productivity', 'assistants'],
      difficulty: 'intermediate'
    },
    {
      id: '5',
      title: 'MVP Development Framework',
      description: 'Step-by-step framework for building and launching your MVP.',
      category: 'MVP Development',
      type: 'documentation',
      url: 'https://example.com/mvp-framework',
      tags: ['MVP', 'development', 'framework', 'launch'],
      difficulty: 'advanced'
    },
    {
      id: '6',
      title: 'Market Validation Strategies',
      description: 'Learn effective strategies to validate your product in the market.',
      category: 'Market Validation',
      type: 'course',
      url: 'https://example.com/market-validation',
      tags: ['validation', 'market research', 'customer feedback'],
      difficulty: 'intermediate'
    },
    {
      id: '7',
      title: 'Figma Design System',
      description: 'Complete design system template for modern web applications.',
      category: 'Design Tools',
      type: 'tool',
      url: 'https://example.com/figma-system',
      tags: ['figma', 'design system', 'components', 'UI'],
      difficulty: 'intermediate'
    },
    {
      id: '8',
      title: 'React Development Best Practices',
      description: 'Essential best practices for building scalable React applications.',
      category: 'Development',
      type: 'article',
      url: 'https://example.com/react-best-practices',
      tags: ['react', 'javascript', 'frontend', 'best practices'],
      difficulty: 'intermediate'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedDifficulty, setSelectedDifficulty] = useState('all')

  const categories = ['all', ...Array.from(new Set(resources.map(r => r.category)))]
  const difficulties = ['all', 'beginner', 'intermediate', 'advanced']

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesDifficulty = selectedDifficulty === 'all' || resource.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'article': return '📄'
      case 'video': return '🎥'
      case 'tool': return '🛠️'
      case 'documentation': return '📚'
      case 'course': return '🎓'
      default: return '📄'
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-700'
      case 'intermediate': return 'bg-yellow-100 text-yellow-700'
      case 'advanced': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Resource Library
          </h1>
          <p className="text-xl text-gray-600">Discover tools, guides, and materials to support your learning</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Search Resources</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Search by title, description, or tags..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty} value={difficulty}>
                    {difficulty === 'all' ? 'All Levels' : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {filteredResources.map((resource) => (
            <div 
              key={resource.id}
              className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{getTypeIcon(resource.type)}</span>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {resource.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {resource.description}
                  </p>
                </div>
                <div className="ml-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(resource.difficulty)}`}>
                    {resource.difficulty}
                  </span>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Category</span>
                  <span className="text-gray-700">{resource.category}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Type</span>
                  <span className="text-gray-700 capitalize">{resource.type}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 3).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                  {resource.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                      +{resource.tags.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 text-center block"
              >
                Access Resource
              </a>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link 
              href="/projects"
              className="flex flex-col items-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
            >
              <span className="text-2xl mb-2">💻</span>
              <span className="text-sm font-medium text-gray-700">Projects</span>
            </Link>
            <Link 
              href="/forum"
              className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl mb-2">💭</span>
              <span className="text-sm font-medium text-gray-700">Forum</span>
            </Link>
            <Link 
              href="/quizzes"
              className="flex flex-col items-center p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl mb-2">📝</span>
              <span className="text-sm font-medium text-gray-700">Quizzes</span>
            </Link>
            <Link 
              href="/progress"
              className="flex flex-col items-center p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <span className="text-2xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-700">Progress</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 