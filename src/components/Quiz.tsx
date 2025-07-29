'use client'

import { useState, useEffect } from 'react'

interface Question {
  id: string
  text: string
  type: 'multiple-choice' | 'true-false' | 'short-answer'
  options?: string[]
  correctAnswer: string | string[]
  explanation: string
  points: number
}

interface Quiz {
  id: string
  moduleId: string
  title: string
  description: string
  questions: Question[]
  timeLimit?: number // in minutes
  passingScore: number
}

interface QuizAttempt {
  id: string
  quizId: string
  answers: Record<string, string | string[]>
  score: number
  totalPoints: number
  completedAt: string
  passed: boolean
}

interface QuizProps {
  moduleId?: string
  onQuizComplete?: (attempt: QuizAttempt) => void
}

export default function Quiz({ moduleId, onQuizComplete }: QuizProps) {
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: '1',
      moduleId: '1',
      title: 'Digital Ecosystem Fundamentals',
      description: 'Test your understanding of digital ecosystem concepts',
      passingScore: 70,
      questions: [
        {
          id: 'q1',
          text: 'What is a digital ecosystem?',
          type: 'multiple-choice',
          options: [
            'A collection of physical devices connected to the internet',
            'A network of digital platforms, tools, and services that work together',
            'A single software application',
            'A type of computer hardware'
          ],
          correctAnswer: 'A network of digital platforms, tools, and services that work together',
          explanation: 'A digital ecosystem is a network of interconnected digital platforms, tools, and services that work together to provide value to users and businesses.',
          points: 10
        },
        {
          id: 'q2',
          text: 'Which of the following are key components of a modern digital ecosystem?',
          type: 'multiple-choice',
          options: [
            'Only social media platforms',
            'Cloud services, APIs, mobile apps, and data analytics',
            'Just websites and email',
            'Only e-commerce platforms'
          ],
          correctAnswer: 'Cloud services, APIs, mobile apps, and data analytics',
          explanation: 'Modern digital ecosystems include cloud services, APIs, mobile applications, data analytics, and various other interconnected technologies.',
          points: 10
        },
        {
          id: 'q3',
          text: 'True or False: Digital ecosystems are static and don\'t evolve over time.',
          type: 'true-false',
          options: ['True', 'False'],
          correctAnswer: 'False',
          explanation: 'Digital ecosystems are dynamic and constantly evolving as new technologies emerge and user needs change.',
          points: 5
        },
        {
          id: 'q4',
          text: 'What is the primary benefit of understanding digital ecosystems for developers?',
          type: 'multiple-choice',
          options: [
            'To learn more programming languages',
            'To build better integrated solutions that work within existing ecosystems',
            'To avoid using third-party services',
            'To focus only on frontend development'
          ],
          correctAnswer: 'To build better integrated solutions that work within existing ecosystems',
          explanation: 'Understanding digital ecosystems helps developers create solutions that integrate well with existing platforms and services.',
          points: 10
        },
        {
          id: 'q5',
          text: 'Describe one way that APIs contribute to digital ecosystems.',
          type: 'short-answer',
          correctAnswer: 'APIs enable different applications and services to communicate and share data',
          explanation: 'APIs (Application Programming Interfaces) allow different applications and services to communicate with each other, enabling data sharing and integration across the ecosystem.',
          points: 15
        }
      ]
    },
    {
      id: '2',
      moduleId: '2',
      title: 'Productive Mindset & Design Thinking',
      description: 'Assess your understanding of productive mindset and design thinking principles',
      passingScore: 75,
      questions: [
        {
          id: 'q1',
          text: 'What is the first stage of the Design Thinking process?',
          type: 'multiple-choice',
          options: [
            'Prototype',
            'Empathize',
            'Ideate',
            'Test'
          ],
          correctAnswer: 'Empathize',
          explanation: 'The first stage is Empathize, where you seek to understand the user\'s needs and experiences.',
          points: 10
        },
        {
          id: 'q2',
          text: 'True or False: A productive mindset focuses only on completing tasks quickly.',
          type: 'true-false',
          options: ['True', 'False'],
          correctAnswer: 'False',
          explanation: 'A productive mindset focuses on effectiveness, quality, and sustainable work practices, not just speed.',
          points: 5
        },
        {
          id: 'q3',
          text: 'What is the purpose of user personas in design thinking?',
          type: 'multiple-choice',
          options: [
            'To create fictional characters for entertainment',
            'To represent target users and their needs, goals, and behaviors',
            'To make the design process more complicated',
            'To avoid user research'
          ],
          correctAnswer: 'To represent target users and their needs, goals, and behaviors',
          explanation: 'User personas help teams understand and empathize with their target users by representing their needs, goals, and behaviors.',
          points: 10
        }
      ]
    }
  ])

  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [isQuizStarted, setIsQuizStarted] = useState(false)
  const [isQuizCompleted, setIsQuizCompleted] = useState(false)
  const [quizAttempt, setQuizAttempt] = useState<QuizAttempt | null>(null)
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null)
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    // Filter quizzes by module if moduleId is provided
    if (moduleId) {
      const filteredQuizzes = quizzes.filter(q => q.moduleId === moduleId)
      if (filteredQuizzes.length > 0) {
        setSelectedQuiz(filteredQuizzes[0])
      }
    }
  }, [moduleId, quizzes])

  useEffect(() => {
    if (selectedQuiz && isQuizStarted && selectedQuiz.timeLimit) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 0) {
            clearInterval(timer)
            handleQuizSubmit()
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [selectedQuiz, isQuizStarted])

  const startQuiz = () => {
    setIsQuizStarted(true)
    setCurrentQuestionIndex(0)
    setAnswers({})
    setShowResults(false)
    if (selectedQuiz?.timeLimit) {
      setTimeRemaining(selectedQuiz.timeLimit * 60)
    }
  }

  const handleAnswerChange = (questionId: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }))
  }

  const handleNextQuestion = () => {
    if (selectedQuiz && currentQuestionIndex < selectedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  const calculateScore = (): { score: number; totalPoints: number; passed: boolean } => {
    if (!selectedQuiz) return { score: 0, totalPoints: 0, passed: false }

    let score = 0
    let totalPoints = 0

    selectedQuiz.questions.forEach(question => {
      totalPoints += question.points
      const userAnswer = answers[question.id]
      
      if (userAnswer) {
        if (Array.isArray(question.correctAnswer)) {
          // For multiple correct answers
          if (Array.isArray(userAnswer) && 
              userAnswer.length === question.correctAnswer.length &&
              userAnswer.every(ans => question.correctAnswer.includes(ans))) {
            score += question.points
          }
        } else {
          // For single correct answer
          if (userAnswer === question.correctAnswer) {
            score += question.points
          }
        }
      }
    })

    const passed = (score / totalPoints) * 100 >= selectedQuiz.passingScore
    return { score, totalPoints, passed }
  }

  const handleQuizSubmit = async () => {
    if (!selectedQuiz) return

    const { score, totalPoints, passed } = calculateScore()
    
    const attempt: QuizAttempt = {
      id: `attempt_${Date.now()}`,
      quizId: selectedQuiz.id,
      answers,
      score,
      totalPoints,
      completedAt: new Date().toISOString(),
      passed
    }

    setQuizAttempt(attempt)
    setIsQuizCompleted(true)
    setShowResults(true)
    onQuizComplete?.(attempt)
  }

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const getQuestionType = (question: Question) => {
    switch (question.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )
      
      case 'true-false':
        return (
          <div className="space-y-3">
            {question.options?.map((option, index) => (
              <label key={index} className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="radio"
                  name={question.id}
                  value={option}
                  checked={answers[question.id] === option}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <span className="text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        )
      
      case 'short-answer':
        return (
          <textarea
            value={answers[question.id] as string || ''}
            onChange={(e) => handleAnswerChange(question.id, e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            rows={4}
            placeholder="Enter your answer..."
          />
        )
      
      default:
        return null
    }
  }

  if (!selectedQuiz) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">No Quiz Available</h3>
          <p className="text-gray-600">No quiz is available for this module yet.</p>
        </div>
      </div>
    )
  }

  if (!isQuizStarted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">{selectedQuiz.title}</h3>
          <p className="text-gray-600 mb-6">{selectedQuiz.description}</p>
          
          <div className="space-y-4 mb-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
              <span>📝 {selectedQuiz.questions.length} questions</span>
              <span>•</span>
              <span>🎯 {selectedQuiz.passingScore}% to pass</span>
              {selectedQuiz.timeLimit && (
                <>
                  <span>•</span>
                  <span>⏱️ {selectedQuiz.timeLimit} minutes</span>
                </>
              )}
            </div>
          </div>
          
          <button
            onClick={startQuiz}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            Start Quiz
          </button>
        </div>
      </div>
    )
  }

  if (showResults && quizAttempt) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Quiz Results</h3>
          
          <div className={`text-4xl font-bold mb-2 ${
            quizAttempt.passed ? 'text-green-600' : 'text-red-600'
          }`}>
            {Math.round((quizAttempt.score / quizAttempt.totalPoints) * 100)}%
          </div>
          
          <div className={`text-lg font-medium mb-4 ${
            quizAttempt.passed ? 'text-green-600' : 'text-red-600'
          }`}>
            {quizAttempt.passed ? '🎉 Passed!' : '❌ Failed'}
          </div>
          
          <div className="text-gray-600">
            Score: {quizAttempt.score} / {quizAttempt.totalPoints} points
          </div>
        </div>

        <div className="space-y-4">
          {selectedQuiz.questions.map((question, index) => {
            const userAnswer = answers[question.id]
            const isCorrect = Array.isArray(question.correctAnswer)
              ? Array.isArray(userAnswer) && 
                userAnswer.length === question.correctAnswer.length &&
                userAnswer.every(ans => question.correctAnswer.includes(ans))
              : userAnswer === question.correctAnswer

            return (
              <div key={question.id} className={`border rounded-lg p-4 ${
                isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800">Question {index + 1}</h4>
                  <span className={`text-sm font-medium ${
                    isCorrect ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {isCorrect ? '✅ Correct' : '❌ Incorrect'}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-3">{question.text}</p>
                
                <div className="space-y-2">
                  <div>
                    <span className="text-sm font-medium text-gray-600">Your Answer:</span>
                    <p className="text-gray-700">{userAnswer || 'No answer provided'}</p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-600">Correct Answer:</span>
                    <p className="text-gray-700">
                      {Array.isArray(question.correctAnswer) 
                        ? question.correctAnswer.join(', ') 
                        : question.correctAnswer}
                    </p>
                  </div>
                  
                  <div>
                    <span className="text-sm font-medium text-gray-600">Explanation:</span>
                    <p className="text-gray-700">{question.explanation}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => {
              setIsQuizStarted(false)
              setIsQuizCompleted(false)
              setShowResults(false)
              setQuizAttempt(null)
            }}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    )
  }

  const currentQuestion = selectedQuiz.questions[currentQuestionIndex]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      {/* Quiz Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{selectedQuiz.title}</h3>
          <p className="text-sm text-gray-600">
            Question {currentQuestionIndex + 1} of {selectedQuiz.questions.length}
          </p>
        </div>
        
        {timeRemaining !== null && (
          <div className="text-right">
            <div className="text-lg font-bold text-purple-600">
              {formatTime(timeRemaining)}
            </div>
            <div className="text-xs text-gray-500">Time Remaining</div>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <div 
          className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / selectedQuiz.questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <h4 className="text-lg font-medium text-gray-800 mb-4">
          {currentQuestion.text}
        </h4>
        
        {getQuestionType(currentQuestion)}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        <div className="text-sm text-gray-500">
          {Object.keys(answers).length} of {selectedQuiz.questions.length} answered
        </div>
        
        {currentQuestionIndex === selectedQuiz.questions.length - 1 ? (
          <button
            onClick={handleQuizSubmit}
            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-medium hover:shadow-lg transition-all duration-200"
          >
            Submit Quiz
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 transition-colors"
          >
            Next
          </button>
        )}
      </div>
    </div>
  )
} 