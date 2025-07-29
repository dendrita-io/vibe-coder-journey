'use client'

import { useState } from 'react'
import Link from 'next/link'

interface ForumThread {
  id: string
  title: string
  author: string
  content: string
  category: string
  createdAt: string
  replies: number
  views: number
  isSticky?: boolean
  tags: string[]
}

interface ForumReply {
  id: string
  threadId: string
  author: string
  content: string
  createdAt: string
  isAuthor: boolean
}

export default function ForumPage() {
  const [threads] = useState<ForumThread[]>([
    {
      id: '1',
      title: 'Best practices for digital ecosystem analysis?',
      author: 'Sarah Wilson',
      content: 'I\'m working on my digital ecosystem analysis project and would love to hear from others about their approaches. What methods have you found most effective for mapping out ecosystem components?',
      category: 'Digital Ecosystem',
      createdAt: '2024-01-20',
      replies: 8,
      views: 45,
      isSticky: true,
      tags: ['digital ecosystem', 'analysis', 'methods']
    },
    {
      id: '2',
      title: 'AI tools for coding - recommendations needed',
      author: 'Mike Chen',
      content: 'Looking for recommendations on AI coding assistants. I\'ve tried a few but would love to hear what others are using and their experiences.',
      category: 'AI Tools',
      createdAt: '2024-01-19',
      replies: 12,
      views: 67,
      tags: ['AI', 'coding', 'tools', 'productivity']
    },
    {
      id: '3',
      title: 'Prototyping tools comparison',
      author: 'Emily Rodriguez',
      content: 'I\'m starting a new project and need to choose a prototyping tool. Currently considering Figma vs Adobe XD. Any insights on pros and cons?',
      category: 'Prototyping',
      createdAt: '2024-01-18',
      replies: 5,
      views: 23,
      tags: ['prototyping', 'figma', 'adobe xd', 'design']
    },
    {
      id: '4',
      title: 'MVP development tips and tricks',
      author: 'David Thompson',
      content: 'Just finished my first MVP and learned so much! Sharing some key lessons and tips that might help others in their journey.',
      category: 'MVP Development',
      createdAt: '2024-01-17',
      replies: 15,
      views: 89,
      tags: ['MVP', 'development', 'tips', 'lessons learned']
    }
  ])

  const [replies] = useState<ForumReply[]>([
    {
      id: '1',
      threadId: '1',
      author: 'Alex Johnson',
      content: 'Great question! I found that starting with a stakeholder map really helps. Identify all the key players in your ecosystem and their relationships.',
      createdAt: '2024-01-20',
      isAuthor: false
    },
    {
      id: '2',
      threadId: '1',
      author: 'You',
      content: 'Thanks for the tip! I\'ll definitely try the stakeholder mapping approach. Has anyone used any specific tools for this?',
      createdAt: '2024-01-20',
      isAuthor: true
    }
  ])

  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null)
  const [showNewThread, setShowNewThread] = useState(false)
  const [showReplyForm, setShowReplyForm] = useState(false)
  const [newThread, setNewThread] = useState({
    title: '',
    content: '',
    category: 'General',
    tags: ''
  })
  const [newReply, setNewReply] = useState('')

  const handleCreateThread = () => {
    if (!newThread.title.trim() || !newThread.content.trim()) return

    // Simulate thread creation
    console.log('New thread:', newThread)
    setShowNewThread(false)
    setNewThread({
      title: '',
      content: '',
      category: 'General',
      tags: ''
    })
    
    alert('Thread created successfully!')
  }

  const handleSubmitReply = () => {
    if (!newReply.trim()) return

    // Simulate reply submission
    console.log('New reply:', newReply)
    setShowReplyForm(false)
    setNewReply('')
    
    alert('Reply posted successfully!')
  }

  const categories = ['General', 'Digital Ecosystem', 'AI Tools', 'Prototyping', 'MVP Development', 'Product Design', 'Market Validation']

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Community Forum
          </h1>
          <p className="text-xl text-gray-600">Connect, share, and learn from your peers</p>
        </div>

        {/* Create New Thread Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowNewThread(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            + Start New Discussion
          </button>
        </div>

        {/* Threads List */}
        <div className="space-y-4 mb-8">
          {threads.map((thread) => (
            <div 
              key={thread.id}
              className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl cursor-pointer ${
                thread.isSticky ? 'border-2 border-yellow-200' : ''
              }`}
              onClick={() => setSelectedThread(thread)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {thread.isSticky && (
                      <span className="text-yellow-500 text-sm">📌</span>
                    )}
                    <h3 className="text-lg font-semibold text-gray-800">
                      {thread.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {thread.content}
                  </p>
                </div>
                <div className="ml-4 text-right">
                  <div className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {thread.category}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-4">
                  <span>👤 {thread.author}</span>
                  <span>📅 {new Date(thread.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>💬 {thread.replies} replies</span>
                  <span>👁️ {thread.views} views</span>
                </div>
              </div>

              <div className="mt-3">
                <div className="flex flex-wrap gap-1">
                  {thread.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Thread Details Modal */}
        {selectedThread && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{selectedThread.title}</h2>
                  <button
                    onClick={() => setSelectedThread(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-600">👤 {selectedThread.author}</span>
                      <span className="text-sm text-gray-500">📅 {new Date(selectedThread.createdAt).toLocaleDateString()}</span>
                    </div>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                      {selectedThread.category}
                    </span>
                  </div>
                  <p className="text-gray-700">{selectedThread.content}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Replies ({replies.filter(r => r.threadId === selectedThread.id).length})</h3>
                  {replies.filter(r => r.threadId === selectedThread.id).map((reply) => (
                    <div key={reply.id} className={`border-l-4 pl-4 py-3 ${
                      reply.isAuthor ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          {reply.isAuthor ? 'You' : reply.author}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{reply.content}</p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowReplyForm(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                >
                  Reply to Thread
                </button>
              </div>
            </div>
          </div>
        )}

        {/* New Thread Modal */}
        {showNewThread && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Start New Discussion</h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={newThread.title}
                      onChange={(e) => setNewThread({...newThread, title: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your discussion title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newThread.category}
                      onChange={(e) => setNewThread({...newThread, category: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                    <textarea
                      value={newThread.content}
                      onChange={(e) => setNewThread({...newThread, content: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={4}
                      placeholder="Share your thoughts, questions, or insights..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tags (optional)</label>
                    <input
                      type="text"
                      value={newThread.tags}
                      onChange={(e) => setNewThread({...newThread, tags: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter tags separated by commas..."
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    onClick={() => setShowNewThread(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateThread}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Create Thread
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reply Form Modal */}
        {showReplyForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Reply to Thread</h2>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Your Reply</label>
                  <textarea
                    value={newReply}
                    onChange={(e) => setNewReply(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                    placeholder="Share your thoughts, answer, or insights..."
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setShowReplyForm(false)}
                    className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmitReply}
                    className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-200"
                  >
                    Post Reply
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
              href="/resources"
              className="flex flex-col items-center p-4 rounded-xl bg-blue-50 hover:bg-blue-100 transition-colors"
            >
              <span className="text-2xl mb-2">📖</span>
              <span className="text-sm font-medium text-gray-700">Resources</span>
            </Link>
            <Link 
              href="/peer-feedback"
              className="flex flex-col items-center p-4 rounded-xl bg-green-50 hover:bg-green-100 transition-colors"
            >
              <span className="text-2xl mb-2">👥</span>
              <span className="text-sm font-medium text-gray-700">Peer Feedback</span>
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