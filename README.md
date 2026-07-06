# Mucaa Portfolio

Portfolio web modern menggunakan React dengan fitur biodata, galeri sosial media, dan sistem artikel berbasis Markdown.

## Fitur

- ✨ **Biodata Dinamis**: Informasi profil yang dapat dikustomisasi melalui .env.local
- 🎨 **Dual Theme Mode**: Toggle antara tema gelap dan terang dengan gradasi biru
- ⬢ **Honeycomb Pattern**: Pola honeycomb sebagai ciri khas desain
- ✦ **Octagram Decorations**: Dekorasi geometric octagram beranimasi
- 📝 **Sistem Artikel Markdown**: Artikel otomatis dari file .md di folder `/public/artikle`
- 🌐 **Integrasi Sosial Media**: Pelacakan aktivitas GitHub, LinkedIn, dan Instagram
- 📱 **Responsive Design**: Tampilan optimal di semua perangkat
- 🚀 **Modern Stack**: React + React Router + React Markdown + Context API

## Struktur Proyek

```
mucaa-portfolio/
├── public/
│   └── artikle/              # Folder untuk artikel Markdown
│       ├── welcome.md
│       ├── react-tips.md
│       └── web-performance.md
├── src/
│   ├── components/           # Komponen reusable
│   │   ├── Header.js
│   │   ├── Footer.js
│   │   └── ThemeToggle.js    # Toggle tema gelap/terang
│   ├── contexts/             # React Context
│   │   └── ThemeContext.js   # Theme state management
│   ├── pages/                # Halaman aplikasi
│   │   ├── Home.js
│   │   ├── About.js
│   │   ├── Articles.js
│   │   ├── ArticleDetail.js
│   │   └── Social.js
│   ├── utils/                # Utility functions
│   │   ├── articleUtils.js   # Fungsi untuk artikel
│   │   └── socialUtils.js    # Fungsi untuk sosial media
│   ├── App.js
│   └── index.js
├── .env.local                # Konfigurasi aplikasi
└── package.json
```

## Instalasi

1. Clone atau download repository ini
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy dan edit file `.env.local` sesuai kebutuhan:
   ```env
   REACT_APP_NAME=Your Name
   REACT_APP_TAGLINE=Your Tagline
   REACT_APP_BIO=Your Bio
   REACT_APP_EMAIL=your.email@example.com
   REACT_APP_GITHUB_USERNAME=yourgithub
   REACT_APP_LINKEDIN_USERNAME=yourlinkedin
   REACT_APP_INSTAGRAM_USERNAME=yourinstagram
   ```

4. Jalankan aplikasi:
   ```bash
   npm start
   ```

5. Buka browser di `http://localhost:3000`

## Menambahkan Artikel Baru

1. Buat file `.md` baru di folder `public/artikle/`
2. Gunakan format frontmatter untuk metadata:

```markdown
---
title: Judul Artikel Anda
date: 2026-07-02
author: Nama Anda
tags: tag1, tag2, tag3
thumbnail: https://example.com/image.jpg
---

# Konten Artikel

Tulis konten artikel Anda di sini menggunakan Markdown...
```

3. Tambahkan nama file ke array `articleFiles` di `src/utils/articleUtils.js`:

```javascript
const articleFiles = [
  'welcome.md',
  'react-tips.md',
  'web-performance.md',
  'nama-artikel-baru.md'  // Tambahkan di sini
];
```

4. Artikel akan otomatis muncul di halaman Articles

## Konfigurasi

### Biodata (.env.local)

- `REACT_APP_NAME`: Nama Anda
- `REACT_APP_TAGLINE`: Tagline/posisi Anda
- `REACT_APP_BIO`: Deskripsi singkat tentang Anda
- `REACT_APP_EMAIL`: Email Anda
- `REACT_APP_LOCATION`: Lokasi Anda

### Sosial Media (.env.local)

- `REACT_APP_GITHUB_USERNAME`: Username GitHub
- `REACT_APP_LINKEDIN_USERNAME`: Username LinkedIn
- `REACT_APP_INSTAGRAM_USERNAME`: Username Instagram

### Tema (.env.local)

- `REACT_APP_PRIMARY_COLOR`: Warna utama (default: #6366f1)
- `REACT_APP_SECONDARY_COLOR`: Warna sekunder (default: #8b5cf6)
- `REACT_APP_BACKGROUND_COLOR`: Warna background (default: #0f172a)
- `REACT_APP_TEXT_COLOR`: Warna teks (default: #f1f5f9)

## API yang Digunakan

- **GitHub API**: Untuk menampilkan profile, repositories, dan aktivitas
  - Endpoint: `https://api.github.com/users/{username}`
  - Rate limit: 60 requests/hour (tanpa authentication)

## Build untuk Production

```bash
npm run build
```

File production akan tersimpan di folder `build/`

## Deploy

Aplikasi ini dapat di-deploy ke:
- Vercel
- Netlify
- GitHub Pages
- Heroku
- Dan hosting static lainnya

Contoh deploy ke Vercel:
```bash
npm install -g vercel
vercel
```

## Teknologi yang Digunakan

- **React** 18.x - UI Library
- **React Router** 6.x - Routing
- **React Markdown** - Markdown renderer
- **Axios** - HTTP client
- **GitHub API** - Data sosial media

## Troubleshooting

### GitHub API Rate Limit

Jika Anda melebihi rate limit GitHub API (60 request/hour):
- Tunggu 1 jam untuk reset
- Atau gunakan GitHub Personal Access Token untuk meningkatkan limit ke 5000 request/hour

### Artikel Tidak Muncul

- Pastikan file .md ada di folder `public/artikle/`
- Pastikan nama file sudah ditambahkan ke `articleFiles` array
- Check browser console untuk error

## Lisensi

MIT License - Silakan digunakan untuk proyek personal atau komersial

## Kontribusi

Pull requests are welcome! Untuk perubahan besar, mohon buka issue terlebih dahulu untuk diskusi.

---

Dibuat dengan ❤️ menggunakan React
