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

---

## 🤖 UPDATE WEEK 9: Generative AI & Prompt Engineering (AI Chatbot CS)

Implementasi fitur Customer Service Otomatis berbasis **Google Gemini API** dengan teknik *Prompt Engineering* dan *Defense in Depth* untuk aplikasi **Smart Gallery**:

### 1. Integrasi Google Gemini LLM (`/api/chat`)
- Menggunakan `@google/generative-ai` (`gemini-1.5-flash`).
- Konfigurasi environment aman di `.env` (`GEMINI_API_KEY`).
- Service layer (`services/gemini.service.js`) untuk komunikasi API dan manajemen konteks.

### 2. Dynamic System Instruction & Guardrail
- Mengambil data paket (`Package`) dan FAQ secara dinamis dari database PostgreSQL ke dalam *System Instruction* AI.
- **Aturan Ketat (Guardrail):**
  - AI **HANYA** boleh menjawab seputar layanan fotografi/videografi dan FAQ Smart Gallery.
  - Menolak pertanyaan di luar topik (coding, resep, politik, dll) dengan sopan.
  - Mencegah *Prompt Injection* (mengabaikan instruksi, berpura-pura jadi AI lain).
  - Melarang penghasilan kode program/tag HTML.

### 3. Validasi & Keamanan Input (`middlewares/validateChatInput.js`)
- Validasi wajib isi dan batas panjang karakter (maksimal 500 karakter).
- Deteksi pola *suspicious/prompt injection* di tingkat kode (Defense in Depth).

### 4. UI Chatbot & API Endpoint
- Floating widget interaktif di halaman utama (`views/index.ejs`).
- Quick template chips untuk pertanyaan cepat (Paket Wisuda, Paket Wedding, Kontak WA).
- Endpoint REST API `POST /api/chat` mengembalikan JSON terstruktur.

### 5. Dokumentasi Screenshot & Uji Coba Chatbot

# Floating AI Chatbot Widget pada Halaman Utama
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/34e7d373-0747-4aee-80f6-fa3e392726fe" />

# Respons AI Chatbot Berdasarkan Data Paket & FAQ Database
<img width="1919" height="1079" alt="image" src="https://github.com/user-attachments/assets/f81a4a3e-0743-40fc-ae44-3e9e7a011b32" />

# Validasi & Guardrail (Penolakan Pertanyaan di Luar Konteks)
<img width="1919" height="1078" alt="image" src="https://github.com/user-attachments/assets/bd5cc0f1-f8d6-4c73-a091-0c408cee7d34" />

