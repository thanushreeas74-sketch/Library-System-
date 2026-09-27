import { useState, useEffect } from 'react'

// Same pattern as ExpenseForm from your other project: one form handles
// both "add" and "edit" depending on whether editingBook is passed in.
function BookForm({ onSave, editingBook, onCancelEdit }) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title)
      setAuthor(editingBook.author)
      setCategory(editingBook.category)
    } else {
      resetForm()
    }
  }, [editingBook])

  function resetForm() {
    setTitle('')
    setAuthor('')
    setCategory('')
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!title || !author || !category) return

    if (editingBook) {
      onSave({ ...editingBook, title, author, category })
    } else {
      onSave({ title, author, category, status: 'Available' })
    }
    resetForm()
  }

  return (
    <form className="book-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <button type="submit">{editingBook ? 'Update' : 'Add'} Book</button>
      {editingBook && (
        <button type="button" onClick={onCancelEdit}>
          Cancel
        </button>
      )}
    </form>
  )
}

export default BookForm
