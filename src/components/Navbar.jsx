// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <Link to="/books">Books</Link>
      <Link to="/quotes">Quotes</Link>
    </nav>
  );
}

export default Navbar;
