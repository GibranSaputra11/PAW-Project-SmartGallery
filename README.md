# Halaman frontend
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/10955b3e-ca80-4407-91bf-cf657a19bec9" />

# Endpoint /api/status mengirimkan JSON
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/c318debc-4ec3-4fa3-bad3-3384d09751a3" />

# Endpoint /api/paket mengirimkan data array JSON
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/ad58d4c8-b973-4887-90d4-b4ecd39fb2af" />

# Middleware logger untuk mencatat request
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/55ea343e-19b9-4181-a2a6-0c988cf58f35" />

---

## UPDATE WEEK 8: Full MVC Architecture, PostgreSQL & Sequelize ORM, Admin Panel

Implementasi penuh arsitektur MVC (Model-View-Controller) dengan database PostgreSQL, Sequelize ORM, dan panel admin terautentikasi untuk aplikasi **Smart Gallery**:

### 1. Database & ORM Integration (PostgreSQL + Sequelize)
- Membuat database `smartGallery` di PostgreSQL.
- Mengonfigurasi Sequelize ORM dengan model lengkap:
  - `User` (Autentikasi admin dengan bcrypt)
  - `Package` (Manajemen paket fotografi & videografi)
  - `Gallery` (Portofolio foto/video dengan kategori)
  - `Testimonial` (Ulasan klien)
  - `FAQ` (Pertanyaan umum untuk konteks AI Chatbot)
  - `ChatHistory` (Riwayat interaksi chatbot)

### 2. Admin Panel & CRUD Operations (`/admin`)
- Implementasi sistem autentikasi admin.
- Halaman Dashboard Admin dengan statistik data sistem.
- Manajemen CRUD lengkap:
  - **Kelola Paket / Pricing** (`/admin/pricing`)
  - **Kelola Galeri / Portofolio** (`/admin/gallery`)
  - **Kelola Testimoni** (`/admin/testimonials`)
  - **Kelola FAQ** (`/admin/faqs`)

### 3. Public & Detail Features
- Halaman utama interaktif (`/`) dengan galeri, pricelist, dan testimoni.
- Halaman detail paket (`/paket/:id`) dengan informasi lengkap fasilitas dan tombol pemesanan WhatsApp otomatis.
- Integrasi AI Chatbot cerdas yang merespons pertanyaan seputar harga, paket, dan FAQ berdasarkan data dari database.

### 4. Bugfixes & Refactoring
- Perbaikan path include EJS pada direktori `views/admin/` dan view publik (`detail.ejs`).
- Sinkronisasi variabel view dengan struktur kolom database Sequelize.
