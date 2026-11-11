"use strict";

/* ---------- Data ---------- */
const AREAS = ["Laweyan", "Keprabon", "Banjarsari", "Pasar Kliwon", "Serengan", "Jebres"];
const KULINER = [
  { id: "selat-mbak-lies", nama: "Warung Selat Mbak Lies", em: "🥗", jenis: "Selat Solo", kat: "Makanan berat", badge: "Legendaris", rating: 4.7, ulasan: 312, min: 24000, max: 32000, area: "Laweyan", alamat: "Jl. Slamet Riyadi No. 12, Laweyan, Surakarta", jam: "09.00–20.00", buka: true, ready: true, promo: false, x: 30, y: 62,
    menu: [["Selat Solo klasik", "Bistik daging, telur pindang, mustard", 24000], ["Bistik lidah", "Saus kecap manis, kentang goreng", 28000], ["Galantine ayam", "Porsi sedang, sayur rebus", 32000], ["Es kapal", "Minuman segar khas Solo", 8000]],
    ulasanTeks: "Selat paling enak yang pernah saya coba di Solo." },
  { id: "liwet-wongso-lemu", nama: "Nasi Liwet Wongso Lemu", em: "🍚", jenis: "Nasi liwet", kat: "Makanan berat", badge: "Favorit", rating: 4.8, ulasan: 540, min: 15000, max: 25000, area: "Keprabon", alamat: "Jl. Teuku Umar, Keprabon, Surakarta", jam: "17.00–23.00", buka: false, ready: true, promo: true, x: 48, y: 40,
    menu: [["Nasi liwet komplit", "Ayam suwir, telur, sayur labu", 20000], ["Nasi liwet telur", "Kuah santan gurih", 15000], ["Liwet ayam kampung", "Porsi besar", 25000]],
    ulasanTeks: "Kuah santannya pas, porsi mengenyangkan." },
  { id: "serabi-notosuman", nama: "Serabi Notosuman", em: "🥞", jenis: "Jajanan tradisional", kat: "Jajanan", badge: "Budget Friendly", rating: 4.6, ulasan: 880, min: 3000, max: 10000, area: "Banjarsari", alamat: "Jl. Notosuman, Banjarsari, Surakarta", jam: "06.00–17.00", buka: true, ready: true, promo: false, x: 66, y: 24,
    menu: [["Serabi original", "Santan, hangat dari tungku", 3000], ["Serabi cokelat", "Taburan cokelat", 5000], ["Paket isi 10", "Cocok untuk oleh-oleh", 10000]],
    ulasanTeks: "Hangat, manis, dan murah. Wajib mampir." },
  { id: "timlo-sastro", nama: "Timlo Sastro", em: "🍲", jenis: "Makanan berat", kat: "Makanan berat", badge: "Legendaris", rating: 4.5, ulasan: 276, min: 18000, max: 30000, area: "Pasar Kliwon", alamat: "Jl. Pasar Kliwon, Surakarta", jam: "08.00–21.00", buka: true, ready: true, promo: false, x: 72, y: 66,
    menu: [["Timlo komplit", "Sosis solo, ati ampela, telur", 24000], ["Timlo ayam", "Kuah bening segar", 18000], ["Timlo spesial", "Isi lengkap + nasi", 30000]],
    ulasanTeks: "Kuahnya bersih dan segar, cocok untuk sarapan." },
  { id: "sate-buntel", nama: "Sate Buntel Tambak Segaran", em: "🍢", jenis: "Sate", kat: "Street food", badge: "Favorit", rating: 4.7, ulasan: 410, min: 30000, max: 45000, area: "Serengan", alamat: "Jl. Tambak Segaran, Serengan, Surakarta", jam: "10.00–22.00", buka: true, ready: false, promo: true, x: 40, y: 80,
    menu: [["Sate buntel kambing", "2 tusuk, bumbu kecap", 30000], ["Sate buntel + lontong", "Porsi sedang", 38000], ["Paket keluarga", "Untuk 3 orang", 45000]],
    ulasanTeks: "Dagingnya empuk, bumbunya khas." },
  { id: "kopi-tiam-oeng", nama: "Kopi Tiam Oeng", em: "☕", jenis: "Kopi dan cafe", kat: "Kopi dan cafe", badge: "Budget Friendly", rating: 4.4, ulasan: 198, min: 12000, max: 28000, area: "Jebres", alamat: "Jl. Ir. Sutami, Jebres, Surakarta", jam: "07.00–22.00", buka: true, ready: true, promo: false, x: 82, y: 38,
    menu: [["Kopi tubruk", "Seduh tradisional", 12000], ["Es kopi susu", "Gula aren", 18000], ["Roti bakar", "Selai srikaya", 28000]],
    ulasanTeks: "Tempat nyaman untuk kerja dan ngobrol." }
];
const CATS = [
  { em: "🏛️", t: "Kuliner legendaris", chip: "legendaris" },
  { em: "🥞", t: "Jajanan tradisional", kat: "Jajanan" },
  { em: "🍢", t: "Street food", kat: "Street food" },
  { em: "🍛", t: "Makanan berat", kat: "Makanan berat" },
  { em: "☕", t: "Kopi dan cafe", kat: "Kopi dan cafe" },
  { em: "💸", t: "Kuliner murah", chip: "murah" }
];

