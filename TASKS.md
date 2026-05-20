# Tasks (작업 목록)
# 칸반보드 애플리케이션

## 작업 진행 상태

- ✅ **완료 (Done)**: 구현 및 테스트 완료
- 🚧 **진행 중 (In Progress)**: 현재 작업 중
- 📋 **할 일 (To-Do)**: 아직 시작 안 함
- 🔮 **향후 (Future)**: MVP 범위 밖, 추후 고려

---

## Phase 1: 기초 설정 및 구조

### ✅ Task 1.1: 프로젝트 구조 생성
**설명**: 기본 파일 구조 및 빈 파일 생성

**체크리스트:**
- [x] `index.html` 생성
- [x] `styles.css` 생성
- [x] `script.js` 생성
- [x] 디렉토리 구조 확인

**예상 시간**: 5분
**실제 시간**: 5분
**완료 일시**: 2026-05-20 14:45

---

### ✅ Task 1.2: HTML 기본 구조 작성
**설명**: 시맨틱 HTML로 칸반보드 뼈대 구축

**체크리스트:**
- [x] HTML5 doctype 선언
- [x] 메타 태그 (viewport, charset) 추가
- [x] CSS/JS 링크 연결
- [x] 페이지 제목 (`<h1>`) 추가
- [x] `.board` 컨테이너 생성
- [x] 세 개의 `.column` 컨테이너 생성
  - [x] To-Do 컬럼
  - [x] In-Progress 컬럼
  - [x] Done 컬럼
- [x] 각 컬럼에 헤더, 카드 컨테이너, 폼 추가

**참고 파일**: `plan.md` → Implementation Approach → HTML 구조

**예상 시간**: 15분
**실제 시간**: 20분
**완료 일시**: 2026-05-20 14:45

**검증 방법**:
```bash
python3 -m http.server 8765
# 브라우저에서 http://localhost:8765 접속 → 세 개 컬럼 표시 확인
```

---

### ✅ Task 1.3: CSS 변수 및 리셋 스타일 정의
**설명**: CSS Custom Properties로 디자인 토큰 설정

**체크리스트:**
- [x] `:root`에 CSS 변수 정의
  - [x] 컬러 시스템
  - [x] 타이포그래피
  - [x] 간격 (spacing)
  - [x] 전환 효과 (transitions)
- [x] CSS 리셋 (box-sizing, margin, padding)
- [x] 기본 `body` 스타일 (폰트, 배경색)

**참고 파일**: `DESIGN_SYSTEM.md` → 디자인 토큰

**예상 시간**: 10분
**실제 시간**: 15분
**완료 일시**: 2026-05-20 14:45

---

## Phase 2: 레이아웃 및 스타일링 ✅

### ✅ Task 2.1: 보드 레이아웃 구현
**설명**: Flexbox로 3컬럼 가로 배치

**체크리스트:**
- [x] `.board` 스타일링
  - [x] `display: flex`
  - [x] `gap: 16px`
  - [x] 수평 스크롤 (`overflow-x: auto`)
- [x] `.column` 스타일링
  - [x] 고정 너비 (`flex: 0 0 320px`)
  - [x] 배경색, 테두리 반경
  - [x] 내부 여백

**참고 파일**: `TRD.md` → 시스템 아키텍처 → 컴포넌트 구조

**예상 시간**: 15분
**실제 시간**: 15분
**완료 일시**: 2026-05-20 14:45

**검증 방법**: 브라우저에서 세 컬럼이 가로로 나란히 표시되는지 확인

---

### ✅ Task 2.2: 카드 스타일링
**설명**: 카드 디자인 및 호버 효과

**체크리스트:**
- [ ] `.card` 기본 스타일
  - [ ] 배경색, 테두리, 그림자
  - [ ] 내부 여백, 하단 마진
  - [ ] 텍스트 스타일
- [ ] `.card:hover` 효과
  - [ ] `transform: translateY(-2px)`
  - [ ] 그림자 증가
