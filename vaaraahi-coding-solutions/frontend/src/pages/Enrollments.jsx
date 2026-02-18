import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { BASE_URL } from '../config'

export default function Enrollments() {
  const navigate = useNavigate()
  const [enrollments, setEnrollments] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedEnrollment, setSelectedEnrollment] = useState(null)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchEnrollments()
    // Auto-refresh every 30 seconds
    const refreshInterval = setInterval(fetchEnrollments, 30000)
    return () => clearInterval(refreshInterval)
  }, [])

  const fetchEnrollments = async () => {
    setLoading(true)
    try {
      console.log('🔄 Fetching enrollments...')
      const response = await axios.get(`${BASE_URL}/api/enrollments`)
      
      if (Array.isArray(response.data)) {
        setEnrollments(response.data)
        console.log(`✅ Loaded ${response.data.length} enrollments`)
      } else {
        console.warn('⚠️ Response is not an array')
        setEnrollments([])
      }
    } catch (err) {
      console.error('❌ Failed to fetch enrollments:', err.message)
      alert('Failed to load enrollments: ' + (err.response?.data?.message || err.message))
      setEnrollments([])
    } finally {
      setLoading(false)
    }
  }

  const deleteEnrollment = async (id) => {
    if (!window.confirm('Are you sure you want to delete this enrollment?')) return

    try {
      console.log('🗑️ Deleting enrollment ID:', id)
      await axios.delete(`${BASE_URL}/api/enrollments/${id}`)
      
      setEnrollments(enrollments.filter(enr => enr._id !== id))
      setShowModal(false)
      alert('✅ Enrollment deleted successfully')
      await fetchEnrollments()
    } catch (err) {
      console.error('❌ Failed to delete enrollment:', err.message)
      alert('Failed to delete enrollment: ' + (err.response?.data?.message || err.message))
    }
  }

  const getFilteredEnrollments = () => {
    if (!searchTerm) return enrollments

    return enrollments.filter(enr =>
      enr.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enr.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enr.courseInterest.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const filteredEnrollments = getFilteredEnrollments()

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">🎓 Enrollments</h1>
              <p className="text-purple-100 mt-1">Manage course enrollments</p>
            </div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Enrollments</p>
              <div className="text-4xl font-bold text-purple-600 mt-2">{enrollments.length}</div>
            </div>
            <div className="text-6xl opacity-20">🎓</div>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4 flex-col md:flex-row md:items-center md:justify-between">
            {/* Search */}
            <input
              type="text"
              placeholder="Search by name, email, or course..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            {/* Refresh Button */}
            <button
              onClick={fetchEnrollments}
              disabled={loading}
              className="bg-purple-500 hover:bg-purple-600 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-300"
            >
              {loading ? '🔄 Refreshing...' : '🔄 Refresh'}
            </button>
          </div>
        </div>

        {/* Enrollments Table */}
        {loading ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-purple-300 border-t-purple-600"></div>
            <p className="mt-4 text-gray-600">Loading enrollments...</p>
          </div>
        ) : filteredEnrollments.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <p className="text-gray-600 text-lg">📭 No enrollments found</p>
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
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Qualification</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Date</th>
                    <th className="px-6 py-3 text-left font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEnrollments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((enrollment) => (
                    <tr key={enrollment._id} className="border-b hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 font-semibold text-gray-900">{enrollment.name}</td>
                      <td className="px-6 py-4 text-gray-600">{enrollment.email}</td>
                      <td className="px-6 py-4 text-gray-600">{enrollment.phone}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 rounded-full text-sm font-semibold bg-purple-100 text-purple-800">
                          {enrollment.courseInterest}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {enrollment.educationalQualification || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(enrollment.createdAt).toLocaleDateString('en-US', {
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
                              setSelectedEnrollment(enrollment)
                              setShowModal(true)
                            }}
                            className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1 rounded text-sm font-semibold transition-all duration-300"
                          >
                            👁️ View
                          </button>
                          <button
                            onClick={() => deleteEnrollment(enrollment._id)}
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
      {showModal && selectedEnrollment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 sticky top-0">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">🎓 Enrollment Details</h2>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Name</p>
                  <p className="text-xl font-bold text-gray-900">{selectedEnrollment.name}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Email</p>
                  <p className="text-lg text-gray-900 break-all">{selectedEnrollment.email}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Phone</p>
                  <p className="text-lg text-gray-900">{selectedEnrollment.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Course</p>
                  <p className="text-lg text-gray-900">{selectedEnrollment.courseInterest}</p>
                </div>
              </div>

              {selectedEnrollment.educationalQualification && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Educational Qualification</p>
                  <p className="text-lg text-gray-900 bg-purple-50 p-3 rounded-lg border border-purple-200">
                    {selectedEnrollment.educationalQualification}
                  </p>
                </div>
              )}

              <div>
                <p className="text-sm font-semibold text-gray-600">Message</p>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-lg border border-gray-200 whitespace-pre-wrap">
                  {selectedEnrollment.message}
                </p>
              </div>

              {selectedEnrollment.additionalInformation && (
                <div>
                  <p className="text-sm font-semibold text-gray-600">Additional Information</p>
                  <p className="text-gray-900 bg-green-50 p-4 rounded-lg border border-green-200 whitespace-pre-wrap">
                    {selectedEnrollment.additionalInformation}
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Status</p>
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-bold bg-green-100 text-green-800">
                    {selectedEnrollment.status || 'Active'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-600">Enrolled On</p>
                  <p className="text-gray-900">
                    {new Date(selectedEnrollment.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              {selectedEnrollment.agreeToTerms && (
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
                onClick={() => deleteEnrollment(selectedEnrollment._id)}
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
