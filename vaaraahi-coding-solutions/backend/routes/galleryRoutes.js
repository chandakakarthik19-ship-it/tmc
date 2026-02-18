import express from 'express'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import Gallery from '../models/Gallery.js'

const router = express.Router()

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  // Accept only image files
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed!'), false)
  }
}

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
})

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const images = await Gallery.find()
    // Sort by createdAt in descending order (newest first)
    images.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    res.json(images)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Get single image by ID
router.get('/:id', async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id)
    if (!image) {
      return res.status(404).json({ message: 'Image not found' })
    }
    res.json(image)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Create new gallery image with file upload
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' })
    }

    // Create the image URL from the uploaded file
    const imageUrl = `/uploads/${req.file.filename}`

    const newImage = new Gallery({
      title,
      description,
      imageUrl,
      category: category || 'general'
    })

    const savedImage = await newImage.save()
    res.status(201).json(savedImage)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Update gallery image
router.put('/:id', async (req, res) => {
  try {
    const { title, description, imageUrl, category } = req.body

    const updatedImage = await Gallery.findByIdAndUpdate(
      req.params.id,
      { title, description, imageUrl, category },
      { new: true, runValidators: true }
    )

    if (!updatedImage) {
      return res.status(404).json({ message: 'Image not found' })
    }

    res.json(updatedImage)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Delete gallery image
router.delete('/:id', async (req, res) => {
  try {
    const deletedImage = await Gallery.findByIdAndDelete(req.params.id)
    
    if (!deletedImage) {
      return res.status(404).json({ message: 'Image not found' })
    }

    // Delete the physical file if it exists in uploads folder
    if (deletedImage.imageUrl && deletedImage.imageUrl.startsWith('/uploads/')) {
      const filename = deletedImage.imageUrl.replace('/uploads/', '')
      const filePath = path.join('uploads', filename)
      
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error('Error deleting file:', err)
        }
      })
    }

    res.json({ message: 'Image deleted successfully', image: deletedImage })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

// Get images by category
router.get('/category/:category', async (req, res) => {
  try {
    const images = await Gallery.find({ category: req.params.category })
    // Sort by createdAt in descending order (newest first)
    images.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    res.json(images)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
})

export default router
