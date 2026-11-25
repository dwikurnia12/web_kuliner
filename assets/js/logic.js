/* Logika murni SoloRasa (tanpa DOM) — dipakai halaman dan diuji di tests/logic.test.js */
(function (root) {
  const LABELS = ['Legend', 'Favorit'];
  const MURAH = 20000; // batas harga mulai per orang; samakan dengan catatan di filter (app.js)

  function toMin(hhmm) { const [h, m] = String(hhmm).split(':').map(Number); return h * 60 + (m || 0); }

  /* Jam buka bisa melewati tengah malam (16:00–01:00); "24:00" berarti tengah malam. */
  function isOpenAt(open, close, nowMin) {
    const o = toMin(open), c = toMin(close);
    return c > o ? (nowMin >= o && nowMin < c) : (nowMin >= o || nowMin < c);
  }

  function nowWib(date) {
    const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(date || new Date());
    return +parts.find(p => p.type === 'hour').value * 60 + +parts.find(p => p.type === 'minute').value;
  }

  const fold = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  /* Pencarian mencocokkan nama tempat, area, alamat, jenis makanan, dan nama menu (riset 5.4). */
  function matchesQuery(place, q) {
    const words = fold(q).split(/\s+/).filter(Boolean);
    if (!words.length) return true;
    const hay = fold([place.name, place.area, place.address, place.dish, place.category, place.label, place.priceMin < MURAH ? 'Murah' : '', ...place.menu.map(m => m.name)].join(' '));
    return words.every(w => hay.includes(w));
  }

  function matchesCategory(place, cat) {
    if (!cat || cat === 'Semua') return true;
    if (cat === 'Murah') return place.priceMin < MURAH;
    return LABELS.includes(cat) ? place.label === cat : place.category === cat;
  }

  function validatePrice(min, max) {
    if (min != null && max != null && max < min) return 'Harga maksimum tidak boleh lebih kecil dari minimum.';
    return '';
  }

  /* Semua filter digabung dengan AND. Status "READY" hanya cocok untuk menu yang sudah dikonfirmasi READY. */
  function applyFilters(places, f, nowMin) {
    return places.filter(p =>
      matchesQuery(p, f.q) &&
      matchesCategory(p, f.category) &&
      (!f.area || f.area === 'Semua' || p.area === f.area) &&
      (f.min == null || p.priceMax >= f.min) &&
      (f.max == null || p.priceMin <= f.max) &&
      (!f.status || f.status === 'Semua' || p.menu.some(m => m.status === f.status)) &&
      (!f.promo) && // belum ada promo terkonfirmasi di data
      (!f.openNow || isOpenAt(p.open, p.close, nowMin))
    );
  }

  /* Urutan rekomendasi: yang sedang buka, lalu yang lebih hemat. Status menu masih contoh, jadi tidak ikut menentukan. */
  function recommend(places, nowMin) {
    return places
      .map(p => ({ ...p, isOpen: isOpenAt(p.open, p.close, nowMin) }))
      .sort((a, b) => (b.isOpen - a.isOpen) || (a.priceMin - b.priceMin) || a.name.localeCompare(b.name));
  }

  function activeChips(f) {
    const rp = n => 'Rp ' + Number(n).toLocaleString('id-ID');
    const c = [];
    if (f.q) c.push({ key: 'q', label: '“' + f.q + '”' });
    if (f.category && f.category !== 'Semua') c.push({ key: 'category', label: f.category });
    if (f.area && f.area !== 'Semua') c.push({ key: 'area', label: f.area });
    if (f.min != null || f.max != null) c.push({ key: 'price', label: (f.min != null ? rp(f.min) : 'Rp 0') + '–' + (f.max != null ? rp(f.max) : '…') });
    if (f.status && f.status !== 'Semua') c.push({ key: 'status', label: 'Menu ' + (f.status === 'BELUM' ? 'belum terkonfirmasi' : f.status) });
    if (f.promo) c.push({ key: 'promo', label: 'Sedang promo' });
    if (f.openNow) c.push({ key: 'openNow', label: 'Buka sekarang' });
    return c;
  }

  function mapsQuery(p) { return (p.name + ', ' + p.address.replace(/\s*\(.*?\)\s*/g, ' ')).replace(/\s+/g, ' ').trim(); }
  function dirUrl(p) { return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(mapsQuery(p)); }
  function embedUrl(p) { return 'https://maps.google.com/maps?q=' + encodeURIComponent(mapsQuery(p)) + '&z=16&output=embed'; } // tanpa API key
  function searchUrl(p) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(mapsQuery(p)); }

  const COLS = ['Nama', 'Kategori', 'Label', 'Alamat', 'Area', 'Jam buka', 'Harga per orang', 'Harga mulai (Rp)', 'Rating Google', 'Telepon', 'Link Google Maps', 'Petunjuk arah', 'Sumber data'];
  const rowsFor = list => list.map(p => [p.name, p.category, p.label, p.address, p.area, p.open + '–' + p.close, p.priceText, p.priceMin,
    p.rating + ' (' + p.ratingCount + ' ulasan)', p.phone || '', searchUrl(p), dirUrl(p), p.source]);
  const csvCell = v => { const s = String(v ?? ''); return /[",\n;]/.test(s) ? '"' + s.replace(/"/g, '""') + '"' : s; };
  const csv = rows => '﻿' + rows.map(r => r.map(csvCell).join(',')).join('\r\n') + '\r\n'; // BOM agar Excel membaca UTF-8
  function toCsv(list) { return csv([COLS, ...rowsFor(list)]); }

  /* Rute ½ hari: jam tiba/selesai dari jam mulai + perjalanan + lama di tempat; tandai tempat yang tutup saat dikunjungi. */
  const fmtMin = t => { t = ((t % 1440) + 1440) % 1440; return String(Math.floor(t / 60)).padStart(2, '0') + '.' + String(t % 60).padStart(2, '0'); };
  function planRoute(route, places) {
    let t = toMin(route.start);
    return route.stops.map((s, i) => {
      const p = places.find(x => x.id === s.id);
      const arrive = t + s.travel, leave = arrive + s.stay; t = leave;
      return { n: i + 1, p, travel: s.travel, stay: s.stay, arrive, leave,
        openOk: isOpenAt(p.open, p.close, arrive % 1440) && isOpenAt(p.open, p.close, (leave - 1) % 1440) };
    });
  }
  function routeUrl(plan) {
    const q = plan.map(s => encodeURIComponent(mapsQuery(s.p)));
    return 'https://www.google.com/maps/dir/?api=1&destination=' + q[q.length - 1] + (q.length > 1 ? '&waypoints=' + q.slice(0, -1).join('%7C') : '');
  }
  // rute bebas: nama tempat katalog diganti alamat lengkapnya; teks lain dipakai apa adanya; tanpa asal = lokasi pengguna
  function customRouteUrl(from, to, places) {
    const q = v => { const p = places.find(x => x.name.toLowerCase() === v.trim().toLowerCase()); return p ? mapsQuery(p) : v.trim(); };
    return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(q(to)) + (from.trim() ? '&origin=' + encodeURIComponent(q(from)) : '');
  }
  const ROUTE_COLS = ['Urutan', 'Nama', 'Alamat', 'Perjalanan dari sebelumnya (menit)', 'Tiba', 'Selesai', 'Lama di tempat (menit)', 'Jam buka', 'Link Google Maps'];
  function routeCsv(route, plan) {
    return csv([[route.name], ROUTE_COLS, ...plan.map(s => [s.n, s.p.name, s.p.address, s.travel, fmtMin(s.arrive), fmtMin(s.leave), s.stay,
      s.p.open + '–' + s.p.close + (s.openOk ? '' : ' (TUTUP saat jam kunjungan)'), searchUrl(s.p)]),
      [], ['Rute lengkap', routeUrl(plan)], ['Catatan', 'Waktu perjalanan perkiraan; cek di Google Maps.']]);
  }
  function toTsv(list) { return [COLS, ...rowsFor(list)].map(r => r.map(v => String(v ?? '').replace(/[\t\n]/g, ' ')).join('\t')).join('\n'); }

  const api = { toMin, isOpenAt, nowWib, matchesQuery, matchesCategory, validatePrice, applyFilters, recommend, activeChips, dirUrl, searchUrl, embedUrl, toCsv, toTsv, COLS, fmtMin, planRoute, routeUrl, routeCsv, customRouteUrl };
  if (typeof module !== 'undefined' && module.exports) module.exports = api; else root.SR = api;
})(typeof window !== 'undefined' ? window : globalThis);
