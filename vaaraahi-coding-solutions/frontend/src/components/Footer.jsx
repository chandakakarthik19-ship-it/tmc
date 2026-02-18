import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative mt-32 overflow-hidden">
      {/* Artistic wave decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none transform -translate-y-full">
        <svg className="relative block w-full h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#FF6B35', stopOpacity: 0.8 }} />
              <stop offset="50%" style={{ stopColor: '#003d7a', stopOpacity: 0.8 }} />
              <stop offset="100%" style={{ stopColor: '#FF6B35', stopOpacity: 0.8 }} />
            </linearGradient>
          </defs>
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="url(#waveGradient)"></path>
        </svg>
      </div>

      <div className="bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800 text-white pt-20 pb-8 relative">
        {/* Decorative background blobs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="decorative-blob w-96 h-96 bg-orange-500 -top-20 -left-20 opacity-10"></div>
          <div className="decorative-blob w-96 h-96 bg-navy-500 -bottom-20 -right-20 opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500 rounded-full opacity-5 blur-3xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-navy-400 rounded-full opacity-5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* About Section */}
            <div className="animate-slideUp space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-navy-500 rounded-2xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <img 
                    src="/assets/team-med-codes-logo.PNG" 
                    alt="Team Med Codes" 
                    className="h-14 w-auto relative z-10 rounded-xl transition-transform duration-500 group-hover:scale-110" 
                  />
                </div>
                <h3 className="text-white font-black text-2xl tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  TMC
                </h3>
              </div>
              <p className="text-gray-300 text-base leading-relaxed">
                Leading the way in professional medical coding training with industry-certified expertise and excellence.
              </p>
              <div className="flex gap-4 pt-2">
                {[
                  { icon: '📘', color: 'from-blue-500 to-blue-600' },
                  { icon: '🎓', color: 'from-orange-500 to-orange-600' },
                  { icon: '🏆', color: 'from-yellow-500 to-yellow-600' },
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-2xl shadow-lg hover:shadow-glow transition-all duration-300 hover:scale-110 cursor-pointer`}
                  >
                    {item.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* Medical Courses */}
            <div className="animate-slideUp" style={{ animationDelay: '0.1s' }}>
              <h4 className="text-2xl font-bold mb-6 gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Medical Courses
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'CPC (AAPC)', icon: '📋' },
                  { name: 'CCS (AHIMA)', icon: '🏥' },
                  { name: 'SDS Surgery', icon: '⚕️' },
                  { name: 'Home Health', icon: '🏠' },
                  { name: 'ED/EM Training', icon: '🚑' },
                  { name: 'IPDRG Coding', icon: '💊' }
                ].map((course, idx) => (
                  <li 
                    key={idx} 
                    className="group flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300 cursor-pointer"
                  >
                    <span className="text-xl transition-transform duration-300 group-hover:scale-125">{course.icon}</span>
                    <span className="relative">
                      {course.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-2xl font-bold mb-6 gradient-text-blue" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Quick Links
              </h4>
              <ul className="space-y-3">
                {[
                  { to: '/', label: 'Home', icon: '🏠' },
                  { to: '/alumni', label: 'Alumni', icon: '🎓' },
                  { to: '/gallery', label: 'Gallery', icon: '📸' },
                  { to: '/contact', label: 'Contact', icon: '✉️' },
                  { to: '/admin/login', label: 'Admin', icon: '⚙️' },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      to={link.to} 
                      className="group flex items-center gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300 py-1"
                    >
                      <span className="text-xl transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12">{link.icon}</span>
                      <span className="relative">
                        {link.label}
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-orange-500">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
              <h4 className="text-2xl font-bold mb-6 gradient-text" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Get In Touch
              </h4>
              <ul className="space-y-4">
                <li className="group">
                  <a 
                    href="mailto:chandakakarthik507@gmail.com" 
                    className="flex items-start gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300"
                  >
                    <span className="text-2xl mt-1 transition-transform duration-300 group-hover:scale-125">✉️</span>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Email</div>
                      <div className="relative">
                        chandakakarthik507@gmail.com
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="group">
                  <a 
                    href="tel:+917816085612" 
                    className="flex items-start gap-3 text-gray-300 hover:text-orange-400 transition-all duration-300"
                  >
                    <span className="text-2xl mt-1 transition-transform duration-300 group-hover:scale-125">📞</span>
                    <div>
                      <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Phone</div>
                      <div className="relative">
                        +91 7816085612
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-orange-500 to-orange-600 group-hover:w-full transition-all duration-300"></span>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-yellow-300">
                  <span className="text-2xl mt-1 animate-pulse">⭐</span>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider mb-1">Certified</div>
                    <div className="font-semibold">Professional Medical Coding Institute</div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="relative py-8 my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-gradient-to-r from-transparent via-orange-500 to-transparent opacity-30"></div>
            </div>
            <div className="relative flex justify-center">
              <div className="bg-gradient-to-r from-orange-500 to-navy-500 px-8 py-2 rounded-full">
                <span className="text-white font-bold text-sm tracking-wider">WE ARE - WE FOR</span>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} <span className="text-orange-400 font-semibold">Team Med Codes</span>. All rights reserved.
            </p>
            <div className="flex gap-8">
              {['Privacy', 'Terms', 'Careers'].map((item, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="text-gray-400 hover:text-orange-400 transition-all duration-300 text-sm font-medium relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Artistic badge */}
          <div className="mt-12 text-center">
            <div className="inline-block glass-effect px-6 py-3 rounded-full">
              <p className="text-xs text-gray-400">
                Crafted with <span className="text-red-500 animate-pulse">❤️</span> for Medical Coding Excellence
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
