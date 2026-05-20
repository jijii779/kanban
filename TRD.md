# TRD (Technical Requirements Document)
# 칸반보드 애플리케이션

## 1. 기술 스택

### 1.1 프론트엔드
- **HTML5**: 구조 및 시맨틱 마크업
- **CSS3**: 스타일링 및 레이아웃
- **JavaScript (ES6+)**: 비즈니스 로직 및 DOM 조작

### 1.2 API 및 라이브러리
- **HTML5 Drag and Drop API**: 드래그 앤 드롭 기능
- **CSS Flexbox**: 반응형 레이아웃
- **No external dependencies**: 순수 바닐라 JS

### 1.3 개발 환경
- **로컬 서버**: Python HTTP Server (`python3 -m http.server`)
- **브라우저 DevTools**: 디버깅 및 테스트
- **VSCode**: 코드 에디터 (권장)

## 2. 시스템 아키텍처

### 2.1 파일 구조
```
kanban/
├── index.html          # 메인 HTML 파일
├── styles.css          # 스타일시트
├── script.js           # JavaScript 로직
├── plan.md             # 구현 계획
├── PRD.md              # 제품 요구사항 정의서
├── TRD.md              # 기술 요구사항 정의서 (현재 문서)
├── USER_FLOW.md        # 사용자 흐름도
├── DATABASE_DESIGN.md  # 데이터베이스 설계
├── DESIGN_SYSTEM.md    # 디자인 시스템
├── TASKS.md            # 작업 목록
└── CODING_CONVENTION.md # 코딩 컨벤션
```

### 2.2 컴포넌트 구조
```
App
├── Header (제목)
└── Board
    ├── Column (To-Do)
    │   ├── Column Header
    │   ├── Cards Container
    │   │   └── Card[]
    │   └── Add Card Form
    ├── Column (In-Progress)
    │   └── (동일 구조)
    └── Column (Done)
        └── (동일 구조)
```

## 3. 데이터 구조

### 3.1 카드 (Card) 객체
```javascript
{
  id: string,           // 고유 식별자 (예: "card-1234567890")
  content: string,      // 카드 내용
  columnId: string,     // 소속 컬럼 ID ("todo", "in-progress", "done")
  createdAt: timestamp, // 생성 시간 (선택 사항)
  order: number         // 컬럼 내 순서 (선택 사항)
}
```

### 3.2 컬럼 (Column) 구조
```javascript
{
  id: string,          // 컬럼 ID ("todo", "in-progress", "done")
  title: string,       // 표시 제목
  cards: Card[]        // 카드 배열 (DOM 기반으로 관리)
}
```

### 3.3 초기 데이터
```javascript
const initialData = [
  { id: 'card-1', content: 'Review project requirements', columnId: 'todo' },
  { id: 'card-2', content: 'Design database schema', columnId: 'todo' },
  { id: 'card-3', content: 'Implement drag and drop', columnId: 'in-progress' },
  { id: 'card-4', content: 'Setup project structure', columnId: 'done' }
];
```

## 4. 핵심 기술 구현

### 4.1 드래그 앤 드롭 (Drag and Drop)

#### 4.1.1 이벤트 핸들러
```javascript
// dragstart: 드래그 시작
card.addEventListener('dragstart', (e) => {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.id);
  e.target.classList.add('dragging');
});

// dragend: 드래그 종료
card.addEventListener('dragend', (e) => {
  e.target.classList.remove('dragging');
});

// dragover: 드래그 중 (드롭 영역)
column.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
});

// dragenter: 드래그 진입
column.addEventListener('dragenter', (e) => {
  e.preventDefault();
  if (e.target.classList.contains('cards-container')) {
    e.target.parentElement.classList.add('drag-over');
  }
});

// dragleave: 드래그 떠남
column.addEventListener('dragleave', (e) => {
  if (e.target.classList.contains('column')) {
    e.target.classList.remove('drag-over');
  }
});

// drop: 드롭 (배치)
column.addEventListener('drop', (e) => {
  e.preventDefault();
  const cardId = e.dataTransfer.getData('text/html');
  const card = document.getElementById(cardId);
  const cardsContainer = e.target.closest('.column').querySelector('.cards-container');
  cardsContainer.appendChild(card);
  e.target.closest('.column').classList.remove('drag-over');
});
```

#### 4.1.2 브라우저 호환성
- Chrome 4+
- Firefox 3.5+
- Safari 3.1+
- Edge (모든 버전)

### 4.2 카드 관리

#### 4.2.1 카드 생성
```javascript
function createCard(content, columnId) {
  const card = document.createElement('div');
  card.className = 'card';
  card.draggable = true;
  card.id = `card-${Date.now()}`;
  
  card.innerHTML = `
    <span class="card-content">${escapeHtml(content)}</span>
    <button class="delete-btn" aria-label="Delete card">&times;</button>
  `;
  
  // 이벤트 리스너 추가
  addCardEventListeners(card);
  
  return card;
}
```

#### 4.2.2 카드 삭제
```javascript
function deleteCard(card) {
  card.remove();
}
```

