import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Check if already logged in
    const adminToken = localStorage.getItem('adminToken')
    if (adminToken) {
      navigate('/admin/dashboard')
    }
  }, [navigate])

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulate authentication
    setTimeout(() => {
      if (password === 'admin123') {
        localStorage.setItem('adminToken', 'true')
        localStorage.setItem('adminLoginTime', new Date().toISOString())
        navigate('/admin/dashboard')
      } else {
        setError('❌ Incorrect password. Please try again.')
        setPassword('')
      }
      setLoading(false)
    }, 500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-dark via-gray-dark to-black flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-accent-blue to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl text-white font-bold">A</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-gray-400">Team Med Codes</p>
        </div>

        {/* Login Card */}
        <div className="bg-gray-dark border border-gray-700 rounded-lg shadow-2xl p-8 animate-slideUp">
          <h2 className="text-2xl font-bold text-white mb-6">Secure Login</h2>

          {error && (
            <div className="mb-6 p-4 bg-red-900 bg-opacity-30 border-l-4 border-red-500 text-red-400 animate-slideUp">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-white mb-3">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3 border-2 border-gray-700 bg-slate-dark text-white rounded-lg focus:outline-none focus:border-accent-blue focus:ring-4 focus:ring-accent-blue focus:ring-opacity-30 transition-all duration-300 placeholder-gray-500"
                autoFocus
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full bg-gradient-to-r from-accent-blue to-blue-600 text-white py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {loading ? '🔄 Verifying...' : '🔐 Login as Admin'}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong className="text-blue-600">🔒 Security Note:</strong> This is a secure admin portal. Only authorized administrators can access this section.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-gray-400 mt-8 text-sm">
          © 2026 Vaaraahi Coding Solutions. All rights reserved.
        </p>
      </div>
    </div>
  )
}
