import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function CourseDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [showEnrollForm, setShowEnrollForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  })
  const [enrollData, setEnrollData] = useState({
    name: '',
    email: '',
    phone: '',
    educationalQualification: '',
    additionalInformation: '',
    agreeToTerms: false,
  })

  useEffect(() => {
    fetchCourse()
    // Scroll to top when course changes
    window.scrollTo(0, 0)
  }, [id])

  const fetchCourse = async () => {
    try {
      const response = await axios.get(`/api/courses/${id}`)
      setCourse(response.data)
    } catch (err) {
      setError('Failed to fetch course details')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleEnrollChange = (e) => {
    const { name, value, type, checked } = e.target
    console.log(`Form field changed: ${name} = ${value}`)
    setEnrollData(prev => {
      const updated = {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }
      console.log('Updated enrollData:', updated)
      return updated
    })
  }

  const handleRequestInfo = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/api/inquiries', {
        ...formData,
        courseInterest: course.name,
        message: `Interested in ${course.name}`,
      })
      alert('Information request submitted successfully!')
      setFormData({ name: '', email: '', phone: '' })
      setShowForm(false)
    } catch (err) {
      alert('Failed to submit request')
    }
  }

  const handleEnrollNow = async (e) => {
    e.preventDefault()
    
    console.log('Form submitted')
    console.log('Current enrollData state:', enrollData)
    console.log('Current course:', course?.name)
    
    // Validate form data
    if (!enrollData.name?.trim() || !enrollData.email?.trim() || !enrollData.phone?.trim() || !enrollData.educationalQualification?.trim()) {
      console.warn('Validation failed - Missing fields:', { 
        name: !enrollData.name?.trim(), 
        email: !enrollData.email?.trim(), 
        phone: !enrollData.phone?.trim(),
        educationalQualification: !enrollData.educationalQualification?.trim()
      })
      alert('Please fill in all required fields')
      return
    }
    
    if (!enrollData.agreeToTerms) {
      alert('Please agree to the terms and conditions')
      return
    }
    
    console.log('Validation passed. Submitting enrollment:', enrollData, 'for course:', course.name)
    
    try {
      console.log('Starting enrollment submission...')
      console.log('POST URL:', '/api/enrollments')
      console.log('Request payload:', {
        ...enrollData,
        courseInterest: course.name,
        status: 'New'
      })
      
      const response = await axios.post('/api/enrollments', {
        ...enrollData,
        courseInterest: course.name,
        status: 'New'
      })
      console.log('✅ SUCCESS! Response status:', response.status)
      console.log('Response data:', response.data)
      alert('🎉 Enrollment request submitted successfully! We will contact you shortly.')
      setEnrollData({ name: '', email: '', phone: '', educationalQualification: '', additionalInformation: '', agreeToTerms: false })
      setShowEnrollForm(false)
    } catch (err) {
      console.error('❌ ENROLLMENT ERROR:')
      console.error('Error status:', err.response?.status)
      console.error('Error message:', err.response?.data?.message || err.message)
      console.error('Full error:', err)
      alert('Failed to submit enrollment request: ' + (err.response?.data?.message || err.message))
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-dark">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-accent-blue border-opacity-30 border-t-accent-blue"></div>
        <p className="mt-4 text-gray-400">Loading course details...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-dark">
      <div className="text-center">
        <p className="text-red-400 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate('/courses')}
          className="px-8 py-3 bg-accent-blue text-white rounded-lg font-bold hover:bg-blue-700 transition-all duration-300"
        >
          Back to Courses
        </button>
      </div>
    </div>
  )

  if (!course) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-dark">
      <p className="text-gray-400">Course not found</p>
    </div>
  )

  return (
    <div className="min-h-screen py-12">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 text-white py-16">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate('/courses')}
            className="mb-6 text-blue-100 hover:text-white transition flex items-center"
          >
            ← Back to Courses
          </button>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-slideUp">
            {course.name}
          </h1>
          <p className="text-xl text-blue-100 mb-6 animate-slideUp" style={{ animationDelay: '0.1s' }}>
            {course.category} Course
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-blue-100">Duration</p>
              <p className="text-2xl font-bold">{course.duration}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-blue-100">Mode</p>
              <p className="text-2xl font-bold">{course.mode}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-blue-100">Max Students</p>
              <p className="text-2xl font-bold">{course.maxStudents}</p>
            </div>
            <div className="bg-white bg-opacity-20 rounded-lg p-4">
              <p className="text-blue-100">Instructor</p>
              <p className="text-2xl font-bold">{course.instructor}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Course Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Course Overview */}
            <section className="animate-slideUp">
              <h2 className="text-4xl font-bold mb-6 gradient-text">Course Overview</h2>
              <div className="card-hover p-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  {course.description}
                </p>
              </div>
            </section>

            {/* What You'll Learn */}
            {course.curriculum && course.curriculum.length > 0 && (
              <section className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
                <h2 className="text-4xl font-bold mb-6 gradient-text">What You'll Learn</h2>
                <div className="card-hover p-8">
                  <ul className="space-y-4">
                    {course.curriculum.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <span className="inline-block w-2 h-2 bg-gradient-to-r from-indigo-600 to-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                        <span className="text-gray-700 text-lg">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>
            )}

            {/* Features */}
            <section className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl font-bold mb-6 gradient-text">Course Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card-hover p-6">
                  <div className="text-3xl mb-3">📚</div>
                  <h3 className="text-xl font-bold mb-2">Industry-Standard Content</h3>
                  <p className="text-gray-600">Learn industry best practices and methodologies</p>
                </div>
                <div className="card-hover p-6">
                  <div className="text-3xl mb-3">💼</div>
                  <h3 className="text-xl font-bold mb-2">Hands-On Projects</h3>
                  <p className="text-gray-600">Real-world case studies and practical projects</p>
                </div>
                <div className="card-hover p-6">
                  <div className="text-3xl mb-3">🏆</div>
                  <h3 className="text-xl font-bold mb-2">Certification Prep</h3>
                  <p className="text-gray-600">Prepare for industry-recognized certifications</p>
                </div>
                <div className="card-hover p-6">
                  <div className="text-3xl mb-3">📱</div>
                  <h3 className="text-xl font-bold mb-2">Support Available</h3>
                  <p className="text-gray-600">WhatsApp support and AI assistance included</p>
                </div>
              </div>
            </section>

            {/* Learning Schedule */}
            <section className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-4xl font-bold mb-6 gradient-text">Learning Schedule</h2>
              <div className="space-y-4">
                <div className="card-hover p-6 flex items-start">
                  <div className="text-4xl mr-6">📋</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Weekly Quizzes</h3>
                    <p className="text-gray-600">Evaluating understanding every weekend to track your progress</p>
                  </div>
                </div>
                <div className="card-hover p-6 flex items-start">
                  <div className="text-4xl mr-6">✅</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Final Assessment</h3>
                    <p className="text-gray-600">Comprehensive quizzes (over 10) at the end of each course to validate your learning</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Course Details Table */}
            <section className="animate-slideUp" style={{ animationDelay: '0.4s' }}>
              <h2 className="text-4xl font-bold mb-6 gradient-text">Course Details</h2>
              <div className="card-hover p-8">
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-4">
                    <span className="font-semibold text-gray-700">Duration</span>
                    <span className="text-gray-600">{course.duration}</span>
                  </div>
                  <div className="flex justify-between border-b pb-4">
                    <span className="font-semibold text-gray-700">Mode</span>
                    <span className="text-gray-600">{course.mode}</span>
                  </div>
                  <div className="flex justify-between border-b pb-4">
                    <span className="font-semibold text-gray-700">Instructor</span>
                    <span className="text-gray-600">{course.instructor}</span>
                  </div>
                  <div className="flex justify-between border-b pb-4">
                    <span className="font-semibold text-gray-700">Certification</span>
                    <span className="text-gray-600">{course.certification || 'Industry Recognized'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-700">Batch Size</span>
                    <span className="text-gray-600">Limited ({course.maxStudents} seats)</span>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column - Enrollment */}
          <div className="space-y-6">
            {/* Enrollment Card */}
            <div className="card-hover p-8 sticky top-24 animate-slideRight">
              <h3 className="text-2xl font-bold mb-6">Ready to Enroll?</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-3">✓</span>
                  <span className="text-gray-700">Start: Next Batch Available</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-3">✓</span>
                  <span className="text-gray-700">Flexible Schedule</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-3">✓</span>
                  <span className="text-gray-700">24/7 Support</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 text-2xl mr-3">✓</span>
                  <span className="text-gray-700">Certification Included</span>
                </div>
              </div>

              <button 
                onClick={() => setShowEnrollForm(!showEnrollForm)}
                className="w-full btn-gradient mb-4"
              >
                Enroll Now
              </button>
              <button
                onClick={() => setShowForm(!showForm)}
                className="w-full btn-outline border-blue-500 text-blue-600"
              >
                Request Information
              </button>
            </div>

            {/* Enrollment Form */}
            {showEnrollForm && (
              <div className="card-hover p-8 animate-slideUp bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300">
                <h3 className="text-xl font-bold mb-2 text-blue-800">🎓 Enroll in {course.name}</h3>
                <p className="text-sm text-blue-700 mb-6">Fill in your details to complete enrollment</p>
                <form onSubmit={handleEnrollNow} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Full Name"
                      value={enrollData.name}
                      onChange={handleEnrollChange}
                      required
                      className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={enrollData.email}
                      onChange={handleEnrollChange}
                      required
                      className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Your Phone Number"
                      value={enrollData.phone}
                      onChange={handleEnrollChange}
                      required
                      className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Educational Qualification *</label>
                    <select
                      name="educationalQualification"
                      value={enrollData.educationalQualification}
                      onChange={handleEnrollChange}
                      required
                      className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    >
                      <option value="">Select your qualification</option>
                      <option value="12th Pass">12th Pass</option>
                      <option value="Undergraduate">Undergraduate</option>
                      <option value="Postgraduate">Postgraduate</option>
                      <option value="PhD">PhD</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Additional Information (Optional)</label>
                    <textarea
                      name="additionalInformation"
                      placeholder="Any questions or special requirements?"
                      value={enrollData.additionalInformation}
                      onChange={handleEnrollChange}
                      rows="3"
                      className="w-full px-4 py-2 border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={enrollData.agreeToTerms}
                      onChange={handleEnrollChange}
                      required
                      className="mt-1 w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500 cursor-pointer"
                    />
                    <label className="ml-3 text-sm text-gray-700">
                      I agree to the terms and conditions and consent to be contacted regarding this enrollment.
                    </label>
                  </div>

                  <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 transform hover:scale-105">
                    Submit Enrollment Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowEnrollForm(false)}
                    className="w-full text-gray-600 hover:text-gray-800 text-sm"
                  >
                    Cancel
                  </button>
                </form>
              </div>
            )}

            {/* Info Request Form */}
            {showForm && (
              <div className="card-hover p-8 animate-slideUp">
                <h3 className="text-xl font-bold mb-6">Get More Information</h3>
                <form onSubmit={handleRequestInfo} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Your Phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button type="submit" className="w-full btn-gradient">
                    Submit Request
                  </button>
                </form>
              </div>
            )}

            {/* FAQ */}
            <div className="card-hover p-8 animate-slideRight" style={{ animationDelay: '0.1s' }}>
              <h3 className="text-xl font-bold mb-6">Quick Info</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-gray-900">Can I get a refund?</p>
                  <p className="text-gray-600 text-sm mt-1">Yes, we offer 7-day money-back guarantee</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Is there lifetime access?</p>
                  <p className="text-gray-600 text-sm mt-1">Yes, you get lifetime access to the course materials</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Do I get a certificate?</p>
                  <p className="text-gray-600 text-sm mt-1">Yes, industry-recognized certificate upon completion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <section className="mt-20 py-20 px-4 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
        <div className="container mx-auto text-center text-white animate-slideUp">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl text-blue-100 mb-8">Join hundreds of successful students who have transformed their careers</p>
          <button 
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' })
              setTimeout(() => setShowEnrollForm(true), 500)
            }}
            className="btn-primary bg-white text-blue-600 hover:bg-gray-100 font-bold"
          >
            Enroll Now
          </button>
        </div>
      </section>
    </div>
  )
}
