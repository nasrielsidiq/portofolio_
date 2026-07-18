#!/usr/bin/env node
/**
 * Generate resume.md and resume.pdf from etc/resume-data.json
 * Uses md-to-pdf for PDF conversion
 * Run: node scripts/generate-resume.js
 *   or: npm run resume:generate
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

// Generate Markdown
const md = generateResumeMarkdown(data);
fs.writeFileSync(MD_FILE, md, 'utf-8');
console.log('✓ resume.md generated');

// Convert to PDF via md-to-pdf
// md-to-pdf auto-outputs to same dir with .pdf extension (public/resume.pdf)
try {
  execSync(`npx md-to-pdf "${MD_FILE}"`, {
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
  if (data.email) md += `📧 ${data.email}  \n`;
  if (data.location) md += `📍 ${data.location}\n\n`;

  md += `---\n\n`;

  // Bio / Who I Am
  if (data.bio) {
    md += `## Who I Am\n\n${data.bio}\n\n`;
  }

  // Experience
  if (data.experience && data.experience.length > 0) {
    md += `## Experience\n\n`;
    data.experience.forEach(exp => {
      md += `### ${exp.position} — ${exp.organization}\n`;
      md += `*${exp.location} | ${exp.period}*\n\n`;
      if (exp.highlights && exp.highlights.length > 0) {
        exp.highlights.forEach(h => {
          md += `- ${h}\n`;
        });
        md += `\n`;
      }
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
        const label = category.charAt(0).toUpperCase() + category.slice(1);
        md += `**${label}:** ${items.join(', ')}\n\n`;
      }
    }
  }

  // Role / Interests
  if (data.role) md += `**Current Role:** ${data.role}\n\n`;
  if (data.interests) md += `**Interests:** ${data.interests}\n\n`;

  return md;
}
