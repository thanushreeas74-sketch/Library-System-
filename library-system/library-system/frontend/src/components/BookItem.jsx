// Displays one book. Reusable and "dumb" - all logic lives in the parent.
function BookItem({ book, onEdit, onDelete, onToggleStatus }) {
  return (
    <li className="book-item">
      <div className="book-info">
        <strong>{book.title}</strong>
        <span>by {book.author}</span>
        <span className="category-tag">{book.category}</span>
        <span className={`status ${book.status === 'Available' ? 'available' : 'issued'}`}>
          {book.status}
        </span>
      </div>
      <div className="book-actions">
        <button onClick={() => onToggleStatus(book)}>
          Mark {book.status === 'Available' ? 'Issued' : 'Available'}
        </button>
        <button onClick={() => onEdit(book)}>Edit</button>
        <button onClick={() => onDelete(book._id)}>Delete</button>
      </div>
    </li>
  )
}

export default BookItem
