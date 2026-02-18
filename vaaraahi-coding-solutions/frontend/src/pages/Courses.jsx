import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function Courses() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('All')
  const [showEnrollForm, setShowEnrollForm] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [enrollData, setEnrollData] = useState({
    name: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    fetchCourses()
  }, [])

  const fetchCourses = async () => {
    try {
      const response = await axios.get('/api/courses')
      setCourses(response.data)
    } catch (err) {
      setError('Failed to fetch courses')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleQuickEnroll = (course) => {
    setSelectedCourse(course)
    setShowEnrollForm(true)
  }

  const handleEnrollChange = (e) => {
    const { name, value } = e.target
    console.log(`Form field changed: ${name} = ${value}`)
    setEnrollData(prev => {
      const updated = {
        ...prev,
        [name]: value
      }
      console.log('Updated enrollData:', updated)
      return updated
    })
  }

  const handleEnrollSubmit = async (e) => {
    e.preventDefault()
    
    console.log('Form submitted')
    console.log('Current enrollData state:', enrollData)
    console.log('Selected course:', selectedCourse?.name)
    
    // Validate form data
    if (!enrollData.name?.trim() || !enrollData.email?.trim() || !enrollData.phone?.trim()) {
      console.warn('Validation failed - Missing fields:', { 
        name: !enrollData.name?.trim(), 
        email: !enrollData.email?.trim(), 
        phone: !enrollData.phone?.trim() 
      })
      alert('Please fill in all fields')
      return
    }
    
    console.log('Validation passed. Submitting enrollment:', enrollData, 'for course:', selectedCourse.name)
    
    try {
      console.log('Starting enrollment submission...')
      console.log('POST URL:', '/api/enrollments')
      console.log('Request payload:', {
        ...enrollData,
        courseInterest: selectedCourse.name,
        status: 'New'
      })
      
      const response = await axios.post('/api/enrollments', {
        ...enrollData,
        courseInterest: selectedCourse.name,
        status: 'New'
      })
      console.log('✅ SUCCESS! Response status:', response.status)
      console.log('Response data:', response.data)
      alert('🎉 Enrollment request submitted successfully! We will contact you shortly.')
      setEnrollData({ name: '', email: '', phone: '' })
      setShowEnrollForm(false)
      setSelectedCourse(null)
    } catch (err) {
      console.error('❌ ENROLLMENT ERROR:')
      console.error('Error status:', err.response?.status)
      console.error('Error message:', err.response?.data?.message || err.message)
      console.error('Full error:', err)
      alert('Failed to submit enrollment: ' + (err.response?.data?.message || err.message))
    }
  }

  const filteredCourses = filter === 'All' 
    ? courses 
    : courses.filter(course => course.category === filter)

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-dark">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-accent-blue border-opacity-30 border-t-accent-blue"></div>
        <p className="mt-4 text-gray-400">Loading courses...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="text-center py-12 bg-slate-dark">
      <div className="text-red-500 text-lg animate-slideUp">{error}</div>
    </div>
  )

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-dark">
      {/* Header */}
      <div className="container mx-auto mb-16">
        <h1 className="text-5xl font-bold text-center text-white mb-4">All Courses</h1>
        <p className="text-center text-gray-400 mt-4">
          Explore our comprehensive medical coding and IT training programs
        </p>
      </div>

      {/* Filter Buttons */}
      <div className="container mx-auto mb-12 flex justify-center gap-4 flex-wrap">
        {['All', 'Medical', 'IT'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              filter === cat
                ? 'bg-accent-blue text-white shadow-lg'
                : 'bg-gray-dark text-gray-300 border border-gray-700 hover:border-accent-blue'
            }`}
          >
            {cat} Courses
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400 text-lg">No courses available yet.</p>
        </div>
      ) : (
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, idx) => (
              <div 
                key={course._id} 
                className="bg-gray-dark border border-gray-700 hover:border-accent-blue rounded-lg p-8 group transition-all duration-300"
                style={{ animation: `slideUp 0.6s ease-out ${idx * 0.1}s both` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-accent-blue transition">{course.name}</h3>
                    <span className="inline-block bg-accent-blue text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {course.category}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-400 mb-6 line-clamp-2">{course.description}</p>
                
                <div className="space-y-3 mb-6 text-gray-300">
                  <p className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-accent-blue rounded-full mr-3"></span>
                    <span className="font-semibold">Duration:</span> {course.duration}
                  </p>
                  <p className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-accent-blue rounded-full mr-3"></span>
                    <span className="font-semibold">Mode:</span> {course.mode}
                  </p>
                  <p className="flex items-center">
                    <span className="inline-block w-2 h-2 bg-accent-blue rounded-full mr-3"></span>
                    <span className="font-semibold">Instructor:</span> {course.instructor}
                  </p>
                </div>

                <div className="space-y-3">
                  <Link 
                    to={`/course/${course._id}`}
                    className="w-full bg-accent-blue hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300 inline-block text-center"
                  >
                    View Details
                  </Link>
                  <button
                    onClick={() => handleQuickEnroll(course)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-bold transition-all duration-300"
                  >
                    Quick Enroll
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Enrollment Modal */}
      {showEnrollForm && selectedCourse && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowEnrollForm(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">🎓 Enroll in Course</h2>
            <p className="text-lg font-semibold text-purple-700 mb-6">{selectedCourse.name}</p>
            <form onSubmit={handleEnrollSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={enrollData.name}
                  onChange={handleEnrollChange}
                  className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={enrollData.email}
                  onChange={handleEnrollChange}
                  className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your email"
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={enrollData.phone}
                  onChange={handleEnrollChange}
                  className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                  autoComplete="tel"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEnrollForm(false)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
