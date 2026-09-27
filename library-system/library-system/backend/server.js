import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import authRoutes from './routes/auth.js'
import bookRoutes from './routes/books.js'

dotenv.config()
connectDB()

const app = express()

// CORS: only allow requests from your deployed frontend + local dev
app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
  })
)
app.use(express.json())

// Mount routes: everything under /api/auth goes to auth.js,
// everything under /api/books goes to books.js
app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes)

app.get('/', (req, res) => {
  res.send('Library API is running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
