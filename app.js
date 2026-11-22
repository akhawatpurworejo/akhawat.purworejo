const WA="6288228991877",IG="https://instagram.com/akhawat.purworejo";
const S={
ride:{n:"Akhawat Ride",m:"R",s:"Antar jemput khusus wanita agar perjalanan lebih nyaman dan tenang.",
 intro:"Perjalanan harian, ke pengajian, ke pasar, atau pulang larut — diantar dengan sopan dan menjaga privasimu.",
 items:["Antar jemput harian atau sekali jalan","Perjalanan dalam kota Purworejo dan sekitarnya","Bisa dipesan untuk keluarga dan anak"],
 steps:["Kirim titik jemput, tujuan, dan jam","Kami konfirmasi ketersediaan","Dijemput sesuai jadwal"],
 f:[["Nama","text"],["Titik jemput","text"],["Tujuan","text"],["Tanggal","date"],["Jam","time"],["Jumlah penumpang","number"],["Catatan","area",1]]},
assist:{n:"Akhawat Assist",m:"A",s:"Bantuan titip belanja, mengambil dan mengantar barang.",
 intro:"Sedang sibuk atau berhalangan keluar? Kami bantu urus keperluanmu dengan rapi.",
 items:["Titip belanja kebutuhan harian","Mengambil dan mengantar barang atau paket","Membantu urusan kecil lainnya"],
 steps:["Ceritakan apa yang perlu dibantu","Kami konfirmasi detail dan estimasi","Barang atau urusan diselesaikan"],
 f:[["Nama","text"],["Yang perlu dibantu","area"],["Lokasi beli atau ambil","text"],["Alamat antar","text"],["Tanggal","date"],["Catatan","area",1]]},
care:{n:"Akhawat Care",m:"C",s:"Perhatian untuk orang tersayang.",
 intro:"Untuk keluarga yang jauh atau kamu yang tidak sempat hadir, kami bantu menyampaikan perhatian dengan penuh kehangatan.",
 items:["Menengok dan menyampaikan kabar","Mengantar kebutuhan untuk orang tersayang","Pendampingan ringan sesuai kebutuhan"],
 steps:["Jelaskan siapa dan bantuan apa yang dibutuhkan","Kami diskusikan yang bisa dilakukan","Layanan dijalankan, kabar kami sampaikan"],
 f:[["Nama","text"],["Untuk siapa","text"],["Bantuan yang dibutuhkan","area"],["Alamat","text"],["Tanggal dan jam","text"],["Catatan","area",1]]},
gift:{n:"Akhawat Gift",m:"G",s:"Mencari, menyiapkan, dan mengirim hadiah.",
 intro:"Bingung memilih hadiah? Ceritakan siapa penerimanya, kami bantu carikan, kemas, dan kirimkan.",
 items:["Mencarikan hadiah sesuai kesukaan penerima","Pengemasan rapi","Pengiriman ke alamat penerima"],
 steps:["Ceritakan penerima, acara, dan anggaran","Kami usulkan pilihan hadiah","Hadiah dikemas dan dikirim"],
 f:[["Nama","text"],["Untuk siapa dan acara apa","text"],["Hadiah yang diinginkan","area"],["Anggaran","text",1],["Alamat kirim","text"],["Tanggal diterima","date"],["Pesan untuk kartu ucapan","area",1]]},
store:{n:"Akhawat Store",m:"S",s:"Perlengkapan muslimah dan kebutuhan sehari-hari.",
 intro:"Pilih perlengkapan yang kamu butuhkan, lalu pesan langsung lewat WhatsApp.",
 items:["Perlengkapan muslimah","Kebutuhan sehari-hari","Katalog produk lengkap menyusul"],
 steps:["Sebutkan produk dan jumlahnya","Kami konfirmasi stok dan harga","Pesanan diproses dan dikirim"],
 f:[["Nama","text"],["Produk yang dipesan","area"],["Jumlah","text"],["Alamat","text"],["Catatan","area",1]]}};
