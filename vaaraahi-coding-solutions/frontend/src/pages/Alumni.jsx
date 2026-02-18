import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Alumni() {
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAlumni()
  }, [])

  const fetchAlumni = async () => {
    try {
      const response = await axios.get('/api/alumni')
      setAlumni(response.data)
    } catch (err) {
      console.error('Failed to fetch alumni:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800">
      <div className="text-center">
        <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-orange-500/30 border-t-orange-500"></div>
        <p className="mt-6 text-gray-300 text-lg">Loading alumni stories...</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-24 px-6 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="decorative-blob w-96 h-96 bg-orange-500 top-0 left-0"></div>
        <div className="decorative-blob w-96 h-96 bg-navy-600 bottom-0 right-0"></div>
      </div>

      {/* Header */}
      <div className="container mx-auto mb-20 relative z-10">
        <div className="text-center animate-slideUp">
          <h1 className="section-title text-white mb-6">
            Alumni <span className="gradient-text">Success Stories</span>
          </h1>
          <div className="inline-block glass-effect px-8 py-3 rounded-full mb-6">
            <p className="text-gray-300 text-lg">
              Celebrating the achievements of our graduates
            </p>
          </div>
        </div>
      </div>
      
      {alumni.length === 0 ? (
        <div className="text-center py-20 relative z-10">
          <div className="card-hover p-16 max-w-2xl mx-auto">
            <div className="text-6xl mb-6">🎓</div>
            <p className="text-navy-700 text-2xl font-bold mb-4">Alumni stories coming soon!</p>
            <p className="text-navy-600">Check back later for inspiring success stories from our graduates.</p>
          </div>
        </div>
      ) : (
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alumni.map((person, idx) => (
              <div 
                key={person._id} 
                className="card-hover group relative overflow-hidden"
                style={{ animation: `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s both` }}
              >
                {/* Decorative Header */}
                <div className="h-40 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/20 text-8xl font-black">🎓</div>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-2 text-navy-700 group-hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    {person.name}
                  </h3>
                  <p className="gradient-text font-bold text-base mb-6">
                    {person.course}
                  </p>
                  
                  {/* Testimonial */}
                  <div className="glass-effect rounded-2xl p-6 mb-6 relative">
                    <div className="absolute top-4 left-6 text-orange-500/20 text-4xl font-serif">"</div>
                    <p className="text-navy-600 text-sm leading-relaxed italic pl-6">
                      {person.testimonial}
                    </p>
                    <div className="absolute bottom-4 right-6 text-orange-500/20 text-4xl font-serif">"</div>
                  </div>
                  
                  {/* Current Position */}
                  {person.currentCompany && (
                    <div className="border-t-2 border-orange-200 pt-6 space-y-2">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">🏢</span>
                        <div>
                          <p className="text-sm text-navy-500 font-semibold">Currently at</p>
                          <p className="text-navy-700 font-bold">{person.currentCompany}</p>
                        </div>
                      </div>
                      {person.currentPosition && (
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">💼</span>
                          <div>
                            <p className="text-sm text-navy-500 font-semibold">Position</p>
                            <p className="text-navy-700 font-bold">{person.currentPosition}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="mt-6 p-3 bg-orange-50 rounded-xl">
                    <p className="text-xs text-navy-600 font-semibold flex items-center gap-2">
                      <span>📅</span>
                      Graduated: {new Date(person.graduationDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Success Stats */}
      {alumni.length > 0 && (
        <div className="mt-32 relative z-10">
          <div className="container mx-auto">
            <h2 className="section-title text-white text-center mb-16 animate-slideUp">
              Impact by <span className="gradient-text">Numbers</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="card-hover p-12 text-center group">
                <div className="text-6xl font-black gradient-text mb-6 transition-transform duration-500 group-hover:scale-110" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {alumni.length}+
                </div>
                <p className="text-navy-700 text-lg font-semibold">Alumni Success Stories</p>
              </div>
              <div className="card-hover p-12 text-center group" style={{ animationDelay: '0.1s' }}>
                <div className="text-6xl font-black gradient-text mb-6 transition-transform duration-500 group-hover:scale-110" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  95%
                </div>
                <p className="text-navy-700 text-lg font-semibold">Successful Placements</p>
              </div>
              <div className="card-hover p-12 text-center group" style={{ animationDelay: '0.2s' }}>
                <div className="text-6xl font-black gradient-text mb-6 transition-transform duration-500 group-hover:scale-110" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  50+
                </div>
                <p className="text-navy-700 text-lg font-semibold">Industry Partners</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
