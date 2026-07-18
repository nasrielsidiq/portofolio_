import React, { useState, useEffect } from 'react';
import { getProfileData, getSocialMediaLinks } from '../utils/socialUtils';
import { 
  FaLaptopCode, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, 
  FaInstagram, FaGraduationCap, FaBriefcase, FaUsers, FaTools, FaHeart, FaPhone 
} from 'react-icons/fa';
import './About.css';

function About() {
  const [profile, setProfile] = useState(null);
  const socialLinks = getSocialMediaLinks();

  useEffect(() => {
    getProfileData().then(setProfile);
  }, []);

  if (!profile) {
    return (
      <div className="about">
        <div className="container">
          <div className="loading">Loading profile...</div>
        </div>
      </div>
    );
  }

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
          {/* Who I Am Section */}
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
              {profile.phone && (
                <div className="info-item">
                  <span className="info-icon"><FaPhone /></span>
                  <span>{profile.phone}</span>
                </div>
              )}
              {profile.location && (
                <div className="info-item">
                  <span className="info-icon"><FaMapMarkerAlt /></span>
                  <span>{profile.address ? `${profile.address}, ` : ''}{profile.location}</span>
                </div>
              )}
            </div>
          </section>

          {/* Education Section */}
          {profile.education && profile.education.length > 0 && (
            <section className="about-section">
              <h2>Education</h2>
              <div className="timeline">
                {profile.education.map((edu, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-icon"><FaGraduationCap /></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <h3>{edu.institution}</h3>
                        <span className="timeline-date">{edu.graduation_date}</span>
                      </div>
                      <h4 className="timeline-subtitle">{edu.degree} {edu.gpa ? `(${edu.gpa})` : ''} &bull; {edu.location || ''}</h4>
                      {edu.thesis && <p className="timeline-details"><strong>Thesis:</strong> {edu.thesis}</p>}
                      {edu.coursework && <p className="timeline-details font-italic">{edu.coursework}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience Section */}
          {profile.experience && profile.experience.length > 0 && (
            <section className="about-section">
              <h2>Experience</h2>
              <div className="timeline">
                {profile.experience.map((exp, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-icon"><FaBriefcase /></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <h3>{exp.organization}</h3>
                        <span className="timeline-date">{exp.period}</span>
                      </div>
                      <h4 className="timeline-subtitle">{exp.position} &bull; {exp.location}</h4>
                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="timeline-bullets">
                          {exp.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Leadership & Activities Section */}
          {profile.leadership && profile.leadership.length > 0 && (
            <section className="about-section">
              <h2>Leadership & Activities</h2>
              <div className="timeline">
                {profile.leadership.map((lead, idx) => (
                  <div key={idx} className="timeline-item">
                    <div className="timeline-icon"><FaUsers /></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <h3>{lead.organization}</h3>
                        <span className="timeline-date">{lead.period}</span>
                      </div>
                      <h4 className="timeline-subtitle">{lead.role} &bull; {lead.location}</h4>
                      {lead.bullets && lead.bullets.length > 0 && (
                        <ul className="timeline-bullets">
                          {lead.bullets.map((bullet, bIdx) => (
                            <li key={bIdx}>{bullet}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills & Interests Section */}
          {profile.skills_interests && (
            <section className="about-section">
              <h2>Skills & Interests</h2>
              <div className="skills-interests-grid">
                {profile.skills_interests.technical && (
                  <div className="skills-category-card">
                    <div className="skills-card-header">
                      <FaTools className="skills-card-icon" />
                      <h3>Technical Skills</h3>
                    </div>
                    <p>{profile.skills_interests.technical}</p>
                  </div>
                )}
                {profile.skills_interests.language && (
                  <div className="skills-category-card">
                    <div className="skills-card-header">
                      <FaLaptopCode className="skills-card-icon" />
                      <h3>Languages</h3>
                    </div>
                    <p>{profile.skills_interests.language}</p>
                  </div>
                )}
                {profile.skills_interests.laboratory && (
                  <div className="skills-category-card">
                    <div className="skills-card-header">
                      <FaLaptopCode className="skills-card-icon" />
                      <h3>Laboratory</h3>
                    </div>
                    <p>{profile.skills_interests.laboratory}</p>
                  </div>
                )}
                {profile.skills_interests.interests && (
                  <div className="skills-category-card">
                    <div className="skills-card-header">
                      <FaHeart className="skills-card-icon" />
                      <h3>Interests</h3>
                    </div>
                    <p>{profile.skills_interests.interests}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Connect Section */}
          <section className="about-section">
            <h2>Connect With Me</h2>
            <div className="social-buttons">
              {socialLinks.github && (
                <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-button">
                  <FaGithub /> GitHub
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-button">
                  <FaLinkedin /> LinkedIn
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-button">
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
