# About Page + Resume Modal Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Update the "Who I Am" section on the About page with structured content. Add a "Resume" button in the navbar that opens a modal showing a markdown preview of the resume, with a download PDF button inside.

**Architecture:** 
- `etc/resume-data.json` — single source of truth for all resume/profile data
- Script `scripts/generate-resume.js` reads JSON → generates `resume.md` → converts to PDF via `md-to-pdf`
- npm scripts `resume:generate` + `resume:pdf` wired into `npm run build` so PDF regenerates each build
- About.js reads data from resume-data.json (via socialUtils.js)
- ResumeModal component: shows markdown preview (fetched from `public/resume.md`) + download PDF button
- Header.js: "Resume" nav-link opens modal (not direct download)

**Tech Stack:** React 19, react-icons/fa, md-to-pdf (npm package), react-markdown (already installed)

---

### Task 1: Create resume-data.json

**Objective:** Single JSON file containing all resume data for both the About page and PDF generation.

**Files:**
- Create: `etc/resume-data.json`

**Step 1: Create JSON**

```json
{
  "name": "Mucaa",
  "tagline": "Web Developer",
  "bio": "Passionate about creating amazing web experiences. Focused on building modern, responsive applications with clean architecture.",
  "email": "mucaa@example.com",
  "location": "Indonesia",
  "education": "Computer Science",
  "role": "Full Stack Developer",
  "interests": "Web Technologies, Open Source, UI/UX Design",
  "experience": [
    {
      "organization": "Company Name",
      "position": "Web Developer",
      "location": "Remote",
      "period": "2023 - Present",
      "highlights": [
        "Developed and maintained React-based web applications",
        "Collaborated with cross-functional teams to deliver features",
        "Optimized application performance and accessibility"
      ]
    }
  ],
  "skills": {
    "frontend": ["React", "JavaScript", "TypeScript", "HTML/CSS", "Tailwind CSS"],
    "backend": ["Node.js", "Express", "Python", "REST API"],
    "tools": ["Git", "Docker", "MongoDB", "PostgreSQL"]
  },
  "social": {
    "github": "nasrielsidiq",
    "linkedin": "",
    "instagram": ""
  }
}
```

---

### Task 2: Install md-to-pdf

**Objective:** Install `md-to-pdf` as a dev dependency for converting markdown resumes to PDF.

**Step 1: Install**

Run: `cd /home/muca/Neng\ Ai/mucaa-portfolio && npm install --save-dev md-to-pdf`

---

### Task 3: Create generate-resume.js script

**Objective:** Script that reads `etc/resume-data.json`, generates a formatted resume.md file (to `public/`), then converts it to PDF.

**Files:**
- Create: `scripts/generate-resume.js`

**Step 1: Create script**