- [ ] `.delete-btn` 스타일링
  - [ ] 기본 숨김 (`opacity: 0`)
  - [ ] 카드 호버 시 표시 (`opacity: 1`)
  - [ ] 호버 시 빨간색 배경

**참고 파일**: `DESIGN_SYSTEM.md` → 컴포넌트 스타일 → Card

**예상 시간**: 20분

---

### ✅ Task 2.3: 컬럼 헤더 및 폼 스타일링
**설명**: 컬럼 제목 및 "Add Card" 폼 디자인

**체크리스트:**
- [ ] `.column-header` 스타일
  - [ ] 폰트 크기, 굵기
  - [ ] 하단 마진
- [ ] `.add-card-form` 스타일
  - [ ] 컬럼 하단 고정 (`margin-top: auto`)
- [ ] `.input-field` 스타일
  - [ ] 테두리, 내부 여백
  - [ ] 포커스 상태 (파란 테두리)
- [ ] `.btn-primary` 스타일
  - [ ] 배경색, 텍스트 색상
  - [ ] 호버 효과

**참고 파일**: `DESIGN_SYSTEM.md` → 컴포넌트 스타일 → Input, Button

**예상 시간**: 15분

---

### ✅ Task 2.4: 드래그 상태 스타일링
**설명**: 드래그 중 시각적 피드백

**체크리스트:**
- [ ] `.card.dragging` 스타일
  - [ ] `opacity: 0.5`
  - [ ] 약간의 회전 (`rotate(3deg)`)
- [ ] `.column.drag-over` 스타일
  - [ ] 배경색 변경
  - [ ] 점선 테두리
  - [ ] 내부 그림자

**참고 파일**: `TRD.md` → 핵심 기술 구현 → 드래그 앤 드롭

**예상 시간**: 10분

---

## Phase 3: JavaScript 기능 구현 ✅

### ✅ Task 3.1: 초기 데이터 및 앱 초기화
**설명**: 페이지 로딩 시 샘플 카드 렌더링

**체크리스트:**
- [ ] `initialData` 배열 정의 (4개 샘플 카드)
- [ ] `DOMContentLoaded` 이벤트 리스너 추가
- [ ] `initializeApp()` 함수 구현
  - [ ] 초기 카드 렌더링
  - [ ] 이벤트 리스너 연결

**참고 파일**: `TRD.md` → 데이터 구조 → 초기 데이터

**예상 시간**: 15분

**검증 방법**: 페이지 로딩 시 4개의 샘플 카드가 표시되는지 확인

---

### ✅ Task 3.2: 카드 생성 함수 구현
**설명**: `createCard()` 함수로 새 카드 DOM 생성

**체크리스트:**
- [ ] `createCard(content, columnId)` 함수 작성
- [ ] 카드 엘리먼트 생성 (`document.createElement`)
- [ ] 고유 ID 생성 (`card-${Date.now()}`)
- [ ] `draggable="true"` 속성 추가
- [ ] 카드 내용 및 삭제 버튼 HTML 설정
- [ ] XSS 방지 (`escapeHtml()` 함수)
- [ ] 이벤트 리스너 연결
- [ ] 카드 반환

**참고 파일**: `TRD.md` → 핵심 기술 구현 → 카드 관리 → 카드 생성

**예상 시간**: 20분

---

### ✅ Task 3.3: 카드 추가 기능 구현
**설명**: "Add Card" 버튼 클릭 시 새 카드 생성

**체크리스트:**
- [ ] 폼 제출 이벤트 리스너 추가
- [ ] 입력 검증 (빈 문자열 차단)
- [ ] `createCard()` 호출
- [ ] DOM에 카드 추가 (`cardsContainer.appendChild()`)
- [ ] 입력 필드 초기화
- [ ] 에러 메시지 표시 (빈 입력 시)

**참고 파일**: `USER_FLOW.md` → 카드 추가 흐름

**예상 시간**: 20분

**검증 방법**:
1. "Add Card" 버튼 클릭
2. 텍스트 입력 후 Enter → 카드 추가됨
3. 빈 텍스트로 시도 → 에러 표시