/* ---------- State ---------- */
const DEFAULT_F = { kat: "Semua", area: "Semua area", max: 100000, ready: false, promo: false, buka: false };
let F = { ...DEFAULT_F };
let S = { q: "", chip: "semua" };
let lastId = KULINER[0].id;

const $ = (s, r = document) => r.querySelector(s);
const app = $("#app");
const rp = n => "Rp " + n.toLocaleString("id-ID");
const range = k => `${rp(k.min)}–${k.max.toLocaleString("id-ID")}`;
const num = n => String(n).replace(".", ",");
const find = id => KULINER.find(k => k.id === id);

/* ---------- Filtering ---------- */
function matches(k, f, s) {
  const q = s.q.trim().toLowerCase();
  if (q && !(k.nama + k.jenis + k.area + k.kat).toLowerCase().includes(q)) return false;
  if (s.chip === "legendaris" && k.badge !== "Legendaris") return false;
  if (s.chip === "murah" && k.badge !== "Budget Friendly") return false;
  if (s.chip === "buka" && !k.buka) return false;
  if (f.kat !== "Semua" && k.kat !== f.kat) return false;
  if (f.area !== "Semua area" && k.area !== f.area) return false;
  if (k.min > f.max) return false;
  if (f.ready && !k.ready) return false;
  if (f.promo && !k.promo) return false;
  if (f.buka && !k.buka) return false;
  return true;
}

/* ---------- Komponen ---------- */
const card = k => `
  <article class="card">
    <div class="thumb" aria-hidden="true"><span class="badge">${k.badge}</span>${k.em}</div>
    <div class="card-body">
      <h3>${k.nama}</h3>
      <div class="meta">${k.jenis} · ★ ${num(k.rating)}</div>
      <div class="price">${range(k)}</div>
      <div class="meta">${k.area}, Surakarta</div>
      <a class="btn btn-outline btn-sm" href="#/kuliner/${k.id}">Lihat menu dan harga</a>
    </div>
  </article>`;

const searchBar = (val = "", action = "jelajah") => `
  <form class="search" data-search="${action}" role="search">
    <input type="search" name="q" value="${val}" placeholder="Cari makanan, tempat, atau area" aria-label="Cari makanan, tempat, atau area">
    <button class="btn" type="submit">Cari kuliner</button>
  </form>`;

const crumb = (...p) => `<nav class="crumb" aria-label="Breadcrumb">${p.map(([t, h]) => h ? `<a href="${h}">${t}</a>` : t).join(" / ")}</nav>`;

