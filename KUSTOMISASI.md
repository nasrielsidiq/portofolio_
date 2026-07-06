# Panduan Kustomisasi Mucaa Portfolio

## Cara Mengubah Informasi Pribadi

Edit file `.env.local` dan ubah nilai-nilai berikut:

```env
REACT_APP_NAME=Nama Anda
REACT_APP_TAGLINE=Posisi/Jabatan Anda
REACT_APP_BIO=Deskripsi tentang Anda
REACT_APP_EMAIL=email@anda.com
REACT_APP_LOCATION=Kota, Negara
```

Setelah mengubah, refresh browser untuk melihat perubahan.

## Cara Mengganti Warna Tema

Edit nilai warna di `.env.local`:

```env
REACT_APP_PRIMARY_COLOR=#6366f1    # Warna utama (tombol, link, dll)
REACT_APP_SECONDARY_COLOR=#8b5cf6  # Warna sekunder (gradient)
REACT_APP_BACKGROUND_COLOR=#0f172a # Warna background
REACT_APP_TEXT_COLOR=#f1f5f9       # Warna teks
```

Gunakan hex color code. Tools untuk memilih warna:
- https://coolors.co/
- https://colorhunt.co/

## Cara Menambahkan Artikel Baru

### Step 1: Buat file Markdown

Buat file baru di `public/artikle/nama-artikel.md`:

```markdown
---
title: Judul Artikel
date: 2026-07-02
author: Nama Anda
tags: tag1, tag2, tag3
thumbnail: https://unsplash.com/photos/xxxxx?w=800
---

# Judul Artikel

Konten artikel Anda menggunakan Markdown...

## Sub Judul

- List item 1
- List item 2

### Sub Sub Judul

Paragraf dengan **bold** dan *italic*.
```

### Step 2: Daftarkan artikel

Edit file `src/utils/articleUtils.js`, cari bagian `articleFiles` dan tambahkan nama file:

```javascript
const articleFiles = [
  'welcome.md',
  'react-tips.md',
  'web-performance.md',
  'nama-artikel.md'  // Tambahkan di sini
];
```

### Tips untuk Thumbnail

Gunakan URL gambar dari:
- Unsplash: https://unsplash.com (gratis, kualitas tinggi)
- Pexels: https://pexels.com (gratis)
- Atau upload gambar Anda sendiri ke folder `public/images/`

## Cara Menambahkan Username Sosial Media

Edit `.env.local`:

```env
# Isi dengan username saja (tanpa @ atau URL)
REACT_APP_GITHUB_USERNAME=yourusername
REACT_APP_LINKEDIN_USERNAME=yourusername
REACT_APP_INSTAGRAM_USERNAME=yourusername
```

### GitHub Integration

Jika GitHub username diisi, aplikasi akan otomatis:
- Menampilkan profil GitHub Anda
- Menampilkan 6 repository terbaru
- Menampilkan 10 aktivitas terakhir

**Rate Limit**: GitHub API memiliki limit 60 request/jam tanpa token.

## Cara Mengubah Avatar/Emoji

Edit file `src/pages/Home.js` dan cari bagian:

```javascript
<div className="avatar">👨‍💻</div>
```

Ganti emoji `👨‍💻` dengan emoji pilihan Anda:
- 👨‍💻 Developer
- 🎨 Designer
- 📸 Photographer
- ✍️ Writer
- 🎵 Musician
- dll

Emoji yang sama juga ada di `src/pages/About.js`.

## Cara Mengubah Skills

Edit file `src/pages/About.js`, cari bagian `skills-grid`:

```javascript
<div className="skill-tags">
  <span className="skill-tag">React</span>
  <span className="skill-tag">JavaScript</span>
  // Tambah atau ubah di sini
</div>
```

## Cara Mengubah Menu Navigasi

Edit file `src/components/Header.js`:

```javascript
<nav className="nav">
  <Link to="/" className="nav-link">Home</Link>
  <Link to="/about" className="nav-link">About</Link>
  <Link to="/articles" className="nav-link">Articles</Link>
  <Link to="/social" className="nav-link">Social</Link>
  // Tambah link baru di sini
</nav>
```

## Cara Menambahkan Halaman Baru

### Step 1: Buat file halaman baru

Buat file `src/pages/Contact.js`:

```javascript
import React from 'react';
import './Contact.css';

function Contact() {
  return (
    <div className="contact">
      <div className="container">
        <h1>Contact Me</h1>
        {/* Konten halaman */}
      </div>
    </div>
  );
}

export default Contact;
```

### Step 2: Buat CSS untuk halaman

Buat file `src/pages/Contact.css`:

```css
.contact {
  padding: 3rem 0;
  min-height: calc(100vh - 200px);
}
```

### Step 3: Tambahkan route

Edit `src/App.js`, tambahkan import dan route:

```javascript
import Contact from './pages/Contact';

// Dalam <Routes>
<Route path="/contact" element={<Contact />} />
```

### Step 4: Tambahkan ke menu

Edit `src/components/Header.js`:

```javascript
<Link to="/contact" className="nav-link">Contact</Link>
```

## Troubleshooting

### Perubahan tidak terlihat

1. Coba hard refresh: `Ctrl + Shift + R` (Windows) atau `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Stop server (`Ctrl + C`) dan restart (`npm start`)

### Error setelah menambah artikel

1. Pastikan format frontmatter benar (harus ada `---` di awal dan akhir)
2. Pastikan nama file sudah ditambahkan ke `articleFiles` array
3. Check browser console (F12) untuk error detail

### GitHub data tidak muncul

1. Pastikan username GitHub benar
2. Check rate limit di: https://api.github.com/rate_limit
3. Jika sudah limit, tunggu 1 jam atau gunakan Personal Access Token

## Backup & Version Control

Disarankan menggunakan Git untuk version control:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo.git
git push -u origin main
```

**PENTING**: Jangan commit file `.env.local` karena berisi informasi pribadi!

## Deploy ke Production

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

1. Push ke GitHub
2. Connect repository di Netlify
3. Set environment variables di Netlify dashboard

### GitHub Pages

```bash
npm install gh-pages --save-dev
```

Edit `package.json`:
```json
"homepage": "https://username.github.io/repo-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

Deploy:
```bash
npm run deploy
```

---

Butuh bantuan? Buka issue di GitHub atau email ke support@example.com
