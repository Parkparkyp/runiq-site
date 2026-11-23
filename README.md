# 루닉필름 홈페이지 (runiq.kr)

정적 사이트예요. 빌드 도구 없이 파일만 올리면 돼요.

## 파일
- `index.html` 소개 · `work.html` 작업 · `price.html` 상품·가격 · `review.html` 후기 · `book.html` 예약
- `site.js` **여기만 고치면 돼요** (링크, 금액, 문구, 영상·사진 목록)
- `assets/` 사진·영상 파일을 넣는 폴더
- `style.css` 모양, `run.js` 동작 (보통 안 건드려요)
- `CNAME` 연결할 주소(runiq.kr)

## 올리는 순서 (처음 한 번)
1. GitHub에서 새 저장소 `runiq-site`를 만들어요. (Public)
2. 이 폴더 안의 파일을 전부 올려요. (`assets` 폴더 포함)
3. 저장소 Settings > Pages > Source: `Deploy from a branch`, Branch: `main` / `/(root)` 저장
4. Custom domain에 `runiq.kr` 입력 후 저장, 잠시 뒤 `Enforce HTTPS` 체크
5. DNS는 이미 맞춰져 있어요. (`@` A 레코드 4개, `www` CNAME → `parkparkyp.github.io.`)
   - 주의: 이 저장소를 올리기 전에는 `runiq.kr`가 빈 곳을 가리켜요. 올리고 나서 Custom domain을 설정하세요.
6. 앱(`my.runiq.kr`)과는 별개의 저장소라 서로 영향이 없어요.

## 공개하기 전에 (중요)
지금은 검색에 안 잡히게 막아 뒀어요.
- 각 html의 `<meta name="robots" content="noindex">` 줄
- `robots.txt`의 `Disallow: /`
→ 내용이 다 채워지면 "공개해도 돼"라고 알려 주세요. 제가 두 곳을 풀어서 드릴게요.

## 채워야 하는 것 (`site.js`)
- `book`: 앱 설정 > 예약신청의 링크를 "🔗 복사" 해서 붙여넣기. **비어 있으면 예약 버튼이 숨겨져요.**
- `kakao`, `instagram`, `youtube`, `blog`: 비어 있으면 해당 버튼이 숨겨져요.
- `heroVideo`(+`heroPoster`): 첫 화면 영상. `assets/hero.mp4` 처럼 넣고 경로를 적어요. 20초 안팎·소리 없는 영상을 권장해요.
- `principle`: 촬영 방침 한두 줄. `notice`: 상품 페이지의 "꼭 확인해 주세요".
- `work`: `{img:'assets/w1.jpg'}` 또는 `{yt:'유튜브영상ID'}`
- `reviews`: 후기 캡처 이미지 경로. 비어 있으면 "후기" 메뉴가 숨겨져요.
- `price`: 앱의 금액 설정과 같은 값으로 맞춰요.

## 사진 올릴 때
- 가로 1600px 안팎, JPG, 한 장 500KB 이하로 줄이면 빨라요.
- 영상 파일은 GitHub 용량 한도가 있어서 파일당 25MB 이하를 권장해요. 큰 영상은 유튜브 링크로 넣으세요.
- 포트폴리오 활용 동의를 받은 고객 것만 올리세요.
