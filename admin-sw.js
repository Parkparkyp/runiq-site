/* 관리 페이지를 "앱"으로 설치할 수 있게 하는 최소 서비스 워커.
   아무것도 저장(캐시)하지 않고 항상 네트워크에서 받아요 → 설정 값이 낡아 보이는 일이 없어요. */
self.addEventListener('install',function(){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil(self.clients.claim());});
self.addEventListener('fetch',function(e){});
