import Link from 'next/link'
import Navigation from '@/components/Navigation'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <Navigation />
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
            El Camino del Vibe Coder
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Your journey to becoming a confident developer starts here. 
            Learn, build, and grow with our comprehensive coding platform.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/registration" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Start Your Journey
            </Link>
            <Link 
              href="/progress" 
              className="border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-600 hover:text-white transition-all duration-200"
            >
              View Progress
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Interactive Learning</h3>
            <p className="text-gray-600">Engage with hands-on projects and quizzes to reinforce your learning.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600">Monitor your learning journey with detailed progress tracking and analytics.</p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-200">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600">Connect with peers, get feedback, and participate in live Q&A sessions.</p>
          </div>
        </div>

        {/* Quick Navigation */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Quick Access</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/goals" className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-2xl mb-2">🎯</div>
              <span className="font-medium">Goals</span>
            </Link>
            <Link href="/projects" className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-2xl mb-2">💻</div>
              <span className="font-medium">Projects</span>
            </Link>
            <Link href="/resources" className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-2xl mb-2">📖</div>
              <span className="font-medium">Resources</span>
            </Link>
            <Link href="/forum" className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow text-center">
              <div className="text-2xl mb-2">💬</div>
              <span className="font-medium">Forum</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
