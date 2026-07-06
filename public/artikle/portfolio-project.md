---
title: Membangun Portfolio Website dengan React
date: 2026-07-02
author: Mucaa
category: project
tags: react, portfolio, web-development, project
thumbnail: https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800
---

# Membangun Portfolio Website dengan React

Project portfolio website ini dibuat menggunakan React dengan fokus pada desain modern dan performa yang optimal.

## Tech Stack

Teknologi yang digunakan dalam project ini:

- **React** - Library JavaScript untuk building UI
- **React Router** - Untuk navigasi antar halaman
- **CSS Variables** - Untuk theming (dark/light mode)
- **Markdown** - Untuk konten artikel

## Fitur Utama

### 1. Dark/Light Mode Toggle

Implementasi theme switching yang smooth dengan CSS variables dan React Context API.

```jsx
const [theme, setTheme] = useState('dark');

const toggleTheme = () => {
  setTheme(prev => prev === 'dark' ? 'light' : 'dark');
};
```

### 2. Responsive Design

Website ini fully responsive dan tampil optimal di berbagai ukuran layar dari mobile hingga desktop.

### 3. Artikel dengan Markdown

Sistem artikel yang mendukung markdown dengan frontmatter untuk metadata.

### 4. Animasi & Transitions

Menggunakan CSS animations untuk memberikan user experience yang lebih menarik:
- Fade in animations
- Hover effects dengan transformations
- Smooth transitions

## Design System

### Color Palette

- Primary: Blue gradient (#4da3ff - #1e5ba8)
- Background: Dark (#0a0e27) / Light (#f0f7ff)
- Accent: Honeycomb & Octagram patterns

### Typography

Font stack yang modern dan readable di berbagai devices.

## Challenges & Solutions

### Challenge 1: Dynamic Article Loading

**Problem**: Bagaimana load artikel markdown secara dinamis?

**Solution**: Menggunakan fetch API dengan proper error handling dan loading states.

### Challenge 2: Theme Persistence

**Problem**: Theme preference hilang saat page reload.

**Solution**: Simpan preference di localStorage dan load saat initialization.

## Future Improvements

Beberapa fitur yang akan ditambahkan:

- [ ] Search functionality untuk artikel
- [ ] Category & tag filtering
- [ ] Comment system
- [ ] Article sharing
- [ ] View counter

## Kesimpulan

Project ini merupakan learning experience yang bagus untuk memahami:
- React fundamentals & hooks
- Routing & navigation
- State management
- CSS theming
- Markdown processing

Source code available di GitHub!

---

*Project ini masih dalam development dan akan terus di-improve.*
