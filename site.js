/* ============================================================
   루닉필름 홈페이지 설정 — 여기만 고치면 사이트 전체에 반영돼요
   (따옴표 안의 글자만 바꾸세요. 비워 두면 해당 부분은 자동으로 숨겨져요)
   ============================================================ */
window.SITE = {
  brand: '루닉필름',

  /* 홈페이지 설정 서버 주소 (관리 페이지 admin.html 에서 고친 값을 읽어 와요)
     비우면 이 파일의 값만 써요. 서버가 느리거나 안 돼도 이 파일의 값으로 정상 표시돼요. */
  api: 'https://script.google.com/macros/s/AKfycbzWxLMOzulGS7SxULr0nF3ho9mUkfxoVoGzkWcrq4IKSEfyavO_D-iNLnuvU48xS711/exec',

  rep: '박희윤',
  biz: '637-12-03118',

  /* 링크 (비우면 숨김) */
  kakao: '',        // 카카오톡 채널 채팅 주소 예: https://pf.kakao.com/_abcdE/chat
  instagram: '',    // 예: https://www.instagram.com/아이디
  youtube: '',      // 예: https://www.youtube.com/@채널
  blog: '',         // 예: https://blog.naver.com/아이디
  book: '',         // 예약신청서 주소 — 앱 설정 > 예약신청 > "복사" 한 링크를 붙여넣기

  /* 첫 화면 배경 (비우면 어두운 기본 배경) */
  heroVideo: '',    // 예: 'assets/hero.mp4'  (20초 안팎, 소리 없는 짧은 영상 권장)
  heroPoster: '',   // 예: 'assets/hero.jpg'  (영상이 뜨기 전·모바일 절전 때 보이는 사진)

  /* 문구 (비우면 숨김) */
  principle: '',    // 촬영 방침 한두 줄
  notice: '',       // 상품 페이지 "꼭 확인해 주세요" 박스

  /* 금액 (원) — 앱 설정과 맞춰 주세요 */
  price: { total: 1100000, deposit: 300000, portfolio: 60000, full: 20000 },

  /* 작업: 사진은 {img:'assets/w1.jpg'}, 유튜브는 {yt:'영상ID'} 로 한 줄씩 */
  heroYt: '',       // 대표 영상 유튜브 ID (소개 페이지에 재생 화면으로 나와요)
  work: [],
  /* 후기 캡처: ['assets/r1.jpg', ...]  — 비어 있으면 메뉴의 "후기"가 숨겨져요 */
  reviews: []
};
