'use client'

import { useState } from 'react'
import Link from 'next/link'

interface QASession {
  id: string
  title: string
  instructor: string
  topic: string
  date: string
  time: string
  duration: string
  status: 'upcoming' | 'live' | 'completed'
  description: string
  questionCount: number
  participantCount: number
}

interface Question {
  id: string
  sessionId: string
  author: string
  question: string
  submittedAt: string
  isFromUser: boolean
  answered?: boolean
  answer?: string
}

export default function LiveQAPage() {
  const [sessions] = useState<QASession[]>([
    {
      id: '1',
      title: 'Digital Ecosystem Deep Dive',
      instructor: 'Dr. Sarah Chen',
      topic: 'Digital Ecosystem',
      date: '2024-01-25',
      time: '14:00',
      duration: '60 min',
      status: 'upcoming',
      description: 'Join us for an in-depth discussion about digital ecosystems, their components, and how to analyze them effectively.',
      questionCount: 8,
      participantCount: 45
    },
    {
      id: '2',
      title: 'AI Tools in Development',
      instructor: 'Prof. Michael Rodriguez',
      topic: 'AI Tools',
      date: '2024-01-28',
      time: '15:30',
      duration: '90 min',
      status: 'upcoming',
      description: 'Learn how to effectively integrate AI coding assistants into your development workflow.',
      questionCount: 12,
      participantCount: 67
    },
    {
      id: '3',
      title: 'MVP Development Strategies',
      instructor: 'Emily Watson',
      topic: 'MVP Development',
      date: '2024-01-22',
      time: '10:00',
      duration: '75 min',
      status: 'completed',
      description: 'Strategies and best practices for building and launching your MVP successfully.',
      questionCount: 15,
      participantCount: 89
    }
  ])

  const [questions] = useState<Question[]>([
    {
      id: '1',
      sessionId: '1',
      author: 'You',
      question: 'What are the key differences between digital ecosystems and traditional business models?',
      submittedAt: '2024-01-20',
      isFromUser: true,
      answered: false
    },
    {
      id: '2',
      sessionId: '2',
      author: 'Alex Johnson',
      question: 'Which AI coding assistant would you recommend for beginners?',
      submittedAt: '2024-01-19',
      isFromUser: false,
      answered: true,
      answer: 'For beginners, I recommend starting with GitHub Copilot as it integrates well with most IDEs and provides helpful suggestions.'
    },
    {
      id: '3',
      sessionId: '3',
      author: 'You',
      question: 'How do you determine the minimum viable features for an MVP?',
      submittedAt: '2024-01-21',
      isFromUser: true,
      answered: true,
      answer: 'Focus on the core problem your product solves. Identify the essential features that directly address this problem and build only those first.'
    }
  ])

  const [selectedSession, setSelectedSession] = useState<QASession | null>(null)
  const [showQuestionForm, setShowQuestionForm] = useState(false)
  const [newQuestion, setNewQuestion] = useState('')

  const handleSubmitQuestion = () => {
    if (!newQuestion.trim()) return

    // Simulate question submission
    console.log('Question submitted:', newQuestion)
    setShowQuestionForm(false)
    setNewQuestion('')
    
    alert('Question submitted successfully! It will be addressed during the session.')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700'
      case 'live': return 'bg-green-100 text-green-700'
      case 'completed': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const upcomingSessions = sessions.filter(s => s.status === 'upcoming')
  const completedSessions = sessions.filter(s => s.status === 'completed')

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Live Q&A Sessions
          </h1>
          <p className="text-xl text-gray-600">Connect with instructors and get your questions answered</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">{sessions.length}</div>
            <div className="text-gray-600">Total Sessions</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{upcomingSessions.length}</div>
            <div className="text-gray-600">Upcoming</div>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">{completedSessions.length}</div>
            <div className="text-gray-600">Completed</div>
          </div>
        </div>

        {/* Upcoming Sessions */}
        {upcomingSessions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upcoming Sessions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingSessions.map((session) => (
                <div 
                  key={session.id}
                  className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {session.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {session.description}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Instructor</span>
                      <span className="text-gray-700">{session.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Date & Time</span>
                      <span className="text-gray-700">
                        {new Date(session.date).toLocaleDateString()} at {session.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Duration</span>
                      <span className="text-gray-700">{session.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Participants</span>
                      <span className="text-gray-700">{session.participantCount} registered</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedSession(session)
                        setShowQuestionForm(true)
                      }}
                      className="flex-1 bg-purple-100 text-purple-700 py-2 rounded-lg text-sm font-medium hover:bg-purple-200 transition-colors"
                    >
                      Submit Question
                    </button>
                    <button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200">
                      Join Session
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Sessions */}
        {completedSessions.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Completed Sessions</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {completedSessions.map((session) => (
                <div 
                  key={session.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {session.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {session.description}
                      </p>
                    </div>
                    <div className="ml-4 text-right">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(session.status)}`}>
                        {session.status}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Instructor</span>
                      <span className="text-gray-700">{session.instructor}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Date</span>
                      <span className="text-gray-700">
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">Questions</span>
                      <span className="text-gray-700">{session.questionCount} answered</span>
                    </div>
                  </div>

                  <button className="w-full bg-green-100 text-green-700 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                    View Recording
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Your Questions */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Questions</h2>
          <div className="space-y-4">
            {questions.filter(q => q.isFromUser).map((question) => (
              <div key={question.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      {sessions.find(s => s.id === question.sessionId)?.title}
                    </h3>
                    <p className="text-gray-700 mb-3">{question.question}</p>
                  </div>
                  <div className="ml-4 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      question.answered ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {question.answered ? 'Answered' : 'Pending'}
                    </span>
                  </div>
                </div>

                <div className="text-sm text-gray-500 mb-3">
                  Submitted: {new Date(question.submittedAt).toLocaleDateString()}
                </div>

                {question.answered && question.answer && (
                  <div className="bg-blue-50 rounded-xl p-4">
                    <p className="text-sm font-medium text-gray-800 mb-2">Answer:</p>
                    <p className="text-gray-700">{question.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Question Form Modal */}
        {showQuestionForm && selectedSession && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Submit Question</h2>
                
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    {selectedSession.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    with {selectedSession.instructor}
                  </p>
                  <p className="text-gray-700">{selectedSession.description}</p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Question</label>
                  <textarea
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                    placeholder="Ask your question here. Be specific and clear..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowQuestionForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitQuestion}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Submit Question
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
              href="/progress"
              className="flex flex-col items-center p-4 rounded-xl bg-purple-50 hover:bg-purple-100 transition-colors"
            >
              <span className="text-2xl mb-2">📊</span>
              <span className="text-sm font-medium text-gray-700">Progress</span>
            </Link>
            <Link 
              href="/forum"
              className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl mb-2">💭</span>
              <span className="text-sm font-medium text-gray-700">Forum</span>
            </Link>
            <Link 
              href="/feedback"
              className="flex flex-col items-center p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl mb-2">💬</span>
              <span className="text-sm font-medium text-gray-700">Feedback</span>
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