function mapView(list, activeId) {
  const roads = `<svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
    <path d="M0 62 Q30 55 50 48 T100 30" stroke="#fff" stroke-width="2.4" fill="none"/>
    <path d="M20 0 Q35 45 45 100" stroke="#fff" stroke-width="1.6" fill="none"/>
    <path d="M70 0 Q65 50 78 100" stroke="#E3D3B6" stroke-width="1.6" fill="none"/>
    <path d="M0 15 Q50 25 100 78" stroke="#E3D3B6" stroke-width="1.4" fill="none"/></svg>`;
  return `<div class="map" role="group" aria-label="Peta kuliner Solo">${roads}${list.map(k =>
    `<button class="pin ${k.id === activeId ? "on" : ""}" data-pin="${k.id}" style="left:${k.x}%;top:${k.y}%" aria-label="${k.nama}"><span>${k.em}</span></button>`).join("")}</div>`;
}

const stateView = (icon, title, text, btns) => `
  <section class="state" aria-live="polite"><div class="state-icon" aria-hidden="true">${icon}</div>
  <h2>${title}</h2><p>${text}</p>${btns}</section>`;

/* ---------- Halaman ---------- */
const pages = {
  home() {
    return `
    <section class="hero"><div class="wrap">
      <span class="state-icon" aria-hidden="true" style="font-size:2rem">🥞</span>
      <h1 class="big">Jelajah Kuliner Solo Tanpa Ribet</h1>
      <p>Jelajahi rasa, temukan cerita di setiap sudut Solo. Cari makanan, harga, dan informasi penting dalam satu tempat.</p>
      ${searchBar()}
      <div class="hero-actions"><a class="btn" href="#/jelajah">Jelajahi menu</a><a class="btn btn-outline" href="#/peta">Buka peta</a></div>
    </div></section>
    <div class="wrap">
      <section><h2>Mau makan apa?</h2>
        <div class="cats">${CATS.map((c, i) => `<button class="cat" data-cat="${i}"><i aria-hidden="true">${c.em}</i>${c.t}</button>`).join("")}</div></section>
      <section>
        <div class="sec-head"><div><h2>Pilihan kuliner Solo</h2><p>Legendaris, murah, dan favorit wisatawan.</p></div><a class="btn btn-outline btn-sm" href="#/jelajah">Lihat semua kuliner</a></div>
        <div class="grid">${KULINER.map(card).join("")}</div></section>
      <section>
        <div class="sec-head"><div><h2>Temukan lokasi tempat makan</h2><p>Lihat tempat makan terdekat dari posisimu.</p></div><a class="btn btn-sm" href="#/peta">Buka peta kuliner</a></div>
        <div style="height:280px">${mapView(KULINER)}</div></section>
    </div>`;
  },

  jelajah() {
    const list = KULINER.filter(k => matches(k, DEFAULT_F, S));
    const chips = [["semua", "Semua"], ["legendaris", "Legendaris"], ["murah", "Murah"], ["buka", "Buka sekarang"]];
    return `<div class="wrap"><section>
      ${crumb(["Beranda", "#/"], "Jelajah")}
      <h1>Jelajah Kuliner Solo</h1>
      <div style="margin:14px 0 8px">${searchBar(S.q)}</div>
      <div class="chips" role="group" aria-label="Saring cepat">${chips.map(([v, t]) =>
        `<button class="chip ${S.chip === v ? "on" : ""}" data-chip="${v}" aria-pressed="${S.chip === v}">${t}</button>`).join("")}
        <a class="chip" href="#/filter">Filter kuliner</a></div>
      <div class="sec-head"><h2>Temukan menu pilihanmu</h2><span class="count">${list.length} kuliner ditemukan</span></div>
      ${list.length ? `<div class="grid">${list.map(card).join("")}</div>` : pages.kosong()}
    </section></div>`;
  },

  detail(id) {
    const k = find(id); if (!k) return pages.error();
    lastId = id;
    return `<div class="wrap"><section>
      ${crumb(["Beranda", "#/"], ["Jelajah", "#/jelajah"], k.nama)}
      <h1>${k.nama}</h1>
      <p class="meta">${k.jenis} · ${k.badge} · ★ ${num(k.rating)} (${k.ulasan} ulasan)</p>
      <p class="status"><span class="dot ${k.buka ? "" : "off"}"></span>${k.buka ? "Buka" : "Tutup"} ${k.jam} · ${k.ready ? "Menu ready, masih tersedia" : "Sebagian menu habis"}</p>
    </section>
    <div class="detail" style="padding-bottom:32px">
      <div class="detail-hero" aria-hidden="true">${k.em}</div>
      <div class="panel"><h2>Menu dan harga</h2>
        <ul class="menu-list" style="margin-top:8px">${k.menu.map(m => `<li><div><b>${m[0]}</b><small>${m[1]}</small></div><span class="price">${rp(m[2])}</span></li>`).join("")}</ul>
        <p class="note">Harga bisa berubah. Hubungi penjual untuk info terbaru.</p>
        <div class="row-btns"><button class="btn btn-wa" data-wa>Hubungi via WhatsApp</button><button class="btn btn-outline" data-similar="${k.kat}">Cari kuliner serupa</button></div>
      </div>
      <aside style="display:grid;gap:16px">
        <div class="panel"><h2>Informasi tempat</h2>
          <dl style="margin-top:10px"><div><dt>Alamat</dt><dd>${k.alamat}</dd></div><div><dt>Jam buka</dt><dd>Setiap hari, ${k.jam}</dd></div><div><dt>Status menu</dt><dd>${k.ready ? "Ready" : "Sebagian habis"}</dd></div></dl></div>
        <div style="height:200px">${mapView([k], k.id)}</div>
        <a class="btn btn-outline" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(k.nama + " " + k.alamat)}">Petunjuk arah di Google Maps</a>
        <div class="panel"><h2>Poin, aturan, dan ulasan</h2><p class="meta" style="margin:6px 0">Poin penting menurut pengunjung dan catatan dari penjual.</p>
          <div class="review"><b>★ ${num(k.rating)}</b> ${k.ulasanTeks}</div>
          <p class="meta">Pengunjung bisa menambahkan ulasan setelah mencoba menu.</p></div>
      </aside>
    </div></div>`;
  },

  peta(id) {
    const list = KULINER.filter(k => matches(k, F, { q: "", chip: S.chip === "buka" ? "buka" : "semua" }));
    const on = id || (list[0] && list[0].id);
    return `<div class="wrap"><section>
      ${crumb(["Beranda", "#/"], "Peta")}
      <h1>Peta Kuliner Solo</h1>
      <div style="margin:14px 0 8px">${searchBar("", "peta")}</div>
      <div class="chips"><button class="chip">Dekat saya</button><button class="chip ${S.chip === "buka" ? "on" : ""}" data-chip="${S.chip === "buka" ? "semua" : "buka"}" data-stay>Buka sekarang</button><a class="chip" href="#/filter">Harga</a><a class="chip" href="#/filter">Jenis</a></div>
      ${list.length ? `<div class="map-layout">
        <div class="mini">${list.map((k, i) => `<button class="item ${k.id === on ? "on" : ""}" data-pin="${k.id}"><span class="em" aria-hidden="true">${k.em}</span><span><b>${k.nama}</b><br><span class="meta">${k.area} · ${(1.2 + i * .4).toFixed(1).replace(".", ",")} km</span><br><span class="price">${range(k)}</span></span></button>`).join("")}
          <a class="btn btn-outline btn-sm" href="#/kuliner/${on}">Lihat menu dan harga</a></div>
        ${mapView(list, on)}</div>` : pages.kosong()}
      <div class="form-actions" style="margin-top:16px"><a class="btn btn-outline" href="#/jelajah">Lihat daftar</a><a class="btn" href="#/filter">Filter kuliner</a></div>
    </section></div>`;
  },

  filter() {
    const kats = ["Semua", "Makanan berat", "Jajanan", "Kopi dan cafe", "Street food"];
    const tg = (n, t, d) => `<label class="toggle"><span><b>${t}</b><small>${d}</small></span><input class="switch" type="checkbox" role="switch" name="${n}" ${F[n] ? "checked" : ""}></label>`;
    return `<div class="wrap"><section>
      ${crumb(["Beranda", "#/"], "Filter")}
      <h1>Filter Kuliner</h1><p class="meta" style="margin:6px 0 20px">Pilih kategori, area, dan harga untuk mempersempit hasil.</p>
      <form class="form" id="filter-form">
        <div class="field"><span class="lab">Kategori</span><div class="chips" style="flex-wrap:wrap">${kats.map(c => `<label class="chip ${F.kat === c ? "on" : ""}"><input type="radio" name="kat" value="${c}" ${F.kat === c ? "checked" : ""} hidden>${c}</label>`).join("")}</div></div>
        <div class="field"><label for="area">Area</label><select id="area" name="area"><option>Semua area</option>${AREAS.map(a => `<option ${F.area === a ? "selected" : ""}>${a}</option>`).join("")}</select></div>
        <div class="field"><label for="max">Kisaran harga: <output id="out">Rp 0–${F.max.toLocaleString("id-ID")}</output></label>
          <input id="max" name="max" type="range" min="5000" max="100000" step="5000" value="${F.max}"><div class="range"><span>Rp 0</span><span>Rp 100.000</span></div></div>
        <div>${tg("ready", "Menu tersedia", "Tampilkan hanya yang menunya ready")}${tg("promo", "Sedang promo", "Tempat yang sedang ada potongan harga")}${tg("buka", "Buka sekarang", "Sesuai jam operasional hari ini")}</div>
        <p class="note">Data diperbarui oleh penjual. Cek ulang langsung di tempat bila perlu.</p>
        <div class="form-actions"><button type="button" class="btn btn-outline" id="reset">Reset filter</button><button class="btn" type="submit">Terapkan filter</button></div>
      </form></section></div>`;
  },

  hasil() {
    const list = KULINER.filter(k => matches(k, F, { q: S.q, chip: "semua" }));
    const act = [];
    if (F.kat !== "Semua") act.push(["kat", F.kat]);
    if (F.area !== "Semua area") act.push(["area", F.area]);
    if (F.max < 100000) act.push(["max", `Rp 0–${F.max.toLocaleString("id-ID")}`]);
    if (F.ready) act.push(["ready", "Menu tersedia"]);
    if (F.promo) act.push(["promo", "Sedang promo"]);
    if (F.buka) act.push(["buka", "Buka sekarang"]);
    return `<div class="wrap"><section>
      ${crumb(["Beranda", "#/"], "Hasil filter")}
      <h1>Hasil Filter</h1>
      <div style="margin:14px 0 8px">${searchBar(S.q, "hasil")}</div>
      <div class="active-filters">${act.map(([k, t]) => `<button data-rm="${k}" aria-label="Hapus filter ${t}">${t} ✕</button>`).join("")}<a class="chip" href="#/filter">Filter kuliner</a></div>
      <div class="sec-head"><h2>Temukan menu pilihanmu</h2><span class="count">${list.length} kuliner ditemukan</span></div>
      ${list.length ? `<div class="grid">${list.map(card).join("")}</div><div style="text-align:center;margin-top:20px"><a class="btn btn-outline" href="#/jelajah">Lihat pilihan kuliner lain</a></div>` : pages.kosong()}
    </section></div>`;
  },

  kosong() {
    return stateView("🍽️", "Belum ada hasil yang cocok", "Coba kurangi filter atau ganti kata kunci pencarian.",
      `<a class="btn" href="#/filter">Ubah filter</a><button class="btn btn-outline" id="clear-all">Hapus filter dan lihat semua</button>`);
  },

  error() {
    return `<div class="wrap">${stateView("⚠️", "Informasi belum dapat dimuat", "Koneksi terputus atau data belum tersedia. Periksa internetmu lalu coba lagi.",
      `<button class="btn" id="retry">Coba lagi</button><a class="btn btn-outline" href="#/">Kembali ke beranda</a>`)}</div>`;
  }
};

