# 🚀 Ramzy Junfaris Hamonangan — Portfolio

Website portofolio pribadi modern menggunakan React + Vite + Tailwind CSS + Framer Motion.

---

## ⚡ Cara Menjalankan

### 1. Install Dependencies
```bash
npm install
```

### 2. Jalankan Development Server
```bash
npm run dev
```

### 3. Buka di Browser
```
http://localhost:5173
```

---

## 🏗️ Build Production
```bash
npm run build
npm run preview
```

---

## 📁 Struktur Folder

```
src/
├── components/
│   ├── Navbar.jsx          — Navigasi sticky dengan glassmorphism
│   ├── Hero.jsx            — Section hero dengan foto & animasi
│   ├── About.jsx           — Tentang saya + statistik
│   ├── Skills.jsx          — Software & tech stack + progress bar
│   ├── Learning.jsx        — Software yang sedang dipelajari
│   ├── Hobbies.jsx         — Hobi dan ketertarikan
│   ├── Projects.jsx        — 5 proyek dengan link GitHub
│   ├── DesignResults.jsx   — Galeri hasil desain (placeholder)
│   ├── Inspirasi.jsx       — 3 kartu inspirasi
│   ├── Partnership.jsx     — 6 kartu partner kolaborasi
│   ├── Timeline.jsx        — Timeline perjalanan 2023–2026
│   ├── Footer.jsx          — Footer dengan social links
│   ├── ScrollProgress.jsx  — Progress bar scroll di atas
│   ├── BackToTop.jsx       — Tombol kembali ke atas
│   └── Loader.jsx          — Loading animation
├── App.jsx
├── main.jsx
└── index.css
```

---

## 🖼️ Cara Mengganti Foto & Konten

### Foto Profil (Hero)
Di `src/components/Hero.jsx`, cari komentar:
```jsx
{/* <img src="/foto-profil.jpg" alt="Ramzy" className="w-full h-full object-cover absolute inset-0" /> */}
```
- Letakkan foto kamu di folder `public/` dengan nama `foto-profil.jpg`
- Hapus comment dan div placeholder di atasnya

### Foto Inspirasi
Di `src/components/Inspirasi.jsx`:
```jsx
{/* <img src={`/inspirasi/${person.name.toLowerCase()}.jpg`} ... /> */}
```
- Letakkan foto di `public/inspirasi/`

### Foto Partner
Di `src/components/Partnership.jsx`:
```jsx
{/* <img src={`/partners/${p.name}.jpg`} ... /> */}
```

### Foto Desain
Di `src/components/DesignResults.jsx`:
```jsx
{/* <img src={`/designs/design-${item.id}.jpg`} ... /> */}
```
- Letakkan foto di `public/designs/`

---

## 🔗 Ganti Link Sosial Media
Di `src/components/Footer.jsx`, ubah bagian `socials`:
```js
const socials = [
  { href: 'https://github.com/USERNAME_KAMU', ... },
  { href: 'https://linkedin.com/in/USERNAME_KAMU', ... },
  { href: 'mailto:EMAIL_KAMU@gmail.com', ... },
  { href: 'https://instagram.com/USERNAME_KAMU', ... },
]
```

## 🔗 Ganti Link GitHub Proyek
Di `src/components/Projects.jsx`, ubah field `github` di setiap proyek.

---

## 🛠️ Tech Stack
- **React 18** + **Vite 5**
- **Tailwind CSS 3**
- **Framer Motion 11**
- **Lucide React Icons**

---

© 2026 Ramzy Junfaris Hamonangan
