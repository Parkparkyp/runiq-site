/* 페이지 공통 동작 — 보통 고칠 필요 없어요 */
(function(){
  var S=window.SITE||{};
  function won(n){return String(Math.round(Number(n)||0)).replace(/\B(?=(\d{3})+(?!\d))/g,',')+'원';}
  function safe(u){return /^https?:\/\//i.test(u||'')||/^assets\//.test(u||'');}
  document.querySelectorAll('[data-link]').forEach(function(a){
    var u=S[a.getAttribute('data-link')]||'';
    if(!safe(u)){a.classList.add('hide');return;}
    a.href=u;if(/^https?:/i.test(u)){a.target='_blank';a.rel='noopener';}
  });
  document.querySelectorAll('[data-won]').forEach(function(e){
    var v=(S.price||{})[e.getAttribute('data-won')];if(v!=null)e.textContent=won(v);
  });
  document.querySelectorAll('[data-neg]').forEach(function(e){
    var v=(S.price||{})[e.getAttribute('data-neg')];if(v!=null)e.textContent='−'+won(v);
  });
  document.querySelectorAll('[data-text]').forEach(function(e){
    var v=S[e.getAttribute('data-text')]||'';if(!v){e.classList.add('hide');return;}
    e.textContent=v;
  });
  document.querySelectorAll('[data-need]').forEach(function(e){
    var v=S[e.getAttribute('data-need')];if(!v||(v.length!=null&&!v.length))e.classList.add('hide');
  });
  var hv=document.getElementById('heroMedia');
  if(hv){
    if(safe(S.heroVideo)){var v=document.createElement('video');v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('muted','');if(safe(S.heroPoster))v.poster=S.heroPoster;v.src=S.heroVideo;hv.appendChild(v);var p=v.play&&v.play();if(p&&p.catch)p.catch(function(){});}
    else if(safe(S.heroPoster)){var i=document.createElement('img');i.className='poster';i.alt='';i.src=S.heroPoster;hv.appendChild(i);}
  }
  var w=document.getElementById('workList');
  if(w){
    var items=S.work||[];
    if(!items.length){for(var n=1;n<=6;n++){var d=document.createElement('div');d.className='ph';d.style.aspectRatio=['16/9','4/5','1/1','16/9','3/4','16/10'][n-1];d.textContent='작업 사진·영상 '+n+' (준비 중)';w.appendChild(d);}}
    items.forEach(function(it){
      if(it.img&&safe(it.img)){var im=document.createElement('img');im.loading='lazy';im.alt=it.alt||'루닉필름 작업';im.src=it.img;w.appendChild(im);}
      else if(it.yt&&/^[A-Za-z0-9_-]{6,20}$/.test(it.yt)){var y=document.createElement('div');y.className='yt';y.setAttribute('role','button');y.setAttribute('aria-label','영상 재생');
        y.innerHTML='<img loading="lazy" alt="" src="https://i.ytimg.com/vi/'+it.yt+'/hqdefault.jpg">';
        y.addEventListener('click',function(){y.innerHTML='<iframe allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen src="https://www.youtube-nocookie.com/embed/'+it.yt+'?autoplay=1&rel=0"></iframe>';});w.appendChild(y);}
    });
  }
  var r=document.getElementById('reviewList');
  if(r){(S.reviews||[]).forEach(function(u){if(!safe(u))return;var im=document.createElement('img');im.loading='lazy';im.alt='고객 후기';im.src=u;r.appendChild(im);});}
  var re=document.getElementById('reviewEmpty');if(re&&(S.reviews||[]).length)re.classList.add('hide');
  /* 예약 링크가 없을 땐 카톡 버튼만 */
})();
