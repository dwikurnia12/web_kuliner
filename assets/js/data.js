/* Data katalog SoloRasa.
   Alamat, jam, harga per orang, dan rating dicek di Google Maps dan artikel kuliner pada 22 Nov 2026.
   Status menu (READY / HABIS / BELUM) adalah CONTOH: di produksi diisi penjual (mis. Firestore atau Google Sheets). */
window.SOLORASA_DATA = {
  checkedAt: '22 Nov 2026',
  places: [
    {
      id: 'selat-mbak-lies', name: 'Warung Selat Mbak Lies', category: 'Makanan Berat', label: 'Legend', dish: 'Selat Solo',
      desc: 'Selat Solo legendaris: bistik jawa dan selat galantine berkuah manis.',
      address: 'Jl. Yudhistira No. 9, Serengan, Surakarta', area: 'Serengan',
      open: '08:00', close: '18:00', priceMin: 25000, priceMax: 50000, priceText: 'Rp 25.000–50.000',
      rating: '4,4', ratingCount: '8.488', phone: '(0271) 653332',
      img: 'assets/img/selat.webp', imgAlt: 'Sepiring selat Solo berisi daging, sayur, dan kuah cokelat',
      hero: 'assets/img/selat-warung.webp', heroAlt: 'Bagian dalam Warung Selat Mbak Lies dengan hiasan gantung',
      source: 'Google Maps; detik.com', porsi: 'Semua menu 1 porsi.',
      menu: [
        { name: 'Selat Solo (bistik jawa)', price: '± Rp 25.000', desc: 'Daging sapi, telur, sayur, kuah manis · 1 porsi', status: 'READY', info: 'Perpaduan bistik Belanda dan selera Jawa. Daging sapi disiram kuah encer manis-asam dari kecap, cuka, dan pala, disajikan dengan sayuran rebus, kentang, dan saus mustard.' },
        { name: 'Selat galantine', price: null, desc: 'Galantine daging dengan kuah selat · 1 porsi', status: 'HABIS', info: 'Galantine adalah daging cincang yang dibentuk gulungan lalu dikukus dan diiris. Disajikan seperti selat: kuah manis, sayuran, dan telur.' },
        { name: 'Sup matahari', price: null, desc: 'Sup ayam dan sayur dalam telur dadar · 1 porsi', status: 'READY', info: 'Dinamai dari bentuknya: telur dadar tipis membungkus isian ayam dan sayur, dikukus dalam mangkuk lalu dibalik sehingga mirip matahari, kemudian disiram kaldu bening.' },
        { name: 'Gado-gado', price: null, desc: 'Sayur rebus dengan saus kacang · 1 porsi', status: 'BELUM', info: 'Sayuran rebus, tahu, tempe, dan telur yang disiram saus kacang, biasanya dengan kerupuk. Mengandung kacang tanah.' }
      ]
    },
    {
      id: 'nasi-liwet-wongso-lemu', name: 'Nasi Liwet Wongso Lemu', category: 'Makanan Berat', label: 'Favorit', dish: 'Nasi liwet',
      desc: 'Nasi liwet gurih dengan suwiran ayam, labu siam, telur, dan areh.',
      address: 'Jl. Teuku Umar, Keprabon, Banjarsari, Surakarta', area: 'Keprabon',
      open: '16:00', close: '01:00', priceMin: 17000, priceMax: 38000, priceText: 'Rp 17.000–38.000',
      rating: '3,9', ratingCount: '5.251', phone: null,
      img: 'assets/img/nasi-liwet.webp', imgAlt: 'Nasi liwet dengan suwiran ayam dan areh di atas daun pisang',
      hero: 'assets/img/nasi-liwet-warung.webp', heroAlt: 'Suasana lapak Nasi Liwet Wongso Lemu pada malam hari, beberapa orang berkebaya duduk di belakang etalase lauk',
      source: 'Google Maps (lokasi, rating, jam buka); mojok.co (harga, jam tutup)', porsi: '1 porsi.',
      menu: [ { name: 'Nasi liwet suwir ayam', price: null, desc: 'Nasi gurih, suwir ayam, labu siam, telur, areh · 1 porsi', status: 'READY', info: 'Nasi liwet khas Solo dimasak dengan santan, daun salam, dan serai sehingga gurih. Disajikan di atas daun pisang dengan sayur labu siam, suwiran ayam, telur, dan areh (santan kental yang dimasak).' } ]
    },
    {
      id: 'serabi-notosuman', name: 'Serabi Notosuman', category: 'Jajanan', label: 'Legend', dish: 'Jajanan',
      desc: 'Serabi santan legendaris sejak 1923, rasa original dan cokelat.',
      address: 'Jl. Moh. Yamin No. 28, Jayengan, Serengan, Surakarta', area: 'Serengan',
      open: '05:00', close: '17:00', priceMin: 25000, priceMax: 50000, priceText: 'Rp 25.000–50.000',
      rating: '4,5', ratingCount: '2.209', phone: null,
      img: 'assets/img/serabi.webp', imgAlt: 'Tumpukan serabi Notosuman dengan pinggiran renyah',
      source: 'Google Maps (Ny. Lidia)', porsi: 'Dijual per biji atau per kotak.',
      menu: [
        { name: 'Serabi original', price: null, desc: 'Serabi santan, dijual per biji atau per kotak', status: 'READY', info: 'Serabi Solo dibuat dari tepung beras dan santan, dimasak di wajan tanah liat kecil. Bagian tengahnya lembut, pinggirannya tipis dan renyah, lalu digulung daun pisang.' },
        { name: 'Serabi cokelat', price: null, desc: 'Serabi santan dengan taburan cokelat', status: 'HABIS', info: 'Serabi santan yang sama dengan taburan cokelat di atasnya, rasanya lebih manis.' }
      ]
    },
    {
      id: 'timlo-sastro', name: 'Timlo Sastro', category: 'Makanan Berat', label: 'Legend', dish: 'Makanan Berat',
      desc: 'Timlo kuah bening dengan sosis solo dan hati; kini di Jl. Abdul Muis No. 32A.',
      address: 'Jl. Abdul Muis No. 32A, Kepatihan Kulon, Jebres, Surakarta', area: 'Jebres',
      open: '08:00', close: '15:00', priceMin: 25000, priceMax: 50000, priceText: 'Rp 25.000–50.000',
      rating: '4,5', ratingCount: '3.298', phone: null,
      img: 'assets/img/timlo.webp', imgAlt: 'Gerobak warung Timlo Sastro dengan tumpukan mangkuk dan dua penjual berkaus putih',
      source: 'Google Maps (Timlo Sastro 1)', porsi: '1 porsi.',
      menu: [ { name: 'Timlo komplit', price: null, desc: 'Kuah bening, sosis solo, telur pindang, hati ampela · 1 porsi', status: 'BELUM', info: 'Sup kuah bening dari kaldu ayam dengan bumbu ringan. Isinya sosis solo (dadar gulung berisi daging), telur pindang, serta hati dan ampela; biasanya dimakan dengan nasi.' } ]
    },
    {
      id: 'sate-pak-manto', name: 'Sate Kambing & Tengkleng Pak Manto', category: 'Makanan Berat', label: 'Favorit', dish: 'Sate & tengkleng',
      desc: 'Warung kambing legendaris sejak 1990, terkenal dengan tengkleng rica-rica dan sate buntel.',
      address: 'Jl. Honggowongso No. 36, Sriwedari, Laweyan, Surakarta', area: 'Laweyan',
      open: '09:00', close: '19:00', priceMin: 40000, priceMax: 65000, priceText: 'Rp 40.000–65.000',
      rating: '4,4', ratingCount: '18.008', phone: null,
      img: 'assets/img/sate.webp', imgAlt: 'Sate buntel kambing disajikan dengan irisan bawang dan kubis',
      source: 'Wanderlog (alamat & rating Google Maps); kumparan.com (jam buka); Espos/Solopos 12 Mar 2023 (menu & harga, bisa sudah naik)', porsi: 'Per porsi; tengkleng cukup untuk 2–3 orang. Sate bisa dibeli per tusuk.',
      menu: [
        { group: 'Bakaran', name: 'Sate buntel', price: 'Rp 65.000', desc: 'Daging kambing cincang dibakar, kecap & lalapan · 1 porsi (per tusuk Rp 22.000)', status: 'READY', info: 'Daging kambing cincang halus yang dibalut lemak, ditusuk besar, lalu dibakar dengan bumbu khusus. Disajikan dengan kecap manis dan lalapan.' },
        { group: 'Bakaran', name: 'Sate kambing 10 tusuk', price: 'Rp 65.000', desc: 'Daging kambing muda bakar, kecap & lalapan · 10 tusuk (5 tusuk Rp 30.000, 15 tusuk Rp 90.000)', status: 'READY', info: 'Potongan daging kambing muda dibakar dengan racikan bumbu khusus, lalu disajikan dengan kecap manis dan lalapan.' },
        { group: 'Bakaran', name: 'Sate campur buntel', price: 'Rp 65.000', desc: '2 tusuk buntel + 3 tusuk daging · 1 porsi', status: 'READY', info: 'Pilihan untuk yang ingin mencoba keduanya: dua tusuk sate buntel dan tiga tusuk sate daging dalam satu piring.' },
        { group: 'Masakan kambing', name: 'Tengkleng rica', price: 'Rp 65.000', desc: 'Tulang kambing muda berbumbu rica pedas manis · 1 porsi', status: 'READY', info: 'Menu andalan Pak Manto: tulang dan iga kambing muda yang masih berdaging dimasak dengan bumbu rica-rica pedas manis. Porsinya besar, cocok dimakan beramai-ramai.' },
        { group: 'Masakan kambing', name: 'Tengkleng segar', price: 'Rp 65.000', desc: 'Tulang kambing muda berkuah kaldu · 1 porsi', status: 'READY', info: 'Versi berkuah dari tengkleng: tulang kambing muda direbus dan disajikan dengan kuah kaldu yang gurih, tidak pedas.' },
        { group: 'Masakan kambing', name: 'Sumsum rica', price: 'Rp 65.000', desc: 'Tulang sumsum kambing bumbu rica pedas manis · 1 porsi', status: 'READY', info: 'Tulang sumsum kambing pilihan dimasak dengan bumbu rempah rica-rica. Sumsumnya biasanya diseruput langsung dari tulang.' },
        { group: 'Masakan kambing', name: 'Sumsum segar', price: 'Rp 65.000', desc: 'Tulang sumsum kambing berkuah kaldu · 1 porsi', status: 'HABIS', info: 'Tulang sumsum kambing yang direbus dan disajikan dengan kuah kaldu gurih.' },
        { group: 'Masakan kambing', name: 'Buntel masak', price: 'Rp 65.000', desc: 'Daging kambing cincang dimasak bumbu merah & kecap · 1 porsi', status: 'READY', info: 'Daging buntel yang tidak dibakar, tetapi dimasak dengan bumbu merah dan kecap manis sehingga rasanya manis gurih.' },
        { group: 'Masakan kambing', name: 'Garang masak buntel', price: 'Rp 65.000', desc: 'Buntel dimasak bumbu garang · 1 porsi', status: 'BELUM', info: 'Daging buntel yang dimasak dengan bumbu garang khas warung ini. Tanyakan tingkat pedasnya ke penjual.' },
        { group: 'Masakan kambing', name: 'Tongseng', price: 'Rp 55.000', desc: 'Daging kambing muda bumbu rempah manis gurih · 1 porsi', status: 'READY', info: 'Daging kambing muda dimasak dengan bumbu rempah dan kecap, kuahnya mirip gulai tetapi lebih encer, rasanya manis gurih.' },
        { group: 'Masakan kambing', name: 'Garang masak', price: 'Rp 55.000', desc: 'Daging kambing dibakar setengah matang lalu dimasak bumbu tongseng · 1 porsi', status: 'READY', info: 'Daging kambing muda dibakar setengah matang terlebih dahulu, lalu dimasak dengan bumbu tongseng sehingga ada aroma bakarannya.' },
        { group: 'Masakan kambing', name: 'Gule masak', price: 'Rp 50.000', desc: 'Olahan kambing bumbu rempah & kecap manis · 1 porsi', status: 'READY', info: 'Campuran olahan kambing yang dimasak dengan bumbu rempah dan kecap manis.' },
        { group: 'Masakan kambing', name: 'Gule segar', price: 'Rp 40.000', desc: 'Jeroan kambing berkuah kaldu · 1 porsi', status: 'READY', info: 'Campuran jeroan kambing yang direbus dan disajikan dengan kuah kaldu.' },
        { group: 'Masakan kambing', name: 'Gule goreng', price: 'Rp 40.000', desc: 'Olahan gule yang digoreng · 1 porsi', status: 'BELUM', info: 'Olahan gule kambing versi goreng. Detail isian belum terkonfirmasi; tanyakan ke penjual.' },
        { group: 'Masakan kambing', name: 'Otak masak', price: 'Rp 50.000', desc: 'Otak kambing direbus lalu dimasak bumbu kecap · 1 porsi', status: 'HABIS', info: 'Otak kambing direbus dengan kuah kaldu, lalu dimasak dengan bumbu kecap. Teksturnya lembut.' },
        { group: 'Masakan kambing', name: 'Otak goreng', price: 'Rp 40.000', desc: 'Otak kambing digoreng berbalut telur · 1 porsi', status: 'READY', info: 'Otak kambing yang dibalut telur lalu digoreng hingga bagian luarnya kering.' },
        { group: 'Nasi', name: 'Nasi goreng kambing', price: 'Rp 45.000', desc: 'Nasi goreng rempah dengan daging sate · 1 porsi', status: 'READY', info: 'Nasi diolah dengan bumbu rempah dan sedikit kuah kaldu, ditambah potongan daging sate kambing; rasanya cenderung manis.' },
        { group: 'Nasi', name: 'Nasi godog kambing', price: 'Rp 45.000', desc: 'Nasi dimasak dengan kaldu & daging kambing · 1 porsi', status: 'READY', info: 'Nasi "godog" (direbus) bersama kaldu dan daging kambing dengan sedikit kecap manis, teksturnya seperti nasi berkuah.' },
        { group: 'Nasi', name: 'Nasi goreng polos', price: 'Rp 15.000', desc: 'Nasi goreng bumbu rempah tanpa daging, telur ceplok · 1 porsi', status: 'READY', info: 'Nasi goreng berbumbu rempah tanpa daging kambing, disajikan dengan telur ceplok. Pilihan untuk yang tidak makan kambing.' }
      ]
    },
    {
      id: 'wedangan-pak-no', name: 'Wedangan Pak No', category: 'Angkringan', label: 'Murah', dish: 'Angkringan',
      desc: 'Wedangan legendaris: wedang, kopi, dan aneka gorengan, buka sore sampai malam.',
      address: 'Jl. Jaya Wijaya, Surakarta (Wedangan Pak No 1)', area: 'Jl. Jaya Wijaya',
      open: '16:00', close: '24:00', priceMin: 1000, priceMax: 25000, priceText: 'di bawah Rp 25.000',
      rating: '4,4', ratingCount: '2.907', phone: null,
      img: 'assets/img/wedangan.webp', imgAlt: 'Aneka lauk dan gorengan di gerobak wedangan Solo',
      source: 'Google Maps', porsi: '1 gelas / 1 porsi.',
      menu: [
        { name: 'Aneka wedang', price: null, desc: 'Wedang jahe, teh, kopi, dan minuman hangat lain · 1 gelas', status: 'READY', info: 'Wedangan adalah tempat minum santai khas Solo. Pilihannya antara lain wedang jahe, kopi, dan teh nasgitel (panas, legi, kentel: panas, manis, kental).' },
        { name: 'Aneka gorengan', price: null, desc: 'Tempe, bakwan, dan gorengan lain · per biji', status: 'BELUM', info: 'Gorengan seperti tempe, bakwan, dan tahu yang diambil sendiri, biasanya bisa dibakar ulang di atas arang agar hangat.' }
      ]
    }
  ],
  /* Rute kuliner ½ hari. travel = menit perjalanan dari tempat sebelumnya (motor/mobil), stay = menit di tempat.
     PERKIRAAN, belum dicek: cek tiap ruas di Google Maps lalu perbarui angkanya. */
  routes: [
    { id: 'pagi', name: 'Pagi–siang: sarapan khas Solo', start: '08:00', stops: [
      { id: 'serabi-notosuman', travel: 0, stay: 30 },
      { id: 'timlo-sastro', travel: 15, stay: 45 },
      { id: 'selat-mbak-lies', travel: 15, stay: 60 } ] },
    { id: 'malam', name: 'Sore–malam: makan malam dan wedangan', start: '16:30', stops: [
      { id: 'sate-pak-manto', travel: 0, stay: 60 },
      { id: 'nasi-liwet-wongso-lemu', travel: 10, stay: 45 },
      { id: 'wedangan-pak-no', travel: 15, stay: 60 } ] }
  ],
  categories: ['Legend', 'Makanan Berat', 'Jajanan', 'Angkringan', 'Street Food', 'Murah'],
  credits: 'Foto: Wikimedia Commons — Aqilla Rahmi (CC BY 4.0), Gunawan Kartapranata, Meursault2004, Nasudi (CC BY-SA), Midori (CC BY 3.0), ESCapade (CC BY-SA 3.0), Sam Hidayat (Pasar Gede, CC BY-SA 4.0). Peta: Google Maps.'
};
