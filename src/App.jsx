import React, { useState, useEffect } from 'react';
import { Route, Routes, Link, useParams } from 'react-router-dom';
import './App.css';

const Books = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('https://seussology.info/api/books')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Check the data structure
        setBooks(data);
      })
      .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div>
      <h1>Books</h1>
      <div className="book-list">
        {books.map(book => (
          <div key={book.id} className="book-item">
            <Link to={`/books/${book.id}`}>
              <img
                src={book.coverImage}
                alt={book.title}
                onError={(e) => e.target.src = '/path/to/placeholder.jpg'}
              />
            </Link>
            <p>{book.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://seussology.info/api/books/${id}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error('Error fetching book details:', error));
  }, [id]);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <img src={book.coverImage} alt={book.title} />
      <p>{book.description}</p>
    </div>
  );
};

const QuotesPage = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetch('https://seussology.info/api/quotes')
      .then(response => response.json())
      .then(data => setQuotes(data.slice(0, 10)))
      .catch(error => console.error('Error fetching quotes:', error));
  }, []);

  return (
    <div>
      <h1>Quotes</h1>
      <ul>
        {quotes.map((quote, index) => (
          <li key={index}>{quote.text}</li>
        ))}
      </ul>
    </div>
  );
};

function App() {
  return (
    <div>
      <nav>
        <Link to="/books">Books</Link> | <Link to="/quotes">Quotes</Link>
      </nav>
      <Routes>
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetail />} />
        <Route path="/quotes" element={<QuotesPage />} />
      </Routes>
    </div>
  );
}

export default App;