/* ============================================================
   루닉필름 홈페이지 기본값 — 관리 페이지에서 만든 파일이에요 (2026-11-24).
   평소에는 admin.html(관리 페이지)에서 고쳐요. 처음 열 때, 그리고 서버가 느리거나 안 될 때 이 값이 보여요.
   문구 안의 {total} {deposit} {portfolio} {full} 은 아래 금액으로 자동 바뀌어요.
   (비워 두면 해당 부분은 자동으로 숨겨져요)
   ============================================================ */
window.SITE = {
  /* 홈페이지 설정 서버 주소 (관리 페이지에서 고친 값을 읽어 와요) */
  api: "https://script.google.com/macros/s/AKfycbzWxLMOzulGS7SxULr0nF3ho9mUkfxoVoGzkWcrq4IKSEfyavO_D-iNLnuvU48xS711/exec",

  /* 링크 (비우면 해당 버튼 숨김) */
  kakao: "https://pf.kakao.com/_xijWKX/chat",
  instagram: "https://www.instagram.com/runiq__film?avpt=Yjh4M3A0YTViZnU0",
  youtube: "https://youtube.com/channel/UCJpuhpgDDPNDGwNEQ1eOx5w?si=D9Yy0y15DvqXT8LH",
  blog: "https://m.blog.naver.com/runiq_studio",
  book: "https://my.runiq.kr/request.html?g=AKfycbxOCnpHKbop4tqHDDVKNit6bX5tJXTTKT3wvUXteRKwF-Q81pt3AxemFlAUJQf18olwOw",

  /* 영상 (유튜브 ID) */
  heroYt: "",
  priceYt: "",
  work: [
    {yt: "ET7fG5v03Mc"},
    {yt: "m2dApIak8ns"},
    {yt: "bmUMhYeLBFQ"},
    {yt: "dAClTavMF7M"}
  ],
  reviews: [],
  heroVideo: "assets/hero.mp4", heroPoster: "",
  priceVideo: "assets/price.mp4",

  /* 대표 사진 (assets/owner.jpg 파일을 바꿔 올리면 교체돼요) */
  aboutPhoto: "assets/owner.jpg",

  /* ---- 문구 ---- */
  heroTitle: "새로운 기록 방식\n인터뷰 본식 DVD",
  heroSub: "다큐멘터리형",
  ctaPrice: "상품·가격 보기",
  ctaHeroBook: "예약신청",

  aboutName: "박희윤",
  aboutRole: "대표 · 촬영 · 편집",
  aboutText: "본식 영상에 목소리를 더합니다. \n인터뷰를 함께 담아, 시간이 지나도 그날의 마음이 그대로 남는 DVD로 만들어 드리겠습니다.",
  process: [
    {t: "신청", d: "예식일 가능 여부를 확인해요."},
    {t: "확정", d: "전자계약서에 서명하고 계약금을 입금하면 예약이 확정돼요."},
    {t: "납품", d: "촬영 후 약 60일 안에 편집한 DVD를 전달해 드려요.\n(실제 납품은 최대한 빠르게 드리고있습니다.)"}
  ],
  ctaBook: "예약신청서 쓰기",
  ctaKakao: "카카오톡으로 문의하기",

  priceTitle: "인터뷰 본식 DVD",
  priceDesc: "국내유일 실제 인터뷰 하는 본식 DVD 입니다.",
  productName: "인터뷰 본식 DVD",
  items: [
    {t: "도착", d: "예식 시작 1시간30분~2시간 전"},
    {t: "촬영시작", d: "신부대기실 ~ 원판촬영"},
    {t: "편집한 영상을 DVD로 납품", d: "촬영일로부터 최대 60일"},
    {t: "전자계약서", d: "링크로 확인하고 서명해요"},
    {t: "계약금 {deposit}", d: "계약서 서명 후 입금하면 예약이 확정돼요"},
    {t: "결제방식", d: "계좌이체 · 카드"}
  ],
  extras: [
    {t: "포트폴리오 활용에 동의", d: "영상을 작업물로 올려도 괜찮으신 경우", v: "−{portfolio}"},
    {t: "전액 결제", d: "계약금 없이 한 번에 결제", v: "−{full}"},
    {t: "출장비", d: "지방 등 이동이 먼 예식 · 신청 후 확인해서 알려 드려요", v: "거리에 따라 별도"},
    {t: "피로연(감사 이벤트)", d: "5~10분정도 숏촬영", v: "무료"}
  ],

  faqTitle: "자주 묻는 질문",
  faqDesc: "더 궁금한 건 카카오톡 채널로 물어봐 주세요.",
  faq: [
    {q: "신청하면 바로 확정인가요?", a: "아니요. 확인 연락 후 계약서 서명과 계약금 입금까지 끝나면 확정돼요."},
    {q: "납품은 얼마나 걸리나요?", a: "촬영 후 약 60일이에요.\n(30일이내를 목표로 하고있습니다.)"},
    {q: "결제는 어떻게 하나요?", a: "계좌이체와 카드 모두 가능해요. 자세한 순서는 신청 후 안내해 드려요."},
    {q: "포트폴리오 동의는 꼭 해야 하나요?", a: "동의하시면 할인이 되고, 동의하지 않으셔도 촬영은 똑같습니다."},
    {q: "지방 예식도 되나요?", a: "대부분 가능해요. 거리에 따라 출장비가 붙을 수 있어요."},
    {q: "취소나 날짜 변경은요?", a: "계약서의 취소·변경 규정을 따라요. 계약서에서 미리 확인하실 수 있어요."},
    {q: "수정도 해주시나요?", a: "네 당연히 해드립니다.\n추후에 문제가 발견되면 제가 자발적으로 AS까지 해서 보내드립니다.🥹"}
  ],

  workNote: "포트폴리오 활용에 동의하신 분의 영상만 올려요.",
  footInfo: "루닉필름 · 대표 박희윤\n사업자등록번호 637-12-03118\n통신판매업신고 2026-화성효행-0353",
  footText: "© RUNIQ FILM",

  /* 금액 (원) */
  price: { total: 580000, deposit: 200000, portfolio: 60000, full: 20000 }
};
