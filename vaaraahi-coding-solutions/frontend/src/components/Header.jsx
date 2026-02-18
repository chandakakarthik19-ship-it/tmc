import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [logoModalOpen, setLogoModalOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`sticky top-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'backdrop-blur-xl bg-white/90 shadow-2xl' 
        : 'backdrop-blur-md bg-white/80 shadow-lg'
    }`}>
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center gap-4 group relative"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-navy-500 rounded-2xl blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500"></div>
            <img 
              src="/assets/team-med-codes-logo.PNG" 
              alt="Team Med Codes" 
              className="h-16 w-auto relative z-10 cursor-pointer transition-all duration-500 group-hover:scale-110 rounded-xl" 
              onClick={(e) => {
                e.preventDefault()
                setLogoModalOpen(true)
              }}
            />
          </div>
          <div className="hidden sm:block">
            <span className="text-navy-700 font-black text-2xl tracking-tight transition-all duration-300 group-hover:text-orange-500" style={{ fontFamily: 'Poppins, sans-serif' }}>
              TMC
            </span>
            <div className="h-1 w-0 bg-gradient-to-r from-orange-500 to-navy-500 transition-all duration-300 group-hover:w-full rounded-full"></div>
          </div>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {[
            { to: '/', label: 'Home', icon: '🏠' },
            { to: '/?section=medical-courses', label: 'Medical Courses', icon: '📚' },
            { to: '/alumni', label: 'Alumni', icon: '🎓' },
            { to: '/gallery', label: 'Gallery', icon: '📸' },
            { to: '/contact', label: 'Contact', icon: '✉️' },
          ].map((item, idx) => (
            <Link
              key={idx}
              to={item.to}
              className="nav-link group flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm relative overflow-hidden"
              style={{ animation: `slideDown 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s both` }}
            >
              <span className="relative z-10 transition-transform duration-300 group-hover:scale-110">{item.icon}</span>
              <span className="relative z-10">{item.label}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-100 to-navy-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            </Link>
          ))}
          <Link
            to="/admin/login"
            className="ml-2 text-gray-600 hover:text-orange-500 transition-all duration-300 px-3 py-2 rounded-xl hover:bg-gray-100 group"
            title="Admin Access"
          >
            <span className="text-xl transition-transform duration-300 group-hover:rotate-90 inline-block">⚙️</span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden relative w-12 h-12 flex items-center justify-center rounded-xl hover:bg-orange-100 transition-all duration-300 group"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <div className="relative w-6 h-5 flex flex-col justify-between">
            <span className={`w-full h-0.5 bg-navy-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-full h-0.5 bg-navy-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-full h-0.5 bg-navy-700 rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-gray-200 animate-slideDown shadow-2xl">
          <div className="container mx-auto px-6 py-6 space-y-2">
            {[
              { to: '/', label: 'Home', icon: '🏠' },
              { to: '/?section=medical-courses', label: 'Medical Courses', icon: '📚' },
              { to: '/alumni', label: 'Alumni', icon: '🎓' },
              { to: '/gallery', label: 'Gallery', icon: '📸' },
              { to: '/contact', label: 'Contact', icon: '✉️' },
            ].map((item, idx) => (
              <Link 
                key={idx}
                to={item.to} 
                className="flex items-center gap-3 text-navy-700 hover:text-orange-500 transition-all duration-300 px-5 py-4 rounded-2xl hover:bg-gradient-to-r hover:from-orange-50 hover:to-navy-50 font-semibold text-base group relative overflow-hidden"
                style={{ animation: `slideRight 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.08}s both` }}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="text-2xl transition-transform duration-300 group-hover:scale-125">{item.icon}</span>
                <span className="relative z-10">{item.label}</span>
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-500 to-navy-500 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 rounded-r-full"></div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Logo Modal - Enhanced */}
      {logoModalOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm animate-fadeIn"
          onClick={() => setLogoModalOpen(false)}
        >
          <div className="relative flex items-center justify-center w-full h-full p-8">
            <button 
              onClick={() => setLogoModalOpen(false)}
              className="absolute top-4 right-4 md:top-8 md:right-8 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full w-12 h-12 md:w-16 md:h-16 flex items-center justify-center hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-glow hover:shadow-glow-lg hover:scale-110 text-xl md:text-3xl font-bold z-20 group"
              aria-label="Close"
            >
              <span className="transition-transform duration-300 group-hover:rotate-90">✕</span>
            </button>
            
            <div className="relative max-w-5xl max-h-[90vh] animate-zoomIn">
              <img 
                src="/assets/team-med-codes-logo.PNG" 
                alt="Team Med Codes - Large View" 
                className="w-auto h-auto max-w-full max-h-[90vh] object-contain mx-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
