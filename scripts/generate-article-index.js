#!/usr/bin/env node
/**
 * Generate articleIndex.json dari semua file .md di folder public/artikle/
 * Jalankan: node scripts/generate-article-index.js
 * Atau: npm run articles:index
 */
const fs = require('fs');
const path = require('path');

const artikleDir = path.join(__dirname, '..', 'public', 'artikle');
const indexPath = path.join(artikleDir, 'articleIndex.json');

const files = fs.readdirSync(artikleDir)
  .filter(f => f.endsWith('.md'))
  .sort();

fs.writeFileSync(indexPath, JSON.stringify(files, null, 2) + '\n');
console.log(`✓ articleIndex.json updated — ${files.length} articles:`);
files.forEach(f => console.log(`  - ${f}`));
