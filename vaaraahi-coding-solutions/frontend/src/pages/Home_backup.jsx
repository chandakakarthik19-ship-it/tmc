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
      learnings: [
        'Industry-standard practices and methodologies',
        'Hands-on practical experience',
        'Real-world case studies and projects',
        'Certification preparation'
      ],
      features: {
        quizzes: 'Evaluating understanding every weekend',
        assessment: 'Comprehensive quizzes (over 10) at the end of each course',
        support: 'WhatsApp Support & AI Assistance Available'
      }
    },
    { 
      id: 2, 
      name: 'CCS (AHIMA)', 
      duration: '15 Days', 
      mode: 'Online/Offline', 
      icon: '📊',
      type: 'Medical Coding Course',
      overview: 'This comprehensive CCS (AHIMA) course is designed to provide you with industry-relevant skills and certification in medical coding.',
      learnings: [
        'Industry-standard practices and methodologies',
        'Hands-on practical experience',
        'Real-world case studies and projects',
        'Certification preparation'
      ],
      features: {
        quizzes: 'Evaluating understanding every weekend',
        assessment: 'Comprehensive quizzes (over 10) at the end of each course',
        support: 'WhatsApp Support & AI Assistance Available'
      }
    },
    { 
      id: 3, 
      name: 'SDS Surgery', 
      duration: '45 Days', 
      mode: 'Online/Offline', 
      icon: '🏥',
      type: 'Medical Coding Course',
      overview: 'This comprehensive SDS Surgery course is designed to provide you with industry-relevant skills and certification in surgical coding.',
      learnings: [
        'Industry-standard practices and methodologies',
        'Hands-on practical experience',
        'Real-world case studies and projects',
        'Certification preparation'
      ],
      features: {
        quizzes: 'Evaluating understanding every weekend',
        assessment: 'Comprehensive quizzes (over 10) at the end of each course',
        support: 'WhatsApp Support & AI Assistance Available'
      }
    },
    { 
      id: 4, 
      name: 'Home Health', 
      duration: '45 Days', 
      mode: 'Online/Offline', 
      icon: '🏠',
      type: 'Medical Coding Course',
      overview: 'This comprehensive Home Health course is designed to provide you with industry-relevant skills and certification in home health coding.',
      learnings: [
        'Industry-standard practices and methodologies',
        'Hands-on practical experience',
        'Real-world case studies and projects',
        'Certification preparation'
      ],
      features: {
        quizzes: 'Evaluating understanding every weekend',
        assessment: 'Comprehensive quizzes (over 10) at the end of each course',
        support: 'WhatsApp Support & AI Assistance Available'
      }
    },
    { 
      id: 5, 
      name: 'ED/EM Training', 
      duration: '30 Days', 
      mode: 'Online/Offline', 
      icon: '⚕️',
      type: 'Medical Coding Course',
      overview: 'This comprehensive ED/EM Training course is designed to provide you with industry-relevant skills and certification in emergency department coding.',
      learnings: [
        'Industry-standard practices and methodologies',
        'Hands-on practical experience',
        'Real-world case studies and projects',
        'Certification preparation'
      ],
      features: {
        quizzes: 'Evaluating understanding every weekend',
        assessment: 'Comprehensive quizzes (over 10) at the end of each course',
        support: 'WhatsApp Support & AI Assistance Available'
      }
    },
    { 
      id: 6, 
      name: 'IPDRG Coding', 
      duration: '60 Days', 
      mode: 'Online/Offline', 
      icon: '💾',
      type: 'Medical Coding Course',
      overview: 'This comprehensive IPDRG Coding course is designed to provide you with industry-relevant skills and certification in inpatient DRG coding.',
      learnings: [
        'Industry-standard practices and methodologies',
        'Hands-on practical experience',
        'Real-world case studies and projects',
        'Certification preparation'
      ],
      features: {
        quizzes: 'Evaluating understanding every weekend',
        assessment: 'Comprehensive quizzes (over 10) at the end of each course',
        support: 'WhatsApp Support & AI Assistance Available'
      }
    },
  ]

  const itCourses = apiItCourses.length > 0 ? apiItCourses : [
    {
      id: 101,
      name: 'Python',
      duration: '45 Days',
      mode: 'Online/Offline',
      icon: '💻',
      type: 'IT Course',
      overview: 'This comprehensive Python course is designed to provide you with industry-relevant skills and certification in programming.',
      learnings: defaultLearnings,
      features: defaultFeatures
    },
    {
      id: 102,
      name: 'Java',
      duration: '45 Days',
      mode: 'Online/Offline',
      icon: '💻',
      type: 'IT Course',
      overview: 'This comprehensive Java course is designed to provide you with industry-relevant skills and certification in programming.',
      learnings: defaultLearnings,
      features: defaultFeatures
    }
  ]

  const features = [
    { title: 'Certified Trainers', desc: 'AAPC, AHIMA, Oracle certified professionals with industry experience', icon: '👨‍🏫' },
    { title: 'Flexible Sessions', desc: 'Convenient scheduling to fit your lifestyle and work commitments', icon: '⏰' },
    { title: 'Hands-on Training', desc: 'Real case studies, projects, and practical experience', icon: '💼' },
    { title: 'Placement Assistance', desc: '95% placement rate with our industry partner network', icon: '🎯' },
    { title: 'Affordable Pricing', desc: 'Quality education at competitive rates with flexible payment options', icon: '💰' },
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #0055b8 50%, #ffffff 100%)' }}>
        {/* Top Spacing */}
        <div className="h-24 md:h-32"></div>
        
        {/* Banner with Logo and Title */}
        <div className="container mx-auto px-4 py-2 md:py-3 flex items-center justify-center gap-4">
          <img 
            src="/assets/team-med-codes-logo.PNG" 
            alt="Team Med Codes Logo" 
            className="h-14 md:h-18 w-auto drop-shadow-lg"
          />
          <div className="text-left">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-800 leading-tight">Team Med Codes</h1>
            <p className="text-accent-orange text-xs md:text-sm font-semibold mt-0.5">PROFESSIONAL MEDICAL CODING INSTITUTE</p>
          </div>
        </div>
        
        {/* Content Section */}
        <div className="container mx-auto px-4 pt-4 pb-32 md:pt-6 md:pb-40 text-gray-800">
          <div className="text-center">
            <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight">
              Advance Your <span className="text-accent-orange">Medical Coding </span>Career
            </h2>
            <p className="text-lg md:text-xl mb-10 text-gray-700 max-w-3xl mx-auto">
              Industry-certified programs delivered by AAPC and AHIMA experts. Join 900+ successful graduates.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4">
              <button
                onClick={() => scrollToSection('medical-courses')}
                className="px-8 py-3 bg-accent-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Explore Our Courses
              </button>
              <button
                onClick={() => scrollToSection('medical-courses')}
                className="px-8 py-3 bg-blue-600 border-2 border-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-tmc-light to-white border-b-4 border-accent-orange">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '900+', label: 'Students Trained', icon: '📚' },
              { value: '95%', label: 'Placement Rate', icon: '🎯' },
              { value: '500+', label: 'Learning Hours', icon: '⏱️' },
              { value: '24/7', label: 'Expert Support', icon: '🤝' }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group cursor-default" style={{ animation: `slideUp 0.6s ease-out ${idx * 0.1}s both` }}>
                <div className="text-4xl mb-3">{stat.icon}</div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-dark mb-2">
                  {stat.value}
                </h3>
                <p className="text-slate-dark font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-dark mb-4">About Team Med Codes</h2>
            <p className="text-lg text-accent-orange font-semibold">EXCELLENCE IN MEDICAL EDUCATION</p>
          </div>
          <p className="text-lg text-slate-dark max-w-4xl mx-auto text-center leading-relaxed mb-8">
            Team Med Codes is a premier professional institute delivering industry-certified training in medical coding. We empower healthcare professionals with the knowledge and credentials needed for successful careers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gradient-to-br from-tmc-light to-white p-6 rounded-lg border-2 border-accent-orange hover:shadow-lg transition-all duration-300">
              <h3 className="text-slate-dark font-bold text-lg mb-3">🏥 Certified Programs</h3>
              <p className="text-slate-dark">AAPC and AHIMA certified courses recognized globally</p>
            </div>
            <div className="bg-gradient-to-br from-tmc-light to-white p-6 rounded-lg border-2 border-accent-orange hover:shadow-lg transition-all duration-300">
              <h3 className="text-slate-dark font-bold text-lg mb-3">👨‍🏫 Expert Instructors</h3>
              <p className="text-slate-dark">Industry veterans with 15+ years of experience</p>
            </div>
            <div className="bg-gradient-to-br from-tmc-light to-white p-6 rounded-lg border-2 border-accent-orange hover:shadow-lg transition-all duration-300">
              <h3 className="text-slate-dark font-bold text-lg mb-3">📈 Career Support</h3>
              <p className="text-slate-dark">Placement assistance and continuous professional development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Medical Courses Section */}
      <section id="medical-courses" className="py-20 px-4 bg-gradient-to-br from-slate-dark via-slate-dark to-slate-light">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Medical Coding Courses</h2>
          <p className="text-center text-yellow-100 mb-12">
            AAPC & AHIMA Certified Training Programs
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicalCourses.map((course, idx) => (
              <div 
                key={course.id} 
                className="bg-white rounded-lg border-2 border-accent-orange hover:border-accent-orange transition-all duration-300 p-7 group shadow-lg hover:shadow-2xl" 
                onMouseEnter={() => setHoveredCourse(course.id)}
                onMouseLeave={() => setHoveredCourse(null)}
                style={{ animation: `slideUp 0.6s ease-out ${idx * 0.1}s both` }}
              >
                <div className="text-5xl mb-4">{course.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-slate-dark group-hover:text-accent-orange transition-colors duration-300">{course.name}</h3>
                <p className="text-sm text-slate-dark mb-4 font-semibold">{course.type}</p>
                <div className="space-y-1 mb-6 text-slate-dark text-sm">
                  <p className="flex items-center"><span className="mr-2">⏱️</span> {course.duration}</p>
                  <p className="flex items-center"><span className="mr-2">🌐</span> {course.mode}</p>
                </div>
                <button 
                  onClick={() => setSelectedCourse(course)}
                  className="w-full bg-accent-orange text-white py-2 rounded-lg hover:bg-orange-600 transition-all duration-300 font-semibold text-sm"
                >
                  Explore Course
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-tmc-light to-white">
        <div className="container mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-slate-dark">Why Choose Team Med Codes?</h2>
          <p className="text-center text-slate-dark mb-16">
            Industry-leading training and support for your medical coding career
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white border-2 border-accent-orange rounded-lg hover:shadow-lg transition-all duration-300 p-6 text-center group"
                style={{ animation: `slideUp 0.6s ease-out ${index * 0.08}s both` }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-bold mb-3 text-slate-dark group-hover:text-accent-orange transition-colors duration-300">{feature.title}</h3>
                <p className="text-slate-dark text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-dark to-slate-dark border-y-4 border-accent-orange">
        <div className="container mx-auto">
          <div className="text-center text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Begin Your Career?</h2>
            <p className="text-lg mb-8 text-yellow-100">Start with 900+ healthcare professionals. Expert-led training. Real results.</p>
            <Link 
              to="/contact" 
              className="inline-block px-10 py-3 bg-accent-orange text-white rounded-lg font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </section>

      {/* Course Detail Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={() => setSelectedCourse(null)}>
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn border-t-4 border-accent-orange" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-slate-dark to-slate-light text-white p-8 rounded-t-lg border-b-4 border-accent-orange">
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-5xl mb-3">{selectedCourse.icon}</div>
                  <h2 className="text-3xl font-bold mb-2">{selectedCourse.name}</h2>
                  <p className="text-yellow-200 text-lg">{selectedCourse.type}</p>
                </div>
                <button 
                  onClick={() => setSelectedCourse(null)}
                  className="text-white hover:bg-white hover:bg-opacity-10 rounded-full p-2 transition-all duration-300"
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
                <h3 className="text-2xl font-bold text-slate-dark mb-4">Course Overview</h3>
                <p className="text-slate-dark leading-relaxed">{selectedCourse.overview}</p>
              </div>

              {/* What You'll Learn */}
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-slate-dark mb-4">What You'll Learn</h3>
                <ul className="space-y-3">
                  {selectedCourse.learnings.map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <svg className="w-5 h-5 text-accent-orange mr-3 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                      </svg>
                      <span className="text-slate-dark">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Course Highlights (if available) */}
              {selectedCourse.highlights && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-slate-dark mb-4">Key Highlights</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedCourse.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center bg-tmc-light rounded-lg p-3 border border-accent-orange border-opacity-50">
                        <svg className="w-5 h-5 text-accent-orange mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                        </svg>
                        <span className="text-slate-dark text-sm font-medium">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Course Features */}
              <div className="mb-8 bg-gradient-to-br from-tmc-light to-white rounded-lg p-6 border-2 border-accent-orange">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">⏱️</span>
                    <div>
                      <p className="font-semibold text-slate-dark">Duration</p>
                      <p className="text-slate-dark">{selectedCourse.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">🌐</span>
                    <div>
                      <p className="font-semibold text-slate-dark">Mode</p>
                      <p className="text-slate-dark">{selectedCourse.mode}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📜</span>
                    <div>
                      <p className="font-semibold text-slate-dark">Certification</p>
                      <p className="text-slate-dark">Industry Recognized</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">👥</span>
                    <div>
                      <p className="font-semibold text-slate-dark">Batch Size</p>
                      <p className="text-slate-dark">Limited Seats</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">📝</span>
                    <div>
                      <p className="font-semibold text-slate-dark">Assessments</p>
                      <p className="text-slate-dark">Weekly Evaluations</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="text-2xl mr-3">✅</span>
                    <div>
                      <p className="font-semibold text-slate-dark">Support</p>
                      <p className="text-slate-dark">24/7 Available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Additional Features */}
              <div className="mb-8">
                <div className="space-y-3">
                  <div className="flex items-start bg-gradient-to-r from-accent-orange to-red-500 bg-opacity-10 border-2 border-accent-orange p-4 rounded-lg">
                    <span className="text-2xl mr-3">📊</span>
                    <div>
                      <p className="font-semibold text-slate-dark">Weekly Quizzes</p>
                      <p className="text-slate-dark">{selectedCourse.features.quizzes}</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-gradient-to-r from-accent-orange to-red-500 bg-opacity-10 border-2 border-accent-orange p-4 rounded-lg">
                    <span className="text-2xl mr-3">🎯</span>
                    <div>
                      <p className="font-semibold text-slate-dark">Final Assessment</p>
                      <p className="text-slate-dark">{selectedCourse.features.assessment}</p>
                    </div>
                  </div>
                  <div className="flex items-start bg-gradient-to-r from-accent-orange to-red-500 bg-opacity-10 border-2 border-accent-orange p-4 rounded-lg">
                    <span className="text-2xl mr-3">💬</span>
                    <div>
                      <p className="font-semibold text-slate-dark">Expert Support</p>
                      <p className="text-slate-dark">{selectedCourse.features.support}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col md:flex-row gap-4">
                <button
                  onClick={() => setShowEnrollForm(true)}
                  className="flex-1 bg-accent-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Enroll Now
                </button>
                <Link
                  to="/contact"
                  className="flex-1 bg-transparent border-2 border-accent-orange text-accent-orange py-3 rounded-lg font-bold hover:bg-accent-orange hover:text-white transition-all duration-300 text-center"
                >
                  Request Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enrollment Form Modal */}
      {showEnrollForm && selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-[60] flex items-center justify-center p-4 animate-fadeIn" onClick={() => !formSubmitting && setShowEnrollForm(false)}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleIn border-t-4 border-accent-orange" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-gradient-to-r from-slate-dark to-slate-light text-white p-8 rounded-t-lg border-b-4 border-accent-orange">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold mb-1">Enroll in {selectedCourse.name}</h2>
                  <p className="text-yellow-200">Complete your enrollment to get started</p>
                </div>
                <button 
                  onClick={() => !formSubmitting && setShowEnrollForm(false)}
                  disabled={formSubmitting}
                  className="text-white hover:bg-white hover:bg-opacity-10 rounded-full p-2 transition-all duration-300 disabled:opacity-50"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-8">
              {formSuccess ? (
                <div className="text-center py-8 animate-scaleIn">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-slate-dark mb-2">Enrollment Successful!</h3>
                  <p className="text-slate-dark">We'll contact you shortly with more details.</p>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="space-y-6">
                  {/* Course Info Banner */}
                  <div className="bg-gradient-to-r from-accent-orange to-red-500 bg-opacity-10 border-2 border-accent-orange rounded-lg p-4">
                    <div className="flex items-center">
                      <span className="text-3xl mr-3">{selectedCourse.icon}</span>
                      <div>
                        <p className="font-semibold text-slate-dark">{selectedCourse.name}</p>
                        <p className="text-sm text-slate-dark">{selectedCourse.duration} • {selectedCourse.mode}</p>
                      </div>
                    </div>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-dark mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={enrollFormData.name}
                      onChange={handleEnrollFormChange}
                      required
                      className="w-full px-4 py-3 border-2 border-accent-orange bg-white text-slate-dark rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange transition-all duration-300 placeholder-slate-dark placeholder-opacity-50"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-dark mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={enrollFormData.email}
                      onChange={handleEnrollFormChange}
                      required
                      className="w-full px-4 py-3 border-2 border-accent-orange bg-white text-slate-dark rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange transition-all duration-300 placeholder-slate-dark placeholder-opacity-50"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  {/* Phone Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-dark mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={enrollFormData.phone}
                      onChange={handleEnrollFormChange}
                      required
                      pattern="[0-9]{10}"
                      className="w-full px-4 py-3 border-2 border-accent-orange bg-white text-slate-dark rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange transition-all duration-300 placeholder-slate-dark placeholder-opacity-50"
                      placeholder="10-digit mobile number"
                    />
                  </div>

                  {/* Education Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-dark mb-2">
                      Educational Qualification <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="education"
                      value={enrollFormData.education}
                      onChange={handleEnrollFormChange}
                      required
                      className="w-full px-4 py-3 border-2 border-accent-orange bg-white text-slate-dark rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange transition-all duration-300"
                    >
                      <option value="" className="bg-white">Select your qualification</option>
                      <option value="high-school" className="bg-white">High School</option>
                      <option value="undergraduate" className="bg-white">Undergraduate</option>
                      <option value="graduate" className="bg-white">Graduate</option>
                      <option value="postgraduate" className="bg-white">Postgraduate</option>
                      <option value="diploma" className="bg-white">Diploma</option>
                      <option value="other" className="bg-white">Other</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-dark mb-2">
                      Additional Information (Optional)
                    </label>
                    <textarea
                      name="message"
                      value={enrollFormData.message}
                      onChange={handleEnrollFormChange}
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-accent-orange bg-white text-slate-dark rounded-lg focus:ring-2 focus:ring-accent-orange focus:border-accent-orange transition-all duration-300 resize-none placeholder-slate-dark placeholder-opacity-50"
                      placeholder="Any questions or special requirements?"
                    ></textarea>
                  </div>

                  {/* Terms and Conditions */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 mr-3 w-4 h-4 accent-accent-orange border-accent-orange rounded"
                    />
                    <label className="text-sm text-slate-dark">
                      I agree to the terms and conditions and consent to be contacted regarding this enrollment.
                    </label>
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setShowEnrollForm(false)}
                      disabled={formSubmitting}
                      className="flex-1 px-6 py-3 border-2 border-slate-dark text-slate-dark rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="flex-1 px-6 py-3 bg-accent-orange text-white rounded-lg font-semibold hover:bg-orange-600 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formSubmitting ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
