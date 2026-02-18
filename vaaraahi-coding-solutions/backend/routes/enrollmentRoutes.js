import express from 'express'
import Enrollment from '../models/Enrollment.js'

const router = express.Router()

// Get all enrollments
router.get('/', async (req, res) => {
  try {
    const enrollments = await Enrollment.find()
    res.json(enrollments)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get enrollment by ID
router.get('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }
    res.json(enrollment)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new enrollment
router.post('/', async (req, res) => {
  try {
    const enrollment = new Enrollment(req.body)
    const savedEnrollment = await enrollment.save()
    res.status(201).json(savedEnrollment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update enrollment
router.put('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }
    res.json(enrollment)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete enrollment
router.delete('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByIdAndDelete(req.params.id)
    if (!enrollment) {
      return res.status(404).json({ error: 'Enrollment not found' })
    }
    res.json({ message: 'Enrollment deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