/* ---------- Router ---------- */
let prevHash = "#/";
function route() {
  const h = location.hash || "#/";
  const [, seg, id] = h.split("/");
  let html;
  try {
    if (!seg) html = pages.home();
    else if (seg === "jelajah") html = pages.jelajah();
    else if (seg === "kuliner") html = pages.detail(id);
    else if (seg === "peta") html = pages.peta(id);
    else if (seg === "filter") html = pages.filter();
    else if (seg === "hasil") html = pages.hasil();
    else html = pages.error();
  } catch (e) { html = pages.error(); }
  if (seg !== "error" && seg) prevHash = h;
  app.innerHTML = html;
  const key = !seg ? "home" : seg === "kuliner" || seg === "hasil" ? "jelajah" : seg;
  document.querySelectorAll("[data-nav]").forEach(a => a.classList.toggle("on", a.dataset.nav === key));
  window.scrollTo(0, 0);
}
addEventListener("hashchange", route);
addEventListener("DOMContentLoaded", route);

/* ---------- Modal WA ---------- */
const modal = $("#modal");
const openWA = () => { modal.hidden = false; $("[data-close]").focus(); };
const closeWA = () => { modal.hidden = true; };
modal.addEventListener("click", e => { if (e.target === modal || e.target.closest("[data-close]")) closeWA(); });
addEventListener("keydown", e => { if (e.key === "Escape" && !modal.hidden) closeWA(); });

