/* 페이지 공통 동작 — 보통 고칠 필요 없어요 */
(function(){
  var BASE=window.SITE||{};
  var KEY='rq_hp_cfg_v2',TTL=10*60*1000;
  var TEXTS=['heroTitle','heroSub','ctaPrice','ctaHeroBook','aboutName','aboutRole','aboutText','ctaBook','ctaKakao','priceTitle','priceDesc','productName','faqTitle','faqDesc','workNote','footInfo','footText'];
  var LISTS=['process','items','extras','faq'];
  function won(n){return String(Math.round(Number(n)||0)).replace(/\B(?=(\d{3})+(?!\d))/g,',')+'원';}
  function safe(u){return /^https:\/\//i.test(u||'')||/^assets\//.test(u||'');}
  function yid(v){return /^[A-Za-z0-9_-]{6,20}$/.test(v||'');}

  /* 기본값(site.js) 위에 서버 값을 덮어써요. 서버에 있는 항목만 덮어써요 */
  function merge(srv){
    var S={};for(var k in BASE)S[k]=BASE[k];
    if(!srv)return S;
    if(srv.links)['kakao','instagram','youtube','blog','book'].forEach(function(k){if(srv.links[k]!=null)S[k]=srv.links[k];});
    ['heroYt','priceYt'].forEach(function(k){if(srv[k]!=null)S[k]=srv[k];});
    TEXTS.forEach(function(k){if(typeof srv[k]==='string')S[k]=srv[k];});
    LISTS.forEach(function(k){if(Array.isArray(srv[k]))S[k]=srv[k];});
    if(Array.isArray(srv.work))S.work=srv.work.map(function(i){return {yt:i};}).concat((BASE.work||[]).filter(function(i){return i.img;}));
    if(srv.price){var p={};for(var a in (BASE.price||{}))p[a]=BASE.price[a];for(var b in srv.price)if(srv.price[b]!=null)p[b]=srv.price[b];S.price=p;}
    return S;
  }
  function fmt(S,t){return String(t==null?'':t).replace(/\{(total|deposit|portfolio|full)\}/g,function(m,k){return won((S.price||{})[k]);});}
  function el(tag,cls,txt){var e=document.createElement(tag);if(cls)e.className=cls;if(txt!=null)e.textContent=txt;return e;}
  function list(id,arr,build){var c=document.getElementById(id);if(!c)return;c.innerHTML='';(arr||[]).forEach(function(it,i){c.appendChild(build(it,i));});}

  function render(S){
    document.querySelectorAll('[data-link]').forEach(function(a){
      var u=S[a.getAttribute('data-link')]||'';
      if(!safe(u)){a.classList.add('hide');a.removeAttribute('href');return;}
      a.classList.remove('hide');a.href=u;if(/^https?:/i.test(u)){a.target='_blank';a.rel='noopener';}
    });
    document.querySelectorAll('[data-lines]').forEach(function(e){
      var t=fmt(S,S[e.getAttribute('data-lines')]);e.textContent='';
      t.split(/\r?\n/).forEach(function(l,i){if(i)e.appendChild(document.createElement('br'));e.appendChild(document.createTextNode(l));});
      e.classList.toggle('empty',!t.trim());
    });
    document.querySelectorAll('[data-won]').forEach(function(e){var v=(S.price||{})[e.getAttribute('data-won')];if(v!=null)e.textContent=won(v);});
    list('processList',S.process,function(it,i){var d=el('div');d.appendChild(el('b',null,(i<9?'0':'')+(i+1)+' · '+fmt(S,it.t)));d.appendChild(document.createTextNode(fmt(S,it.d)));return d;});
    list('itemList',S.items,function(it){var l=el('li',null,fmt(S,it.t));if(it.d)l.appendChild(el('em',null,fmt(S,it.d)));return l;});
    list('extraList',S.extras,function(it){var r=el('div','row'),L=el('div',null,fmt(S,it.t));if(it.d)L.appendChild(el('em',null,fmt(S,it.d)));r.appendChild(L);r.appendChild(el('div','v',fmt(S,it.v)));return r;});
    list('faqList',S.faq,function(it){var q=el('div','qa');q.appendChild(el('b',null,fmt(S,it.q)));q.appendChild(el('p',null,fmt(S,it.a)));return q;});
    document.querySelectorAll('[data-img]').forEach(function(im){
      var u=S[im.getAttribute('data-img')]||'';var ok=safe(u);
      if(ok&&im.getAttribute('src')!==u)im.src=u;
      im.parentNode.classList.toggle('empty',!ok);
    });
    document.querySelectorAll('[data-need]').forEach(function(e){
      var k=e.getAttribute('data-need'),v=S[k];var empty=!v||(v.length!=null&&!v.length)||(typeof v==='string'&&!v.trim());
      e.classList.toggle('hide',empty);
    });
    var hv=document.getElementById('heroMedia');
    if(hv){
      var want=yid(S.heroYt)?'yt:'+S.heroYt:(safe(S.heroVideo)?'v:'+S.heroVideo:(safe(S.heroPoster)?'p:'+S.heroPoster:''));
      if(hv.getAttribute('data-k')!==want){
        hv.setAttribute('data-k',want);hv.innerHTML='';
        if(yid(S.heroYt))heroYt(hv,S.heroYt);
        else if(safe(S.heroVideo)){var v=document.createElement('video');v.muted=true;v.loop=true;v.autoplay=true;v.playsInline=true;v.setAttribute('playsinline','');v.setAttribute('muted','');if(safe(S.heroPoster))v.poster=S.heroPoster;v.src=S.heroVideo;hv.appendChild(v);var p=v.play&&v.play();if(p&&p.catch)p.catch(function(){});}
        else if(safe(S.heroPoster)){var i=document.createElement('img');i.className='poster';i.alt='';i.src=S.heroPoster;hv.appendChild(i);}
      }
    }
    var pv=document.getElementById('priceMedia');
    if(pv){var pw=yid(S.priceYt)?'yt:'+S.priceYt:'';if(pv.getAttribute('data-k')!==pw){pv.setAttribute('data-k',pw);pv.innerHTML='';if(pw)heroYt(pv,S.priceYt);}}
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
  /* 대문 배경: 유튜브 영상을 소리 없이 반복 재생 (잘려 보여도 화면을 꽉 채워요).
     자동 재생이 막히는 폰/절전 모드에서는 영상 대신 썸네일 사진이 그대로 보여요. */
  function heroYt(box,id){
    var wrap=document.createElement('div');wrap.className='ytbg';
    var im=document.createElement('img');im.alt='';im.src='https://i.ytimg.com/vi/'+id+'/maxresdefault.jpg';
    var fell=false;function fall(){if(fell)return;fell=true;im.src='https://i.ytimg.com/vi/'+id+'/hqdefault.jpg';}
    im.onload=function(){if(im.naturalWidth&&im.naturalWidth<200)fall();};
    im.onerror=fall;
    wrap.appendChild(im);box.appendChild(wrap);
    var rm=window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var sd=navigator.connection&&navigator.connection.saveData;
    if(rm||sd)return;
    function start(){
      if(!wrap.isConnected)return;
      var f=document.createElement('iframe');f.setAttribute('title','');f.setAttribute('tabindex','-1');f.setAttribute('aria-hidden','true');f.setAttribute('allow','autoplay; encrypted-media');
      f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&mute=1&loop=1&playlist='+id+'&controls=0&modestbranding=1&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&fs=0&enablejsapi=1';
      function size(){var w=box.clientWidth,h=box.clientHeight,W=Math.max(w,h*16/9);f.style.width=W+'px';f.style.height=(W*9/16)+'px';}
      size();window.addEventListener('resize',size);
      var done=false;
      function onMsg(ev){
        if(ev.source!==f.contentWindow)return;
        var d=ev.data;if(typeof d==='string'){try{d=JSON.parse(d);}catch(e){return;}}
        if(!d)return;var st=d.event==='onStateChange'?d.info:(d.info&&d.info.playerState);
        if(st===1&&!done){done=true;setTimeout(function(){f.classList.add('on');},3500);}  /* 폰에서 처음 잠깐 뜨는 재생 버튼이 사라진 뒤에 보여줘요 */
      }
      window.addEventListener('message',onMsg);
      f.addEventListener('load',function(){try{f.contentWindow.postMessage(JSON.stringify({event:'listening',id:1,channel:'widget'}),'*');}catch(e){}});
      wrap.appendChild(f);
      setTimeout(function(){if(!done){try{wrap.removeChild(f);}catch(e){}window.removeEventListener('message',onMsg);window.removeEventListener('resize',size);}},6000);
    }
    if(document.readyState==='complete')setTimeout(start,300);else window.addEventListener('load',function(){setTimeout(start,300);});
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