```javascript
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DATA_FILE = path.join(__dirname, '..', 'etc', 'resume-data.json');
const MD_FILE = path.join(__dirname, '..', 'public', 'resume.md');
const PDF_FILE = path.join(__dirname, '..', 'public', 'resume.pdf');

// Read data
let data;
try {
  data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
} catch (e) {
  console.error('❌ Error reading etc/resume-data.json:', e.message);
  process.exit(1);
}

// Generate Markdown
const md = generateResumeMarkdown(data);
fs.writeFileSync(MD_FILE, md, 'utf-8');
console.log('✓ resume.md generated');

// Convert to PDF via md-to-pdf
try {
  execSync(`npx md-to-pdf "${MD_FILE}" --output "${PDF_FILE}"`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
  });
  console.log('✓ resume.pdf generated');
} catch (e) {
  console.error('❌ md-to-pdf conversion failed:', e.stderr?.toString() || e.message);
  console.log('  (resume.md still available for preview)');
  process.exit(1);
}

function generateResumeMarkdown(data) {
  let md = `# ${data.name}\n\n`;
  if (data.tagline) md += `> ${data.tagline}\n\n`;
  if (data.email) md += `<${data.email}>  \n`;
  if (data.location) md += `${data.location}\n\n`;

  md += `---\n\n`;

  // Bio / Who I Am
  md += `## Who I Am\n\n${data.bio}\n\n`;

  // Experience
  if (data.experience && data.experience.length > 0) {
    md += `## Experience\n\n`;
    data.experience.forEach(exp => {
      md += `### ${exp.position} @ ${exp.organization}\n`;
      md += `*${exp.location} — ${exp.period}*\n\n`;
      exp.highlights.forEach(h => {
        md += `- ${h}\n`;
      });
      md += `\n`;
    });
  }

  // Education
  if (data.education) {
    md += `## Education\n\n${data.education}\n\n`;
  }

  // Skills
  if (data.skills) {
    md += `## Skills\n\n`;
    for (const [category, items] of Object.entries(data.skills)) {
      if (items && items.length > 0) {
        md += `**${category.charAt(0).toUpperCase() + category.slice(1)}:** ${items.join(', ')}\n\n`;
      }
    }
  }

  // Role / Interests
  if (data.role) md += `**Current Role:** ${data.role}\n\n`;
  if (data.interests) md += `**Interests:** ${data.interests}\n\n`;

  return md;
}
```

---

### Task 4: Wire npm scripts

**Objective:** Add `resume:generate` script and integrate into build.

**Files:**
- Modify: `package.json`

**Step 1: Update scripts**

```json
"scripts": {
  "start": "node scripts/generate-article-index.js && node scripts/generate-resume.js && react-scripts start",
  "build": "node scripts/generate-article-index.js && node scripts/generate-resume.js && react-scripts build",
  "articles:index": "node scripts/generate-article-index.js",
  "resume:generate": "node scripts/generate-resume.js",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

---

### Task 5: Create ResumeModal component

**Objective:** Modal component that fetches `resume.md`, renders it with react-markdown, and shows a download PDF button.

**Files:**
- Create: `src/components/ResumeModal.js`
- Create: `src/components/ResumeModal.css`

**Step 1: Create ResumeModal.js**

```jsx
import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { FaDownload, FaTimes, FaSpinner } from 'react-icons/fa';
import './ResumeModal.css';

function ResumeModal({ isOpen, onClose }) {
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const loadResume = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await fetch('/resume.md');
        if (!res.ok) throw new Error('Not found');
        const text = await res.text();
        setContent(text);
      } catch (e) {
        setError(true);
        setContent('Resume not available. Please generate it first with `npm run resume:generate`.');
      }
      setLoading(false);
    };

    loadResume();
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal" onClick={e => e.stopPropagation()}>
        <div className="resume-modal-header">
          <h2>Resume</h2>
          <div className="resume-modal-actions">
            <a href="/resume.pdf" download className="resume-download-btn">
              <FaDownload /> Download PDF
            </a>
            <button className="resume-close-btn" onClick={onClose}>
              <FaTimes />
            </button>
          </div>
        </div>
        <div className="resume-modal-body">
          {loading ? (
            <div className="resume-loading">
              <FaSpinner className="spin-icon" />
              <p>Loading resume...</p>
            </div>
          ) : error ? (
            <div className="resume-error">
              <p>{content}</p>
            </div>
          ) : (
            <div className="resume-content">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ResumeModal;
```

**Step 2: Create ResumeModal.css**

```css
.resume-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 0.2s ease-out;
}

.resume-modal {
  background: var(--card-bg, #1a1f35);
  border: 2px solid var(--card-border, #2a2f45);
  border-radius: 1rem;
  width: 90%;
  max-width: 800px;
  max-height: 85vh;
  display: flex;
  flex-direction: column;
  animation: slideUp 0.3s ease-out;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
}

.resume-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 1.5rem;
  border-bottom: 2px solid var(--card-border, #2a2f45);
  flex-shrink: 0;
}

.resume-modal-header h2 {
  margin: 0;
  font-size: 1.5rem;
  background: linear-gradient(135deg, var(--blue-light), var(--blue-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.resume-modal-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.resume-download-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--blue-medium), var(--blue-dark));
  color: white;
  text-decoration: none;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.resume-download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--primary-glow);
  border-color: var(--blue-light);
}

.resume-close-btn {
  background: none;
  border: 2px solid var(--card-border, #2a2f45);
  color: var(--text-secondary, #94a3b8);
  width: 36px;
  height: 36px;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.resume-close-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-primary);
  border-color: var(--primary);
}

.resume-modal-body {
  padding: 1.5rem;
  overflow-y: auto;
  flex: 1;
}

.resume-content h1,
.resume-content h2,
.resume-content h3 {
  color: var(--text-primary, #f1f5f9);
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.resume-content h1 {
  font-size: 1.75rem;
  border-bottom: 2px solid var(--card-border, #2a2f45);
  padding-bottom: 0.5rem;
}

.resume-content h2 {
  font-size: 1.35rem;
}

.resume-content h3 {
  font-size: 1.1rem;
  color: var(--blue-light, #60a5fa);
}

.resume-content p {
  color: var(--text-secondary, #94a3b8);
  line-height: 1.7;
  margin-bottom: 0.75rem;
}

.resume-content ul {
  color: var(--text-secondary, #94a3b8);
  padding-left: 1.5rem;
  margin-bottom: 0.75rem;
}

.resume-content li {
  margin-bottom: 0.35rem;
  line-height: 1.6;
}

.resume-content strong {
  color: var(--text-primary, #f1f5f9);
}

.resume-content blockquote {
  border-left: 3px solid var(--primary, #6366f1);
  padding-left: 1rem;
  color: var(--text-secondary, #94a3b8);
  font-style: italic;
  margin: 0.75rem 0;
}

.resume-content hr {
  border: none;
  height: 1px;
  background: var(--card-border, #2a2f45);
  margin: 1.5rem 0;
}

.resume-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 3rem;
  color: var(--text-secondary, #94a3b8);
}

.spin-icon {
  animation: spin 1s linear infinite;
  font-size: 2rem;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.resume-error {
  text-align: center;
  padding: 3rem;
  color: var(--text-secondary, #94a3b8);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

---

### Task 6: Update Header with "Resume" button

**Objective:** Replace the direct download link with a button that opens the ResumeModal.

**Files:**
- Modify: `src/components/Header.js`
- Modify: `src/components/Header.css`

**Step 1: Update Header.js**

```jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaFileAlt } from 'react-icons/fa';
import ResumeModal from './ResumeModal';
import './Header.css';

