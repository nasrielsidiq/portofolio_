import React, { useState, useEffect } from 'react';
import { getProfileData, getSocialMediaLinks } from '../utils/socialUtils';
import { FaLaptopCode, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram, FaGraduationCap, FaHeart } from 'react-icons/fa';
import './About.css';

function About() {
  const [profile, setProfile] = useState({});
  const socialLinks = getSocialMediaLinks();

  useEffect(() => {
    getProfileData().then(setProfile);
  }, []);

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
            
            <div className="about-info-cards">
              {profile.education && (
                <div className="info-card">
                  <div className="info-card-icon"><FaGraduationCap /></div>
                  <div className="info-card-content">
                    <h4>Education</h4>
                    <p>{profile.education}</p>
                  </div>
                </div>
              )}
              {profile.role && (
                <div className="info-card">
                  <div className="info-card-icon"><FaLaptopCode /></div>
                  <div className="info-card-content">
                    <h4>Current Role</h4>
                    <p>{profile.role}</p>
                  </div>
                </div>
              )}
              {profile.interests && (
                <div className="info-card">
                  <div className="info-card-icon"><FaHeart /></div>
                  <div className="info-card-content">
                    <h4>Interests</h4>
                    <p>{profile.interests}</p>
                  </div>
                </div>
              )}
            </div>

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
