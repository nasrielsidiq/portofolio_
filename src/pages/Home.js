import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaLaptop, 
  FaPalette, 
  FaMobileAlt,
  FaServer,
  FaMobile,
  FaBug,
  FaGithub, 
  FaUsers, 
  FaUserFriends, 
  FaFolderOpen, 
  FaStar, 
  FaCodeBranch, 
  FaCalendarAlt, 
  FaArrowRight 
} from 'react-icons/fa';
import { getProfileData, getGitHubProfile, getGitHubRepos } from '../utils/socialUtils';
import { getAllArticles, DEFAULT_THUMBNAIL } from '../utils/articleUtils';
import fotoProfil from '../assets/foto-profil.png';
import './Home.css';

function Home() {
  const profile = getProfileData();
  const githubUsername = process.env.REACT_APP_GITHUB_USERNAME || 'nasrielsidiq';

  const [projects, setProjects] = useState([]);
  const [githubProfile, setGithubProfile] = useState(null);
  const [githubRepos, setGithubRepos] = useState([]);
  const [loadingGitHub, setLoadingGitHub] = useState(true);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const allArticles = await getAllArticles();
        const projectArticles = allArticles.filter(
          (article) => article.metadata.category === 'project'
        );
        setProjects(projectArticles.slice(0, 3));
      } catch (err) {
        console.error('Error fetching project articles:', err);
      }
    };

    const loadGitHub = async () => {
      if (!githubUsername) {
        setLoadingGitHub(false);
        return;
      }
      setLoadingGitHub(true);
      try {
        const profileData = await getGitHubProfile(githubUsername);
        const reposData = await getGitHubRepos(githubUsername, 3);
        setGithubProfile(profileData);
        setGithubRepos(reposData);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
      } finally {
        setLoadingGitHub(false);
      }
    };

    loadProjects();
    loadGitHub();
  }, [githubUsername]);

  return (
    <div className="home">
      {/* ============ HERO SECTION ============ */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            {/* LEFT: Cosmic Avatar with Photo */}
            <div className="hero-image">
              <div className="cosmic-avatar-wrapper">
                {/* Orbit tracks */}
                <div className="cosmic-orbit-track cosmic-orbit-track-1"></div>
                <div className="cosmic-orbit-track cosmic-orbit-track-2"></div>

                {/* Orbiting octa satellites */}
                <img src="/octa1.svg" alt="" className="cosmic-satellite cosmic-satellite-1" />
                <img src="/octa2.svg" alt="" className="cosmic-satellite cosmic-satellite-2" />
                <img src="/octa3.svg" alt="" className="cosmic-satellite cosmic-satellite-3" />

                {/* Cosmic glow aura */}
                <div className="cosmic-glow"></div>

                {/* The actual photo */}
                <div className="cosmic-avatar">
                  <img src={fotoProfil} alt={profile.name} />
                </div>

                {/* Floating particles */}
                <div className="cosmic-particle cosmic-particle-1"></div>
                <div className="cosmic-particle cosmic-particle-2"></div>
                <div className="cosmic-particle cosmic-particle-3"></div>
                <div className="cosmic-particle cosmic-particle-4"></div>
              </div>
            </div>

            {/* RIGHT: Hero Text */}
            <div className="hero-text">
              <h1 className="hero-title">
                Hi, I'm <span className="gradient-text">{profile.name}</span>
              </h1>
              <h2 className="hero-subtitle">{profile.tagline}</h2>
              <p className="hero-bio">{profile.bio}</p>
              <div className="hero-buttons">
                <Link to="/articles" className="btn btn-primary">
                  Read Articles
                </Link>
                <Link to="/social" className="btn btn-secondary">
                  Connect With Me
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon"><FaLaptop /></div>
              <h3>Web Development</h3>
              <p>Building modern and responsive web applications with latest technologies</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaPalette /></div>
              <h3>UI/UX Design</h3>
              <p>Creating beautiful and intuitive user interfaces</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaMobileAlt /></div>
              <h3>Responsive Design</h3>
              <p>Ensuring great experience across all devices</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaServer /></div>
              <h3>Backend Developer</h3>
              <p>Building robust APIs, databases, and server-side logic</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaMobile /></div>
              <h3>Mobile Developer</h3>
              <p>Cross-platform mobile apps with React Native and native tools</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon"><FaBug /></div>
              <h3>QA</h3>
              <p>Ensuring software quality through testing and automation</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ PROJECTS SECTION ============ */}
      <section className="home-projects">
        <div className="container">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <p>Recent projects built from scratch and documented</p>
          </div>

          {projects.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
              No featured projects at the moment.
            </div>
          ) : (
            <div className="projects-grid">
              {projects.map((project) => (
                <div key={project.slug} className="project-card">
                  <div className="project-thumbnail-wrapper">
                    <img 
                      src={project.metadata.thumbnail || DEFAULT_THUMBNAIL}
                      alt={project.metadata.title}
                      className="project-thumbnail"
                      onError={(e) => { e.target.onerror = null; e.target.src = DEFAULT_THUMBNAIL; }}
                    />
                  </div>
                  <div className="project-card-content">
                    <h3 className="project-card-title">{project.metadata.title}</h3>
                    <p className="project-card-excerpt">{project.excerpt}</p>
                    {project.metadata.tags && (
                      <div className="project-card-tags">
                        {project.metadata.tags.split(',').map((tag, idx) => (
                          <span key={idx} className="project-card-tag">{tag.trim()}</span>
                        ))}
                      </div>
                    )}
                    <Link to={`/article/${project.slug}`} className="project-card-link">
                      Learn More <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="view-all-wrapper">
            <Link to="/articles" className="btn btn-secondary">
              View All Articles & Projects
            </Link>
          </div>
        </div>
      </section>

      {/* ============ GITHUB INTEGRATION SECTION ============ */}
      {githubUsername && (
        <section className="github-integration">
          <div className="container">
            <div className="section-header">
              <h2>GitHub Activity & Stats</h2>
              <p>Live tracking of repositories and activity on GitHub</p>
            </div>

            {loadingGitHub ? (
              <div style={{ textAlign: 'center', color: 'var(--text-secondary)' }}>
                Loading GitHub details...
              </div>
            ) : (
              <div className="github-layout">
                {githubProfile && (
                  <div className="github-profile-card">
                    {githubProfile.avatar_url && (
                      <img 
                        src={githubProfile.avatar_url} 
                        alt={githubProfile.name || githubProfile.login}
                        className="github-profile-avatar"
                      />
                    )}
                    <div className="github-profile-details">
                      <h3 className="github-profile-name">
                        {githubProfile.name || githubProfile.login}
                      </h3>
                      {githubProfile.bio && (
                        <p className="github-profile-bio">{githubProfile.bio}</p>
                      )}
                      <div className="github-metrics">
                        <div className="github-metric-item">
                          <FaFolderOpen className="github-metric-icon" />
                          <div className="github-metric-info">
                            <span className="github-metric-value">{githubProfile.public_repos}</span>
                            <span className="github-metric-label">Repositories</span>
                          </div>
                        </div>
                        <div className="github-metric-item">
                          <FaUsers className="github-metric-icon" />
                          <div className="github-metric-info">
                            <span className="github-metric-value">{githubProfile.followers}</span>
                            <span className="github-metric-label">Followers</span>
                          </div>
                        </div>
                        <div className="github-metric-item">
                          <FaUserFriends className="github-metric-icon" />
                          <div className="github-metric-info">
                            <span className="github-metric-value">{githubProfile.following}</span>
                            <span className="github-metric-label">Following</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {githubRepos.length > 0 && (
                  <div className="github-repos-section">
                    <h3 className="github-repos-section-title">
                      <FaGithub className="github-repos-section-icon" /> Featured Repositories
                    </h3>
                    <div className="github-repos-grid">
                      {githubRepos.map((repo) => (
                        <a 
                          key={repo.id}
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="github-repo-card"
                        >
                          <h4 className="github-repo-name">{repo.name}</h4>
                          {repo.description && (
                            <p className="github-repo-description">{repo.description}</p>
                          )}
                          <div className="github-repo-stats">
                            {repo.language && (
                              <span className="github-repo-lang">
                                <span className="github-repo-lang-dot"></span>
                                {repo.language}
                              </span>
                            )}
                            <span className="github-repo-star">
                              <FaStar /> {repo.stargazers_count}
                            </span>
                            <span className="github-repo-fork">
                              <FaCodeBranch /> {repo.forks_count}
                            </span>
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <div className="github-calendar-card">
                  <h3 className="github-calendar-title">
                    <FaCalendarAlt className="github-calendar-title-icon" /> 1 Year Contribution Calendar
                  </h3>
                  <div className="github-calendar-wrapper">
                    <img 
                      src={`https://ghchart.rshah.org/0098ff/${githubUsername}`}
                      alt={`${githubUsername}'s GitHub contributions`}
                      className="github-calendar-img"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}

export default Home;
