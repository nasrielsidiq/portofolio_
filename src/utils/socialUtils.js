import axios from 'axios';

// GitHub API - ambil repositories dan aktivitas
export const getGitHubProfile = async (username) => {
  try {
    const response = await axios.get(`https://api.github.com/users/${username}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub profile:', error);
    return null;
  }
};

export const getGitHubRepos = async (username, limit = 6) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub repos:', error);
    return [];
  }
};

export const getGitHubActivity = async (username, limit = 10) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/events/public?per_page=${limit}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching GitHub activity:', error);
    return [];
  }
};

// Social Media Links
export const getSocialMediaLinks = () => {
  const github = process.env.REACT_APP_GITHUB_USERNAME;
  const linkedin = process.env.REACT_APP_LINKEDIN_USERNAME;
  const instagram = process.env.REACT_APP_INSTAGRAM_USERNAME;

  return {
    github: github ? `https://github.com/${github}` : null,
    linkedin: linkedin ? `https://linkedin.com/in/${linkedin}` : null,
    instagram: instagram ? `https://instagram.com/${instagram}` : null,
  };
};

// Format GitHub event untuk display
export const formatGitHubEvent = (event) => {
  const type = event.type;
  const repo = event.repo.name;
  const date = new Date(event.created_at);

  let action = '';
  switch (type) {
    case 'PushEvent':
      const commits = event.payload.commits?.length || 0;
      action = `Pushed ${commits} commit${commits > 1 ? 's' : ''} to ${repo}`;
      break;
    case 'CreateEvent':
      action = `Created ${event.payload.ref_type} in ${repo}`;
      break;
    case 'WatchEvent':
      action = `Starred ${repo}`;
      break;
    case 'ForkEvent':
      action = `Forked ${repo}`;
      break;
    case 'IssuesEvent':
      action = `${event.payload.action} an issue in ${repo}`;
      break;
    case 'PullRequestEvent':
      action = `${event.payload.action} a pull request in ${repo}`;
      break;
    default:
      action = `${type.replace('Event', '')} in ${repo}`;
  }

  return {
    action,
    date,
    type,
    url: `https://github.com/${repo}`
  };
};

// Profile data dari .env
export const getProfileData = () => {
  return {
    name: process.env.REACT_APP_NAME || 'Mucaa',
    tagline: process.env.REACT_APP_TAGLINE || 'Web Developer',
    bio: process.env.REACT_APP_BIO || 'Passionate about creating amazing web experiences',
    email: process.env.REACT_APP_EMAIL || '',
    location: process.env.REACT_APP_LOCATION || '',
  };
};

// Theme colors dari .env
export const getThemeColors = () => {
  return {
    primary: process.env.REACT_APP_PRIMARY_COLOR || '#6366f1',
    secondary: process.env.REACT_APP_SECONDARY_COLOR || '#8b5cf6',
    background: process.env.REACT_APP_BACKGROUND_COLOR || '#0f172a',
    text: process.env.REACT_APP_TEXT_COLOR || '#f1f5f9',
  };
};
