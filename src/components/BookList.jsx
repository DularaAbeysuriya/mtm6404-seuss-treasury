// src/components/BookList.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function BookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/books')
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data.books) {
          throw new Error('No books found in the response');
        }
        setBooks(data.books);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load books:', err);
        setError(`Failed to load books: ${err.message}`);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Books</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
            <img src={`/images/${book.coverImage}`} alt={book.title} />

              <p>{book.title}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
