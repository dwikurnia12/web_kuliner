// Data contoh SoloRasa. Porsi, stok, dan pembaruan hanya ilustrasi.
var KULINER = [
  {
    id: "nasi-liwet-wongso-lemu", nama: "Nasi Liwet Wongso Lemu", kategori: "Favorit",
    tags: ["Makanan berat", "Kuliner murah"], area: "Keprabon", alamat: "Jl. Teuku Umar, Keprabon, Surakarta",
    deskripsi: "Nasi liwet khas Solo dengan ayam, labu siam, dan areh yang kaya rasa.",
    rating: 4.8, ulasan: 410, min: 15000, max: 25000, status: "READY", porsi: "1 porsi",
    buka: "17.00–23.00", jamBuka: 17, jamTutup: 23, jarak: 1.5, foto: "images/nasi-liwet.jpg",
    peta: { x: 56, y: 62 },
    menu: [
      ["Nasi liwet komplit", 25000, "Ayam suwir, telur pindang, areh"],
      ["Nasi liwet sayur labu", 15000, "Labu siam, areh, bawang goreng"],
      ["Teh tarik hangat", 6000, "Minuman pendamping"]
    ]
  },
  {
    id: "warung-selat-mbak-lies", nama: "Warung Selat Mbak Lies", kategori: "Legendaris",
    tags: ["Legendaris", "Makanan berat"], area: "Laweyan", alamat: "Jl. Slamet Riyadi No. 12, Laweyan, Surakarta",
    deskripsi: "Selat Solo asli dengan daging sapi yang empuk dan saus kacang kental.",
    rating: 4.7, ulasan: 312, min: 24000, max: 32000, status: "READY", porsi: "1 porsi",
    buka: "09.00–20.00", jamBuka: 9, jamTutup: 20, jarak: 1.2, foto: "images/selat-solo.jpg", fotoDetail: "images/detail-selat.jpg",
    peta: { x: 24, y: 70 },
    ringkasan: "Rasa khas, porsi pas, tempat sederhana tapi bersih. Cocok untuk makan siang atau kudapan sore.",
    menu: [
      ["Selat Solo klasik", 28000, "Bistik daging, telur pindang, mustard", "READY"],
      ["Bistik lidah", 32000, "Saus kecap manis, kentang goreng", "HABIS"],
      ["Galantine ayam", 24000, "Porsi sedang, sayur rebus", "READY"],
      ["Es kapal", 8000, "Minuman segar khas Solo", "BELUM TERKONFIRMASI"]
    ]
  },
  {
    id: "serabi-notosuman", nama: "Serabi Notosuman", kategori: "Budget Friendly",
    tags: ["Jajanan", "Kuliner murah", "Legendaris"], area: "Banjarsari", alamat: "Jl. Notosuman, Banjarsari, Surakarta",
    deskripsi: "Serabi khas Solo yang gurih dan manis, cocok untuk camilan.",
    rating: 4.6, ulasan: 268, min: 3000, max: 10000, status: "READY", porsi: "1 buah",
    buka: "06.00–17.00", jamBuka: 6, jamTutup: 17, jarak: 1.2, foto: "images/serabi.jpg",
    peta: { x: 62, y: 36 },
    menu: [
      ["Serabi original", 3000, "Santan gurih"],
      ["Serabi cokelat", 5000, "Taburan cokelat"],
      ["Paket 5 serabi", 10000, "Dibungkus daun pisang"]
    ]
  },
  {
    id: "timlo-sastro", nama: "Timlo Sastro", kategori: "Legendaris",
    tags: ["Legendaris", "Makanan berat"], area: "Pasar Kliwon", alamat: "Jl. Veteran, Pasar Kliwon, Surakarta",
    deskripsi: "Timlo Solo yang kaya rempah dengan kuah bening yang segar.",
    rating: 4.5, ulasan: 190, min: 18000, max: 30000, status: "HABIS", porsi: "1 porsi",
    buka: "06.00–15.00", jamBuka: 6, jamTutup: 15, jarak: 2.4, foto: "images/timlo.jpg",
    peta: { x: 74, y: 52 },
    menu: [
      ["Timlo komplit", 30000, "Sosis solo, telur pindang, ati ampela"],
      ["Timlo ayam", 18000, "Kuah bening, suwiran ayam"]
    ]
  },
  {
    id: "sate-buntel-tambak-segaran", nama: "Sate Buntel Tambak Segaran", kategori: "Favorit",
    tags: ["Street food", "Makanan berat"], area: "Serengan", alamat: "Jl. Tambak Segaran, Serengan, Surakarta",
    deskripsi: "Sate buntel kambing yang empuk dengan bumbu kacang khas Solo.",
    rating: 4.7, ulasan: 356, min: 30000, max: 45000, status: "READY", porsi: "1 porsi",
    buka: "10.00–22.00", jamBuka: 10, jamTutup: 22, jarak: 2.0, foto: "images/sate-buntel.jpg",
    peta: { x: 38, y: 82 },
    menu: [
      ["Sate buntel (3 tusuk)", 30000, "Bumbu kecap, acar"],
      ["Sate buntel + lontong", 38000, "Porsi lengkap"],
      ["Tengkleng", 45000, "Kuah gurih rempah"]
    ]
  },
  {
    id: "kopi-tiam-oeng", nama: "Kopi Tiam Oeng", kategori: "Budget Friendly",
    tags: ["Kopi dan cafe", "Kuliner murah", "Legendaris"], area: "Jebres", alamat: "Jl. Ir. Sutami, Jebres, Surakarta",
    deskripsi: "Kopi pahit legendaris dengan suasana tempo dulu yang kental.",
    rating: 4.4, ulasan: 144, min: 12000, max: 28000, status: "BELUM TERKONFIRMASI", porsi: "1 gelas",
    buka: "08.00–22.00", jamBuka: 8, jamTutup: 22, jarak: 3.1, foto: "images/kopi-tiam.jpg",
    peta: { x: 84, y: 24 },
    menu: [
      ["Kopi hitam", 12000, "Seduh tradisional"],
      ["Roti bakar", 18000, "Selai kaya atau cokelat"],
      ["Kopi susu", 15000, "Susu kental manis"]
    ]
  }
];

var KATEGORI_FILTER = ["Makanan berat", "Jajanan", "Kopi dan cafe", "Street food"];
var NOMOR_WA = "0812-3456-7890";
var LINK_WA = "https://wa.me/6281234567890";
