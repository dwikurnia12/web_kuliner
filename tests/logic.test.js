// Jalankan: node tests/logic.test.js
const assert = require('assert');
const vm = require('vm');
const fs = require('fs');
const path = require('path');
const SR = require('../assets/js/logic.js');
const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(__dirname, '../assets/js/data.js'), 'utf8'), ctx);
const { places } = ctx.window.SOLORASA_DATA;
const m = SR.toMin;
const names = list => list.map(p => p.name);
const base = { q: '', category: 'Semua', area: 'Semua', min: null, max: null, status: 'Semua', promo: false, openNow: false };

// jam buka: lewat tengah malam dan 24:00
assert.equal(SR.isOpenAt('16:00', '01:00', m('00:30')), true);
assert.equal(SR.isOpenAt('16:00', '01:00', m('01:00')), false);
assert.equal(SR.isOpenAt('07:00', '24:00', m('23:59')), true);
assert.equal(SR.isOpenAt('08:00', '18:00', m('18:00')), false);

// pencarian: nama menu, area, tanpa beda huruf besar/kecil
assert.deepEqual(names(SR.applyFilters(places, { ...base, q: 'tengkleng' }, m('10:00'))), ['Sate Kambing & Tengkleng Pak Manto']);
assert.deepEqual(names(SR.applyFilters(places, { ...base, q: 'SERENGAN' }, m('10:00'))), ['Warung Selat Mbak Lies', 'Serabi Notosuman']);
assert.equal(SR.applyFilters(places, { ...base, q: 'pizza' }, m('10:00')).length, 0);

// kategori: label vs jenis; Street Food belum ada datanya
assert.deepEqual(names(SR.applyFilters(places, { ...base, category: 'Jajanan' }, 0)), ['Serabi Notosuman']);
assert.equal(SR.applyFilters(places, { ...base, category: 'Legend' }, 0).length, 3);
// Murah = harga mulai di bawah Rp 20.000, bukan label; pencarian kata "murah" ikut aturan yang sama
for (const f of [{ category: 'Murah' }, { q: 'murah' }]) assert.deepEqual(names(SR.applyFilters(places, { ...base, ...f }, 0)), ['Nasi Liwet Wongso Lemu', 'Wedangan Pak No']);
assert.ok(places.every(p => p.label !== 'Murah' || SR.matchesCategory(p, 'Murah')), 'label Murah harus sesuai harga');
assert.equal(SR.applyFilters(places, { ...base, category: 'Street Food' }, 0).length, 0);

// harga (tumpang tindih rentang) dan validasi
assert.ok(!names(SR.applyFilters(places, { ...base, min: 60000 }, 0)).includes('Warung Selat Mbak Lies'));
assert.deepEqual(names(SR.applyFilters(places, { ...base, max: 20000 }, 0)), ['Nasi Liwet Wongso Lemu', 'Wedangan Pak No']);
assert.equal(SR.validatePrice(50000, 10000), 'Harga maksimum tidak boleh lebih kecil dari minimum.');
assert.equal(SR.validatePrice(0, 10000), '');

// status: READY tidak memasukkan tempat yang hanya punya menu belum terkonfirmasi (riset 5.4)
const ready = names(SR.applyFilters(places, { ...base, status: 'READY' }, 0));
assert.ok(!ready.includes('Timlo Sastro'));
assert.equal(ready.length, 5);

// promo belum ada datanya -> hasil kosong; buka sekarang memakai jam WIB
assert.equal(SR.applyFilters(places, { ...base, promo: true }, 0).length, 0);
assert.deepEqual(names(SR.applyFilters(places, { ...base, openNow: true }, m('00:30'))), ['Nasi Liwet Wongso Lemu']);

// rekomendasi: buka dulu, lalu termurah (status menu contoh tidak ikut menentukan)
assert.deepEqual(names(SR.recommend(places, m('17:00'))).slice(0, 4), ['Wedangan Pak No', 'Nasi Liwet Wongso Lemu', 'Warung Selat Mbak Lies', 'Sate Kambing & Tengkleng Pak Manto']);

// chip filter aktif
assert.deepEqual(SR.activeChips({ ...base, category: 'Jajanan', max: 50000, status: 'READY' }).map(c => c.key), ['category', 'price', 'status']);

// tautan Google Maps tanpa catatan dalam kurung
assert.ok(!decodeURIComponent(SR.dirUrl(places.find(p => p.id === 'wedangan-pak-no'))).includes('('));

// CSV: BOM, 13 kolom, 6 baris data, sel berisi koma diberi tanda kutip
const csv = SR.toCsv(places).replace(/^﻿/, '').trim().split('\r\n');
assert.equal(csv.length, 7);
assert.equal(csv[0].split(',').length, 13);
assert.ok(csv[1].includes('"Jl. Yudhistira No. 9, Serengan, Surakarta"'));


// embed peta Google Maps tanpa API key
assert.ok(SR.embedUrl(places[0]).startsWith('https://maps.google.com/maps?q=') && SR.embedUrl(places[0]).endsWith('&output=embed'));
// rute ½ hari: jam tiba/selesai berantai, semua tempat buka saat dikunjungi, link rute dan CSV
const { routes } = ctx.window.SOLORASA_DATA;
const pagi = SR.planRoute(routes[0], places);
assert.deepEqual(pagi.map(s => SR.fmtMin(s.arrive)), ['08.00', '08.45', '09.45']);
for (const r of routes) assert.ok(SR.planRoute(r, places).every(s => s.openOk), r.id + ': ada tempat tutup saat dikunjungi');
assert.equal(SR.fmtMin(m('23:30') + 60), '00.30');
assert.equal(SR.planRoute({ start: '06:00', stops: [{ id: 'timlo-sastro', travel: 0, stay: 30 }] }, places)[0].openOk, false);
assert.equal(SR.routeUrl(pagi).split('%7C').length, 2);
assert.equal(SR.routeCsv(routes[0], pagi).split('\r\n')[2].split(',')[0], '1');
console.log('logic tests passed');

// rute bebas: nama katalog -> alamat lengkap; asal kosong -> tanpa origin (lokasi pengguna)
const own = SR.customRouteUrl('', 'timlo sastro', places);
assert.ok(decodeURIComponent(own).includes('Jl. Abdul Muis') && !own.includes('origin='));
assert.ok(decodeURIComponent(SR.customRouteUrl('Stasiun Solo Balapan', 'Timlo Sastro', places)).includes('origin=Stasiun Solo Balapan'));
console.log('custom route tests passed');
