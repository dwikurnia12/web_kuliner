/* SoloRasa - JavaScript vanilla. Bergantung pada data.js (KULINER). */
(function () {
  "use strict";

  /* ---------- Web Storage yang aman (tetap jalan bila diblokir) ---------- */
  var memori = { local: {}, session: {} };
  function simpan(jenis, kunci, nilai) {
    try { window[jenis + "Storage"].setItem(kunci, JSON.stringify(nilai)); return true; }
    catch (e) { memori[jenis][kunci] = nilai; return false; }
  }
  function baca(jenis, kunci, awal) {
    try {
      var s = window[jenis + "Storage"].getItem(kunci);
      if (s !== null) return JSON.parse(s);
    } catch (e) { /* diblokir atau rusak */ }
    return kunci in memori[jenis] ? memori[jenis][kunci] : awal;
  }
  function hapus(jenis, kunci) {
    try { window[jenis + "Storage"].removeItem(kunci); } catch (e) { /* abaikan */ }
    delete memori[jenis][kunci];
  }

  /* ---------- Util ---------- */
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function esc(t) { var d = document.createElement("div"); d.textContent = t; return d.innerHTML; }
  function rp(n) { return "Rp " + n.toLocaleString("id-ID"); }
  function rentang(k) { return rp(k.min) + "–" + k.max.toLocaleString("id-ID"); }
  function rating(n) { return String(n).replace(".", ","); }
  function cari(id) { return KULINER.filter(function (k) { return k.id === id; })[0]; }
  function param(n) { return new URLSearchParams(location.search).get(n); }

  function badge(status) {
    var kelas = status === "READY" ? "st-ready" : status === "HABIS" ? "st-habis" : "st-belum";
    return '<span class="status-badge ' + kelas + '">' + status + "</span>";
  }
  function sedangBuka(k) { var j = new Date().getHours(); return j >= k.jamBuka && j < k.jamTutup; }

  /* ---------- Pengguna (tanpa kata sandi, hanya nama tampilan) ---------- */
  function pengguna() { return baca("local", "sr_user", null); }
  function favorit() { return baca("local", "sr_fav", []); }
  function riwayat() { return baca("local", "sr_riwayat", []); }
  function semuaUlasan() { return baca("local", "sr_ulasan", {}); }

  /* ---------- Kartu kuliner ---------- */
  function kartu(k) {
    var fav = favorit().indexOf(k.id) > -1;
    var tombol = fav ? "♥ Tersimpan" : "♡ Simpan" + (pengguna() ? "" : " • Masuk");
    return '<div class="col-12 col-md-6 col-lg-4"><article class="kartu-kuliner h-100">' +
      '<img src="' + k.foto + '" alt="' + esc(k.nama) + '" loading="lazy">' +
      '<div class="kartu-isi">' +
      '<div class="d-flex justify-content-between small"><span class="label-kat">' + k.kategori + '</span><span class="muted">' + k.area + ", Surakarta</span></div>" +
      '<h3 class="judul-kartu">' + esc(k.nama) + "</h3>" +
      '<p class="small mb-2">' + esc(k.deskripsi) + "</p>" +
      '<div class="d-flex justify-content-between small fw-bold mb-2"><span>★ ' + rating(k.rating) + "</span><span>" + rentang(k) + "</span></div>" +
      '<a class="btn btn-sr w-100 mb-3" href="detail.html?id=' + k.id + '">Lihat menu dan harga</a>' +
      '<div class="small mb-1">' + badge(k.status) + ' <span class="ms-1">Porsi saji: ' + k.porsi + "</span></div>" +
      '<div class="small mb-1">Jam buka ' + k.buka.replace("–", "–") + "</div>" +
      '<div class="small muted mb-3">Contoh pembaruan: 9 Nov 2026, 09.45 WIB</div>' +
      '<button type="button" class="btn btn-sr-outline w-100" data-action="simpan" data-id="' + k.id + '">' + tombol + "</button>" +
      "</div></article></div>";
  }
  function isiKartu(el, daftar) { el.innerHTML = daftar.map(kartu).join(""); }

  /* ---------- Modal panel (Masuk, Favorit, Riwayat, Ulasan, WhatsApp) ---------- */
  var modalEl, modalObj;
  function panel(judul, html) {
    modalEl = modalEl || $("#panelModal");
    if (!modalEl || !window.bootstrap) return;
    $("#panelJudul").textContent = judul;
    $("#panelIsi").innerHTML = html;
    modalObj = modalObj || new bootstrap.Modal(modalEl);
    modalObj.show();
  }
  function tutupPanel() { if (modalObj) modalObj.hide(); }

  function panelMasuk(lanjut) {
    panel("Masuk (opsional)",
      '<p class="small">Masuk hanya untuk Favorit, Riwayat, dan ulasan. Cukup isi nama; kami tidak meminta kata sandi.</p>' +
      '<label class="form-label fw-bold small" for="inpNama">Nama</label>' +
      '<input id="inpNama" class="form-control mb-3" maxlength="40" placeholder="Nama tampilan">' +
      '<button type="button" class="btn btn-sr w-100" id="btnMasuk">Masuk</button>');
    $("#btnMasuk").onclick = function () {
      var n = $("#inpNama").value.trim();
      if (!n) { $("#inpNama").classList.add("is-invalid"); return; }
      simpan("local", "sr_user", n);
      tutupPanel(); perbaruiAkun();
      if (lanjut) lanjut();
    };
  }
  function panelAkun() {
    panel("Halo, " + esc(pengguna()),
      '<p class="small">Anda sedang masuk. Favorit, Riwayat, dan ulasan tersimpan di browser ini.</p>' +
      '<button type="button" class="btn btn-sr-outline w-100" id="btnKeluar">Keluar</button>');
    $("#btnKeluar").onclick = function () { hapus("local", "sr_user"); tutupPanel(); perbaruiAkun(); segarkanKartu(); };
  }
  function daftarTautan(ids, kosong) {
    if (!ids.length) return '<p class="small muted mb-0">' + kosong + "</p>";
    return '<ul class="list-unstyled mb-0">' + ids.map(cari).filter(Boolean).map(function (k) {
      return '<li class="mb-2"><a class="fw-bold" href="detail.html?id=' + k.id + '">' + esc(k.nama) + '</a> <span class="small muted">· ' + k.area + "</span></li>";
    }).join("") + "</ul>";
  }
  function panelFavorit() { panel("Favorit", daftarTautan(favorit(), "Belum ada favorit. Tekan “Simpan” pada kartu kuliner.")); }
  function panelRiwayat() { panel("Riwayat", daftarTautan(riwayat(), "Belum ada riwayat. Buka halaman menu untuk mulai mencatat.")); }
  function panelUlasan() {
    var u = semuaUlasan(), h = "";
    Object.keys(u).forEach(function (id) {
      var k = cari(id); if (!k) return;
      u[id].forEach(function (r) {
        h += '<div class="mb-3"><a class="fw-bold" href="detail.html?id=' + id + '">' + esc(k.nama) + '</a> <span class="rating-bintang">' +
          "★".repeat(r.rating) + "</span><p class=\"small mb-0\">" + esc(r.teks) + "</p></div>";
      });
    });
    panel("Ulasan Saya", h || '<p class="small muted mb-0">Belum ada ulasan.</p>');
  }
  function panelWA(k) {
    panel("Hubungi penjual via WhatsApp",
      '<p class="small mb-1">Nomor WhatsApp penjual</p><p class="fs-4 fw-bold mb-2">' + NOMOR_WA + "</p>" +
      '<p class="small muted">Tanyakan menu, harga, atau stok sebelum datang.</p>' +
      '<a class="btn btn-sr w-100" target="_blank" rel="noopener" href="' + LINK_WA + "?text=" +
      encodeURIComponent("Halo, saya mau tanya menu dan stok di " + k.nama) + '">Buka WhatsApp</a>');
  }

  function perbaruiAkun() {
    var n = pengguna();
    $$('[data-action="masuk"]').forEach(function (b) { b.textContent = n ? "Halo, " + n : "Masuk"; });
  }

  /* ---------- Aksi global (delegasi klik) ---------- */
  function segarkanKartu() { if (window.__render) window.__render(); }
  function toggleFavorit(id) {
    var f = favorit(), i = f.indexOf(id);
    if (i > -1) f.splice(i, 1); else f.push(id);
    simpan("local", "sr_fav", f);
    segarkanKartu();
  }
  document.addEventListener("click", function (e) {
    var t = e.target.closest("[data-action]"); if (!t) return;
    var a = t.getAttribute("data-action");
    if (a === "masuk") { pengguna() ? panelAkun() : panelMasuk(); }
    else if (a === "favorit") panelFavorit();
    else if (a === "riwayat") panelRiwayat();
    else if (a === "ulasan") panelUlasan();
    else if (a === "simpan") {
      var id = t.getAttribute("data-id");
      if (!pengguna()) panelMasuk(function () { toggleFavorit(id); }); else toggleFavorit(id);
    } else if (a === "wa") panelWA(cari(t.getAttribute("data-id")));
  });

  /* ---------- Filter ---------- */
  var FILTER_AWAL = { kategori: "Semua", area: "Semua area", min: 0, max: 100000, rating: 0, status: "Semua", promo: false, buka: false };
  function terapkan(daftar, q, tag, f) {
    return daftar.filter(function (k) {
      if (q) {
        var s = (k.nama + " " + k.area + " " + k.deskripsi + " " + k.tags.join(" ")).toLowerCase();
        if (s.indexOf(q.toLowerCase()) < 0) return false;
      }
      if (tag && k.tags.indexOf(tag) < 0 && k.kategori !== tag) return false;
      if (f) {
        if (f.kategori !== "Semua" && k.tags.indexOf(f.kategori) < 0) return false;
        if (f.area !== "Semua area" && k.area !== f.area) return false;
        if (k.max < f.min || k.min > f.max) return false;
        if (k.rating < f.rating) return false;
        if (f.status !== "Semua" && k.status !== f.status) return false;
        if (f.promo) return false; /* belum ada promo terkonfirmasi di data contoh */
        if (f.buka && !sedangBuka(k)) return false;
      }
      return true;
    });
  }

  /* ---------- Halaman ---------- */
  var halaman = document.body.getAttribute("data-page");

  function initBeranda() {
    window.__render = function () { isiKartu($("#daftar-pilihan"), KULINER); };
    window.__render();
  }

  function initJelajah() {
    var q = param("q") || "", tag = param("tag") || "";
    var f = param("f") ? baca("session", "sr_filter", null) : null;
    var judul = $("#judul-hasil"), jumlah = $("#jumlah"), wadah = $("#daftar-hasil"), kosong = $("#keadaan-kosong"), galat = $("#keadaan-galat");
    if (q) $("#inpCari").value = q;
    if (f) { judul.textContent = "Hasil Filter"; $("#ringkas-filter").classList.remove("d-none"); }
    else if (tag) judul.textContent = tag;
    window.__render = function () {
      kosong.classList.add("d-none"); galat.classList.add("d-none");
      var hasil;
      try { hasil = terapkan(KULINER, q, tag, f); } catch (err) { wadah.innerHTML = ""; jumlah.textContent = ""; galat.classList.remove("d-none"); return; }
      jumlah.textContent = hasil.length + " kuliner ditemukan";
      if (!hasil.length) { wadah.innerHTML = ""; kosong.classList.remove("d-none"); return; }
      isiKartu(wadah, hasil);
    };
    $$('[data-action="hapus-filter"]').forEach(function (b) {
      b.onclick = function () { hapus("session", "sr_filter"); location.href = "jelajah.html"; };
    });
    $$('[data-action="coba-lagi"]').forEach(function (b) { b.onclick = function () { window.__render(); }; });
    window.__render();
  }

  function initFilter() {
    var s = Object.assign({}, FILTER_AWAL, baca("session", "sr_filter", {}));
    var area = $("#fArea");
    area.innerHTML = '<option>Semua area</option>' + Array.from(new Set(KULINER.map(function (k) { return k.area; }))).sort()
      .map(function (a) { return "<option>" + a + "</option>"; }).join("");
    function pilihGrup(nama, nilai) {
      $$('[data-grup="' + nama + '"] .chip').forEach(function (c) { c.classList.toggle("aktif", c.getAttribute("data-nilai") === String(nilai)); });
    }
    function tampil() {
      pilihGrup("kategori", s.kategori); pilihGrup("rating", s.rating); pilihGrup("status", s.status);
      area.value = s.area; $("#fMin").value = s.min; $("#fMax").value = s.max;
      $("#fPromo").checked = s.promo; $("#fBuka").checked = s.buka;
    }
    $$(".chip[data-nilai]").forEach(function (c) {
      c.onclick = function () {
        var g = c.parentNode.getAttribute("data-grup"), v = c.getAttribute("data-nilai");
        s[g] = g === "rating" ? Number(v) : v; tampil();
      };
    });
    tampil();
    $("#formFilter").addEventListener("submit", function (e) {
      e.preventDefault();
      s.area = area.value; s.min = Number($("#fMin").value) || 0; s.max = Number($("#fMax").value) || 0;
      s.promo = $("#fPromo").checked; s.buka = $("#fBuka").checked;
      var err = $("#galatHarga");
      if (s.max < s.min) { err.classList.remove("d-none"); return; }
      err.classList.add("d-none");
      simpan("session", "sr_filter", s);
      location.href = "jelajah.html?f=1";
    });
    $("#resetFilter").onclick = function () { s = Object.assign({}, FILTER_AWAL); hapus("session", "sr_filter"); tampil(); };
  }

  function initDetail() {
    var k = cari(param("id") || "warung-selat-mbak-lies");
    var isi = $("#isi-detail"), galat = $("#galat-detail");
    if (!k) { isi.classList.add("d-none"); galat.classList.remove("d-none"); return; }
    document.title = k.nama + " | SoloRasa";
    var r = riwayat().filter(function (x) { return x !== k.id; }); r.unshift(k.id); simpan("local", "sr_riwayat", r.slice(0, 10));

    $("#d-nama").textContent = k.nama;
    $("#d-bc").textContent = k.nama;
    $("#d-meta").innerHTML = "Selat Solo · " + k.kategori + ' <span class="mx-1">·</span> <span class="rating-bintang">★</span> <b>' + rating(k.rating) + "</b> (" + k.ulasan + " ulasan)";
    $("#d-status").innerHTML = "Buka " + k.buka + " · " + '<b class="teks-hijau">' + (k.status === "READY" ? "Menu ready, masih tersedia" : k.status === "HABIS" ? "Sebagian menu habis" : "Status menu belum terkonfirmasi") + "</b>";
    $("#d-foto").src = k.fotoDetail || k.foto; $("#d-foto").alt = k.nama;
    $("#d-alamat").textContent = k.alamat; $("#d-jam").textContent = "Setiap hari, " + k.buka.replace("–", " – ");
    $("#d-statusmenu").innerHTML = badge(k.status); $("#d-est").textContent = rentang(k);
    $("#d-menu").innerHTML = k.menu.map(function (m) {
      return '<div class="item-menu"><div><b>' + esc(m[0]) + '</b> <span class="ms-2">' + rp(m[1]) + '</span></div><div class="small muted">' + esc(m[2]) + "</div></div>";
    }).join("");
    $("#d-stok").innerHTML = k.menu.map(function (m) {
      var st = m[3] || k.status;
      return '<div class="d-flex justify-content-between align-items-start mb-2"><div><b class="small">' + esc(m[0]) + '</b><div class="small muted">' +
        (st === "BELUM TERKONFIRMASI" ? "Status belum terkonfirmasi" : st) + " • contoh pembaruan 9 Nov 2026, 09.45 WIB</div></div>" + badge(st) + "</div>";
    }).join("");
    $("#d-ringkasan").textContent = k.ringkasan || "Belum ada ringkasan ulasan untuk tempat ini.";
    $$('[data-action="wa"]').forEach(function (b) { b.setAttribute("data-id", k.id); });
    var bf = $("#d-simpan"); bf.setAttribute("data-id", k.id);
    window.__render = function () { bf.textContent = favorit().indexOf(k.id) > -1 ? "♥ Tersimpan" : "♡ Simpan" + (pengguna() ? "" : " • Masuk"); };
    window.__render();

    /* Ulasan */
    var nilai = 0, bintang = $$("#d-bintang button");
    function gambarBintang() { bintang.forEach(function (b, i) { b.textContent = i < nilai ? "★" : "☆"; b.classList.toggle("on", i < nilai); }); }
    bintang.forEach(function (b, i) { b.onclick = function () { nilai = i + 1; gambarBintang(); }; });
    gambarBintang();
    function daftarUlasan() {
      var u = semuaUlasan()[k.id] || [];
      $("#d-ulasan").innerHTML = u.map(function (x) {
        return '<div class="small mb-2"><b>' + esc(x.nama) + '</b> <span class="rating-bintang">' + "★".repeat(x.rating) + "</span><br>" + esc(x.teks) + "</div>";
      }).join("");
    }
    daftarUlasan();
    $("#d-kirim").onclick = function () {
      var teks = $("#d-teks").value.trim(), galatU = $("#d-galat-ulasan");
      function kirim() {
        if (!nilai || !teks) { galatU.classList.remove("d-none"); return; }
        galatU.classList.add("d-none");
        var u = semuaUlasan(); (u[k.id] = u[k.id] || []).unshift({ nama: pengguna(), rating: nilai, teks: teks });
        simpan("local", "sr_ulasan", u); $("#d-teks").value = ""; nilai = 0; gambarBintang(); daftarUlasan();
      }
      if (!pengguna()) panelMasuk(kirim); else kirim();
    };
    $("#d-serupa").href = "jelajah.html?tag=" + encodeURIComponent(k.tags[0]);
  }

  function initPeta() {
    var aktif = {}, terpilih = null;
    var daftar = $("#daftar-terdekat"), pins = $("#pins");
    function data() {
      var h = KULINER.slice();
      if (aktif.harga) h = h.filter(function (k) { return k.min <= 25000; });
      if (aktif.jenis) h = h.filter(function (k) { return k.tags.indexOf("Makanan berat") > -1; });
      if (aktif.buka) h = h.filter(sedangBuka);
      if (aktif.dekat) h.sort(function (a, b) { return a.jarak - b.jarak; });
      return h;
    }
    window.__render = function () {
      var h = data();
      pins.innerHTML = h.map(function (k, i) {
        return '<button type="button" class="pin' + (terpilih === k.id ? " aktif" : "") + '" style="left:' + k.peta.x + "%;top:" + k.peta.y + '%" data-pin="' + k.id + '" aria-label="' + esc(k.nama) + '">' + (KULINER.indexOf(k) + 1) + "</button>";
      }).join("");
      $("#jumlah-peta").textContent = h.length + " Lokasi Terdekat";
      daftar.innerHTML = h.length ? h.map(function (k) {
        var fav = favorit().indexOf(k.id) > -1;
        return '<article class="kartu-mini' + (terpilih === k.id ? " aktif" : "") + '" id="m-' + k.id + '"><img src="' + k.foto + '" alt="' + esc(k.nama) + '" loading="lazy"><div class="flex-grow-1">' +
          '<div class="d-flex justify-content-between"><h3 class="judul-mini">' + esc(k.nama) + '</h3><span class="small fw-bold">★ ' + rating(k.rating) + "</span></div>" +
          '<div class="small muted">' + k.area + " · " + String(k.jarak).replace(".", ",") + " km</div><div class=\"small fw-bold mt-1\">" + rentang(k) + "</div>" +
          '<a class="small fw-bold tautan-sr d-block my-1" href="detail.html?id=' + k.id + '">Lihat menu dan harga</a>' +
          '<div class="small mb-2">' + badge(k.status) + " Porsi saji: " + k.porsi + "</div>" +
          '<button type="button" class="btn btn-sr-outline btn-sm w-100" data-action="simpan" data-id="' + k.id + '">' + (fav ? "♥ Tersimpan" : "♡ Simpan" + (pengguna() ? "" : " • Masuk")) + "</button></div></article>";
      }).join("") : '<p class="muted">Tidak ada lokasi yang cocok. Coba matikan salah satu filter.</p>';
    };
    pins.addEventListener("click", function (e) {
      var p = e.target.closest("[data-pin]"); if (!p) return;
      terpilih = p.getAttribute("data-pin"); window.__render();
      var el = $("#m-" + terpilih); if (el) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    $$("[data-chip]").forEach(function (c) {
      c.onclick = function () { var n = c.getAttribute("data-chip"); aktif[n] = !aktif[n]; c.classList.toggle("aktif", aktif[n]); window.__render(); };
    });
    $("#btnLokasi").onclick = function () {
      var info = $("#info-lokasi");
      if (!navigator.geolocation) { info.textContent = "Browser tidak mendukung lokasi. Pilih area secara manual."; return; }
      info.textContent = "Mencari lokasi…";
      navigator.geolocation.getCurrentPosition(function () {
        info.textContent = "Lokasi diterima. Jarak pada pratinjau ini tetap berupa contoh."; aktif.dekat = true; $('[data-chip="dekat"]').classList.add("aktif"); window.__render();
      }, function () { info.textContent = "Izin lokasi ditolak. Silakan pilih area secara manual."; });
    };
    $("#btnArea").onclick = function () { $("#areaManual").classList.toggle("d-none"); };
    $("#areaManual").addEventListener("change", function (e) {
      var a = e.target.value; if (a) location.href = "jelajah.html?q=" + encodeURIComponent(a);
    });
    window.__render();
  }

  /* ---------- Mulai ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    perbaruiAkun();
    if (halaman === "beranda") initBeranda();
    else if (halaman === "jelajah") initJelajah();
    else if (halaman === "filter") initFilter();
    else if (halaman === "detail") initDetail();
    else if (halaman === "peta") initPeta();
    if (!window.bootstrap) console.warn("Bootstrap JS belum dimuat; modal dan navbar tidak aktif.");
  });
})();
