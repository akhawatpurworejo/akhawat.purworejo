(function(){
 var P=[['index.html','Beranda','<path d="M4 11l8-7 8 7v9H4z"/><path d="M10 20v-6h4v6"/>'],
 ['layanan.html','Layanan','<rect x="4" y="4" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="4" width="6.5" height="6.5" rx="2"/><rect x="4" y="13.5" width="6.5" height="6.5" rx="2"/><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="2"/>'],
 ['testimoni.html','Testimoni','<path d="M12 4l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6-4.9 2.6.9-5.5-4-3.9 5.5-.8z"/>'],
 ['faq.html','FAQ','<circle cx="12" cy="12" r="8.5"/><path d="M9.5 9.5a2.5 2.5 0 114 2c-1 .6-1.5 1.2-1.5 2.3"/><path d="M12 17h.01"/>'],
 ['kontak.html','Kontak','<path d="M5 6a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-6l-4 4v-4a2 2 0 01-2-2z"/>']];
 function girl(a,b){return '<svg viewBox="0 0 120 150" role="img" aria-label="Ilustrasi muslimah"><path d="M18 150Q20 96 60 90Q100 96 102 150Z" fill="'+b+'"/><path d="M60 12C35 12 27 35 29 56C30 72 22 86 20 102Q60 116 100 102C98 86 90 72 91 56C93 35 85 12 60 12Z" fill="'+a+'"/><ellipse cx="60" cy="54" rx="17" ry="21" fill="#f6dfcd"/><circle cx="86" cy="30" r="5" fill="#fff" fill-opacity=".75"/><circle cx="92" cy="40" r="3" fill="#fff" fill-opacity=".6"/><path d="M60 100l5 7-5 7-5-7z" fill="#fff" fill-opacity=".5"/></svg>';}
 function init(){
  var f=location.pathname.split('/').pop()||'index.html';
  var cur=f.indexOf('layanan')===0?'layanan.html':(f==='testimoni-form.html'?'testimoni.html':f);
  if(!document.getElementById('tab')){
   var n=document.createElement('div');n.id='tab';n.setAttribute('role','navigation');n.setAttribute('aria-label','Menu utama');
   n.innerHTML=P.map(function(p){return '<a href="'+p[0]+'"'+(p[0]===cur?' class="on" aria-current="page"':'')+'><span><svg viewBox="0 0 24 24" aria-hidden="true">'+p[2]+'</svg></span>'+p[1]+'</a>'}).join('');
   document.body.appendChild(n);
  }
  var h=document.querySelector('.topbg .hero>div');
  if(h&&!document.querySelector('.girl')){var g=document.createElement('div');g.className='girl';g.innerHTML=girl('#c98a82','#6f4a3a');h.insertBefore(g,h.firstChild);}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