---

### ✅ Task 3.4: 드래그 앤 드롭 - dragstart 구현
**설명**: 카드 드래그 시작 처리

**체크리스트:**
- [ ] `dragstart` 이벤트 리스너 추가
- [ ] `e.dataTransfer.setData('text/html', cardId)` 설정
- [ ] `e.dataTransfer.effectAllowed = 'move'` 설정
- [ ] 카드에 `dragging` 클래스 추가
- [ ] 커서 변경 (`cursor: grabbing`)

**참고 파일**: `TRD.md` → 드래그 앤 드롭 → 이벤트 핸들러

**예상 시간**: 15분

---

### ✅ Task 3.5: 드래그 앤 드롭 - dragover & dragenter 구현
**설명**: 드롭 가능 영역 표시

**체크리스트:**
- [ ] `dragover` 이벤트 리스너 추가
- [ ] `e.preventDefault()` 호출 (드롭 허용)
- [ ] `e.dataTransfer.dropEffect = 'move'` 설정
- [ ] `dragenter` 이벤트 리스너 추가
- [ ] 컬럼에 `drag-over` 클래스 추가

**참고 파일**: `USER_FLOW.md` → 카드 이동 흐름

**예상 시간**: 15분

**검증 방법**: 카드를 드래그하여 다른 컬럼 위로 이동 시 배경색 변경 확인

---

### ✅ Task 3.6: 드래그 앤 드롭 - drop 구현
**설명**: 카드 드롭 시 컬럼 이동

**체크리스트:**
- [ ] `drop` 이벤트 리스너 추가
- [ ] `e.preventDefault()` 호출
- [ ] `e.dataTransfer.getData()` 로 카드 ID 조회
- [ ] 카드 엘리먼트 찾기 (`document.getElementById()`)
- [ ] 목표 컬럼의 `.cards-container` 찾기
- [ ] `cardsContainer.appendChild(card)` 로 이동
- [ ] `drag-over` 클래스 제거

**참고 파일**: `TRD.md` → 드래그 앤 드롭 → drop 이벤트

**예상 시간**: 20분

**검증 방법**:
1. To-Do 카드를 In-Progress로 드래그
2. 드롭 → 카드가 In-Progress에 표시됨

---

### ✅ Task 3.7: 드래그 앤 드롭 - dragend & dragleave 구현
**설명**: 드래그 종료 및 영역 벗어남 처리

**체크리스트:**
- [ ] `dragend` 이벤트 리스너 추가
- [ ] `dragging` 클래스 제거
- [ ] `dragleave` 이벤트 리스너 추가
- [ ] `drag-over` 클래스 제거 (컬럼에서 벗어날 때)

**참고 파일**: `TRD.md` → 드래그 앤 드롭 → dragend

**예상 시간**: 10분

---

### ✅ Task 3.8: 카드 삭제 기능 구현
**설명**: 삭제 버튼 클릭 시 카드 제거

**체크리스트:**
- [ ] 이벤트 위임 방식으로 삭제 버튼 클릭 감지
- [ ] `e.target.closest('.card')` 로 부모 카드 찾기
- [ ] `card.remove()` 호출

**참고 파일**: `USER_FLOW.md` → 카드 삭제 흐름

**예상 시간**: 10분

**검증 방법**: 카드의 × 버튼 클릭 → 카드 즉시 제거됨

---

## Phase 4: 사용자 인증 및 데이터 영속성 (Supabase) ✅

### ✅ Task 4.1: Supabase 프로젝트 설정
**설명**: Supabase 프로젝트 생성 및 데이터베이스 테이블 구성

**체크리스트:**
- [x] 기존 todo 프로젝트의 Supabase 재사용
- [x] `cards` 테이블 생성 (SQL 실행)
- [x] Row Level Security (RLS) 정책 설정
- [x] API 키 확인 (Project URL, anon key)

**참고 파일**: `SUPABASE.md` → 1. Supabase 프로젝트 생성, 2. 데이터베이스 테이블 생성

