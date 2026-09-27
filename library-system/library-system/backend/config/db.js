import mongoose from 'mongoose'

// Called once from server.js at startup. Keeping this in its own file
// means server.js doesn't need to know HOW we connect, just that we do.
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('MongoDB connection failed:', err.message)
    process.exit(1)
  }
}

export default connectDB
