import mongoose from 'mongoose'

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  duration: {
    type: String,
    required: true
  },
  mode: {
    type: String,
    required: true,
    enum: ['Online', 'Offline', 'Online/Offline']
  },
  price: {
    type: Number,
    default: 0
  },
  instructor: {
    type: String,
    required: true
  },
  maxStudents: {
    type: Number,
    default: 30
  },
  curriculum: {
    type: [String],
    default: []
  },
  prerequisites: {
    type: [String],
    default: []
  },
  certification: {
    type: String
  }
}, {
  timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

export default Course
