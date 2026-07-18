import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import ResumeModal from './ResumeModal';
import './Header.css';

function Header() {
  const siteName = process.env.REACT_APP_NAME || 'Mucaa';
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
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
              <button 
                className="nav-link resume-btn"
                onClick={() => setResumeOpen(true)}
              >
                <FaFileAlt /> Resume
              </button>
            </nav>
          </div>
        </div>
      </header>

      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />
    </>
  );
}

export default Header;
