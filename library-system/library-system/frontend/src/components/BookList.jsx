import BookItem from './BookItem.jsx'

function BookList({ books, onEdit, onDelete, onToggleStatus }) {
  if (books.length === 0) {
    return <p className="empty-state">No books found.</p>
  }

  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookItem
          key={book._id}
          book={book}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleStatus={onToggleStatus}
        />
      ))}
    </ul>
  )
}

export default BookList
