import mongoose from 'mongoose'

const gallerySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  category: {
    type: String,
    default: 'general',
    enum: ['general', 'events', 'achievements', 'activities', 'infrastructure']
  }
}, {
  timestamps: true
})

const Gallery = mongoose.model('Gallery', gallerySchema)

export default Gallery
