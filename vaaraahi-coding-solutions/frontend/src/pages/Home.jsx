import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Home() {
  const location = useLocation()
  const [hoveredCourse, setHoveredCourse] = useState(null)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [showEnrollForm, setShowEnrollForm] = useState(false)
  const [apiCourses, setApiCourses] = useState([])
  const [enrollFormData, setEnrollFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    message: ''
  })
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)

  // Handle scroll to section when URL contains section query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const section = params.get('section')
    if (section) {
      setTimeout(() => {
        const element = document.getElementById(section)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [location])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('/api/courses')
        if (Array.isArray(response.data)) {
          setApiCourses(response.data)
        } else {
          setApiCourses([])
        }
      } catch (error) {
        console.warn('Failed to load courses for home page:', error.message)
        setApiCourses([])
      }
    }

    fetchCourses()
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleEnrollFormChange = (e) => {
    setEnrollFormData({
      ...enrollFormData,
      [e.target.name]: e.target.value
    })
  }

  const handleEnrollSubmit = async (e) => {
    e.preventDefault()
    setFormSubmitting(true)
    
    try {
      await axios.post('/api/enrollments', {
        name: enrollFormData.name,
        email: enrollFormData.email,
        phone: enrollFormData.phone,
        courseInterest: selectedCourse?.name || 'Unknown Course',
        educationalQualification: enrollFormData.education,
        additionalInformation: enrollFormData.message,
        status: 'New'
      })
      
      setFormSuccess(true)
      setTimeout(() => {
        setShowEnrollForm(false)
        setFormSuccess(false)
        setEnrollFormData({
          name: '',
          email: '',
          phone: '',
          education: '',
          message: ''
        })
      }, 2000)
    } catch (error) {
      console.error('Enrollment error:', error)
      alert('Failed to submit enrollment. Please try again.')
    } finally {
      setFormSubmitting(false)
    }
  }

  const defaultLearnings = [
    'Industry-standard practices and methodologies',
    'Hands-on practical experience',
    'Real-world case studies and projects',
    'Certification preparation'
  ]

  const defaultFeatures = {
    quizzes: 'Evaluating understanding every weekend',
    assessment: 'Comprehensive quizzes (over 10) at the end of each course',
    support: 'WhatsApp Support & AI Assistance Available'
  }

  const mapApiCourse = (course, icon) => ({
    id: course._id,
    name: course.name,
    duration: course.duration,
    mode: course.mode,
    icon,
    type: course.category === 'IT' ? 'IT Course' : 'Medical Coding Course',
    overview: course.description || 'Course details will be shared during enrollment.',
    learnings: course.curriculum?.length ? course.curriculum : defaultLearnings,
    features: defaultFeatures,
    maxStudents: course.maxStudents,
    instructor: course.instructor
  })

  const apiMedicalCourses = apiCourses
    .filter(course => course.category === 'Medical')
    .map(course => mapApiCourse(course, '🏥'))

  const apiItCourses = apiCourses
    .filter(course => course.category === 'IT')
    .map(course => mapApiCourse(course, '💻'))

  const medicalCourses = apiMedicalCourses.length > 0 ? apiMedicalCourses : [
    { 
      id: 1, 
      name: 'CPC (AAPC)', 
      duration: '45 Days', 
      mode: 'Online/Offline', 
      icon: '📋',
      type: 'Medical Coding Course',
      overview: 'This comprehensive CPC (AAPC) course is designed to provide you with industry-relevant skills and certification in medical coding.',
      learnings: defaultLearnings,
      features: defaultFeatures
    },
    { 
      id: 2, 
      name: 'CCS (AHIMA)', 
      duration: '15 Days', 
      mode: 'Online/Offline', 
      icon: '📊',
      type: 'Medical Coding Course',
      overview: 'This comprehensive CCS (AHIMA) course is designed to provide you with industry-relevant skills and certification in medical coding.',
      learnings: defaultLearnings,
      features: defaultFeatures
    },
    { 
      id: 3, 
      name: 'SDS Surgery', 
      duration: '45 Days', 
      mode: 'Online/Offline', 
      icon: '🏥',
      type: 'Medical Coding Course',
      overview: 'This comprehensive SDS Surgery course is designed to provide you with industry-relevant skills and certification in surgical coding.',
      learnings: defaultLearnings,
      features: defaultFeatures
    },
    { 
      id: 4, 
      name: 'Home Health', 
      duration: '45 Days', 
      mode: 'Online/Offline', 
      icon: '🏠',
      type: 'Medical Coding Course',
      overview: 'This comprehensive Home Health course is designed to provide you with industry-relevant skills and certification in home health coding.',
      learnings: defaultLearnings,
      features: defaultFeatures
    },
    { 
      id: 5, 
      name: 'ED/EM Training', 
      duration: '30 Days', 
      mode: 'Online/Offline', 
      icon: '⚕️',
      type: 'Medical Coding Course',
      overview: 'This comprehensive ED/EM Training course is designed to provide you with industry-relevant skills and certification in emergency department coding.',
      learnings: defaultLearnings,
      features: defaultFeatures
    },
    { 
      id: 6, 
      name: 'IPDRG Coding', 
      duration: '60 Days', 
      mode: 'Online/Offline', 
      icon: '💾',
      type: 'Medical Coding Course',
      overview: 'This comprehensive IPDRG Coding course is designed to provide you with industry-relevant skills and certification in inpatient DRG coding.',
      learnings: defaultLearnings,
      features: defaultFeatures
    },
  ]

  const features = [
    { title: 'Certified Trainers', desc: 'AAPC, AHIMA certified professionals with industry experience', icon: '👨‍🏫' },
    { title: 'Flexible Sessions', desc: 'Convenient scheduling to fit your lifestyle', icon: '⏰' },
    { title: 'Hands-on Training', desc: 'Real case studies and practical experience', icon: '💼' },
    { title: 'Placement Assistance', desc: '95% placement rate with partner network', icon: '🎯' },
    { title: 'Affordable Pricing', desc: 'Quality education at competitive rates', icon: '💰' },
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section - Creative & Artistic */}
      <section className="relative min-h-screen py-20 flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy-700 via-navy-800 to-navy-900"></div>
        
        {/* Decorative Blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="decorative-blob w-96 h-96 bg-orange-500 top-0 left-0 animate-blob"></div>
          <div className="decorative-blob w-96 h-96 bg-navy-400 bottom-0 right-0 animate-blob" style={{ animationDelay: '2s' }}></div>
          <div className="decorative-blob w-96 h-96 bg-orange-400 top-1/2 left-1/2 animate-blob" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-5xl mx-auto">
            {/* Logo with artistic effect */}
            <div className="mb-8 animate-zoomIn flex justify-center">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-navy-500 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-all duration-700 animate-pulse"></div>
                <div className="relative glass-effect rounded-3xl p-8">
                  <img 
                    src="/assets/team-med-codes-logo.PNG" 
                    alt="Team Med Codes" 
                    className="h-24 md:h-32 w-auto mx-auto"
                  />
                  <h1 className="text-white font-black text-3xl md:text-4xl mt-4" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    Team Med Codes
                  </h1>
                  <p className="gradient-text text-sm md:text-base font-bold mt-2 tracking-wider">
                    PROFESSIONAL MEDICAL CODING INSTITUTE
                  </p>
                </div>
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="section-title text-white mb-8 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Transform Your
              <br />
              <span className="gradient-text inline-block">Medical Coding</span>
              <br />
              Career
            </h2>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              Industry-certified programs delivered by <span className="text-orange-400 font-semibold">AAPC</span> and <span className="text-orange-400 font-semibold">AHIMA</span> experts. 
              <br />Join <span className="text-orange-400 font-bold">900+</span> successful graduates.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-6 md:gap-8 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <button
                onClick={() => scrollToSection('medical-courses')}
                className="btn-gradient group relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Courses
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </button>
              <Link
                to="/contact"
                className="btn-outline group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Get Started
                  <span className="text-xl transition-transform duration-300 group-hover:scale-125">✨</span>
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Stats Section - Artistic Cards */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: '900+', label: 'Students Trained', icon: '📚', color: 'from-orange-500 to-orange-600' },
              { value: '95%', label: 'Placement Rate', icon: '🎯', color: 'from-navy-500 to-navy-600' },
              { value: '500+', label: 'Learning Hours', icon: '⏱️', color: 'from-orange-600 to-orange-700' },
              { value: '24/7', label: 'Expert Support', icon: '🤝', color: 'from-navy-600 to-navy-700' }
            ].map((stat, idx) => (
              <div 
                key={idx} 
                className="card-hover text-center p-8 group cursor-default relative overflow-hidden"
                style={{ animation: `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s both` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="text-5xl mb-4 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {stat.icon}
                </div>
                <h3 className="text-4xl md:text-5xl font-black gradient-text mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {stat.value}
                </h3>
                <p className="text-navy-700 font-semibold text-sm md:text-base">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Creative Layout */}
      <section className="py-32 px-6 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-navy-50"></div>
        <div className="decorative-blob w-96 h-96 bg-orange-300 -top-20 -right-20 opacity-20"></div>
        <div className="decorative-blob w-96 h-96 bg-navy-300 -bottom-20 -left-20 opacity-20"></div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="section-title mb-6 animate-slideUp">
              About <span className="gradient-text">Team Med Codes</span>
            </h2>
            <div className="inline-block glass-effect px-8 py-3 rounded-full">
              <p className="gradient-text font-bold text-lg tracking-wider">
                EXCELLENCE IN MEDICAL EDUCATION
              </p>
            </div>
          </div>

          <p className="text-xl text-navy-700 max-w-4xl mx-auto text-center leading-relaxed mb-16 animate-fadeInUp">
            Team Med Codes is a premier professional institute delivering industry-certified training in medical coding. 
            We empower healthcare professionals with the knowledge and credentials needed for successful careers.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Certified Programs', desc: 'AAPC and AHIMA certified courses recognized globally', icon: '🏥', color: 'from-orange-500 to-orange-600' },
              { title: 'Expert Instructors', desc: 'Industry veterans with 15+ years of experience', icon: '👨‍🏫', color: 'from-navy-500 to-navy-600' },
              { title: 'Career Support', desc: 'Placement assistance and continuous professional development', icon: '📈', color: 'from-orange-600 to-orange-700' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="card-hover p-8 group relative overflow-hidden"
                style={{ animation: `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.15}s both` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                <div className="text-5xl mb-6 transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold text-navy-700 mb-4 group-hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-navy-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical Courses Section - Artistic Grid */}
      <section id="medical-courses" className="py-32 px-6 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="decorative-blob w-96 h-96 bg-orange-500 top-0 left-0"></div>
          <div className="decorative-blob w-96 h-96 bg-navy-600 bottom-0 right-0"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="section-title text-white mb-6 animate-slideUp">
              Medical Coding <span className="gradient-text">Courses</span>
            </h2>
            <div className="inline-block glass-effect px-8 py-3 rounded-full">
              <p className="text-yellow-300 font-bold text-lg tracking-wider">
                AAPC & AHIMA Certified Training Programs
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicalCourses.map((course, idx) => (
              <div 
                key={course.id} 
                className="card-hover p-8 group relative overflow-hidden cursor-pointer transform transition-all duration-500 hover:-rotate-1"
                onMouseEnter={() => setHoveredCourse(course.id)}
                onMouseLeave={() => setHoveredCourse(null)}
                onClick={() => setSelectedCourse(course)}
                style={{ animation: `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${idx * 0.1}s both` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-navy-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-6xl mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {course.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-3 text-navy-700 group-hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {course.name}
                </h3>
                
                <p className="text-sm text-gray-600 mb-6 font-semibold">{course.type}</p>
                
                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-navy-700">
                    <span className="text-2xl">⏱️</span>
                    <span className="font-medium">{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-navy-700">
                    <span className="text-2xl">🌐</span>
                    <span className="font-medium">{course.mode}</span>
                  </div>
                </div>
                
                <button 
                  className="w-full btn-gradient text-center"
                  onClick={(e) => {
                    e.stopPropagation()
                    setSelectedCourse(course)
                  }}
                >
                  Explore Course
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Creative Feature Cards */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-navy-50"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="section-title mb-6 animate-slideUp">
              Why Choose <span className="gradient-text">Team Med Codes</span>?
            </h2>
            <p className="section-subtitle animate-fadeInUp">
              Industry-leading training and support for your medical coding career
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="card-hover p-8 text-center group relative overflow-hidden"
                style={{ animation: `slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s both` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-navy-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-5xl mb-6 transition-all duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {feature.icon}
                </div>
                
                <h3 className="text-lg font-bold mb-4 text-navy-700 group-hover:text-orange-500 transition-colors duration-300" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {feature.title}
                </h3>
                
                <p className="text-navy-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Artistic Final Push */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 via-navy-900 to-navy-800"></div>
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="decorative-blob w-96 h-96 bg-orange-500 top-0 right-0 animate-blob"></div>
          <div className="decorative-blob w-96 h-96 bg-navy-600 bottom-0 left-0 animate-blob" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center glass-effect rounded-3xl p-12 md:p-16 max-w-4xl mx-auto">
            <h2 className="section-title text-white mb-6 animate-slideUp">
              Ready to Begin Your <span className="gradient-text">Career</span>?
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
              Join <span className="text-orange-400 font-bold">900+ healthcare professionals</span>.
              <br />
              Expert-led training. Real results.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <Link 
                to="/contact" 
                className="btn-gradient group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Enroll Now
                  <span className="text-xl transition-transform duration-300 group-hover:scale-125">🚀</span>
                </span>
              </Link>
              
              <button
                onClick={() => scrollToSection('medical-courses')}
                className="btn-outline group"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Courses
                  <span className="text-xl transition-transform duration-300 group-hover:translate-x-2">→</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Course Detail Modal - Enhanced with artistic elements */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-navy-900/95 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setSelectedCourse(null)}>
          <div className="glass-effect rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-zoomIn relative border-2 border-orange-500/30" onClick={(e) => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-t-3xl relative overflow-hidden z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <div className="text-6xl mb-4 animate-float">{selectedCourse.icon}</div>
                  <h2 className="text-4xl font-black mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>{selectedCourse.name}</h2>
                  <p className="text-orange-100 text-lg font-semibold">{selectedCourse.type}</p>
                </div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="glass-effect hover:bg-white/20 rounded-2xl w-12 h-12 flex items-center justify-center transition-all duration-300 hover:rotate-90"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-8">
              {/* Course Overview */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-navy-700 mb-4 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <span className="text-3xl">📖</span>
                  Course Overview
                </h3>
                <p className="text-navy-600 leading-relaxed text-lg">{selectedCourse.overview}</p>
              </div>

              {/* What You'll Learn */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-navy-700 mb-6 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <span className="text-3xl">🎯</span>
                  What You'll Learn
                </h3>
                <div className="grid gap-4">
                  {selectedCourse.learnings.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 card-hover p-4">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold shadow-lg">
                        {idx + 1}
                      </div>
                      <span className="text-navy-700 text-lg">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Course Features Grid */}
              <div className="mb-8 card-hover p-6">
                <h3 className="text-2xl font-bold text-navy-700 mb-6 flex items-center gap-3" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  <span className="text-3xl">✨</span>
                  Course Highlights
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: '⏱️', title: 'Duration', value: selectedCourse.duration },
                    { icon: '🌐', title: 'Mode', value: selectedCourse.mode },
                    { icon: '📜', title: 'Certification', value: 'Industry Recognized' },
                    { icon: '👥', title: 'Batch Size', value: 'Limited Seats' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-4 glass-effect p-4 rounded-2xl">
                      <span className="text-4xl">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-navy-700 text-sm">{item.title}</p>
                        <p className="text-navy-600 font-bold">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Features */}
              <div className="mb-8 space-y-4">
                {[
                  { icon: '📊', title: 'Weekly Quizzes', desc: selectedCourse.features.quizzes, color: 'from-orange-500 to-orange-600' },
                  { icon: '🎯', title: 'Final Assessment', desc: selectedCourse.features.assessment, color: 'from-navy-500 to-navy-600' },
                  { icon: '💬', title: 'Expert Support', desc: selectedCourse.features.support, color: 'from-orange-600 to-orange-700' },
                ].map((item, idx) => (
                  <div key={idx} className="card-hover p-6 group relative overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    <div className="flex items-start gap-4 relative z-10">
                      <span className="text-4xl transition-transform duration-500 group-hover:scale-125">{item.icon}</span>
                      <div>
                        <p className="font-bold text-navy-700 text-lg mb-1">{item.title}</p>
                        <p className="text-navy-600">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4 mt-8">
                <button
                  onClick={() => setShowEnrollForm(true)}
                  className="flex-1 btn-gradient"
                >
                  Enroll Now
                </button>
                <Link
                  to="/contact"
                  className="flex-1 btn-outline text-center"
                >
                  Request Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Form Modal - Enhanced */}
      {showEnrollForm && selectedCourse && (
        <div className="fixed inset-0 bg-navy-900/95 backdrop-blur-xl z-[60] flex items-center justify-center p-4 animate-fadeIn" onClick={() => !formSubmitting && setShowEnrollForm(false)}>
          <div className="glass-effect rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-zoomIn border-2 border-orange-500/30" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-br from-orange-500 to-orange-600 text-white p-8 rounded-t-3xl relative overflow-hidden z-10">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              
              <div className="flex justify-between items-start relative z-10">
                <div>
                  <h2 className="text-3xl font-black mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Enroll in {selectedCourse.name}</h2>
                  <p className="text-orange-100">Complete your enrollment to get started</p>
                </div>
                <button 
                  onClick={() => !formSubmitting && setShowEnrollForm(false)}
                  disabled={formSubmitting}
                  className="glass-effect hover:bg-white/20 rounded-2xl w-12 h-12 flex items-center justify-center transition-all duration-300 hover:rotate-90 disabled:opacity-50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-8">
              {formSuccess ? (
                <div className="text-center py-12 animate-zoomIn">
                  <div className="text-7xl mb-6 animate-bounce">✅</div>
                  <h3 className="text-3xl font-black text-navy-700 mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Enrollment Successful!</h3>
                  <p className="text-navy-600 text-lg">We'll contact you shortly with more details.</p>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="space-y-6">
                  {/* Course Info Banner */}
                  <div className="card-hover p-6">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{selectedCourse.icon}</span>
                      <div>
                        <p className="font-bold text-navy-700 text-lg">{selectedCourse.name}</p>
                        <p className="text-sm text-navy-600">{selectedCourse.duration} • {selectedCourse.mode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div>
                    <label className="block text-sm font-bold text-navy-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={enrollFormData.name}
                      onChange={handleEnrollFormChange}
                      required
                      className="w-full px-6 py-4 border-2 border-orange-300 bg-white text-navy-700 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 font-medium"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy-700 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={enrollFormData.email}
                      onChange={handleEnrollFormChange}
                      required
                      className="w-full px-6 py-4 border-2 border-orange-300 bg-white text-navy-700 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 font-medium"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy-700 mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={enrollFormData.phone}
                      onChange={handleEnrollFormChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full px-6 py-4 border-2 border-orange-300 bg-white text-navy-700 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 font-medium"
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy-700 mb-2">
                      Educational Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="education"
                      value={enrollFormData.education}
                      onChange={handleEnrollFormChange}
                      required
                      className="w-full px-6 py-4 border-2 border-orange-300 bg-white text-navy-700 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 font-medium"
                    >
                      <option value="">Select your qualification</option>
                      <option value="high-school">High School</option>
                      <option value="undergraduate">Undergraduate</option>
                      <option value="graduate">Graduate</option>
                      <option value="postgraduate">Postgraduate</option>
                      <option value="diploma">Diploma</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-navy-700 mb-2">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={enrollFormData.message}
                      onChange={handleEnrollFormChange}
                      rows="3"
                      className="w-full px-6 py-4 border-2 border-orange-300 bg-white text-navy-700 rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-500 transition-all duration-300 resize-none font-medium"
                      placeholder="Any questions or special requirements?"
                    ></textarea>
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 mr-3 w-5 h-5 accent-orange-500 border-orange-300 rounded"
                    />
                    <label className="text-sm text-navy-700">
                      I agree to the terms and conditions and consent to be contacted regarding this enrollment.
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowEnrollForm(false)}
                      disabled={formSubmitting}
                      className="flex-1 px-6 py-4 border-2 border-navy-700 text-navy-700 rounded-2xl font-bold hover:bg-navy-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="flex-1 btn-gradient disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formSubmitting ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </span>
                      ) : (
                        'Submit Enrollment'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
