import jwt from 'jsonwebtoken'

// Reads the "Authorization: Bearer <token>" header, verifies it, and
// attaches the decoded user id to req.userId. Any route that uses this
// middleware requires a logged-in user.
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' })
  }

  const token = authHeader.split(' ')[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

export default requireAuth
