'use client'

import GoalsManager from '@/components/GoalsManager'

export default function GoalsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Your Learning Goals
          </h1>
          <p className="text-xl text-gray-600">Set, track, and achieve your learning objectives</p>
        </div>

        <GoalsManager />
      </div>
    </div>
  )
} 