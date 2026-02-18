import mongoose from 'mongoose'
import validator from 'validator'

const enrollmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, 'Invalid email address']
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  courseInterest: {
    type: String,
    required: true
  },
  educationalQualification: {
    type: String
  },
  additionalInformation: {
    type: String
  },
  agreeToTerms: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Enrolled', 'Closed'],
    default: 'New'
  }
}, {
  timestamps: true
})

const Enrollment = mongoose.model('Enrollment', enrollmentSchema)

export default Enrollment
