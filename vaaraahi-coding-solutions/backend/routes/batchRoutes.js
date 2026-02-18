import express from 'express'
import Batch from '../models/Batch.js'

const router = express.Router()

// Get all batches
router.get('/', async (req, res) => {
  try {
    const batches = await Batch.find().populate('courseId')
    res.json(batches)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get batch by ID
router.get('/:id', async (req, res) => {
  try {
    const batch = await Batch.findById(req.params.id).populate('courseId')
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' })
    }
    res.json(batch)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new batch
router.post('/', async (req, res) => {
  try {
    const batch = new Batch(req.body)
    const savedBatch = await batch.save()
    await savedBatch.populate('courseId')
    res.status(201).json(savedBatch)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update batch
router.put('/:id', async (req, res) => {
  try {
    const batch = await Batch.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('courseId')
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' })
    }
    res.json(batch)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete batch
router.delete('/:id', async (req, res) => {
  try {
    const batch = await Batch.findByIdAndDelete(req.params.id)
    if (!batch) {
      return res.status(404).json({ error: 'Batch not found' })
    }
    res.json({ message: 'Batch deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get upcoming batches
router.get('/status/upcoming', async (req, res) => {
  try {
    const batches = await Batch.find({ status: 'Upcoming' }).populate('courseId')
    res.json(batches)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
