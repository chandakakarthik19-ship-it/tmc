import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// Import models
import Course from './models/Course.js'
import Alumni from './models/Alumni.js'
import Batch from './models/Batch.js'
import Gallery from './models/Gallery.js'
import Inquiry from './models/Inquiry.js'

// Get directory name
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config()

// Read JSON data files
const readJSONFile = (filename) => {
  try {
    const filePath = path.join(__dirname, 'data', filename)
    const data = fs.readFileSync(filePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.log(`⚠️  No data file found for ${filename}`)
    return []
  }
}

const migrateData = async () => {
  try {
    // Connect to MongoDB
    console.log('🔌 Connecting to MongoDB...')
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('✅ Connected to MongoDB')

    // Clear existing data
    console.log('\\n🗑️  Clearing existing data...')
    await Course.deleteMany({})
    await Alumni.deleteMany({})
    await Batch.deleteMany({})
    await Gallery.deleteMany({})
    await Inquiry.deleteMany({})
    console.log('✅ Existing data cleared')

    // Migrate Courses
    console.log('\\n📚 Migrating Courses...')
    const coursesData = readJSONFile('courses.json')
    if (coursesData.length > 0) {
      // Remove _id from courses data as MongoDB will generate new ones
      const coursesToInsert = coursesData.map(({ _id, ...course }) => course)
      const courses = await Course.insertMany(coursesToInsert)
      console.log(`✅ Migrated ${courses.length} courses`)
    } else {
      console.log('⚠️  No courses to migrate')
    }

    // Migrate Alumni
    console.log('\\n👥 Migrating Alumni...')
    const alumniData = readJSONFile('alumni.json')
    if (alumniData.length > 0) {
      const alumniToInsert = alumniData.map(({ _id, ...alumni }) => alumni)
      const alumni = await Alumni.insertMany(alumniToInsert)
      console.log(`✅ Migrated ${alumni.length} alumni`)
    } else {
      console.log('⚠️  No alumni to migrate')
    }

    // Migrate Batches
    console.log('\\n🎓 Migrating Batches...')
    const batchesData = readJSONFile('batches.json')
    if (batchesData.length > 0) {
      const batchesToInsert = batchesData.map(({ _id, ...batch }) => batch)
      const batches = await Batch.insertMany(batchesToInsert)
      console.log(`✅ Migrated ${batches.length} batches`)
    } else {
      console.log('⚠️  No batches to migrate')
    }

    // Migrate Gallery
    console.log('\\n🖼️  Migrating Gallery...')
    const galleryData = readJSONFile('gallery.json')
    if (galleryData.length > 0) {
      const galleryToInsert = galleryData.map(({ _id, ...item }) => item)
      const gallery = await Gallery.insertMany(galleryToInsert)
      console.log(`✅ Migrated ${gallery.length} gallery items`)
    } else {
      console.log('⚠️  No gallery items to migrate')
    }

    // Migrate Inquiries
    console.log('\\n💬 Migrating Inquiries...')
    const inquiriesData = readJSONFile('inquiries.json')
    if (inquiriesData.length > 0) {
      const inquiriesToInsert = inquiriesData.map(({ _id, ...inquiry }) => inquiry)
      const inquiries = await Inquiry.insertMany(inquiriesToInsert)
      console.log(`✅ Migrated ${inquiries.length} inquiries`)
    } else {
      console.log('⚠️  No inquiries to migrate')
    }

    console.log('\\n🎉 Migration completed successfully!')
    
    // Display summary
    const courseCount = await Course.countDocuments()
    const alumniCount = await Alumni.countDocuments()
    const batchCount = await Batch.countDocuments()
    const galleryCount = await Gallery.countDocuments()
    const inquiryCount = await Inquiry.countDocuments()

    console.log('\\n📊 Summary:')
    console.log(`   Courses: ${courseCount}`)
    console.log(`   Alumni: ${alumniCount}`)
    console.log(`   Batches: ${batchCount}`)
    console.log(`   Gallery: ${galleryCount}`)
    console.log(`   Inquiries: ${inquiryCount}`)

    process.exit(0)
  } catch (error) {
    console.error('❌ Migration failed:', error)
    process.exit(1)
  }
}

// Run migration
migrateData()
