import { useState, useEffect } from 'react'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import BookForm from './components/BookForm.jsx'
import BookList from './components/BookList.jsx'
import api from './api.js'

function App() {
  // null = logged out, object = logged in user
  const [user, setUser] = useState(null)
  const [authView, setAuthView] = useState('login') // 'login' | 'signup'

  const [books, setBooks] = useState([])
  const [search, setSearch] = useState('')
  const [editingBook, setEditingBook] = useState(null)

  // On first load, if a token already exists, treat the user as logged in
  // (a real app would verify the token with the backend; kept simple here)
  useEffect(() => {
    const token = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (token && savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  // Whenever we're logged in, or the search term changes, refetch books
  useEffect(() => {
    if (user) fetchBooks()
  }, [user, search])

  async function fetchBooks() {
    try {
      const res = await api.get('/books', { params: { search } })
      setBooks(res.data)
    } catch (err) {
      console.error('Failed to fetch books:', err)
    }
  }

  function handleLogin(loggedInUser) {
    localStorage.setItem('user', JSON.stringify(loggedInUser))
    setUser(loggedInUser)
  }

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
    setBooks([])
  }

  async function saveBook(bookData) {
    try {
      if (bookData._id) {
        await api.put(`/books/${bookData._id}`, bookData)
      } else {
        await api.post('/books', bookData)
      }
      setEditingBook(null)
      fetchBooks()
    } catch (err) {
      console.error('Failed to save book:', err)
    }
  }

  async function deleteBook(id) {
    try {
      await api.delete(`/books/${id}`)
      fetchBooks()
    } catch (err) {
      console.error('Failed to delete book:', err)
    }
  }

  async function toggleStatus(book) {
    const newStatus = book.status === 'Available' ? 'Issued' : 'Available'
    await saveBook({ ...book, status: newStatus })
  }

  // ---- Not logged in: show Login or Signup ----
  if (!user) {
    return (
      <div className="app">
        <h1>Book Library Management System</h1>
        {authView === 'login' ? (
          <Login onLogin={handleLogin} onSwitchToSignup={() => setAuthView('signup')} />
        ) : (
          <Signup
            onSignupSuccess={() => setAuthView('login')}
            onSwitchToLogin={() => setAuthView('login')}
          />
        )}
      </div>
    )
  }

  // ---- Logged in: show the book dashboard ----
  return (
    <div className="app">
      <div className="header-row">
        <h1>Book Library</h1>
        <div>
          <span>Hi, {user.name}</span>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </div>

      <BookForm
        onSave={saveBook}
        editingBook={editingBook}
        onCancelEdit={() => setEditingBook(null)}
      />

      <input
        className="search-input"
        type="text"
        placeholder="Search by title or author..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <BookList
        books={books}
        onEdit={setEditingBook}
        onDelete={deleteBook}
        onToggleStatus={toggleStatus}
      />
    </div>
  )
}

export default App
