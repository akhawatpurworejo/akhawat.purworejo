/* Akhawat: mengambil isi situs dari database (diatur lewat halaman admin).
   Kalau gagal dimuat, halaman tetap memakai teks bawaan di dalam file HTML. */
(function () {
  var SB = 'https://devtjgsanfuehpyhaabi.supabase.co', KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRldnRqZ3NhbmZ1ZWhweWhhYWJpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTQ4MzAzMjMsImV4cCI6MjExMDQwNjMyM30.gBZ6niRTLrwLin5xsav3XOf1bgGbs9aeTE9YOfpCyeY', CK = 'akw_web_v1';
  function get(o, p) {
    return p.split('.').reduce(function (a, k) { return a == null ? a : a[k]; }, o);
  }
  function filled(v) { return v !== undefined && v !== null && String(v).trim() !== ''; }
  function setText(el, val) {
    var parts = String(val).split('\n');
    el.textContent = '';
    parts.forEach(function (p, i) {
      if (i) el.appendChild(document.createElement('br'));
      el.appendChild(document.createTextNode(p));
    });
  }
  function normWa(n) {
    n = String(n || '').replace(/\D/g, '');
    if (n.charAt(0) === '0') n = '62' + n.slice(1);
    return n;
  }
  function igUrl(v) {
    v = String(v || '').trim();
    if (!v) return '';
    if (/^https?:\/\//i.test(v)) return v;
    return 'https://www.instagram.com/' + v.replace(/^@/, '').replace(/\/+$/, '') + '/';
  }
  function apply(W) {
    if (!W) return;
    document.querySelectorAll('[data-k]').forEach(function (el) {
      var v = get(W, el.getAttribute('data-k'));
      if (filled(v)) setText(el, v);
    });
    var wa = normWa(get(W, 'global.wa')), msg = get(W, 'global.wa_msg');
    document.querySelectorAll('a[data-wa]').forEach(function (a) {
      if (!wa) return;
      var txt = filled(msg) ? encodeURIComponent(msg) : (a.href.split('?text=')[1] || '');
      a.href = 'https://wa.me/' + wa + (txt ? '?text=' + txt : '');
    });
    var ig = igUrl(get(W, 'global.ig'));
    if (ig) document.querySelectorAll('a[data-ig]').forEach(function (a) { a.href = ig; });
    document.querySelectorAll('[data-img]').forEach(function (el) {
      var u = get(W, el.getAttribute('data-img')), old = el.querySelector('img.akw-img');
      if (old) old.remove();
      el.classList.remove('has-img');
      if (filled(u)) {
        var im = document.createElement('img');
        im.className = 'akw-img'; im.alt = ''; im.src = u;
        el.insertBefore(im, el.firstChild);
        el.classList.add('has-img');
      }
    });
  }
  function run() {
    try { var c = localStorage.getItem(CK); if (c) apply(JSON.parse(c)); } catch (e) {}
    fetch(SB + '/rest/v1/settings?key=eq.web&select=value', { headers: { apikey: KEY, Authorization: 'Bearer ' + KEY } })
      .then(function (r) { if (!r.ok) throw 0; return r.json(); })
      .then(function (d) {
        if (!d.length) return;
        apply(d[0].value);
        try { localStorage.setItem(CK, JSON.stringify(d[0].value)); } catch (e) {}
      })
      .catch(function () {});
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();

/* Hiasan: motif latar + maskot di semua halaman (file gambar ada di folder assets) */
(function () {
  function init() {
    /* Halaman yang latarnya tertutup warna penuh (mis. Beranda): motif dipasang di atas, tipis & tembus pandang */
    var hasBefore = false;
    try { hasBefore = getComputedStyle(document.body, '::before').content.replace(/["']/g, '') !== 'none'; } catch (e) {}
    if (!hasBefore && !document.getElementById('akw-over')) {
      var ov = document.createElement('style');
      ov.id = 'akw-over';
      ov.textContent = 'body::after{content:"";position:fixed;inset:0;background:url(assets/pattern.webp) center/cover;opacity:.2;mix-blend-mode:multiply;z-index:1;pointer-events:none}';
      document.head.appendChild(ov);
    }
    if (!document.getElementById('akw-deco')) {
      var st = document.createElement('style');
      st.id = 'akw-deco';
      st.textContent =
        'body{position:relative}' +
        'body::before{content:"";position:fixed;inset:0;background:url(assets/pattern.webp) center/cover;opacity:.28;z-index:-1;pointer-events:none}' +
        '.page-hero,.hero-wrap{position:relative;overflow:hidden}' +
        '.page-hero{background:linear-gradient(rgba(238,229,216,.86),rgba(238,229,216,.86)),url(assets/pattern.webp) center/cover}' +
        '.page-hero>div{position:relative;z-index:1}' +
        '.mascot{position:absolute;right:max(24px,calc(50% - 560px));bottom:0;height:270px;width:auto;max-width:42vw;object-fit:contain;z-index:0;pointer-events:none;filter:drop-shadow(0 8px 14px rgba(52,40,32,.12))}' +
        '@media(max-width:760px){.mascot{height:150px;right:10px}.page-hero .lead{padding-right:95px}.page-hero .display{padding-right:40px}}';
      document.head.appendChild(st);
    }
    var hero = document.querySelector('.page-hero');
    if (hero && !hero.querySelector('.mascot') && !/layanan|pesan/.test(location.pathname)) {
      var f = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
      var map = { tentang: 'duo', 'visi-misi': 'point', testimoni: 'gift', 'testimoni-form': 'gift', kontak: 'cs' };
      if (map[f]) {
        var im = document.createElement('img');
        im.className = 'mascot'; im.alt = ''; im.setAttribute('aria-hidden', 'true');
        im.src = 'assets/' + map[f] + '.webp';
        hero.appendChild(im);
      }
    }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
