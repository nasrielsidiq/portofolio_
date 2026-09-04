import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt, FaBars, FaTimes } from 'react-icons/fa';
import ResumeModal from './ResumeModal';
import './Header.css';

function Header() {
  const siteName = process.env.REACT_APP_NAME || 'Mucaa';
  const [resumeOpen, setResumeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    const handleRouteChange = () => setMobileMenuOpen(false);
    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/articles', label: 'Articles' },
    { path: '/social', label: 'Social' },
  ];

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header-content">
            <Link to="/" className="logo" onClick={closeMobileMenu}>
              <h1>{siteName}</h1>
            </Link>

            {/* Desktop nav */}
            <nav className="nav desktop-nav">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="nav-link"
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </Link>
              ))}
              <button
                className="nav-link resume-btn"
                onClick={() => setResumeOpen(true)}
              >
                <FaFileAlt /> Resume
              </button>
            </nav>

            {/* Mobile burger button */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Mobile nav panel */}
          <nav className="mobile-nav" aria-hidden={!mobileMenuOpen}>
            {mobileMenuOpen && (
              <div className="mobile-nav-content">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="mobile-nav-link"
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ))}
                <button
                  className="mobile-nav-link mobile-resume-btn"
                  onClick={() => {
                    setResumeOpen(true);
                    closeMobileMenu();
                  }}
                >
                  <FaFileAlt /> Resume
                </button>
              </div>
            )}
          </nav>
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