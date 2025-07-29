'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PeerProject {
  id: string
  title: string
  author: string
  description: string
  submittedAt: string
  category: string
  feedbackCount: number
  hasUserFeedback: boolean
}

interface PeerFeedback {
  id: string
  projectId: string
  projectTitle: string
  author: string
  feedback: string
  rating: number
  submittedAt: string
  isFromUser: boolean
}

export default function PeerFeedbackPage() {
  const [peerProjects] = useState<PeerProject[]>([
    {
      id: '1',
      title: 'E-commerce Platform Design',
      author: 'Alex Johnson',
      description: 'A comprehensive e-commerce platform with modern UI/UX design and mobile responsiveness.',
      submittedAt: '2024-01-18',
      category: 'Web Development',
      feedbackCount: 3,
      hasUserFeedback: false
    },
    {
      id: '2',
      title: 'AI-Powered Task Manager',
      author: 'Maria Garcia',
      description: 'Smart task management app using AI to prioritize and organize user tasks efficiently.',
      submittedAt: '2024-01-17',
      category: 'Mobile App',
      feedbackCount: 2,
      hasUserFeedback: true
    },
    {
      id: '3',
      title: 'Digital Marketing Dashboard',
      author: 'David Chen',
      description: 'Analytics dashboard for tracking marketing campaigns and performance metrics.',
      submittedAt: '2024-01-16',
      category: 'Data Analytics',
      feedbackCount: 1,
      hasUserFeedback: false
    }
  ])

  const [userFeedbacks] = useState<PeerFeedback[]>([
    {
      id: '1',
      projectId: '2',
      projectTitle: 'AI-Powered Task Manager',
      author: 'You',
      feedback: 'Great concept! The AI integration is innovative. Consider adding more customization options for task categories.',
      rating: 4,
      submittedAt: '2024-01-17',
      isFromUser: true
    }
  ])

  const [receivedFeedbacks] = useState<PeerFeedback[]>([
    {
      id: '2',
      projectId: '1',
      projectTitle: 'Digital Ecosystem Analysis',
      author: 'Sarah Wilson',
      feedback: 'Excellent analysis! Your insights on digital transformation were comprehensive. The visual diagrams really helped clarify complex concepts.',
      rating: 5,
      submittedAt: '2024-01-15',
      isFromUser: false
    },
    {
      id: '3',
      projectId: '1',
      projectTitle: 'Digital Ecosystem Analysis',
      author: 'Mike Thompson',
      feedback: 'Good work on the ecosystem mapping. Consider adding more quantitative data to strengthen your recommendations.',
      rating: 4,
      submittedAt: '2024-01-14',
      isFromUser: false
    }
  ])

  const [selectedProject, setSelectedProject] = useState<PeerProject | null>(null)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [feedbackData, setFeedbackData] = useState({
    projectId: '',
    feedback: '',
    rating: 5
  })

  const handleSubmitFeedback = () => {
    if (!feedbackData.feedback.trim()) return

    // Simulate feedback submission
    console.log('Feedback submitted:', feedbackData)
    setShowFeedbackForm(false)
    setFeedbackData({
      projectId: '',
      feedback: '',
      rating: 5
    })
    
    alert('Feedback submitted successfully! Thank you for helping your peers improve.')
  }

  const getRatingStars = (rating: number) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Peer Feedback
          </h1>
          <p className="text-xl text-gray-600">Give and receive constructive feedback from your peers</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{peerProjects.length}</div>
            <div className="text-gray-600">Available Projects</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{userFeedbacks.length}</div>
            <div className="text-gray-600">Feedback Given</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{receivedFeedbacks.length}</div>
            <div className="text-gray-600">Feedback Received</div>
          </div>
        </div>

        {/* Available Projects for Feedback */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Give Feedback</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {peerProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      by {project.author}
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {project.category}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Submitted</span>
                    <span className="text-gray-700">{new Date(project.submittedAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Feedback</span>
                    <span className="text-gray-700">{project.feedbackCount} reviews</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedProject(project)
                    setFeedbackData({...feedbackData, projectId: project.id})
                    setShowFeedbackForm(true)
                  }}
                  disabled={project.hasUserFeedback}
                  className={`w-full py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    project.hasUserFeedback
                      ? 'bg-green-100 text-green-700 cursor-not-allowed'
                      : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                  }`}
                >
                  {project.hasUserFeedback ? 'Already Reviewed' : 'Give Feedback'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Feedback Received */}
        {receivedFeedbacks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Feedback Received</h2>
            <div className="space-y-4">
              {receivedFeedbacks.map((feedback) => (
                <div key={feedback.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {feedback.projectTitle}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Feedback from {feedback.author}
                      </p>
                      <div className="text-sm text-gray-500 mb-3">
                        {new Date(feedback.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-lg font-semibold text-yellow-600">
                        {getRatingStars(feedback.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-gray-700">{feedback.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Given */}
        {userFeedbacks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Feedback Given</h2>
            <div className="space-y-4">
              {userFeedbacks.map((feedback) => (
                <div key={feedback.id} className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {feedback.projectTitle}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        Your feedback
                      </p>
                      <div className="text-sm text-gray-500 mb-3">
                        {new Date(feedback.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="ml-4 text-right">
                      <div className="text-lg font-semibold text-yellow-600">
                        {getRatingStars(feedback.rating)}
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 rounded-xl p-4">
                    <p className="text-gray-700">{feedback.feedback}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Feedback Form Modal */}
        {showFeedbackForm && selectedProject && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Give Feedback</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {selectedProject.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    by {selectedProject.author}
                  </p>
                  <p className="text-gray-700">{selectedProject.description}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Rating
                    </label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          onClick={() => setFeedbackData({...feedbackData, rating: star})}
                          className={`text-2xl transition-colors ${
                            star <= feedbackData.rating ? 'text-yellow-500' : 'text-gray-300'
                          }`}
                        >
                          ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Feedback
                    </label>
                    <textarea
                      value={feedbackData.feedback}
                      onChange={(e) => setFeedbackData({...feedbackData, feedback: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={4}
                      placeholder="Share your thoughts on this project. Be constructive and specific..."
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setShowFeedbackForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitFeedback}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Submit Feedback
                  </button>
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
              href="/feedback"
              className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl mb-2">💬</span>
              <span className="text-sm font-medium text-gray-700">Instructor Feedback</span>
            </Link>
            <Link 
              href="/forum"
              className="flex flex-col items-center p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl mb-2">💭</span>
              <span className="text-sm font-medium text-gray-700">Forum</span>
            </Link>
            <Link 
              href="/resources"
              className="flex flex-col items-center p-4 rounded-xl bg-orange-50 hover:bg-orange-100 transition-colors"
            >
              <span className="text-2xl mb-2">📖</span>
              <span className="text-sm font-medium text-gray-700">Resources</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 