const wa=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;
const nav=[["index.html","Beranda"],["index.html#layanan","Layanan"],["index.html#cara","Cara pesan"],["index.html#kontak","Kontak"]];
document.body.insertAdjacentHTML("afterbegin",`<header><div class="wrap"><a class="logo" href="index.html">AKHAWAT</a><button class="menu" aria-expanded="false" aria-controls="nv">Menu</button><nav id="nv">${nav.map(a=>`<a href="${a[0]}">${a[1]}</a>`).join("")}<a class="btn solid" href="${wa("Assalamu'alaikum Akhawat, saya ingin bertanya.")}">Hubungi kami</a></nav></div></header>`);
document.body.insertAdjacentHTML("beforeend",`<a class="wa" href="${wa("Assalamu'alaikum Akhawat, saya ingin bertanya.")}"><i></i>Chat WhatsApp</a><footer><div class="wrap"><span>© 2026 Akhawat Purworejo</span><a href="${IG}">Instagram @akhawat.purworejo</a></div></footer>`);
const mb=document.querySelector(".menu"),nv=document.getElementById("nv");
mb.onclick=()=>{const o=nv.classList.toggle("open");mb.setAttribute("aria-expanded",o)};
const home=document.getElementById("svc-list");
if(home)home.innerHTML=Object.entries(S).map(([k,v])=>`<a class="svc" href="layanan-${k}.html"><div class="mono">${v.m}</div><div><h3>${v.n}</h3><p>${v.s}</p><small>Lihat detail dan pesan</small></div></a>`).join("");
const id=document.body.dataset.service,v=S[id];
if(v){
 document.title=v.n+" · Akhawat Purworejo";
 document.getElementById("detail").innerHTML=`<div class="wrap"><a class="crumb" href="index.html#layanan">‹ Semua layanan</a><div style="margin-top:26px"><h1>${v.n}</h1><p style="margin-top:18px;font-size:1.1rem">${v.intro}</p><div class="row"><button class="btn solid" id="open">Pesan layanan ini</button></div></div></div>
 <section><div class="wrap"><h2>Yang bisa kami bantu</h2><ul class="list">${v.items.map(i=>`<li>${i}</li>`).join("")}</ul></div></section>
 <section class="alt"><div class="wrap"><h2>Cara kerjanya</h2><ol class="steps">${v.steps.map(s=>`<li><b>${s}</b></li>`).join("")}</ol></div></section>
 <dialog id="dlg"><form id="fm" novalidate><div class="top"><div><h3>Pesan ${v.n}</h3><p class="note">Setelah kamu kirim, WhatsApp terbuka dengan pesan yang sudah tersusun.</p></div><button type="button" class="x" id="cl" aria-label="Tutup">×</button></div>
 ${v.f.map((f,i)=>{const o=f[2]?" <span>(boleh dikosongkan)</span>":"";const r=f[2]?"":"required";const c=f[1]=="area"?`<textarea name="f${i}" ${r}></textarea>`:`<input name="f${i}" type="${f[1]}" ${f[1]=="number"?'min="1" ':""}${r}>`;return`<label>${f[0]}${o}${c}</label>`}).join("")}
 <div class="err" id="er" role="alert"></div><button class="btn solid" type="submit">Kirim lewat WhatsApp</button></form></dialog>`;
 const dl=document.getElementById("dlg");
 document.getElementById("open").onclick=()=>dl.showModal();
 document.getElementById("cl").onclick=()=>dl.close();
 document.getElementById("fm").onsubmit=e=>{e.preventDefault();
  const fm=e.target,L=[];let bad=0;
  v.f.forEach((f,i)=>{const val=fm["f"+i].value.trim();if(!val&&!f[2])bad=1;if(val)L.push(`${f[0]}: ${f[1]=="date"?val.split("-").reverse().join("/"):val}`)});
  if(bad){document.getElementById("er").textContent="Lengkapi kolom yang wajib diisi dulu.";return}
  window.open(wa(`Assalamu'alaikum Akhawat, saya ingin memesan ${v.n}.\n\n${L.join("\n")}\n\nTerima kasih.`),"_blank");dl.close();fm.reset()};
}
