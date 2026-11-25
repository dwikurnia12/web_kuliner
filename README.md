# SoloRasa

Website panduan kuliner Solo. Proyek kelompok mata kuliah Desain Web.

- **Kelompok:** [ISI]
- **Anggota (Nama – NIM):** [ISI]

## Cara membuka
Buka `index.html` di browser (tidak perlu server atau backend). Butuh internet untuk memuat Bootstrap 5 dan font dari CDN.

## Halaman
| Berkas | Isi |
|---|---|
| `index.html` | Beranda |
| `jelajah.html` | Daftar dan hasil pencarian/filter, termasuk keadaan kosong dan galat |
| `detail.html?id=...` | Detail kuliner, menu, stok, ulasan |
| `peta.html` | Peta kuliner dan hasil terdekat |
| `filter.html` | Form filter kuliner |

## Teknologi
HTML5, CSS3 (`styles/main.css` dimuat setelah Bootstrap), Bootstrap 5.3, JavaScript vanilla (`scripts/`), Web Storage.

## Web Storage
- `localStorage`: nama tampilan (`sr_user`), favorit, riwayat, ulasan.
- `sessionStorage`: filter aktif (`sr_filter`).
- Tidak ada data sensitif atau kata sandi yang disimpan. Jika Web Storage diblokir, situs tetap dapat dipakai (data hanya bertahan selama halaman terbuka).

## Catatan
Data kuliner di `scripts/data.js` adalah contoh. Foto berasal dari wireframe kelompok.