#### 4.2.3 XSS 방지
```javascript
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### 4.3 DOM 조작 최적화

#### 4.3.1 이벤트 위임 (Event Delegation)
```javascript
// 각 카드에 개별 리스너 대신 컨테이너에 위임
document.querySelector('.board').addEventListener('click', (e) => {
  if (e.target.classList.contains('delete-btn')) {
    e.target.closest('.card').remove();
  }
});
```

#### 4.3.2 DocumentFragment 사용
```javascript
function renderInitialCards(cards) {
  const fragment = document.createDocumentFragment();
  cards.forEach(cardData => {
    fragment.appendChild(createCard(cardData.content, cardData.columnId));
  });
  return fragment;
}
```

## 5. 스타일링 요구사항

### 5.1 레이아웃
- **Flexbox 사용**: 컬럼 배치 및 카드 정렬
- **반응형 디자인**: min-width 1024px 최적화
- **간격**: 컬럼 간 16px, 카드 간 12px

### 5.2 컬러 팔레트
```css
:root {
  --primary-color: #0052cc;
  --secondary-color: #f4f5f7;
  --text-primary: #172b4d;
  --text-secondary: #5e6c84;
  --border-color: #dfe1e6;
  --success-color: #00875a;
  --danger-color: #de350b;
  --todo-bg: #ebecf0;
  --in-progress-bg: #fff4e6;
  --done-bg: #e3fcef;
  --card-bg: #ffffff;
  --drag-over-bg: #deebff;
}
```

### 5.3 애니메이션
- **드래그 시작**: opacity 0.5, cursor grabbing
- **드래그 오버**: 배경색 변경 + 테두리 강조
- **호버**: transform scale(1.02), box-shadow 증가
- **전환**: transition 0.2s ease

### 5.4 접근성
- **포커스 표시**: outline 2px solid #0052cc
- **ARIA 레이블**: 삭제 버튼, 입력 필드
- **키보드 탐색**: Tab, Enter, Escape 지원

## 6. 성능 최적화

### 6.1 렌더링 최적화
- 초기 로딩 시 DocumentFragment 사용
- CSS transform 사용 (reflow 최소화)
- 이벤트 위임으로 메모리 사용량 감소

### 6.2 메모리 관리
- 카드 삭제 시 이벤트 리스너 정리
- 큰 이미지나 미디어 파일 미포함
- DOM 노드 재사용

### 6.3 번들 크기
- HTML: ~2KB
- CSS: ~3KB
- JS: ~5KB
- **Total: ~10KB** (압축 전)

## 7. 보안 고려사항

### 7.1 XSS 방지
- 사용자 입력은 `textContent` 또는 `escapeHtml()` 처리
- `innerHTML` 사용 시 sanitize

### 7.2 CSP (Content Security Policy)
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline';">
```

### 7.3 데이터 검증
- 카드 내용: 최대 길이 500자
- 빈 문자열 입력 방지
- 특수 문자 이스케이프

## 8. 테스트 전략

### 8.1 기능 테스트
- [ ] 카드 생성 (정상/빈 입력)
- [ ] 카드 드래그 앤 드롭 (같은 컬럼/다른 컬럼)
- [ ] 카드 삭제
- [ ] 초기 데이터 로딩

### 8.2 브라우저 테스트
- [ ] Chrome (최신)
- [ ] Firefox (최신)
- [ ] Safari (최신)
- [ ] Edge (최신)

### 8.3 반응형 테스트
- [ ] 1920x1080 (Full HD)
- [ ] 1366x768 (Laptop)
- [ ] 1024x768 (최소 지원)

### 8.4 접근성 테스트
- [ ] 키보드만으로 모든 기능 사용
- [ ] 스크린 리더 호환성
- [ ] 색맹 모드 확인

## 9. 배포 요구사항

### 9.1 로컬 실행
```bash
cd /path/to/kanban
python3 -m http.server 8765
# 브라우저에서 http://localhost:8765 접속
```

### 9.2 정적 호스팅 (선택 사항)
- GitHub Pages
- Netlify
- Vercel

### 9.3 필요 환경
- Python 3.x (로컬 서버용)
- 모던 브라우저 (Chrome, Firefox, Safari, Edge)

## 10. 모니터링 및 디버깅

### 10.1 로깅
```javascript
const DEBUG = true;

function log(message, data) {
  if (DEBUG) {
    console.log(`[Kanban] ${message}`, data);
  }
}
```

### 10.2 에러 핸들링
```javascript
window.addEventListener('error', (e) => {
  console.error('Global error:', e.message);
});

window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});
```

### 10.3 디버깅 팁
- Chrome DevTools의 Event Listeners 패널 활용
- `console.log(e.dataTransfer)` 로 드래그 데이터 확인
- Elements 패널에서 드래그 중 클래스 변화 관찰

## 11. 향후 기술 로드맵

### Phase 2: 데이터 영속성
- LocalStorage API 통합
- JSON import/export

### Phase 3: 고급 기능
- Web Components로 리팩토링
- Service Worker (오프라인 지원)
- IndexedDB (대용량 데이터)

### Phase 4: 협업 기능
- WebSocket 실시간 동기화
- 백엔드 API 연동
- 사용자 인증 (OAuth)
