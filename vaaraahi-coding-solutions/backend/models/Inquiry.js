import mongoose from 'mongoose'
import validator from 'validator'

const inquirySchema = new mongoose.Schema({
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
  message: {
    type: String,
    required: true
  },
  courseInterest: {
    type: String
  },
  educationalQualification: {
    type: String
  },
  enrollmentType: {
    type: String,
    enum: ['course_enrollment', 'general_inquiry', 'demo_request'],
    default: 'general_inquiry'
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Enrolled', 'Closed'],
    default: 'New'
  },
  additionalInformation: {
    type: String
  },
  agreeToTerms: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
})

const Inquiry = mongoose.model('Inquiry', inquirySchema)

export default Inquiry
