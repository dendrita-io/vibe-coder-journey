'use client'

import { useState } from 'react'
import Link from 'next/link'

interface Feedback {
  id: string
  projectTitle: string
  instructorName: string
  submittedAt: string
  feedback: string
  score: number
  maxScore: number
  status: 'pending' | 'reviewed'
  suggestions: string[]
  strengths: string[]
  areasForImprovement: string[]
}

export default function FeedbackPage() {
  const [feedbacks] = useState<Feedback[]>([
    {
      id: '1',
      projectTitle: 'Digital Ecosystem Analysis',
      instructorName: 'Dr. Sarah Chen',
      submittedAt: '2024-01-10',
      feedback: 'Excellent analysis! Your insights on digital transformation were spot-on. The way you connected different ecosystem components showed deep understanding. Your recommendations were practical and actionable.',
      score: 8,
      maxScore: 10,
      status: 'reviewed',
      suggestions: [
        'Consider adding more quantitative data to support your analysis',
        'Include competitor analysis in future projects',
        'Add visual diagrams to make complex concepts clearer'
      ],
      strengths: [
        'Strong analytical thinking',
        'Clear and concise writing',
        'Practical recommendations',
        'Good research methodology'
      ],
      areasForImprovement: [
        'Include more data visualization',
        'Expand on implementation strategies',
        'Add risk assessment'
      ]
    },
    {
      id: '2',
      projectTitle: 'Product Design Sprint',
      instructorName: 'Prof. Michael Rodriguez',
      submittedAt: '2024-01-15',
      feedback: 'Your design sprint showed great creativity and user empathy. The prototype was well-executed and the user testing methodology was solid. However, there\'s room for improvement in the iteration process.',
      score: 7,
      maxScore: 10,
      status: 'reviewed',
      suggestions: [
        'Conduct more user interviews before prototyping',
        'Test with a larger sample size',
        'Document the iteration process more thoroughly'
      ],
      strengths: [
        'Creative problem-solving',
        'Good user research',
        'Effective prototyping',
        'Clear presentation'
      ],
      areasForImprovement: [
        'Expand user research sample',
        'Improve iteration documentation',
        'Add quantitative metrics'
      ]
    },
    {
      id: '3',
      projectTitle: 'AI Tools Integration',
      instructorName: 'Dr. Emily Watson',
      submittedAt: '2024-01-20',
      feedback: 'Your project is currently under review. We\'ll provide detailed feedback within 48 hours.',
      score: 0,
      maxScore: 10,
      status: 'pending',
      suggestions: [],
      strengths: [],
      areasForImprovement: []
    }
  ])

  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null)

  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100
    if (percentage >= 80) return 'text-green-600'
    if (percentage >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'reviewed': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const reviewedFeedbacks = feedbacks.filter(f => f.status === 'reviewed')
  const pendingFeedbacks = feedbacks.filter(f => f.status === 'pending')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Instructor Feedback
          </h1>
          <p className="text-xl text-gray-600">Review feedback from your instructors and improve your skills</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{feedbacks.length}</div>
            <div className="text-gray-600">Total Submissions</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{reviewedFeedbacks.length}</div>
            <div className="text-gray-600">Reviewed</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-yellow-600 mb-2">{pendingFeedbacks.length}</div>
            <div className="text-gray-600">Pending Review</div>
          </div>
        </div>

        {/* Feedback List */}
        <div className="space-y-6">
          {/* Reviewed Feedback */}
          {reviewedFeedbacks.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Reviewed Feedback</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {reviewedFeedbacks.map((feedback) => (
                  <div 
                    key={feedback.id}
                    className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl cursor-pointer"
                    onClick={() => setSelectedFeedback(feedback)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          {feedback.projectTitle}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Instructor: {feedback.instructorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(feedback.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                          {feedback.status}
                        </div>
                        <div className={`text-lg font-bold mt-1 ${getScoreColor(feedback.score, feedback.maxScore)}`}>
                          {feedback.score}/{feedback.maxScore}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {feedback.feedback}
                    </p>

                    <button className="w-full py-2 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors">
                      View Full Feedback
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pending Feedback */}
          {pendingFeedbacks.length > 0 && (
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Pending Review</h3>
              <div className="grid md:grid-cols-2 gap-6">
                {pendingFeedbacks.map((feedback) => (
                  <div 
                    key={feedback.id}
                    className="bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-gray-800 mb-2">
                          {feedback.projectTitle}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Instructor: {feedback.instructorName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Submitted: {new Date(feedback.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="ml-4 text-right">
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(feedback.status)}`}>
                          {feedback.status}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      {feedback.feedback}
                    </p>

                    <div className="flex items-center text-yellow-600 text-sm">
                      <span className="mr-2">⏳</span>
                      <span>Feedback expected within 48 hours</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Feedback Details Modal */}
        {selectedFeedback && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedFeedback.projectTitle}</h2>
                  <button
                    onClick={() => setSelectedFeedback(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <div className="bg-gray-50 rounded-xl p-4 mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Project Info</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Instructor:</span>
                          <span className="text-gray-700">{selectedFeedback.instructorName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Submitted:</span>
                          <span className="text-gray-700">{new Date(selectedFeedback.submittedAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Score:</span>
                          <span className={`font-semibold ${getScoreColor(selectedFeedback.score, selectedFeedback.maxScore)}`}>
                            {selectedFeedback.score}/{selectedFeedback.maxScore}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedFeedback.status)}`}>
                            {selectedFeedback.status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">Detailed Feedback</h3>
                      <div className="bg-blue-50 rounded-xl p-4">
                        <p className="text-gray-700">{selectedFeedback.feedback}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    {selectedFeedback.strengths.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Strengths</h3>
                        <ul className="space-y-2">
                          {selectedFeedback.strengths.map((strength, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-green-500 mr-2">✅</span>
                              <span className="text-gray-700">{strength}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedFeedback.areasForImprovement.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Areas for Improvement</h3>
                        <ul className="space-y-2">
                          {selectedFeedback.areasForImprovement.map((area, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-blue-500 mr-2">💡</span>
                              <span className="text-gray-700">{area}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedFeedback.suggestions.length > 0 && (
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Suggestions</h3>
                        <ul className="space-y-2">
                          {selectedFeedback.suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start">
                              <span className="text-purple-500 mr-2">💭</span>
                              <span className="text-gray-700">{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={() => setSelectedFeedback(null)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                  <Link
                    href="/projects"
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200 text-center"
                  >
                    View Projects
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

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
              href="/progress"
              className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-700">Progress</span>
            </Link>
            <Link 
              href="/quizzes"
              className="flex flex-col items-center p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl mb-2">📝</span>
              <span className="text-sm font-medium text-gray-700">Quizzes</span>
            </Link>
            <Link 
              href="/peer-feedback"
              className="flex flex-col items-center p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <span className="text-2xl mb-2">👥</span>
              <span className="text-sm font-medium text-gray-700">Peer Feedback</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 