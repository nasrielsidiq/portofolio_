#!/usr/bin/env node
/**
 * Generate resume.md and resume.pdf from etc/resume-data.json
 * Uses md-to-pdf for PDF conversion
 * Styled to mimic Harvard/MCS resume template layout (Calibri font, custom dimensions)
 */
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const DATA_FILE = path.join(__dirname, '..', 'etc', 'resume-data.json');
const PUBLIC_DATA = path.join(__dirname, '..', 'public', 'resume-data.json');
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

// Copy data JSON to public/ for runtime fetch
fs.copyFileSync(DATA_FILE, PUBLIC_DATA);
console.log('✓ resume-data.json copied to public/');

// Generate Markdown with inline HTML/CSS for PDF rendering
const md = generateMCSResumeMarkdown(data);
fs.writeFileSync(MD_FILE, md, 'utf-8');
console.log('✓ resume.md generated');

// Convert to PDF via md-to-pdf (non-fatal on CI/Vercel where Puppeteer may lack system libs)
try {
  execSync(`npx md-to-pdf "${MD_FILE}"`, {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe',
  });
  console.log('✓ resume.pdf generated');
} catch (e) {
  console.warn('⚠️  md-to-pdf conversion skipped (missing system libs in CI). Generating resume.html fallback instead.');
  // Write a self-contained HTML version that can be saved as PDF from browser
  const htmlFile = path.join(__dirname, '..', 'public', 'resume.html');
  fs.writeFileSync(htmlFile, md, 'utf-8');
  console.log('✓ resume.html generated (open in browser to save as PDF)');
}