**예상 시간**: 30분
**실제 시간**: User가 직접 완료
**완료 일시**: 2026-05-20 15:30

---

### 📋 Task 4.2: OAuth 설정
**설명**: Google 및 GitHub 소셜 로그인 설정

**체크리스트:**
- [ ] Google Cloud Console에서 OAuth 클라이언트 ID 생성
- [ ] GitHub에서 OAuth App 생성
- [ ] Supabase에 OAuth 정보 등록

**참고 파일**: `SUPABASE.md` → 3. 인증 설정

**예상 시간**: 45분

**참고**: OAuth 설정은 로컬 테스트 후 배포 전에 수행 예정

---

### ✅ Task 4.3: config.js 생성 및 Supabase 연동
**설명**: Supabase 클라이언트 초기화

**체크리스트:**
- [x] `config.js` 파일 생성
- [x] Supabase URL 및 anon key 템플릿 추가
- [x] `.gitignore`에 `config.js` 추가
- [x] `config.example.js` 템플릿 생성
- [x] index.html에 Supabase CDN 추가

**참고 파일**: `SUPABASE.md` → 4. 환경 변수 설정, 5. JavaScript 연동

**예상 시간**: 15분
**실제 시간**: 15분
**완료 일시**: 2026-05-20 16:00

---

### ✅ Task 4.4: 로그인 UI 구현
**설명**: 로그인 페이지 및 인증 폼 추가

**체크리스트:**
- [x] 로그인 페이지 HTML 추가
- [x] 이메일 로그인 폼
- [x] Google 로그인 버튼
- [x] GitHub 로그인 버튼
- [x] 로그인 페이지 CSS 스타일링
- [x] 사용자 정보 헤더 추가
- [x] 로그아웃 버튼 추가

**예상 시간**: 30분
**실제 시간**: 25분
**완료 일시**: 2026-05-20 16:00

---

### ✅ Task 4.5: 인증 함수 구현
**설명**: 회원가입, 로그인, 로그아웃 기능

**체크리스트:**
- [x] `signUpWithEmail()` 구현
- [x] `signInWithEmail()` 구현
- [x] `signInWithGoogle()` 구현
- [x] `signInWithGitHub()` 구현
- [x] `signOut()` 구현
- [x] `getCurrentUser()` 구현
- [x] 세션 상태 체크 및 리다이렉트
- [x] auth.js 모듈 생성
- [x] onAuthStateChange 리스너 추가

**참고 파일**: `SUPABASE.md` → 5.2 인증 함수

**예상 시간**: 45분
**실제 시간**: 40분
**완료 일시**: 2026-05-20 16:00

---

### ✅ Task 4.6: 카드 CRUD를 DB 연동으로 변경
**설명**: 기존 메모리 기반 CRUD를 Supabase DB로 변경

**체크리스트:**
- [x] `fetchCards()` - DB에서 카드 목록 조회
- [x] `createCardInDB()` - DB에 카드 추가
- [x] `updateCardColumnInDB()` - DB에서 카드 이동
- [x] `deleteCardFromDB()` - DB에서 카드 삭제
- [x] position 관리 로직 추가
- [x] UI와 DB 동기화 로직
- [x] 에러 처리 및 사용자 피드백

**참고 파일**: `SUPABASE.md` → 5.3 카드 CRUD 함수

**예상 시간**: 60분
**실제 시간**: 50분
**완료 일시**: 2026-05-20 16:00

---

### 📋 Task 4.7: 로컬 테스트
**설명**: 모든 인증 및 DB 기능 테스트

**체크리스트:**
- [ ] 이메일 회원가입 및 로그인
- [ ] Google 소셜 로그인
- [ ] GitHub 소셜 로그인
- [ ] 로그아웃
- [ ] 카드 추가/이동/삭제 (DB 동기화 확인)
- [ ] Supabase 대시보드에서 데이터 확인
- [ ] 새로고침 후 데이터 유지 확인

**참고 파일**: `SUPABASE.md` → 8. 테스트

**예상 시간**: 30분

---

