import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Serve static files from uploads directory
app.use('/uploads', express.static('uploads'))

// MongoDB Connection
console.log('Connecting to MongoDB Atlas...')
console.log('Using MongoDB URI:', process.env.MONGODB_URI ? 'Found in .env' : 'Using default')

// Force DNS resolution to use system resolver
import dns from 'dns';
dns.setDefaultResultOrder('ipv4first');

const mongoOptions = {
  serverSelectionTimeoutMS: 30000,
  socketTimeoutMS: 45000
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vaaraahi', mongoOptions)
  .then(() => console.log('✅ MongoDB Atlas Connected'))
  .catch(err => {
    console.error('❌ MongoDB Connection Error:', err.message)
    console.error('Please check your MONGODB_URI in .env file')
  })

// Import Routes
import batchRoutes from './routes/batchRoutes.js'
import alumniRoutes from './routes/alumniRoutes.js'
import inquiryRoutes from './routes/inquiryRoutes.js'
import enrollmentRoutes from './routes/enrollmentRoutes.js'
import galleryRoutes from './routes/galleryRoutes.js'
import courseRoutes from './routes/courseRoutes.js'

// Use Routes
app.use('/api/batches', batchRoutes)
app.use('/api/alumni', alumniRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/enrollments', enrollmentRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/courses', courseRoutes)

// Basic Route
app.get('/api', (req, res) => {
  res.json({ message: 'Vaaraahi Coding Solutions API' })
})

// Start Server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
