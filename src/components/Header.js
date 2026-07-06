import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const siteName = process.env.REACT_APP_NAME || 'Mucaa';

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <h1>{siteName}</h1>
          </Link>
          <nav className="nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Link to="/articles" className="nav-link">Articles</Link>
            <Link to="/social" className="nav-link">Social</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
