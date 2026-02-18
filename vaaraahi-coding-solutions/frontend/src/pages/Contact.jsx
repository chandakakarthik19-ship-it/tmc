import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    courseInterest: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdminLogin, setShowAdminLogin] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [inquiries, setInquiries] = useState([])
  const [showInquiries, setShowInquiries] = useState(false)
  const [filterType, setFilterType] = useState('all') // 'all', 'medical', 'it', 'enrollments'

  const medicalCourses = [
    'CPC',
    'CCS',
    'SDS',
    'CPC (AAPC)',
    'CPC (AAPC) - Medical',
    'CCS - Medical',
    'SDS - Medical',
    'Home Health',
    'ED/EM',
    'IPDRG'
  ]
  const itCourses = [
    'Python',
    'Java',
    'C',
    'CPP',
    'C++',
    'Python Programming',
    'Java Programming',
    'C Programming',
    'C++ Programming'
  ]

  useEffect(() => {
    // Check if admin is logged in from localStorage
    const adminStatus = localStorage.getItem('contactAdmin')
    if (adminStatus === 'true') {
      setIsAdmin(true)
    }
  }, [])

  const handleAdminLogin = () => {
    if (adminPassword === 'admin123') {
      setIsAdmin(true)
      localStorage.setItem('contactAdmin', 'true')
      setShowAdminLogin(false)
      setAdminPassword('')
      fetchInquiries()
    } else {
      alert('Incorrect password')
    }
  }

  const handleAdminLogout = () => {
    setIsAdmin(false)
    localStorage.removeItem('contactAdmin')
    setShowInquiries(false)
  }

  const fetchInquiries = async () => {
    try {
      const response = await axios.get('/api/inquiries')
      setInquiries(response.data)
      setShowInquiries(true)
    } catch (err) {
      console.error('Failed to fetch inquiries:', err)
      alert('Failed to load inquiries')
    }
  }

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return
    
    try {
      await axios.delete(`/api/inquiries/${id}`)
      setInquiries(inquiries.filter(inq => inq._id !== id))
      alert('Inquiry deleted successfully')
    } catch (err) {
      console.error('Failed to delete inquiry:', err)
      alert('Failed to delete inquiry')
    }
  }

  const getFilteredInquiries = () => {
    if (filterType === 'all') return inquiries
    if (filterType === 'enrollments') {
      return inquiries.filter(inq => isEnrollment(inq))
    }
    if (filterType === 'medical') {
      return inquiries.filter(inq => isMedicalCourse(inq.courseInterest))
    }
    if (filterType === 'it') {
      return inquiries.filter(inq => isITCourse(inq.courseInterest))
    }
    return inquiries
  }

  const getMedicalCount = () => {
    return inquiries.filter(inq => isMedicalCourse(inq.courseInterest)).length
  }

  const getITCount = () => {
    return inquiries.filter(inq => isITCourse(inq.courseInterest)).length
  }

  const isMedicalCourse = (course) => {
    if (!course) return false
    const course_lower = course.toLowerCase()
    return medicalCourses.some(mc => course_lower.includes(mc.toLowerCase()))
  }

  const isITCourse = (course) => {
    if (!course) return false
    const course_lower = course.toLowerCase()
    return itCourses.some(ic => course_lower.includes(ic.toLowerCase()))
  }

  const isEnrollment = (inquiry) => {
    return inquiry.message && (
      inquiry.message.includes('🎓 ENROLLMENT REQUEST') || 
      inquiry.message.includes('ENROLLMENT REQUEST')
    )
  }

  const getEnrollmentCount = () => {
    return inquiries.filter(inq => isEnrollment(inq)).length
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) newErrors.email = 'Email is required'
    if (!formData.phone.trim()) newErrors.phone = 'Phone is required'
    if (!formData.courseInterest) newErrors.courseInterest = 'Please select a course'
    return newErrors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)
    try {
      await axios.post('/api/inquiries', formData)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', courseInterest: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    } catch (err) {
      console.error('Failed to submit inquiry:', err)
      setErrors({ submit: 'Failed to submit inquiry. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-16 px-4 bg-slate-dark">
      {/* Header */}
      <div className="container mx-auto mb-16">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-gray-400 mt-4">
            Ready to start your journey? Get in touch with our expert team!
          </p>
        </div>
        
        {/* Admin Controls */}
        <div className="flex justify-center gap-3">
          {!isAdmin ? (
            <button
              onClick={() => setShowAdminLogin(true)}
              className="px-6 py-2 bg-accent-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
            >
              Admin Login
            </button>
          ) : (
            <>
              <button
                onClick={fetchInquiries}
                className="px-6 py-2 bg-accent-blue text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                {showInquiries ? 'Refresh' : 'View'} Inquiries ({inquiries.length})
                {inquiries.length > 0 && (
                  <span className="ml-2 text-xs">
                    (📚 {getEnrollmentCount()} Enrollments)
                  </span>
                )}
              </button>
              <button
                onClick={handleAdminLogout}
                className="px-6 py-2 bg-gray-dark text-white border border-gray-700 rounded-lg font-semibold hover:border-accent-blue transition-all duration-300"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-gray-dark border border-gray-700 rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-2 text-white">Inquiry Form</h2>
          <p className="text-gray-400 mb-6">Fill out the form below and we'll get back to you shortly</p>
          
          {submitted && (
            <div className="bg-green-900 bg-opacity-30 border border-green-700 text-green-400 p-4 rounded-lg mb-6 animate-slideUp">
              <p className="font-semibold">✓ Success!</p>
              <p>Thank you! Your inquiry has been submitted successfully. We'll contact you soon.</p>
            </div>
          )}

          {errors.submit && (
            <div className="bg-red-900 bg-opacity-30 border border-red-700 text-red-400 p-4 rounded-lg mb-6 animate-slideUp">
              {errors.submit}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Full Name *</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Email *</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
              <input 
                type="tel" 
                name="phone" 
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your phone number"
              />
              {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Course Interest *</label>
              <select 
                name="courseInterest" 
                value={formData.courseInterest}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                  errors.courseInterest ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a course</option>
                <option value="CPC">CPC (AAPC) - Medical</option>
                <option value="CCS">CCS (AHIMA) - Medical</option>
                <option value="SDS">SDS Surgery - Medical</option>
                <option value="Python">Python Programming - IT</option>
                <option value="Java">Java Programming - IT</option>
                <option value="C">C Programming - IT</option>
                <option value="CPP">C++ Programming - IT</option>
                <option value="Other">Other</option>
              </select>
              {errors.courseInterest && <p className="text-red-500 text-sm mt-1">{errors.courseInterest}</p>}
            </div>
            
            <div>
              <label className="block text-gray-700 font-semibold mb-2">Message</label>
              <textarea 
                name="message" 
                value={formData.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
                placeholder="Tell us more about your interest..."
              ></textarea>
            </div>
            
            <button 
              type="submit" 
              disabled={loading}
              className="w-full btn-gradient disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="space-y-6">
          {/* Medical Courses Contact */}
          <div className="card-hover p-8 animate-slideRight">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Medical Coding Support</h2>
            <p className="text-gray-600 mb-6">Our medical coding experts are ready to help</p>
            <div className="space-y-4">
              {[
                { icon: '📱', text: '+91 7816085612', link: 'tel:+917816085612' },
                { icon: '📱', text: '+91 7816085612', link: 'tel:+917816085612' },
                { icon: '📱', text: '+91 7816085612', link: 'tel:+917816085612' }
              ].map((contact, idx) => (
                <a 
                  key={idx}
                  href={contact.link} 
                  className="flex items-center text-lg hover:text-blue-600 transition transform hover:translate-x-2"
                >
                  <span className="mr-3 text-2xl">{contact.icon}</span>
                  <span className="text-gray-700 font-semibold">{contact.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Email Support */}
          <div className="card-hover p-8 animate-slideRight" style={{ animationDelay: '0.1s' }}>
            <h2 className="text-2xl font-bold mb-2 text-gray-900">Email Support</h2>
            <p className="text-gray-600 mb-6">Send us an email anytime</p>
            <a 
              href="chandakakarthik509@gmail.com" 
              className="flex items-center text-lg hover:text-blue-600 transition transform hover:translate-x-2"
            >
              <span className="mr-3 text-2xl">📧</span>
              <span className="text-gray-700 font-semibold">chandakakarthik509@gmail.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Admin Login Modal */}
      {showAdminLogin && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setShowAdminLogin(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Admin Login</h2>
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-coral focus:border-transparent"
                placeholder="Enter admin password"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAdminLogin(false)}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAdminLogin}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-coral to-coral-light text-white rounded-lg font-semibold hover:from-coral-dark hover:to-coral transition-all duration-300"
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Inquiries List */}
      {isAdmin && showInquiries && (
        <div className="container mx-auto mt-12">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
              <h2 className="text-3xl font-bold text-gray-900">Submitted Inquiries</h2>
              
              {/* Filter Buttons */}
              <div className="flex gap-2 flex-wrap">
                <button
                  onClick={() => setFilterType('all')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    filterType === 'all'
                      ? 'bg-gradient-to-r from-coral to-coral-light text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  All ({inquiries.length})
                </button>
                <button
                  onClick={() => setFilterType('enrollments')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    filterType === 'enrollments'
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  🎓 Enrollments ({getEnrollmentCount()})
                </button>
                <button
                  onClick={() => setFilterType('medical')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    filterType === 'medical'
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  📚 Medical ({getMedicalCount()})
                </button>
                <button
                  onClick={() => setFilterType('it')}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    filterType === 'it'
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  💻 IT ({getITCount()})
                </button>
              </div>
            </div>
            
            {getFilteredInquiries().length === 0 ? (
              <p className="text-gray-600 text-center py-8">No inquiries in this category.</p>
            ) : (
              <div className="space-y-4">
                {getFilteredInquiries().map((inquiry) => (
                  <div
                    key={inquiry._id}
                    className={`border-2 rounded-lg p-6 hover:shadow-md transition-all duration-300 ${
                      isEnrollment(inquiry)
                        ? 'border-purple-400 bg-gradient-to-br from-purple-50 to-pink-50'
                        : isMedicalCourse(inquiry.courseInterest)
                        ? 'border-green-300 bg-green-50'
                        : 'border-blue-300 bg-blue-50'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-xl font-bold text-gray-900">{inquiry.name}</h3>
                          {isEnrollment(inquiry) && (
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-purple-600 to-pink-600 text-white animate-pulse">
                              🎓 ENROLLMENT
                            </span>
                          )}
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            isMedicalCourse(inquiry.courseInterest)
                              ? 'bg-green-500 text-white'
                              : 'bg-blue-500 text-white'
                          }`}>
                            {isMedicalCourse(inquiry.courseInterest) ? '📚 Medical' : '💻 IT'}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteInquiry(inquiry._id)}
                        className="text-red-500 hover:text-red-700 transition-colors px-3 py-1 hover:bg-red-50 rounded"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Email:</p>
                        <p className="text-gray-900">{inquiry.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 font-semibold">Phone:</p>
                        <p className="text-gray-900">{inquiry.phone}</p>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600 font-semibold mb-2">Course Interest:</p>
                        <p className={`inline-block px-4 py-2 rounded-lg font-bold text-lg ${
                          isMedicalCourse(inquiry.courseInterest)
                            ? 'bg-green-600 text-white'
                            : 'bg-blue-600 text-white'
                        }`}>
                          {inquiry.courseInterest}
                        </p>
                      </div>
                    </div>
                    
                    {inquiry.message && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600 font-semibold mb-1">
                          {isEnrollment(inquiry) ? '🎓 Enrollment Request:' : 'Message:'}
                        </p>
                        <p className={`text-gray-900 p-3 rounded font-medium ${
                          isEnrollment(inquiry)
                            ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-300'
                            : isMedicalCourse(inquiry.courseInterest)
                            ? 'bg-green-100 border border-green-200'
                            : 'bg-blue-100 border border-blue-200'
                        }`}>
                          {inquiry.message}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
