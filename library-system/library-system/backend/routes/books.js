import express from 'express'
import Book from '../models/Book.js'
import requireAuth from '../middleware/auth.js'

const router = express.Router()

// All book routes require a logged-in user
router.use(requireAuth)

// GET /api/books  -> supports ?search=title-or-author
router.get('/', async (req, res) => {
  try {
    const { search } = req.query
    let query = {}
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
        ],
      }
    }
    const books = await Book.find(query).sort({ createdAt: -1 })
    res.json(books)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// POST /api/books
router.post('/', async (req, res) => {
  try {
    const { title, author, category, status } = req.body
    if (!title || !author || !category) {
      return res.status(400).json({ message: 'Title, author, and category are required' })
    }
    const book = await Book.create({ title, author, category, status })
    res.status(201).json(book)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// PUT /api/books/:id  -> edit details OR toggle Available/Issued
router.put('/:id', async (req, res) => {
  try {
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (!updated) return res.status(404).json({ message: 'Book not found' })
    res.json(updated)
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

// DELETE /api/books/:id
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id)
    if (!deleted) return res.status(404).json({ message: 'Book not found' })
    res.json({ message: 'Book deleted' })
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message })
  }
})

export default router
