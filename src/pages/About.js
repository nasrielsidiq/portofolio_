import React from 'react';
import { getProfileData, getSocialMediaLinks } from '../utils/socialUtils';
import { FaLaptopCode, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './About.css';

function About() {
  const profile = getProfileData();
  const socialLinks = getSocialMediaLinks();

  return (
    <div className="about">
      <div className="container">
        <div className="about-header">
          <h1>About Me</h1>
          <div className="about-avatar">
            <FaLaptopCode />
          </div>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Who I Am</h2>
            <p className="about-bio">{profile.bio}</p>
            <div className="about-info">
              {profile.email && (
                <div className="info-item">
                  <span className="info-icon"><FaEnvelope /></span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
              )}
              {profile.location && (
                <div className="info-item">
                  <span className="info-icon"><FaMapMarkerAlt /></span>
                  <span>{profile.location}</span>
                </div>
              )}
            </div>
          </section>

          <section className="about-section">
            <h2>Skills & Technologies</h2>
            <div className="skills-grid">
              <div className="skill-category">
                <h3>Frontend</h3>
                <div className="skill-tags">
                  <span className="skill-tag">React</span>
                  <span className="skill-tag">JavaScript</span>
                  <span className="skill-tag">TypeScript</span>
                  <span className="skill-tag">HTML/CSS</span>
                  <span className="skill-tag">Tailwind CSS</span>
                </div>
              </div>
              <div className="skill-category">
                <h3>Backend</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Node.js</span>
                  <span className="skill-tag">Express</span>
                  <span className="skill-tag">Python</span>
                  <span className="skill-tag">REST API</span>
                </div>
              </div>
              <div className="skill-category">
                <h3>Tools & Others</h3>
                <div className="skill-tags">
                  <span className="skill-tag">Git</span>
                  <span className="skill-tag">Docker</span>
                  <span className="skill-tag">MongoDB</span>
                  <span className="skill-tag">PostgreSQL</span>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Connect With Me</h2>
            <div className="social-buttons">
              {socialLinks.github && (
                <a 
                  href={socialLinks.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-button"
                >
                  <FaGithub /> GitHub
                </a>
              )}
              {socialLinks.linkedin && (
                <a 
                  href={socialLinks.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-button"
                >
                  <FaLinkedin /> LinkedIn
                </a>
              )}
              {socialLinks.instagram && (
                <a 
                  href={socialLinks.instagram} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-button"
                >
                  <FaInstagram /> Instagram
                </a>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;
