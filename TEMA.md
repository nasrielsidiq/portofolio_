# 🎨 Panduan Tema Portfolio Mucaa

## Fitur Tema Dual Mode

Portfolio ini memiliki dua tema yang dapat diubah secara dinamis:

### 🌙 Dark Theme (Default)
- Background: Gradasi hitam gelap (#0a0e27 - #131a35)
- Text: Putih terang (#e8f1ff)
- Accent: Gradasi biru (#4da3ff - #1e5ba8)

### ☀️ Light Theme
- Background: Gradasi putih terang (#f0f7ff - #e1f0ff)
- Text: Hitam biru gelap (#0a2540)
- Accent: Gradasi biru (#2d7dd2 - #1e5ba8)

## Dekorasi Khas

### ⬢ Honeycomb Pattern
- Background dengan pola honeycomb halus
- Honeycomb accent pada elemen hover
- Honeycomb icons pada heading dan navigation

### ✦ Octagram Decorations
- 3 octagram (bintang 8 sudut) berputar di background
- Opacity rendah untuk efek subtle
- Animasi rotasi 30 detik
- Gradient biru untuk visual menarik

## Toggle Tema

### Cara Menggunakan
1. Lihat tombol bulat di pojok kanan bawah
2. Icon ☀️ = sedang dark mode (klik untuk light mode)
3. Icon 🌙 = sedang light mode (klik untuk dark mode)
4. Preferensi tema tersimpan di browser (localStorage)

### Fitur Toggle
- Smooth transition antar tema
- Auto-save preferensi
- Animasi rotate saat hover
- Floating button dengan shadow

## Gradasi Warna

### Dark Theme Gradient
```css
Primary: #4da3ff → #2d7dd2 → #1e5ba8 → #0f3d6e
Background: #0a0e27 → #131a35 → #1a2342
```

### Light Theme Gradient
```css
Primary: #80c4ff → #4da3ff → #2d7dd2 → #1e5ba8
Background: #f0f7ff → #e1f0ff → #d4e9ff
```

## Efek Visual

### Cards & Hover Effects
- Border gradient saat hover
- Box shadow dengan primary color glow
- Transform translateY untuk floating effect
- Ripple effect pada buttons

### Animations
- fadeIn: entrance animation untuk content
- pulse-glow: breathing effect untuk avatar
- float: floating animation untuk honeycomb icons
- rotate-slow: rotation untuk octagram decorations

### Custom Scrollbar
- Track: sesuai background theme
- Thumb: gradient biru
- Smooth hover transition

## Implementasi Teknis

### Theme Context
File: `src/contexts/ThemeContext.js`
- React Context API
- localStorage persistence
- data-theme attribute pada html

### CSS Variables
Semua warna didefinisikan sebagai CSS variables di `App.css`
```css
:root { /* Dark theme */ }
[data-theme="light"] { /* Light theme */ }
```

### Component Integration
Setiap komponen menggunakan CSS variables:
```css
color: var(--text-primary);
background: var(--bg-primary);
border: var(--card-border);
```

## Customisasi Lebih Lanjut

### Mengubah Warna Accent
Edit `src/App.css`:

```css
:root {
  --blue-light: #your-color;
  --blue-dark: #your-color;
}
```

### Menambah Animasi Octagram
Edit `src/App.css`:

```css
.octagram-4 {
  top: 30%;
  left: 20%;
  width: 200px;
  height: 200px;
}
```

Tambahkan di `src/App.js`:
```jsx
<div className="octagram-decoration octagram-4"></div>
```

### Mengubah Honeycomb Pattern
Edit opacity di `src/App.css`:

```css
body::before {
  opacity: 0.05; /* lebih terlihat */
}
```

## Tips Desain

### Konsistensi
- Semua gradient menggunakan arah 135deg
- Border radius konsisten: 0.5rem - 1rem
- Spacing menggunakan kelipatan 0.5rem

### Accessibility
- Contrast ratio memenuhi WCAG AA
- Hover states jelas terlihat
- Focus states untuk keyboard navigation

### Performance
- CSS transitions < 0.5s
- Transform lebih baik dari left/top
- Opacity changes untuk smooth transition

## Browser Support

### Minimal Requirements
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### Fallback
Untuk browser lama yang tidak support CSS variables, tema akan fallback ke default colors.

---

Desain tema ini menggabungkan:
- ✨ Modern gradient aesthetic
- ⬢ Geometric honeycomb pattern
- ✦ Octagram sacred geometry
- 🎨 Dual light/dark modes
- 🌊 Smooth transitions

Hasil: Portfolio yang elegant, professional, dan memorable!
