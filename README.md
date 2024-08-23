# API Documentation Repository

Repository ini berisi dokumentasi API Portofolio ExpressJS.

## Tahapan Penggunaan

Ikuti langkah-langkah berikut untuk menjalankan repository ini di mesin lokal Anda.

### 1. Git Clone

Pertama-tama, clone repository ini ke dalam direktori lokal Anda:

```bash
git clone https://github.com/radityohk/api_docs.git
```

Setelah selesai, masuk ke dalam direktori repository:

```bash
cd api_docs
```

### 2. Install Dependencies

Untuk menjalankan proyek ini, Anda perlu menginstal semua dependencies yang dibutuhkan. Gunakan perintah berikut untuk menginstal dependencies:

```bash
npm install
```

### 3. Pastikan Data SQL Sudah Diimport

Sebelum menjalankan server, pastikan Anda telah mengimpor data SQL yang diperlukan ke dalam database Anda. Data SQL ini penting untuk memastikan API dapat berfungsi dengan baik.

> Pastikan Anda sudah mengatur koneksi database yang benar di file konfigurasi proyek Anda.

### 4. Menjalankan API Documentation

Setelah semua langkah di atas selesai, jalankan server dengan perintah berikut:

```bash
nodemon
```

Kemudian buka dokumentasi API di browser dengan mengunjungi:

```
http://localhost:8000/api-docs/
```

Anda akan dapat melihat dokumentasi API secara lengkap di sana.

## Catatan

- Pastikan Anda memiliki **Node.js** dan **npm** terinstal di mesin Anda.
- Pastikan koneksi database Anda sudah benar dan tersedia.
```