## Phase 5: GitHub Pages 배포

### 📋 Task 5.1: GitHub Pages 설정
**설명**: 저장소를 GitHub Pages로 배포

**체크리스트:**
- [ ] GitHub 저장소 Settings → Pages 설정
- [ ] Branch 및 Folder 선택
- [ ] 배포 URL 확인

**참고 파일**: `DEPLOY.md` → 3. GitHub Pages 배포 방법

**예상 시간**: 15분

---

### 📋 Task 5.2: OAuth 리다이렉트 URL 업데이트
**설명**: 배포 URL로 OAuth 콜백 URL 변경

**체크리스트:**
- [ ] Google OAuth 콜백 URL 추가
- [ ] GitHub OAuth 콜백 URL 추가
- [ ] Supabase Site URL 및 Redirect URLs 설정

**참고 파일**: `DEPLOY.md` → 5. Supabase OAuth 리다이렉트 URL 업데이트

**예상 시간**: 20분

---

### 📋 Task 5.3: 배포 후 테스트
**설명**: 배포된 URL에서 모든 기능 테스트

**체크리스트:**
- [ ] 페이지 로딩 확인
- [ ] 이메일 로그인 테스트
- [ ] Google 로그인 테스트
- [ ] GitHub 로그인 테스트
- [ ] 카드 CRUD 테스트
- [ ] 다른 기기에서 접속 테스트

**참고 파일**: `DEPLOY.md` → 6. 배포 후 테스트

**예상 시간**: 30분

---

## Phase 6: 테스트 및 검증

### 📋 Task 4.1: 기능 테스트
**설명**: 모든 주요 기능 수동 테스트

**체크리스트:**
- [ ] 카드 추가 (정상 입력)
- [ ] 카드 추가 (빈 입력 - 에러 확인)
- [ ] 카드 드래그 앤 드롭 (같은 컬럼)
- [ ] 카드 드래그 앤 드롭 (다른 컬럼)
- [ ] 카드 삭제
- [ ] 초기 샘플 카드 표시
- [ ] 드래그 중 시각적 피드백 확인
- [ ] 드롭 영역 하이라이트 확인

**참고 파일**: `plan.md` → Verification Steps

**예상 시간**: 30분

---

### 📋 Task 4.2: 브라우저 호환성 테스트
**설명**: 다양한 브라우저에서 동작 확인

**체크리스트:**
- [ ] Chrome (최신)
- [ ] Firefox (최신)
- [ ] Safari (최신)
- [ ] Edge (최신)

**예상 시간**: 20분

---

### 📋 Task 4.3: 반응형 레이아웃 테스트
**설명**: 다양한 화면 크기에서 확인

**체크리스트:**
- [ ] 1920x1080 (Full HD)
- [ ] 1366x768 (일반 노트북)
- [ ] 1024x768 (최소 지원 해상도)
- [ ] 수평 스크롤 작동 확인

**예상 시간**: 15분

---

### 📋 Task 4.4: 접근성 테스트
**설명**: 키보드 네비게이션 및 스크린 리더 확인

**체크리스트:**
- [ ] Tab 키로 모든 요소 접근 가능
- [ ] 포커스 아웃라인 명확히 표시
- [ ] Enter 키로 버튼 클릭 가능
- [ ] Escape 키로 입력 취소 (향후)
- [ ] ARIA 레이블 확인

**참고 파일**: `DESIGN_SYSTEM.md` → 접근성

**예상 시간**: 20분

---

### 📋 Task 4.5: 성능 테스트
**설명**: 많은 카드 추가 시 성능 확인

**체크리스트:**
- [ ] 각 컬럼에 50개 카드 추가
- [ ] 드래그 앤 드롭 부드러움 확인
- [ ] 페이지 로딩 시간 측정
- [ ] Chrome DevTools Performance 프로파일링

**예상 시간**: 15분

---

## Phase 5: 문서화 및 배포

### ✅ Task 5.1: 문서 작성 (완료)
**설명**: 프로젝트 문서 생성