/* ---------- Event delegation ---------- */
document.addEventListener("click", e => {
  const t = e.target;
  const wa = t.closest("[data-wa]"); if (wa) return openWA();
  const cat = t.closest("[data-cat]");
  if (cat) {
    const c = CATS[cat.dataset.cat];
    F = { ...DEFAULT_F }; S = { q: "", chip: c.chip || "semua" };
    if (c.kat) { F.kat = c.kat; location.hash = "#/hasil"; } else location.hash = "#/jelajah";
    return;
  }
  const chip = t.closest("[data-chip]");
  if (chip) { S.chip = chip.dataset.chip; return route(); }
  const pin = t.closest("[data-pin]");
  if (pin) { const m = location.hash.startsWith("#/peta"); if (m) { location.hash = "#/peta/" + pin.dataset.pin; } else location.hash = "#/kuliner/" + pin.dataset.pin; return; }
  const sim = t.closest("[data-similar]");
  if (sim) { F = { ...DEFAULT_F, kat: sim.dataset.similar }; S = { q: "", chip: "semua" }; location.hash = "#/hasil"; return; }
  const rm = t.closest("[data-rm]");
  if (rm) { const k = rm.dataset.rm; F[k] = DEFAULT_F[k]; return route(); }
  if (t.closest("#clear-all")) { F = { ...DEFAULT_F }; S = { q: "", chip: "semua" }; location.hash = "#/jelajah"; if (location.hash === "#/jelajah") route(); return; }
  if (t.closest("#reset")) { F = { ...DEFAULT_F }; return route(); }
  if (t.closest("#retry")) { location.hash = prevHash; return route(); }
});

document.addEventListener("submit", e => {
  const f = e.target;
  if (f.matches("[data-search]")) {
    e.preventDefault();
    S.q = new FormData(f).get("q");
    const to = "#/" + f.dataset.search;
    if (location.hash === to) route(); else location.hash = to;
  } else if (f.id === "filter-form") {
    e.preventDefault();
    const d = new FormData(f);
    F = { kat: d.get("kat") || "Semua", area: d.get("area"), max: +d.get("max"), ready: d.has("ready"), promo: d.has("promo"), buka: d.has("buka") };
    S.q = ""; location.hash = "#/hasil"; route();
  }
});

document.addEventListener("input", e => {
  if (e.target.id === "max") $("#out").textContent = `Rp 0–${(+e.target.value).toLocaleString("id-ID")}`;
});
document.addEventListener("change", e => {
  if (e.target.name === "kat") document.querySelectorAll("#filter-form .chip").forEach(c => c.classList.toggle("on", c.querySelector("input").checked));
});