function generateMCSResumeMarkdown(data) {
  const p = data.personal || {};
  
  // Custom Styles replicating SalinandariMCSResumeTemplate_BulletPoints_.html
  let styles = `---
pdf_options:
  format: a4
  margin: 0.65in
  displayHeaderFooter: false
---

<style>
  body {
    font-family: 'Calibri', 'Candara', 'Segoe UI', Arial, sans-serif;
    font-size: 11pt;
    line-height: 1.15;
    color: #000000;
    margin: 0;
    padding: 0;
    background-color: #ffffff;
  }
  
  /* Header styling */
  .header {
    text-align: center;
    margin-bottom: 6px;
  }
  
  .name {
    font-size: 11pt;
    font-weight: bold;
    color: #000000;
    text-transform: none; /* In the reference HTML, name is TitleCase, not uppercase */
  }
  
  .contact-info {
    font-size: 11pt;
    color: #000000;
    margin-top: 4px;
    margin-bottom: 6px;
  }
  
  .contact-info a {
    color: inherit;
    text-decoration: none;
  }

  /* Divider line under header - replicates image1.png border */
  .header-divider {
    border-top: 1.33px solid #000000;
    width: 100%;
    margin: 4px 0 10px 0;
  }
  
  /* Section headers - Centered, bold, same size 11pt */
  h1 {
    font-size: 11pt;
    font-weight: bold;
    text-align: center;
    margin-top: 14px;
    margin-bottom: 8px;
    color: #000000;
    text-transform: none; /* Reference is TitleCase */
  }
  
  /* Row alignment */
  .flex-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1px;
    font-size: 11pt;
  }
  
  .left-bold {
    font-weight: bold;
  }
  
  .right-normal {
    text-align: right;
    font-weight: normal;
  }
  
  .left-italic-detail {
    font-style: italic;
  }
  
  .right-italic-detail {
    font-style: italic;
    text-align: right;
  }
  
  .thesis-detail {
    font-style: italic;
    margin-left: 9pt;
    margin-top: 2px;
    margin-bottom: 2px;
    font-size: 11pt;
  }

  .coursework-detail {
    margin-left: 9pt;
    margin-top: 2px;
    margin-bottom: 4px;
    font-size: 11pt;
  }
  
  /* Bullets styling */
  .bullets {
    margin-top: 2px;
    margin-bottom: 8px;
    padding-left: 42pt; /* Replicates c34 margin-left: 42pt */
  }
  
  .bullets li {
    margin-bottom: 3px;
    list-style-type: disc;
    font-size: 11pt;
    line-height: 1.05;
  }
  
  /* Skills & Interests styling */
  .skills-interests-section {
    margin-top: 6px;
  }
  
  .skills-interests-section p {
    margin: 4px 0 4px 9pt; /* 9pt left margin to match reference */
    font-size: 11pt;
    line-height: 1.1;
  }
  
  .skills-interests-section strong {
    font-weight: bold;
  }
</style>

`;

  // 1. Header (Centered Name & Contact)
  const contactParts = [];
  if (p.address) contactParts.push(p.address);
  if (p.city_state_zip) contactParts.push(p.city_state_zip);
  if (p.email) {
    contactParts.push(`<a href="mailto:${p.email}">${p.email}</a>`);
  }
  if (p.phone) contactParts.push(p.phone);

  let content = `<div class="header">
  <div class="name">${p.name || 'FirstName LastName'}</div>
  <div class="contact-info">
    ${contactParts.join(' &bull; ')}
  </div>
  <div class="header-divider"></div>
</div>

`;

  // 2. Education
  if (data.education && data.education.length > 0) {
    content += `<h1>Education</h1>\n`;
    data.education.forEach(edu => {
      // Replicate Education layout: left-bold for school, right-normal for location
      content += `<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-bold">${edu.institution}</span>
  <span class="right-normal">${edu.location || ''}</span>
</div>\n`;
      
      // Replicate Degree & Graduation date layout: left-italic-detail, right-italic-detail
      content += `<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-italic-detail">${edu.degree}${edu.gpa ? `, ${edu.gpa}` : ''}</span>
  <span class="right-italic-detail">${edu.graduation_date}</span>
</div>\n`;
      
      if (edu.thesis) {
        content += `<div class="thesis-detail">Thesis: ${edu.thesis}</div>\n`;
      }
      if (edu.coursework) {
        content += `<div class="coursework-detail">${edu.coursework}</div>\n`;
      }
    });
  }

  // 3. Experience
  if (data.experience && data.experience.length > 0) {
    content += `<h1>Experience</h1>\n`;
    data.experience.forEach(exp => {
      // Replicate Experience layout: left-bold for company, right-normal for location
      content += `<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-bold">${exp.organization}</span>
  <span class="right-normal">${exp.location || ''}</span>
</div>\n`;
      
      // Replicate Position & Period layout
      content += `<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-italic-detail">${exp.position}</span>
  <span class="right-italic-detail">${exp.period}</span>
</div>\n`;
      
      if (exp.bullets && exp.bullets.length > 0) {
        content += `<ul class="bullets">\n`;
        exp.bullets.forEach(b => {
          content += `  <li>${b}</li>\n`;
        });
        content += `</ul>\n`;
      }
    });
  }

  // 4. Leadership & Activities
  if (data.leadership && data.leadership.length > 0) {
    content += `<h1>Leadership & Activities</h1>\n`;
    data.leadership.forEach(lead => {
      // Replicate Leadership layout
      content += `<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-bold">${lead.organization}</span>
  <span class="right-normal">${lead.location || ''}</span>
</div>\n`;
      
      // Replicate Role & Period layout
      content += `<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-italic-detail">${lead.role}</span>
  <span class="right-italic-detail">${lead.period}</span>
</div>\n`;
      
      if (lead.bullets && lead.bullets.length > 0) {
        content += `<ul class="bullets">\n`;
        lead.bullets.forEach(b => {
          content += `  <li>${b}</li>\n`;
        });
        content += `</ul>\n`;
      }
    });
  }

  // 5. Skills & Interests
  if (data.skills_interests) {
    content += `<h1>Skills & Interests</h1>\n`;
    content += `<div class="skills-interests-section">\n`;
    const si = data.skills_interests;
    if (si.technical) content += `  <p><strong>Technical:</strong> ${si.technical}</p>\n`;
    if (si.language) content += `  <p><strong>Language:</strong> ${si.language}</p>\n`;
    if (si.laboratory) content += `  <p><strong>Laboratory:</strong> ${si.laboratory}</p>\n`;
    if (si.interests) content += `  <p><strong>Interests:</strong> ${si.interests}</p>\n`;
    content += `</div>\n`;
  }

  return styles + content;
}
