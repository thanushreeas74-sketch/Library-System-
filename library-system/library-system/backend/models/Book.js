import mongoose from 'mongoose'

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    category: { type: String, required: true },
    status: {
      type: String,
      enum: ['Available', 'Issued'],
      default: 'Available',
    },
  },
  { timestamps: true }
)

export default mongoose.model('Book', bookSchema)