**체크리스트:**
- [x] `plan.md` - 구현 계획
- [x] `PRD.md` - 제품 요구사항 정의서
- [x] `TRD.md` - 기술 요구사항 정의서
- [x] `USER_FLOW.md` - 사용자 흐름도
- [x] `DATABASE_DESIGN.md` - 데이터베이스 설계
- [x] `DESIGN_SYSTEM.md` - 디자인 시스템
- [x] `TASKS.md` - 작업 목록 (현재 문서)
- [ ] `CODING_CONVENTION.md` - 코딩 컨벤션

**예상 시간**: 120분 (이미 완료)

---

### 📋 Task 5.2: README 작성
**설명**: 사용자를 위한 README.md 작성

**체크리스트:**
- [ ] 프로젝트 소개
- [ ] 기능 목록
- [ ] 실행 방법
- [ ] 사용법 스크린샷 (선택)
- [ ] 향후 계획

**예상 시간**: 20분

---

### 📋 Task 5.3: 코드 리뷰 및 정리
**설명**: 코드 품질 개선

**체크리스트:**
- [ ] 사용하지 않는 코드 제거
- [ ] 변수명 명확히 수정
- [ ] 주석 추가 (WHY, not WHAT)
- [ ] 들여쓰기 및 포매팅 통일
- [ ] 콘솔 로그 제거

**예상 시간**: 30분

---

### 📋 Task 5.4: Git 커밋
**설명**: 변경사항 커밋

**체크리스트:**
- [ ] `git add src/exercise/jihye/day03/kanban/`
- [ ] `git commit -m "feat(jihye): 칸반보드 구현 완료"`
- [ ] `git pull --no-rebase origin main` (최신화)
- [ ] 충돌 해결 (필요 시)
- [ ] `git push origin main`

**참고**: CLAUDE.md의 Git 워크플로 준수

**예상 시간**: 10분

---

## Phase 6: 향후 개선 사항 (Out of Scope)

### 🔮 Task 6.1: LocalStorage 저장
**설명**: 새로고침 후에도 데이터 유지

**체크리스트:**
- [ ] `localStorage.setItem()` 로 카드 저장
- [ ] `localStorage.getItem()` 로 카드 로드
- [ ] 카드 추가/이동/삭제 시 자동 저장

**예상 시간**: 60분

---

### 🔮 Task 6.2: 카드 편집 기능
**설명**: 카드 내용 인라인 수정

**체크리스트:**
- [ ] 카드 더블 클릭 시 편집 모드
- [ ] `contenteditable` 또는 `<input>` 전환
- [ ] Enter로 저장, Escape로 취소

**예상 시간**: 45분

---

### 🔮 Task 6.3: 카드 상세 정보
**설명**: 카드에 설명, 마감일, 태그 추가

**체크리스트:**
- [ ] 카드 클릭 시 모달 표시
- [ ] 설명 (textarea)
- [ ] 마감일 (date picker)
- [ ] 태그 (다중 선택)

**예상 시간**: 120분

---

### 🔮 Task 6.4: 컬럼 커스터마이징
**설명**: 컬럼 추가/삭제/이름 변경

**체크리스트:**
- [ ] "Add Column" 버튼
- [ ] 컬럼 이름 편집
- [ ] 컬럼 삭제 (빈 컬럼만)
- [ ] 컬럼 순서 변경 (드래그)

**예상 시간**: 90분

---

### 🔮 Task 6.5: 다크 모드
**설명**: 테마 전환 기능

**체크리스트:**
- [ ] 다크 모드 CSS 변수 정의
- [ ] 테마 토글 버튼
- [ ] `localStorage` 에 테마 저장
- [ ] `prefers-color-scheme` 감지

**예상 시간**: 60분

---

### 🔮 Task 6.6: 애니메이션 개선
**설명**: 부드러운 카드 이동 애니메이션

**체크리스트:**
- [ ] FLIP 애니메이션 기법 적용
- [ ] 카드 추가 시 fade-in
- [ ] 카드 삭제 시 fade-out
- [ ] 드래그 중 부드러운 이동

