import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../config'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(false)
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [courseForm, setCourseForm] = useState({
    name: '',
    category: 'Medical',
    duration: '',
    mode: 'Online/Offline',
    description: '',
    maxStudents: 30,
    instructor: ''
  })
  const [courseSubmitting, setCourseSubmitting] = useState(false)
  const [courseErrors, setCourseErrors] = useState({})

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
    // Check if admin is logged in
    const adminToken = localStorage.getItem('adminToken')
    if (!adminToken) {
      navigate('/admin/login')
      return
    }
    console.log('🔐 Admin logged in, fetching data...')
    fetchInquiries()
    
    // Set up auto-refresh every 30 seconds
    const refreshInterval = setInterval(() => {
      console.log('🔄 Auto-refreshing data...')
      fetchInquiries()
    }, 30000)
    
    return () => clearInterval(refreshInterval)
  }, [navigate])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      console.log('🔄 Fetching inquiries from:', `${BASE_URL}/api/inquiries`)
      const response = await axios.get(`${BASE_URL}/api/inquiries`)
      console.log('✅ Response received:', response.status)
      console.log('📊 Data:', response.data)
      
      if (Array.isArray(response.data)) {
        setInquiries(response.data)
        console.log(`✅ Loaded ${response.data.length} inquiries`)
      } else {
        console.warn('⚠️ Response is not an array:', response.data)
        setInquiries([])
      }
    } catch (err) {
      console.error('❌ Failed to fetch inquiries')
      console.error('Error:', err.message)
      console.error('Status:', err.response?.status)
      console.error('Data:', err.response?.data)
      alert('❌ Failed to load inquiries: ' + (err.response?.data?.message || err.message))
      setInquiries([])
    } finally {
      setLoading(false)
    }
  }

  const deleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return

    try {
      console.log('🗑️ Deleting inquiry ID:', id)
      const response = await axios.delete(`${BASE_URL}/api/inquiries/${id}`)
      console.log('✅ Delete response:', response.data)
      
      // Remove from state
      setInquiries(inquiries.filter(inq => inq._id !== id))
      setShowModal(false)
      alert('✅ Inquiry deleted successfully')
      
      // Refresh data
      await fetchInquiries()
    } catch (err) {
      console.error('❌ Failed to delete inquiry')
      console.error('Error:', err.message)
      alert('❌ Failed to delete inquiry: ' + (err.response?.data?.message || err.message))
    }
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
    return inquiry.message && inquiry.message.includes('ENROLLMENT REQUEST')
  }

  const getFilteredInquiries = () => {
    let filtered = inquiries

    // Filter by type
    if (filterType === 'enrollments') {
      filtered = filtered.filter(inq => isEnrollment(inq))
    } else if (filterType === 'medical') {
      filtered = filtered.filter(inq => isMedicalCourse(inq.courseInterest))
    } else if (filterType === 'it') {
      filtered = filtered.filter(inq => isITCourse(inq.courseInterest))
    }

    // Search
    if (searchTerm) {
      filtered = filtered.filter(inq =>
        inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inq.courseInterest.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  const getStats = () => {
    return {
      total: inquiries.length,
      enrollments: inquiries.filter(inq => isEnrollment(inq)).length,
      medical: inquiries.filter(inq => isMedicalCourse(inq.courseInterest)).length,
      it: inquiries.filter(inq => isITCourse(inq.courseInterest)).length
    }
  }

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminLoginTime')
      navigate('/admin/login')
    }
  }

  const handleCourseChange = (e) => {
    const { name, value } = e.target
    setCourseForm(prev => ({
      ...prev,
      [name]: name === 'maxStudents' ? Number(value) : value
    }))
    if (courseErrors[name]) {
      setCourseErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateCourseForm = () => {
    const errors = {}
    if (!courseForm.name.trim()) errors.name = 'Name is required'
    if (!courseForm.category.trim()) errors.category = 'Category is required'
    if (!courseForm.duration.trim()) errors.duration = 'Duration is required'
    if (!courseForm.mode.trim()) errors.mode = 'Mode is required'
    if (!courseForm.description.trim()) errors.description = 'Description is required'
    if (!courseForm.instructor.trim()) errors.instructor = 'Instructor is required'
    if (!courseForm.maxStudents || courseForm.maxStudents < 1) errors.maxStudents = 'Max students must be at least 1'
    return errors
  }

  const handleCourseSubmit = async (e) => {
    e.preventDefault()
    const errors = validateCourseForm()
    if (Object.keys(errors).length > 0) {
      setCourseErrors(errors)
      return
    }

    setCourseSubmitting(true)
    try {
      await axios.post(`${BASE_URL}/api/courses`, {
        ...courseForm,
        price: 0
      })
      alert('✅ Course added successfully')
      setCourseForm({
        name: '',
        category: 'Medical',
        duration: '',
        mode: 'Online/Offline',
        description: '',
        maxStudents: 30,
        instructor: ''
      })
      setCourseErrors({})
    } catch (err) {
      alert('❌ Failed to add course: ' + (err.response?.data?.error || err.message))
    } finally {
      setCourseSubmitting(false)
    }
  }

  const stats = getStats()
  const filteredInquiries = getFilteredInquiries()

  return (
    <div className="min-h-screen bg-slate-dark">
      {/* Header */}
      <div className="bg-gradient-to-r from-accent-blue to-blue-700 text-white p-6 shadow-lg sticky top-0 z-40">
        <div className="container mx-auto">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="text-blue-100 mt-1">Manage all inquiries and enrollments</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              Logout
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-3 border-t border-blue-400 pt-4">
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="px-4 py-2 bg-white text-accent-blue rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300"
            >
              All Inquiries
            </button>
            <button
              onClick={() => navigate('/admin/enrollments')}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300"
            >
              Enrollments
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-dark border border-gray-700 rounded-lg shadow-md p-6 hover:border-accent-blue transition-colors">
            <div className="text-4xl font-bold text-accent-blue">{stats.total}</div>
            <p className="text-gray-400 mt-2">Total Inquiries</p>
          </div>
          <div className="bg-gray-dark border border-gray-700 rounded-lg shadow-md p-6 hover:border-green-500 transition-colors">
            <div className="text-4xl font-bold text-green-500">{stats.enrollments}</div>
            <p className="text-gray-600 mt-2">🎓 Enrollments</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
            <div className="text-4xl font-bold text-green-600">{stats.medical}</div>
            <p className="text-gray-600 mt-2">📚 Medical Courses</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-indigo-500">
            <div className="text-4xl font-bold text-indigo-600">{stats.it}</div>
            <p className="text-gray-600 mt-2">💻 IT Courses</p>
          </div>
        </div>

        {/* Add Course */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">➕ Add Course</h2>
              <p className="text-gray-600">Create a new course for students</p>
            </div>
          </div>

          <form onSubmit={handleCourseSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Course Name *</label>
              <input
                type="text"
                name="name"
                value={courseForm.name}
                onChange={handleCourseChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., CPC (AAPC)"
              />
              {courseErrors.name && <p className="text-red-600 text-sm mt-1">{courseErrors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={courseForm.category}
                onChange={handleCourseChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Medical">Medical</option>
                <option value="IT">IT</option>
              </select>
              {courseErrors.category && <p className="text-red-600 text-sm mt-1">{courseErrors.category}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration *</label>
              <input
                type="text"
                name="duration"
                value={courseForm.duration}
                onChange={handleCourseChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., 45 Days"
              />
              {courseErrors.duration && <p className="text-red-600 text-sm mt-1">{courseErrors.duration}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mode *</label>
              <select
                name="mode"
                value={courseForm.mode}
                onChange={handleCourseChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
                <option value="Online/Offline">Online/Offline</option>
              </select>
              {courseErrors.mode && <p className="text-red-600 text-sm mt-1">{courseErrors.mode}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Instructor *</label>
              <input
                type="text"
                name="instructor"
                value={courseForm.instructor}
                onChange={handleCourseChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Dr. Rao"
              />
              {courseErrors.instructor && <p className="text-red-600 text-sm mt-1">{courseErrors.instructor}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Students *</label>
              <input
                type="number"
                name="maxStudents"
                min="1"
                value={courseForm.maxStudents}
                onChange={handleCourseChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {courseErrors.maxStudents && <p className="text-red-600 text-sm mt-1">{courseErrors.maxStudents}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
              <textarea
                name="description"
                value={courseForm.description}
                onChange={handleCourseChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Brief course description"
              />
              {courseErrors.description && <p className="text-red-600 text-sm mt-1">{courseErrors.description}</p>}
            </div>

            <div className="md:col-span-2 flex justify-end">
              <button
                type="submit"
                disabled={courseSubmitting}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                {courseSubmitting ? 'Saving...' : 'Save Course'}
              </button>
            </div>
          </form>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                🔍 Search
              </label>
              <input
                type="text"
                placeholder="Search by name, email, or course..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📋 Filter
              </label>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Inquiries ({stats.total})</option>
                <option value="enrollments">🎓 Enrollments ({stats.enrollments})</option>
                <option value="medical">📚 Medical ({stats.medical})</option>
                <option value="it">💻 IT ({stats.it})</option>
              </select>
            </div>

            {/* Actions */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ⚙️ Actions
              </label>
              <button
                onClick={fetchInquiries}
                disabled={loading}
                className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
              >
                {loading ? '🔄 Refreshing...' : '🔄 Refresh Data'}
              </button>
            </div>
          </div>
        </div>

        {/* Inquiries List */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-blue-300 border-t-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading inquiries...</p>
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">📭 No inquiries found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 border-b">
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Email</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Phone</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Course</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Type</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInquiries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((inquiry) => (
                    <tr key={inquiry._id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 font-semibold text-gray-900">{inquiry.name}</td>
                      <td className="px-6 py-4 text-gray-600">{inquiry.email}</td>
                      <td className="px-6 py-4 text-gray-600">{inquiry.phone}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 text-blue-800">
                          {inquiry.courseInterest}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          {isEnrollment(inquiry) && (
                            <span className="px-2 py-1 rounded text-xs font-bold bg-purple-100 text-purple-800">
                              🎓 Enrollment
                            </span>
                          )}
                          <span className={`px-2 py-1 rounded text-xs font-bold ${
                            isMedicalCourse(inquiry.courseInterest)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-indigo-100 text-indigo-800'
                          }`}>
                            {isMedicalCourse(inquiry.courseInterest) ? '📚 Medical' : '💻 IT'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedInquiry(inquiry)
                              setShowModal(true)
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm font-semibold transition-all duration-300"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => deleteInquiry(inquiry._id)}
                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold transition-all duration-300"
                          >
                            🗑️ Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-scaleIn">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sticky top-0">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">📋 Inquiry Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-all duration-300"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {isEnrollment(selectedInquiry) && (
                <div className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4 mb-4">
                  <p className="text-sm font-bold text-purple-800">
                    🎓 ENROLLMENT REQUEST
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Name</p>
                  <p className="text-xl font-bold text-gray-900">{selectedInquiry.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Email</p>
                  <p className="text-lg text-gray-900 break-all">{selectedInquiry.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Phone</p>
                  <p className="text-lg text-gray-900">{selectedInquiry.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Course Interest</p>
                  <p className="text-lg text-gray-900">{selectedInquiry.courseInterest}</p>
                </div>
              </div>

              {selectedInquiry.educationalQualification && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Educational Qualification</p>
                  <p className="text-lg text-gray-900 bg-blue-50 p-3 rounded-lg border border-blue-200">
                    {selectedInquiry.educationalQualification}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-gray-600">Message / Details</p>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">
                  {selectedInquiry.message}
                </p>
              </div>

              {selectedInquiry.additionalInformation && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Additional Information</p>
                  <p className="text-gray-900 bg-green-50 p-4 rounded-lg border border-green-200 whitespace-pre-wrap">
                    {selectedInquiry.additionalInformation}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Status</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                    selectedInquiry.status === 'New' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedInquiry.status || 'Inquiry'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Submitted</p>
                  <p className="text-gray-900">
                    {new Date(selectedInquiry.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              {selectedInquiry.agreeToTerms && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                  <p className="text-sm text-blue-800">
                    ✓ User agreed to terms and conditions
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-100 p-6 flex gap-3">
              <button
                onClick={() => deleteInquiry(selectedInquiry._id)}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                🗑️ Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 bg-gray-400 hover:bg-gray-500 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
