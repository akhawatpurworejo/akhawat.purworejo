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

  var MASC = { 'tentang': 'mascot_tentang', 'visi-misi': 'mascot_visi', 'testimoni': 'mascot_testimoni', 'testimoni-form': 'mascot_testimoni', 'kontak': 'mascot_kontak', 'layanan': 'mascot_layanan', 'pesan': 'mascot_pesan' };
  function applyDesign(D) {
    if (!D) return;
    var g = function (k) { return filled(D[k]) ? String(D[k]).trim() : ''; };
    var r = '', css = '';
    if (g('bg')) r += '--paper:' + g('bg') + ';';
    if (g('band')) r += '--cream:' + g('band') + ';';
    if (g('card')) r += '--white:' + g('card') + ';';
    if (g('accent')) r += '--accent:' + g('accent') + ';';
    if (g('ink')) r += '--ink:' + g('ink') + ';';
    if (r) css += ':root{' + r + '}';
    if (g('bg') && /^#[0-9a-f]{6}$/i.test(g('bg'))) css += 'header{background:' + g('bg') + 'ef!important}';
    var fams = [];
    if (g('font_head')) { fams.push(g('font_head')); css += 'h1,h2,h3,.display,.page-title,.brand,.num{font-family:"' + g('font_head') + '",serif!important}'; }
    if (g('font_body')) { fams.push(g('font_body')); css += 'body,input,select,textarea,button{font-family:"' + g('font_body') + '",sans-serif!important}'; }
    if (fams.length) {
      var lk = document.getElementById('akw-font') || document.createElement('link');
      lk.id = 'akw-font'; lk.rel = 'stylesheet';
      lk.href = 'https://fonts.googleapis.com/css2?' + fams.map(function (x) { return 'family=' + x.replace(/ /g, '+') + ':wght@400;500;600;700'; }).join('&') + '&display=swap';
      if (!lk.parentNode) document.head.appendChild(lk);
    }
    if (g('pattern')) {
      var u = g('pattern').replace(/"/g, '');
      css += 'body::before{background-image:url("' + u + '")!important}.page-hero{background-image:linear-gradient(rgba(238,229,216,.86),rgba(238,229,216,.86)),url("' + u + '")!important}';
    }
    var st = document.getElementById('akw-design') || document.createElement('style');
    st.id = 'akw-design'; st.textContent = css;
    document.head.appendChild(st);
    if (g('logo')) {
      document.querySelectorAll('.brand').forEach(function (el) {
        var im = el.querySelector('img.akw-logo');
        if (!im) { el.textContent = ''; im = document.createElement('img'); im.className = 'akw-logo'; im.alt = 'Akhawat'; im.style.cssText = 'height:42px;width:auto;display:block'; el.appendChild(im); }
        im.src = g('logo');
      });
    }
    var f = (location.pathname.split('/').pop() || 'index.html').replace('.html', '');
    if (MASC[f] && g(MASC[f])) document.querySelectorAll('img.mascot').forEach(function (m) { m.src = g(MASC[f]); });
  }
  function apply(W) {
    if (!W) return;
    try { applyDesign(W.design); } catch (e) {}
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
    if (!document.getElementById('akw-deco')) {
      var st = document.createElement('style');
      st.id = 'akw-deco';
      st.textContent =
        'body{position:relative}' +
        'body::before{content:"";position:fixed;inset:0;background:url(assets/pola.webp) center/cover;opacity:.4;z-index:-1;pointer-events:none}' +
        '.band{background:rgba(238,229,216,.78)}.card{background:rgba(255,253,249,.92)}' +
        '.page-hero,.hero-wrap{position:relative;overflow:hidden}' +
        '.page-hero{background:linear-gradient(rgba(238,229,216,.86),rgba(238,229,216,.86)),url(assets/pola.webp) center/cover}' +
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
