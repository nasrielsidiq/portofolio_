---
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

<div class="header">
  <div class="name">Mucaa</div>
  <div class="contact-info">
    Home or Campus Street Address &bull; Indonesia &bull; <a href="mailto:youremail@college.harvard.edu">youremail@college.harvard.edu</a> &bull; phone number
  </div>
  <div class="header-divider"></div>
</div>

<h1>Education</h1>
<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-bold">Harvard University</span>
  <span class="right-normal">Cambridge, MA</span>
</div>
<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-italic-detail">Degree, Concentration, GPA [Note: GPA is Optional]</span>
  <span class="right-italic-detail">Graduation Date</span>
</div>
<div class="thesis-detail">Thesis: Thesis [Note: Optional]</div>
<div class="coursework-detail">Relevant Coursework: [Note: Optional. Awards and honors can also be listed here.]</div>
<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-bold">Study Abroad [Note: If Applicable]</span>
  <span class="right-normal">City, Country</span>
</div>
<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-italic-detail">Study abroad coursework</span>
  <span class="right-italic-detail">Month Year – Month Year</span>
</div>
<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-bold">High School Name</span>
  <span class="right-normal">City, State</span>
</div>
<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-italic-detail">[Note: May include GPA, SAT/ACT scores, or academic honors an employer may want to know]</span>
  <span class="right-italic-detail">Graduation Date</span>
</div>
<h1>Experience</h1>
<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-bold">Company Name</span>
  <span class="right-normal">Remote</span>
</div>
<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-italic-detail">Web Developer</span>
  <span class="right-italic-detail">2023 - Present</span>
</div>
<ul class="bullets">
  <li>Developed and maintained React-based web applications.</li>
  <li>Collaborated with cross-functional teams to deliver high-quality features.</li>
  <li>Optimized application performance and accessibility for improved user experience.</li>
</ul>
<h1>Leadership & Activities</h1>
<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-bold">Organization</span>
  <span class="right-normal">City, State</span>
</div>
<div class="flex-row" style="margin-left: 9pt;">
  <span class="left-italic-detail">Role</span>
  <span class="right-italic-detail">Month Year – Month Year</span>
</div>
<ul class="bullets">
  <li>Describe your leadership, activities, or achievements in bullet form.</li>
  <li>Begin each line with an action verb and quantify outcomes where possible.</li>
</ul>
<h1>Skills & Interests</h1>
<div class="skills-interests-section">
  <p><strong>Technical:</strong> React, JavaScript, TypeScript, HTML/CSS, Tailwind CSS, Node.js, Express, Python, REST API, Git, Docker, MongoDB, PostgreSQL</p>
  <p><strong>Language:</strong> Indonesian (Native), English (Conversational)</p>
  <p><strong>Interests:</strong> Web Technologies, Open Source, UI/UX Design</p>
</div>
