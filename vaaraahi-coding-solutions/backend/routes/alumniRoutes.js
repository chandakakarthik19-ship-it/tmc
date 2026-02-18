import express from 'express'
import Alumni from '../models/Alumni.js'

const router = express.Router()

// Get all alumni
router.get('/', async (req, res) => {
  try {
    const alumni = await Alumni.find()
    res.json(alumni)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get featured alumni
router.get('/featured/true', async (req, res) => {
  try {
    const alumni = await Alumni.find({ featured: true })
    res.json(alumni)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get alumni by ID
router.get('/:id', async (req, res) => {
  try {
    const alumni = await Alumni.findById(req.params.id)
    if (!alumni) {
      return res.status(404).json({ error: 'Alumni profile not found' })
    }
    res.json(alumni)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new alumni profile
router.post('/', async (req, res) => {
  try {
    const alumni = new Alumni(req.body)
    const savedAlumni = await alumni.save()
    res.status(201).json(savedAlumni)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update alumni profile
router.put('/:id', async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!alumni) {
      return res.status(404).json({ error: 'Alumni profile not found' })
    }
    res.json(alumni)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete alumni profile
router.delete('/:id', async (req, res) => {
  try {
    const alumni = await Alumni.findByIdAndDelete(req.params.id)
    if (!alumni) {
      return res.status(404).json({ error: 'Alumni profile not found' })
    }
    res.json({ message: 'Alumni profile deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get alumni by course
router.get('/course/:course', async (req, res) => {
  try {
    const alumni = await Alumni.find({ course: req.params.course })
    res.json(alumni)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
