/* 페이지 공통 동작 — 보통 고칠 필요 없어요 */
(function(){
  var BASE=window.SITE||{};
  var KEY='rq_hp_cfg_v1',TTL=10*60*1000;
  function won(n){return String(Math.round(Number(n)||0)).replace(/\B(?=(\d{3})+(?!\d))/g,',')+'원';}
  function safe(u){return /^https:\/\//i.test(u||'')||/^assets\//.test(u||'');}
  function yid(v){return /^[A-Za-z0-9_-]{6,20}$/.test(v||'');}

  /* 기본값(site.js) 위에 서버 값을 덮어써요. 서버에 있는 항목만 덮어써요 */
  function merge(srv){
    var S={};for(var k in BASE)S[k]=BASE[k];
    if(!srv)return S;
    if(srv.links)['kakao','instagram','youtube','blog','book'].forEach(function(k){if(srv.links[k]!=null)S[k]=srv.links[k];});
    ['heroYt','principle','notice'].forEach(function(k){if(srv[k]!=null)S[k]=srv[k];});
    if(Array.isArray(srv.work))S.work=srv.work.map(function(i){return {yt:i};}).concat((BASE.work||[]).filter(function(i){return i.img;}));
    if(srv.price){var p={};for(var a in (BASE.price||{}))p[a]=BASE.price[a];for(var b in srv.price)if(srv.price[b]!=null)p[b]=srv.price[b];S.price=p;}
    return S;
  }

  function render(S){
    document.querySelectorAll('[data-link]').forEach(function(a){
      var u=S[a.getAttribute('data-link')]||'';
      if(!safe(u)){a.classList.add('hide');a.removeAttribute('href');return;}
      a.classList.remove('hide');a.href=u;if(/^https?:/i.test(u)){a.target='_blank';a.rel='noopener';}
    });
    document.querySelectorAll('[data-won]').forEach(function(e){var v=(S.price||{})[e.getAttribute('data-won')];if(v!=null)e.textContent=won(v);});
    document.querySelectorAll('[data-neg]').forEach(function(e){var v=(S.price||{})[e.getAttribute('data-neg')];if(v!=null)e.textContent='\u2212'+won(v);});
    document.querySelectorAll('[data-text]').forEach(function(e){
      var v=S[e.getAttribute('data-text')]||'';if(!v){e.classList.add('hide');return;}e.classList.remove('hide');e.textContent=v;
    });
    document.querySelectorAll('[data-need]').forEach(function(e){
      var k=e.getAttribute('data-need'),v=S[k];var empty=!v||(v.length!=null&&!v.length);
      e.classList.toggle('hide',empty);
    });
    var hv=document.getElementById('heroMedia');
    if(hv&&!hv.firstChild){
      if(safe(S.heroVideo)){var v=document.createElement('video');v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('muted','');if(safe(S.heroPoster))v.poster=S.heroPoster;v.src=S.heroVideo;hv.appendChild(v);var p=v.play&&v.play();if(p&&p.catch)p.catch(function(){});}
      else if(safe(S.heroPoster)){var i=document.createElement('img');i.className='poster';i.alt='';i.src=S.heroPoster;hv.appendChild(i);}
    }
    var hf=document.getElementById('heroFilm');
    if(hf){hf.innerHTML='';if(yid(S.heroYt))hf.appendChild(ytBox(S.heroYt));}
    var w=document.getElementById('workList');
    if(w){
      w.innerHTML='';var items=S.work||[];
      if(!items.length){for(var n=1;n<=6;n++){var d=document.createElement('div');d.className='ph';d.style.aspectRatio=['16/9','4/5','1/1','16/9','3/4','16/10'][n-1];d.textContent='작업 사진·영상 '+n+' (준비 중)';w.appendChild(d);}}
      items.forEach(function(it){
        if(it.img&&safe(it.img)){var im=document.createElement('img');im.loading='lazy';im.alt=it.alt||'루닉필름 작업';im.src=it.img;w.appendChild(im);}
        else if(yid(it.yt)){w.appendChild(ytBox(it.yt));}
      });
    }
    var r=document.getElementById('reviewList');
    if(r){r.innerHTML='';(S.reviews||[]).forEach(function(u){if(!safe(u))return;var im=document.createElement('img');im.loading='lazy';im.alt='고객 후기';im.src=u;r.appendChild(im);});}
    var re=document.getElementById('reviewEmpty');if(re)re.classList.toggle('hide',!!(S.reviews||[]).length);
  }
  function ytBox(id){
    var y=document.createElement('div');y.className='yt';y.setAttribute('role','button');y.setAttribute('aria-label','영상 재생');
    var im=document.createElement('img');im.loading='lazy';im.alt='';im.src='https://i.ytimg.com/vi/'+id+'/hqdefault.jpg';y.appendChild(im);
    y.addEventListener('click',function(){y.innerHTML='';var f=document.createElement('iframe');f.setAttribute('allow','autoplay; encrypted-media; picture-in-picture');f.setAttribute('allowfullscreen','');f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0';y.appendChild(f);});
    return y;
  }

  /* 1) 기본값으로 즉시 표시 (+ 10분 안에 받아 둔 서버 값이 있으면 그걸로) */
  var cached=null;
  try{var c=JSON.parse(localStorage.getItem(KEY)||'null');if(c&&c.cfg&&Date.now()-c.t<TTL*6)cached=c;}catch(e){}
  render(merge(cached&&cached.cfg));

  /* 2) 서버 값은 필요할 때만 (캐시가 10분 안이면 서버를 부르지 않아요) */
  if(!/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(BASE.api||''))return;
  if(cached&&Date.now()-cached.t<TTL)return;
  var ctl=window.AbortController?new AbortController():null,tm=setTimeout(function(){if(ctl)ctl.abort();},5000);
  fetch(BASE.api+'?a=cfg',{signal:ctl?ctl.signal:undefined}).then(function(r){return r.json();}).then(function(j){
    clearTimeout(tm);if(!j||!j.ok)return;
    try{localStorage.setItem(KEY,JSON.stringify({t:Date.now(),cfg:j}));}catch(e){}
    render(merge(j));
  }).catch(function(){});
})();