**예상 시간**: 90분

---

### 🔮 Task 6.7: 백엔드 연동
**설명**: REST API 서버 연동

**체크리스트:**
- [ ] Node.js/Express 백엔드 구축
- [ ] API 엔드포인트 (CRUD)
- [ ] fetch() 로 API 호출
- [ ] 로딩 상태 표시

**예상 시간**: 240분

---

## 작업 진행 추적

### 완료된 작업 (Completed)
- ✅ Phase 1: 기초 설정 및 구조 (모든 작업 완료)
- ✅ Phase 2: 레이아웃 및 스타일링 (모든 작업 완료)
- ✅ Phase 3: JavaScript 기능 구현 (모든 작업 완료)
- ✅ Task 5.1: 문서 작성

**완료 일시**: 2026-05-20 14:45  
**실제 소요 시간**: 약 60분 (문서 작성 제외)

### 현재 진행 중 (In Progress)
- 🚧 Phase 4: 테스트 및 검증

### 다음 작업 (Next Up)
1. Task 4.1: 기능 테스트
2. Task 5.4: Git 커밋 및 푸시

---

## 예상 총 소요 시간

| Phase | 예상 시간 |
|-------|-----------|
| Phase 1: 기초 설정 | 30분 |
| Phase 2: 레이아웃 및 스타일링 | 60분 |
| Phase 3: JavaScript 기능 구현 | 125분 |
| Phase 4: 테스트 및 검증 | 100분 |
| Phase 5: 문서화 및 배포 | 60분 |
| **Total (MVP)** | **375분 (약 6시간)** |

---

## 작업 우선순위

### 🔴 High Priority (필수)
- Phase 1, 2, 3의 모든 작업
- Task 4.1: 기능 테스트

### 🟡 Medium Priority (권장)
- Task 4.2: 브라우저 호환성 테스트
- Task 4.3: 반응형 레이아웃 테스트
- Task 5.3: 코드 리뷰 및 정리

### 🟢 Low Priority (선택)
- Task 4.4: 접근성 테스트
- Task 4.5: 성능 테스트
- Task 5.2: README 작성

---

## 의존성 그래프

```
Task 1.1 (구조 생성)
  ↓
Task 1.2 (HTML 구조) → Task 2.1 (보드 레이아웃)
  ↓                      ↓
Task 1.3 (CSS 리셋) → Task 2.2 (카드 스타일)
                        ↓
                      Task 2.3 (폼 스타일)
                        ↓
                      Task 2.4 (드래그 스타일)
                        ↓
                      Task 3.1 (초기화) → Task 3.2 (카드 생성)
                                            ↓
                                          Task 3.3 (카드 추가)
                                            ↓
                      Task 3.4~3.7 (드래그 앤 드롭)
                                            ↓
                                          Task 3.8 (카드 삭제)
                                            ↓
                                          Task 4.1~4.5 (테스트)
                                            ↓
                                          Task 5.2~5.4 (문서화 & 배포)
```

---

## 체크포인트

각 Phase 완료 후 다음을 확인하세요:

### ✅ Phase 1 완료 기준
- [ ] HTML 파일이 브라우저에서 열림
- [ ] 세 개의 빈 컬럼이 표시됨

### ✅ Phase 2 완료 기준
- [ ] 컬럼이 가로로 나란히 배치됨
- [ ] 스타일이 디자인 시스템과 일치함

### ✅ Phase 3 완료 기준
- [ ] 카드 추가, 이동, 삭제 모두 작동함
- [ ] 콘솔에 에러 없음

### ✅ Phase 4 완료 기준
- [ ] 모든 기능 테스트 통과
- [ ] 최소 2개 브라우저에서 정상 작동

### ✅ Phase 5 완료 기준
- [ ] Git에 커밋 완료
- [ ] 문서가 최신 상태

---

이 작업 목록은 칸반보드 구현의 로드맵 역할을 하며, 각 작업을 순차적으로 완료하면 MVP를 완성할 수 있습니다.
