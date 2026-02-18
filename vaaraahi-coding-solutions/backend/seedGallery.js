import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Gallery from './models/Gallery.js'

dotenv.config()

// Sample gallery data
const galleryData = [
  {
    title: 'Medical Coding Certification Ceremony',
    description: 'Students receiving their certificates after successfully completing the CPC certification program',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    category: 'achievements'
  },
  {
    title: 'Interactive Classroom Session',
    description: 'Live coding session with students learning Full Stack Data Science',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    category: 'classroom'
  },
  {
    title: 'Data Science Workshop',
    description: 'Hands-on workshop on Machine Learning and AI implementation',
    imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&q=80',
    category: 'events'
  },
  {
    title: 'Student Success Story',
    description: 'Our alumni working at top healthcare organizations',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80',
    category: 'students'
  },
  {
    title: 'Programming Bootcamp',
    description: 'Intensive Python and Java programming training session',
    imageUrl: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
    category: 'classroom'
  },
  {
    title: 'Medical Coding Training',
    description: 'ICD-10 and CPT coding practical training session',
    imageUrl: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=800&q=80',
    category: 'classroom'
  },
  {
    title: 'Team Building Event',
    description: 'Annual team gathering and student networking event',
    imageUrl: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&q=80',
    category: 'events'
  },
  {
    title: 'Award Ceremony',
    description: 'Recognizing top performers in medical coding batch',
    imageUrl: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
    category: 'achievements'
  }
]

const seedGallery = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vaaraahi', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    console.log('MongoDB Connected')

    // Clear existing gallery data
    await Gallery.deleteMany({})
    console.log('Existing gallery data cleared')

    // Insert new data
    const images = await Gallery.insertMany(galleryData)
    console.log(`${images.length} gallery images added successfully`)

    process.exit(0)
  } catch (error) {
    console.error('Error seeding gallery:', error)
    process.exit(1)
  }
}

seedGallery()
