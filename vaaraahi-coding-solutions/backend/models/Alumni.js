import mongoose from 'mongoose'

const alumniSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  course: {
    type: String,
    required: true
  },
  batch: {
    type: String
  },
  completionYear: {
    type: String
  },
  currentCompany: {
    type: String
  },
  currentPosition: {
    type: String
  },
  testimonial: {
    type: String
  },
  photo: {
    type: String
  }
}, {
  timestamps: true
})

const Alumni = mongoose.model('Alumni', alumniSchema)

export default Alumni
