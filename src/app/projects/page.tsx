'use client'

import HandsOnProject from '@/components/HandsOnProject'

export default function ProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Hands-On Projects
          </h1>
          <p className="text-xl text-gray-600">Apply your learning through practical projects</p>
        </div>

        <HandsOnProject />
      </div>
    </div>
  )
} 