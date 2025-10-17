# 🎓 mhs-data-manager

Aplikasi **Manajemen Data Mahasiswa** berbasis **React + Vite** dengan **Tailwind CSS**.  
Aplikasi ini memungkinkan pengguna untuk **menambah**, **mengedit**, **menghapus**, dan **melihat** data mahasiswa

---

## 🚀 Fitur Utama

✅ **Create** — Tambahkan data mahasiswa baru (Nama, NIM, Program Studi, Fakultas, Email)  
✅ **Read** — Lihat daftar mahasiswa dalam tampilan tabel interaktif  
✅ **Update** — Edit data mahasiswa langsung dari daftar  
✅ **Delete** — Hapus data mahasiswa dengan konfirmasi  
✅ **Penyimpanan Lokal** — Semua data disimpan di `Local Storage` browser  
✅ **Responsive Design** — Tampilan tetap rapi di desktop maupun mobile  
✅ **Form Validation** — Pastikan data yang dimasukkan valid sebelum disimpan  

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Kegunaan |
|------------|-----------|
| [React](https://react.dev/) | Library utama untuk membangun UI |
| [Vite](https://vitejs.dev/) | Build tool untuk pengembangan cepat |
| [Tailwind CSS](https://tailwindcss.com/) | Styling cepat dan responsif |
| [React Router DOM](https://reactrouter.com/) | Navigasi antar halaman |
| Local Storage | Penyimpanan data secara lokal |

---

## 📂 Struktur Folder Proyek
mhs-data-manager/

- ├── public/ # File statis (favicon, index.html)
- ├── src/
- │ ├── components/ # Komponen UI (Form, Table, Modal, dsb)
- │ ├── pages/ # Halaman (Daftar Mahasiswa, Tambah/Edit)
- │ ├── utils/ # Fungsi helper (akses localStorage, validasi, dll)
- │ ├── App.jsx # Komponen utama aplikasi
- │ └── main.jsx # Entry point React
- ├── package.json
- ├── vite.config.js
- ├── tailwind.config.js
- ├── postcss.config.js
- └── README.md


---

## ⚙️ Instalasi & Menjalankan Proyek

Pastikan kamu sudah menginstal **Node.js** versi 16 ke atas.

```bash
# 1. Clone repositori ini
git clone https://github.com/dimaswae/mhs-data-manager.git

# 2. Masuk ke folder proyek
cd mhs-data-manager

# 3. Instal dependensi
npm install

# 4. Jalankan mode pengembangan
npm run dev

Aplikasi akan berjalan di:
👉 http://localhost:5173

```

## 🧠 Cara Penggunaan

- Buka aplikasi di browser.
- Klik tombol Tambah Mahasiswa.
- Isi form (Nama, NIM, Program Studi, Fakultas, Email).
- Klik Simpan → Data otomatis tersimpan di Local Storage.
- Gunakan tombol Edit untuk mengubah data mahasiswa.
- Gunakan tombol Hapus untuk menghapus data dari daftar.
- Semua perubahan akan langsung tersimpan di local storage browser, sehingga tetap tersedia meskipun halaman direfresh.

## 🧰 Konfigurasi Tambahan (Opsional)
Jika kamu ingin reset data atau debug local storage:

**Buka Developer Tools → Application → Local Storage**

Hapus key dengan nama mhsData atau sesuai key yang digunakan di kode.

💡 Ide Pengembangan Lanjutan
🔗 Tambahkan backend (mis. Express + MongoDB)

📧 Validasi email otomatis

🔍 Tambahkan fitur pencarian dan filter mahasiswa

💾 Ekspor data ke CSV atau Excel

🌙 Mode gelap (Dark Mode) dengan Tailwind

🤝 Kontribusi
Kontribusi sangat terbuka!
Untuk menambahkan fitur atau memperbaiki bug:


Salin kode

# Buat branch baru

```
git checkout -b fitur/nama-fitur
```
# Commit perubahan
```
git commit -m "Menambahkan fitur X"
```
# Push ke branch
```
git push origin fitur/nama-fitur
```
Lalu buat Pull Request di GitHub. 🎉

## 📜 Lisensi
Proyek ini menggunakan lisensi MIT License — silakan gunakan dan modifikasi dengan bebas.

## 👨‍💻 Pembuat
Dimas Rizqia Hidayat - 1237050073
- 📍 Universitas Islam Negeri Sunan Gunung Djati Bandung
- 💻 Informatika — Fakultas Sains dan Teknologi