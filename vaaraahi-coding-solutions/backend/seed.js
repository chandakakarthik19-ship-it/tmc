import mongoose from 'mongoose'
import 'dotenv/config'
import Course from './models/Course.js'

const seedCourses = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB')

    // Delete existing courses
    await Course.deleteMany({})
    console.log('Cleared existing courses')

    const courses = [
      {
        name: 'Python Programming',
        description: 'This comprehensive Python Programming course is designed to provide you with industry-relevant skills and certification. Learn from basics to advanced concepts with hands-on projects.',
        category: 'IT',
        duration: '70 Days',
        mode: 'Online',
        price: 4999,
        instructor: 'Mr. Rajesh Kumar',
        maxStudents: 30,
        curriculum: [
          'Industry-standard practices and methodologies',
          'Hands-on practical experience',
          'Real-world case studies and projects',
          'Certification preparation',
        ],
        prerequisites: ['Basic computer knowledge'],
        certification: 'Industry Recognized Python Certification',
      },
      {
        name: 'Java Programming',
        description: 'Master Java programming with our comprehensive course covering object-oriented principles, design patterns, and real-world applications. Perfect for beginners and intermediate learners.',
        category: 'IT',
        duration: '75 Days',
        mode: 'Online',
        price: 5499,
        instructor: 'Ms. Priya Sharma',
        maxStudents: 25,
        curriculum: [
          'Core Java fundamentals',
          'Object-Oriented Programming',
          'Design Patterns',
          'Spring Framework',
          'Database integration',
          'Real project implementation',
        ],
        prerequisites: ['Programming basics'],
        certification: 'Industry Recognized Java Certification',
      },
      {
        name: 'C Programming',
        description: 'Learn C programming from scratch. This course covers fundamental concepts of programming, memory management, and system-level programming. Essential for aspiring software engineers.',
        category: 'IT',
        duration: '60 Days',
        mode: 'Online/Offline',
        price: 3999,
        instructor: 'Dr. Amit Patel',
        maxStudents: 35,
        curriculum: [
          'Programming fundamentals',
          'Data structures',
          'Pointers and memory management',
          'File handling',
          'Advanced concepts',
        ],
        prerequisites: ['None'],
        certification: 'Industry Recognized C Certification',
      },
      {
        name: 'C++ Programming',
        description: 'Advanced C++ course focusing on object-oriented programming, STL, and modern C++ features. Build efficient systems and applications with C++.',
        category: 'IT',
        duration: '80 Days',
        mode: 'Online',
        price: 5999,
        instructor: 'Prof. John Anderson',
        maxStudents: 20,
        curriculum: [
          'Object-Oriented Programming',
          'STL (Standard Template Library)',
          'Memory management',
          'Template programming',
          'Design patterns in C++',
          'Game development basics',
        ],
        prerequisites: ['C programming knowledge'],
        certification: 'Industry Recognized C++ Certification',
      },
      {
        name: 'CPC (Certified Professional Coder)',
        description: 'Prepare for the AAPC CPC exam with our comprehensive medical coding course. Learn medical terminology, coding guidelines, and practical coding scenarios.',
        category: 'Medical',
        duration: '90 Days',
        mode: 'Online',
        price: 8999,
        instructor: 'Ms. Sarah Johnson (Certified Coder)',
        maxStudents: 20,
        curriculum: [
          'Medical terminology and anatomy',
          'ICD-10-CM coding guidelines',
          'CPT and HCPCS coding principles',
          'Case studies and practice coding',
          'CPC exam preparation',
          'Mock exams and assessments',
        ],
        prerequisites: ['None'],
        certification: 'AAPC CPC Certification',
      },
      {
        name: 'CCS (Certified Coding Specialist)',
        description: 'Comprehensive CCS coding course covering all aspects of hospital coding. Master inpatient coding guidelines and clinical documentation improvement.',
        category: 'Medical',
        duration: '85 Days',
        mode: 'Online/Offline',
        price: 8499,
        instructor: 'Mr. Robert Smith',
        maxStudents: 18,
        curriculum: [
          'Hospital coding fundamentals',
          'Inpatient coding guidelines',
          'Clinical documentation improvement',
          'ICD-10-CM & PCS coding',
          'Compliance and auditing',
          'Real hospital case studies',
        ],
        prerequisites: ['Basic medical knowledge preferred'],
        certification: 'AHIMA CCS Certification',
      },
      {
        name: 'Medical Coding - SDS',
        description: 'Comprehensive course on Systems, Diseases, and Services coding. Learn to code complex medical conditions and procedures accurately.',
        category: 'Medical',
        duration: '70 Days',
        mode: 'Online',
        price: 7499,
        instructor: 'Dr. Emily Watson',
        maxStudents: 22,
        curriculum: [
          'Systems and organ classification',
          'Disease coding principles',
          'Procedure coding',
          'Modifiers and indicators',
          'Complex case coding',
          'Compliance requirements',
        ],
        prerequisites: ['Basic medical knowledge'],
        certification: 'Medical Coding Systems Certification',
      },
      {
        name: 'Home Health Coding',
        description: 'Specialized course on home health and hospice coding. Learn OASIS coding, home health documentation, and reimbursement guidelines.',
        category: 'Medical',
        duration: '60 Days',
        mode: 'Online',
        price: 6999,
        instructor: 'Ms. Linda Davis',
        maxStudents: 25,
        curriculum: [
          'Home health fundamentals',
          'OASIS assessment coding',
          'LUPA considerations',
          'HHC payment systems',
          'Documentation requirements',
          'Real home health scenarios',
        ],
        prerequisites: ['Medical coding basics'],
        certification: 'Home Health Coding Specialist',
      },
    ]

    const createdCourses = await Course.insertMany(courses)
    console.log(`Successfully created ${createdCourses.length} courses`)

    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error seeding courses:', error)
    process.exit(1)
  }
}

seedCourses()
