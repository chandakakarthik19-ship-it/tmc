import mongoose from 'mongoose'

const batchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  schedule: {
    type: String
  },
  maxStudents: {
    type: Number,
    default: 30
  },
  enrolledStudents: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['Upcoming', 'Ongoing', 'Completed'],
    default: 'Upcoming'
  },
  instructor: {
    type: String
  },
  mode: {
    type: String,
    enum: ['Online', 'Offline', 'Online/Offline']
  }
}, {
  timestamps: true
})

const Batch = mongoose.model('Batch', batchSchema)

export default Batch
