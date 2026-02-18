import express from 'express'
import Inquiry from '../models/Inquiry.js'

const router = express.Router()

// Get all inquiries
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find()
    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get inquiry by ID
router.get('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findById(req.params.id)
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }
    res.json(inquiry)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Create new inquiry
router.post('/', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body)
    const savedInquiry = await inquiry.save()
    res.status(201).json(savedInquiry)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Update inquiry
router.put('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }
    res.json(inquiry)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Delete inquiry
router.delete('/:id', async (req, res) => {
  try {
    const inquiry = await Inquiry.findByIdAndDelete(req.params.id)
    if (!inquiry) {
      return res.status(404).json({ error: 'Inquiry not found' })
    }
    res.json({ message: 'Inquiry deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// Get inquiries by status
router.get('/status/:status', async (req, res) => {
  try {
    const inquiries = await Inquiry.find({ status: req.params.status })
    res.json(inquiries)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

export default router
