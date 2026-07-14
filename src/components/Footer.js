import React from 'react';
import { getSocialMediaLinks, getProfileData } from '../utils/socialUtils';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

function Footer() {
  const socialLinks = getSocialMediaLinks();
  const profile = getProfileData();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="social-links">
            {socialLinks.github && (
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                title="GitHub"
              >
                <FaGithub /> GitHub
              </a>
            )}
            {socialLinks.linkedin && (
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                title="LinkedIn"
              >
                <FaLinkedin /> LinkedIn
              </a>
            )}
            {socialLinks.instagram && (
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link"
                title="Instagram"
              >
                <FaInstagram /> Instagram
              </a>
            )}
          </div>
          <div className="footer-text">
            <p>&copy; {currentYear} {profile.name}. Built with React 🐧</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
