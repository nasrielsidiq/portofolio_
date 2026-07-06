import React, { useState, useEffect } from 'react';
import { 
  FaGithub, 
  FaLinkedin, 
  FaInstagram, 
  FaStar, 
  FaCodeBranch, 
  FaBookmark, 
  FaSearch
} from 'react-icons/fa';
import { 
  getGitHubProfile, 
  getGitHubRepos, 
  getGitHubActivity,
  formatGitHubEvent,
  getSocialMediaLinks
} from '../utils/socialUtils';
import './Social.css';

function Social() {
  const [githubProfile, setGithubProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [activity, setActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const socialLinks = getSocialMediaLinks();
  const githubUsername = process.env.REACT_APP_GITHUB_USERNAME || 'nasrielsidiq';

  useEffect(() => {
    const loadGitHubData = async () => {
      if (!githubUsername) {
        setLoading(false);
        return;
      }

      setLoading(true);
      
      const profileData = await getGitHubProfile(githubUsername);
      const reposData = await getGitHubRepos(githubUsername, 6);
      const activityData = await getGitHubActivity(githubUsername, 10);
      
      setGithubProfile(profileData);
      setRepos(reposData);
      setActivity(activityData);
      setLoading(false);
    };

    loadGitHubData();
  }, [githubUsername]);

  return (
    <div className="social">
      <div className="container">
        <div className="social-header">
          <h1>Social & Projects</h1>
          <p>Connect with me and see what I'm working on</p>
        </div>

        <div className="social-links-section">
          <h2>Connect With Me</h2>
          <div className="social-links-grid">
            {socialLinks.github && (
              <a 
                href={socialLinks.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-card"
              >
                <div className="social-icon"><FaGithub /></div>
                <div className="social-name">GitHub</div>
                <div className="social-handle">@{githubUsername}</div>
              </a>
            )}
            {socialLinks.linkedin && (
              <a 
                href={socialLinks.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-card"
              >
                <div className="social-icon"><FaLinkedin /></div>
                <div className="social-name">LinkedIn</div>
                <div className="social-handle">@{process.env.REACT_APP_LINKEDIN_USERNAME}</div>
              </a>
            )}
            {socialLinks.instagram && (
              <a 
                href={socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-card"
              >
                <div className="social-icon"><FaInstagram /></div>
                <div className="social-name">Instagram</div>
                <div className="social-handle">@{process.env.REACT_APP_INSTAGRAM_USERNAME}</div>
              </a>
            )}
          </div>
        </div>

        {githubUsername && (
          <>
            {loading ? (
              <div className="loading">Loading GitHub data...</div>
            ) : githubProfile ? (
              <>
                <div className="github-profile-section">
                  <h2>GitHub Profile</h2>
                  <div className="github-profile">
                    {githubProfile.avatar_url && (
                      <img 
                        src={githubProfile.avatar_url} 
                        alt={githubProfile.name}
                        className="github-avatar"
                      />
                    )}
                    <div className="github-info">
                      <h3>{githubProfile.name || githubProfile.login}</h3>
                      {githubProfile.bio && <p className="github-bio">{githubProfile.bio}</p>}
                      <div className="github-stats">
                        <div className="stat">
                          <span className="stat-value">{githubProfile.public_repos}</span>
                          <span className="stat-label">Repositories</span>
                        </div>
                        <div className="stat">
                          <span className="stat-value">{githubProfile.followers}</span>
                          <span className="stat-label">Followers</span>
                        </div>
                        <div className="stat">
                          <span className="stat-value">{githubProfile.following}</span>
                          <span className="stat-label">Following</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {repos.length > 0 && (
                  <div className="repos-section">
                    <h2>Recent Projects</h2>
                    <div className="repos-grid">
                      {repos.map((repo) => (
                        <a 
                          key={repo.id}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="repo-card"
                        >
                          <h3 className="repo-name">{repo.name}</h3>
                          {repo.description && (
                            <p className="repo-description">{repo.description}</p>
                          )}
                          <div className="repo-meta">
                            {repo.language && (
                              <span className="repo-language">
                                <span className="language-dot"></span>
                                {repo.language}
                              </span>
                            )}
                            <span className="repo-stars"><FaStar /> {repo.stargazers_count}</span>
                            <span className="repo-forks"><FaCodeBranch /> {repo.forks_count}</span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {activity.length > 0 && (
                  <div className="activity-section">
                    <h2>Recent Activity</h2>
                    <div className="activity-list">
                      {activity.map((event, index) => {
                        const formattedEvent = formatGitHubEvent(event);
                        return (
                          <a 
                            key={event.id || index}
                            href={formattedEvent.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="activity-item"
                          >
                            <div className="activity-icon"><FaBookmark /></div>
                            <div className="activity-content">
                              <p className="activity-action">{formattedEvent.action}</p>
                              <span className="activity-date">
                                {formattedEvent.date.toLocaleDateString('id-ID', {
                                  year: 'numeric',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="no-data">
                <div className="no-data-icon"><FaSearch /></div>
                <p>GitHub data not available</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Social;
