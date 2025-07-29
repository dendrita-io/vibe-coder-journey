'use client'

import { useState, useEffect } from 'react'

interface Project {
  id: string
  moduleId: string
  title: string
  description: string
  instructions: string[]
  requirements: string[]
  estimatedTime: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  completed: boolean
  submission?: ProjectSubmission
}

interface ProjectSubmission {
  id: string
  projectId: string
  submissionText: string
  githubUrl?: string
  liveUrl?: string
  submittedAt: string
  status: 'pending' | 'approved' | 'needs_revision'
  instructorFeedback?: string
  peerFeedback?: PeerFeedback[]
}

interface PeerFeedback {
  id: string
  reviewerName: string
  rating: number
  comment: string
  submittedAt: string
}

interface HandsOnProjectProps {
  moduleId?: string
  onProjectComplete?: (projectId: string) => void
}

export default function HandsOnProject({ moduleId, onProjectComplete }: HandsOnProjectProps) {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      moduleId: '1',
      title: 'Digital Ecosystem Analysis',
      description: 'Analyze and document the digital ecosystem of a chosen industry',
      instructions: [
        'Choose an industry (e.g., healthcare, education, finance)',
        'Research the key digital platforms and tools used',
        'Create a comprehensive analysis document',
        'Include recommendations for improvement'
      ],
      requirements: [
        'Minimum 5 pages of analysis',
        'Include at least 3 case studies',
        'Provide actionable recommendations',
        'Use proper citations and references'
      ],
      estimatedTime: '4-6 hours',
      difficulty: 'Beginner',
      completed: true,
      submission: {
        id: 'sub1',
        projectId: '1',
        submissionText: 'Completed comprehensive analysis of the healthcare digital ecosystem...',
        githubUrl: 'https://github.com/user/healthcare-analysis',
        liveUrl: 'https://healthcare-analysis.vercel.app',
        submittedAt: '2024-01-10T10:30:00Z',
        status: 'approved',
        instructorFeedback: 'Excellent work! Your analysis is thorough and well-researched. The recommendations are practical and actionable.',
        peerFeedback: [
          {
            id: 'fb1',
            reviewerName: 'Sarah Johnson',
            rating: 5,
            comment: 'Great insights on healthcare digital transformation. Very comprehensive analysis!',
            submittedAt: '2024-01-12T14:20:00Z'
          }
        ]
      }
    },
    {
      id: '2',
      moduleId: '2',
      title: 'Product Design Workshop',
      description: 'Design a user-centered product using design thinking methodology',
      instructions: [
        'Identify a real user problem',
        'Conduct user research and interviews',
        'Create user personas and journey maps',
        'Design wireframes and prototypes',
        'Test with real users'
      ],
      requirements: [
        'Complete user research with 5+ participants',
        'Create 3 user personas',
        'Design 5+ wireframes',
        'Build 2 interactive prototypes',
        'Conduct usability testing'
      ],
      estimatedTime: '8-12 hours',
      difficulty: 'Intermediate',
      completed: true,
      submission: {
        id: 'sub2',
        projectId: '2',
        submissionText: 'Designed a mobile app for elderly care coordination...',
        githubUrl: 'https://github.com/user/elderly-care-app',
        liveUrl: 'https://elderly-care-app.vercel.app',
        submittedAt: '2024-01-18T16:45:00Z',
        status: 'approved',
        instructorFeedback: 'Outstanding design thinking process! Your user research is thorough and the prototypes are well-executed.',
        peerFeedback: [
          {
            id: 'fb2',
            reviewerName: 'Mike Chen',
            rating: 4,
            comment: 'Great user research and prototyping. The elderly care focus is very meaningful.',
            submittedAt: '2024-01-20T09:15:00Z'
          }
        ]
      }
    },
    {
      id: '3',
      moduleId: '3',
      title: 'Rapid Prototyping Challenge',
      description: 'Create and test multiple prototypes in a short timeframe',
      instructions: [
        'Choose a simple product idea',
        'Create 3 different prototypes using different tools',
        'Test each prototype with 3 users',
        'Document the feedback and iterations',
        'Present your findings'
      ],
      requirements: [
        'Use 3 different prototyping tools',
        'Test with minimum 3 users per prototype',
        'Document all feedback and iterations',
        'Create a presentation of findings'
      ],
      estimatedTime: '6-8 hours',
      difficulty: 'Intermediate',
      completed: false
    },
    {
      id: '4',
      moduleId: '4',
      title: 'AI Tools Integration Project',
      description: 'Build a project using multiple AI tools and APIs',
      instructions: [
        'Choose a project that can benefit from AI',
        'Integrate at least 3 different AI tools/APIs',
        'Build a functional application',
        'Document your development process',
        'Deploy and test the application'
      ],
      requirements: [
        'Use 3+ AI tools/APIs',
        'Create a functional application',
        'Include proper error handling',
        'Deploy to a live environment',
        'Write comprehensive documentation'
      ],
      estimatedTime: '10-15 hours',
      difficulty: 'Advanced',
      completed: false
    }
  ])

  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submissionForm, setSubmissionForm] = useState({
    submissionText: '',
    githubUrl: '',
    liveUrl: ''
  })

  useEffect(() => {
    // Filter projects by module if moduleId is provided
    if (moduleId) {
      const filteredProjects = projects.filter(p => p.moduleId === moduleId)
      if (filteredProjects.length > 0) {
        setSelectedProject(filteredProjects[0])
      }
    }
  }, [moduleId, projects])

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project)
  }

  const handleSubmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedProject || !submissionForm.submissionText.trim()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      const newSubmission: ProjectSubmission = {
        id: `sub${Date.now()}`,
        projectId: selectedProject.id,
        submissionText: submissionForm.submissionText,
        githubUrl: submissionForm.githubUrl || undefined,
        liveUrl: submissionForm.liveUrl || undefined,
        submittedAt: new Date().toISOString(),
        status: 'pending',
        peerFeedback: []
      }

      const updatedProjects = projects.map(project =>
        project.id === selectedProject.id
          ? { ...project, completed: true, submission: newSubmission }
          : project
      )

      setProjects(updatedProjects)
      setSelectedProject({ ...selectedProject, completed: true, submission: newSubmission })
      onProjectComplete?.(selectedProject.id)
      
      // Reset form
      setSubmissionForm({
        submissionText: '',
        githubUrl: '',
        liveUrl: ''
      })
    } catch (error) {
      console.error('Error submitting project:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'text-green-600 bg-green-100'
      case 'Intermediate': return 'text-yellow-600 bg-yellow-100'
      case 'Advanced': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'needs_revision': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Hands-On Projects</h2>
        <p className="text-gray-600">
          Apply your learning through practical projects. Each project is designed to reinforce the concepts you've learned.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div 
            key={project.id}
            className={`bg-white rounded-2xl shadow-lg p-6 transition-all duration-200 hover:shadow-xl cursor-pointer ${
              selectedProject?.id === project.id ? 'ring-2 ring-purple-500' : ''
            } ${project.completed ? 'border-2 border-green-200' : ''}`}
            onClick={() => handleProjectSelect(project)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {project.description}
                </p>
              </div>
              <div className="ml-4">
                {project.completed ? (
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 text-lg">✅</span>
                  </div>
                ) : (
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-lg">⏳</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
                  {project.difficulty}
                </span>
                <span className="text-sm text-gray-500">
                  ⏱️ {project.estimatedTime}
                </span>
              </div>

              {project.submission && (
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.submission.status)}`}>
                    {project.submission.status.replace('_', ' ')}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Project Details */}
      {selectedProject && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              {selectedProject.title}
            </h3>
            <p className="text-gray-600 mb-4">{selectedProject.description}</p>
            
            <div className="flex items-center gap-4 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedProject.difficulty)}`}>
                {selectedProject.difficulty}
              </span>
              <span className="text-sm text-gray-500">⏱️ {selectedProject.estimatedTime}</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Instructions</h4>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              {selectedProject.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>

          {/* Requirements */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Requirements</h4>
            <ul className="list-disc list-inside space-y-2 text-gray-600">
              {selectedProject.requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          {/* Submission or Feedback */}
          {selectedProject.completed && selectedProject.submission ? (
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-3">Your Submission</h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 mb-3">{selectedProject.submission.submissionText}</p>
                  {selectedProject.submission.githubUrl && (
                    <a 
                      href={selectedProject.submission.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline block mb-2"
                    >
                      📁 View on GitHub
                    </a>
                  )}
                  {selectedProject.submission.liveUrl && (
                    <a 
                      href={selectedProject.submission.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline block"
                    >
                      🌐 Live Demo
                    </a>
                  )}
                </div>
              </div>

              {selectedProject.submission.instructorFeedback && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Instructor Feedback</h4>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-gray-700">{selectedProject.submission.instructorFeedback}</p>
                  </div>
                </div>
              )}

              {selectedProject.submission.peerFeedback && selectedProject.submission.peerFeedback.length > 0 && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-3">Peer Feedback</h4>
                  <div className="space-y-3">
                    {selectedProject.submission.peerFeedback.map((feedback) => (
                      <div key={feedback.id} className="bg-green-50 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-800">{feedback.reviewerName}</span>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={i < feedback.rating ? 'text-yellow-500' : 'text-gray-300'}>
                                ⭐
                              </span>
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{feedback.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Submission Form */
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Submit Your Project</h4>
              <form onSubmit={handleSubmissionSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Description
                  </label>
                  <textarea
                    value={submissionForm.submissionText}
                    onChange={(e) => setSubmissionForm(prev => ({ ...prev, submissionText: e.target.value }))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                    placeholder="Describe your project, what you learned, and any challenges you faced..."
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub Repository (Optional)
                    </label>
                    <input
                      type="url"
                      value={submissionForm.githubUrl}
                      onChange={(e) => setSubmissionForm(prev => ({ ...prev, githubUrl: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://github.com/username/repo"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Live Demo URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={submissionForm.liveUrl}
                      onChange={(e) => setSubmissionForm(prev => ({ ...prev, liveUrl: e.target.value }))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://your-demo.vercel.app"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || !submissionForm.submissionText.trim()}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Project'}
                </button>
              </form>
            </div>
          )}
        </div>
      )}
    </div>
  )
} 