function Header() {
  const siteName = process.env.REACT_APP_NAME || 'Mucaa';
  const [resumeOpen, setResumeOpen] = useState(false);

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
            <button 
              className="nav-link resume-btn"
              onClick={() => setResumeOpen(true)}
            >
              <FaFileAlt /> Resume
            </button>
          </nav>
        </div>
      </div>

      <ResumeModal 
        isOpen={resumeOpen} 
        onClose={() => setResumeOpen(false)} 
      />
    </header>
  );
}

export default Header;
```

**Step 2: Add resume button CSS to Header.css**

Replace any existing `.download-resume` with:

```css
.resume-btn {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: linear-gradient(135deg, var(--blue-medium), var(--blue-dark));
  color: white !important;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  cursor: pointer;
  font-family: inherit;
  font-size: 1rem;
}

.resume-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px var(--primary-glow);
  border-color: var(--blue-light);
  text-decoration: none !important;
}
```

---

### Task 7: Update About.js "Who I Am" section

**Objective:** Expand "Who I Am" section with info cards (Education, Role, Interests). Import data from etc/resume-data.json via socialUtils.js.

**Files:**
- Modify: `src/pages/About.js`
- Modify: `src/pages/About.css`
- Modify: `src/utils/socialUtils.js`

**Step 1: Update socialUtils.js to import resume data**

```js
import resumeData from '../../etc/resume-data.json';

// ... existing code ...

export const getProfileData = () => {
  return {
    name: resumeData.name || process.env.REACT_APP_NAME || 'Mucaa',
    tagline: resumeData.tagline || process.env.REACT_APP_TAGLINE || 'Web Developer',
    bio: resumeData.bio || process.env.REACT_APP_BIO || 'Passionate about creating amazing web experiences',
    email: resumeData.email || process.env.REACT_APP_EMAIL || '',
    location: resumeData.location || process.env.REACT_APP_LOCATION || '',
    education: resumeData.education || '',
    role: resumeData.role || '',
    interests: resumeData.interests || '',
  };
};
```

**Step 2: Update About.js — expand "Who I Am" section**

Replace existing "Who I Am" section. Update import:

```jsx
import { FaLaptopCode, FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaInstagram, FaGraduationCap, FaHeart } from 'react-icons/fa';
```

Replace the section:

```jsx
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
```

**Step 3: Add info-cards CSS to About.css**

Append:

```css
.about-info-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.info-card {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 0.75rem;
  border: 1px solid var(--card-border);
  transition: all 0.3s ease;
}

.info-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: var(--primary);
}

.info-card-icon {
  font-size: 1.5rem;
  color: var(--primary);
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.info-card-content h4 {
  color: var(--text-primary);
  font-size: 0.9rem;
  margin-bottom: 0.25rem;
}

.info-card-content p {
  color: var(--text-secondary);
  font-size: 0.85rem;
  margin: 0;
  line-height: 1.5;
}
```

---

### Task 8: Verify full build

**Objective:** Run full build and confirm everything compiles.

**Step 1: Generate resume files manually first**

Run: `cd /home/muca/Neng\ Ai/mucaa-portfolio && mkdir -p etc && node scripts/generate-resume.js`
Expected:
```
✓ resume.md generated
✓ resume.pdf generated
```

**Step 2: Full build**

Run: `cd /home/muca/Neng\ Ai/mucaa-portfolio && npm run build 2>&1 | tail -15`
Expected: Compiled successfully

**Step 3: Verify generated files**

Run: `ls -la /home/muca/Neng\ Ai/mucaa-portfolio/public/resume.*`
Expected: Both resume.md and resume.pdf exist

---

## Files Created/Modified

| File | Action |
|------|--------|
| `etc/resume-data.json` | Create — single source of truth |
| `scripts/generate-resume.js` | Create — auto-generate resume.md + resume.pdf |
| `src/components/ResumeModal.js` | Create — modal with markdown preview |
| `src/components/ResumeModal.css` | Create — modal styling |
| `package.json` | Modify — add resume scripts + build hook |
| `src/components/Header.js` | Modify — Resume button opens modal |
| `src/components/Header.css` | Modify — resume button styles |
| `src/pages/About.js` | Modify — expand Who I Am section |
| `src/pages/About.css` | Modify — add info-cards styles |
| `src/utils/socialUtils.js` | Modify — use resume-data.json |

## Flow

```
etc/resume-data.json  ──→  About.js (via socialUtils.js)
         │
         └──→  scripts/generate-resume.js
                    ├── public/resume.md  ──→  ResumeModal preview (react-markdown)
                    └── public/resume.pdf ──→  PDF download button in modal
```

## To Update

Edit `etc/resume-data.json` → `npm run resume:generate` → both markdown preview and PDF auto-regenerate.
