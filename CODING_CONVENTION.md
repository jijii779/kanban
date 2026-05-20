# Coding Convention & Collaboration Guide
# 칸반보드 애플리케이션

## 1. 개요

이 문서는 칸반보드 프로젝트의 코딩 컨벤션과 협업 가이드를 정의합니다. 일관된 코드 스타일을 유지하여 가독성과 유지보수성을 높이는 것이 목표입니다.

---

## 2. 일반 원칙

### 2.1 KISS (Keep It Simple, Stupid)
- 복잡한 솔루션보다 단순한 솔루션 우선
- 과도한 추상화 지양
- 3줄 이하의 중복 코드는 함수로 분리하지 않음

### 2.2 DRY (Don't Repeat Yourself)
- 동일한 로직이 3회 이상 반복되면 함수로 추출
- 매직 넘버는 상수로 정의

### 2.3 YAGNI (You Aren't Gonna Need It)
- 현재 필요하지 않은 기능은 구현하지 않음
- "향후에 필요할 수도"는 구현 이유가 아님

### 2.4 명확한 네이밍
- 변수/함수명은 의도를 명확히 드러내야 함
- 약어 사용 최소화 (단, `btn`, `img`, `col`은 허용)

---

## 3. HTML 컨벤션

### 3.1 기본 규칙

#### 들여쓰기
- **2 스페이스** 사용 (탭 없음)

```html
<!-- ✅ Good -->
<div class="board">
  <div class="column">
    <h3>To-Do</h3>
  </div>
</div>

<!-- ❌ Bad: 4 스페이스 또는 탭 -->
<div class="board">
    <div class="column">
        <h3>To-Do</h3>
    </div>
</div>
```

#### 속성 순서
1. `class`
2. `id`
3. `data-*`
4. `aria-*`, `role`
5. 기타 속성 (type, href, src, etc.)

```html
<!-- ✅ Good -->
<button class="btn-primary" id="submit-btn" type="button" aria-label="Submit">
  Submit
</button>
```

#### 닫는 태그
- 자체 닫는 태그는 `/` 없이 사용

```html
<!-- ✅ Good -->
<input type="text" class="input-field">
<img src="icon.png" alt="Icon">

<!-- ❌ Bad -->
<input type="text" class="input-field" />
```

### 3.2 시맨틱 HTML

#### 시맨틱 태그 우선 사용
```html
<!-- ✅ Good -->
<header>
  <h1>Kanban Board</h1>
</header>
<main>
  <section class="board">
    <article class="card">Task 1</article>
  </section>
</main>

<!-- ❌ Bad -->
<div class="header">
  <div class="title">Kanban Board</div>
</div>
<div class="main">
  <div class="board">
    <div class="card">Task 1</div>
  </div>
</div>
```

#### 접근성 속성 필수
```html
<!-- ✅ Good -->
<button class="delete-btn" aria-label="Delete card">×</button>
<input type="text" id="card-input" aria-label="Card content">

<!-- ❌ Bad: ARIA 없음 -->
<button class="delete-btn">×</button>
```

### 3.3 클래스 네이밍 (BEM 스타일)

**BEM (Block Element Modifier)** 컨벤션 사용:
- Block: `.card`
- Element: `.card__content`, `.card__delete-btn`
- Modifier: `.card--dragging`, `.card--done`

```html
<!-- ✅ Good -->
<div class="card card--dragging">
  <span class="card__content">Task description</span>
  <button class="card__delete-btn">×</button>
</div>

<!-- ❌ Bad: 불명확한 네이밍 -->
<div class="card drag">
  <span class="content">Task description</span>
  <button class="delete">×</button>
</div>
```

**예외**: 간단한 프로젝트이므로 BEM을 엄격히 따르지 않아도 됨. 일관성만 유지.

---

## 4. CSS 컨벤션

### 4.1 기본 규칙

#### 들여쓰기
- **2 스페이스** 사용

```css
/* ✅ Good */
.card {
  background: white;
  padding: 12px;
}

/* ❌ Bad */
.card{background:white;padding:12px;}
```

#### 속성 순서
1. 레이아웃 (display, position, float)
2. 박스 모델 (width, height, margin, padding)
3. 타이포그래피 (font, color, text-align)
4. 비주얼 (background, border, box-shadow)
5. 기타 (transition, animation)

```css
.card {
  /* Layout */
  display: flex;
  position: relative;
  
  /* Box Model */
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  
  /* Typography */
  font-size: 14px;
  color: #172b4d;
  
  /* Visual */
  background: white;
  border: 1px solid #dfe1e6;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  
  /* Misc */
  transition: all 0.2s ease;
}
```

### 4.2 CSS 변수 사용

#### 하드코딩된 값 대신 변수 사용
```css
/* ✅ Good */
.card {
  background: var(--bg-primary);
  color: var(--text-primary);
  padding: var(--spacing-md);
}

/* ❌ Bad */
.card {
  background: #ffffff;
  color: #172b4d;
  padding: 16px;
}
```

#### 변수 네이밍
- 목적 기반: `--primary-color` (✅)
- 값 기반: `--blue` (❌)

### 4.3 선택자

#### ID 선택자 지양
```css
/* ✅ Good */
.submit-btn {
  background: blue;
}

/* ❌ Bad */
#submit-btn {
  background: blue;
}
```

#### 중첩 최소화 (최대 3단계)
```css
/* ✅ Good */
.card {
  /* ... */
}
.card__content {
  /* ... */
}

/* ❌ Bad: 과도한 중첩 */
.board .column .cards-container .card .card-content {
  /* ... */
}
```

### 4.4 반응형 디자인

#### Mobile-First 접근 (향후)
```css
/* ✅ Good */
.column {
  width: 100%;
}

@media (min-width: 768px) {
  .column {
    width: 320px;
  }
}

/* ❌ Bad: Desktop-First */
.column {
  width: 320px;
}

@media (max-width: 767px) {
  .column {
    width: 100%;
  }
}
```

### 4.5 주석

#### 섹션 구분
```css
/* ==========================================================================
   Layout
   ========================================================================== */

.board {
  /* ... */
}

/* ==========================================================================
   Components
   ========================================================================== */

.card {
  /* ... */
}
```

#### 복잡한 로직 설명
```css
/* Z-index scale:
   1-9: Normal content
   10-19: Dropdowns, tooltips
   20-29: Modals
   30+: Critical overlays
*/
.modal {
  z-index: 20;
}
```

---

## 5. JavaScript 컨벤션

### 5.1 기본 규칙

#### 들여쓰기
- **2 스페이스** 사용

#### 세미콜론
- 항상 사용

```javascript
// ✅ Good
const cards = [];
const card = createCard('Task 1', 'todo');

// ❌ Bad
const cards = []
const card = createCard('Task 1', 'todo')
```

#### 따옴표
- **작은따옴표 (`'`)** 우선 사용
- 템플릿 리터럴은 백틱 (`` ` ``)

```javascript
// ✅ Good
const columnId = 'todo';
const html = `<div class="card">${content}</div>`;

// ❌ Bad
const columnId = "todo";
const html = '<div class="card">' + content + '</div>';
```

### 5.2 변수 선언

#### `const` 우선, 변경 필요 시 `let`
```javascript
// ✅ Good
const maxCards = 100;
let cardCount = 0;

// ❌ Bad
var maxCards = 100;
```

#### 변수명 컨벤션
- **camelCase**: 변수, 함수
- **UPPER_SNAKE_CASE**: 상수
- **PascalCase**: 클래스 (사용 안 함)

```javascript
// ✅ Good
const cardId = 'card-123';
const MAX_CARDS_PER_COLUMN = 100;

function createCard(content) {
  // ...
}

// ❌ Bad
const CardId = 'card-123';
const max_cards = 100;

function CreateCard(content) {
  // ...
}
```

### 5.3 함수

#### 함수 선언 vs 표현식
- **함수 선언식** 사용 (호이스팅 명확)

```javascript
// ✅ Good
function createCard(content, columnId) {
  const card = document.createElement('div');
  // ...
  return card;
}

// ❌ Bad
const createCard = function(content, columnId) {
  // ...
};
```

#### 화살표 함수
- 콜백, 짧은 함수에만 사용

```javascript
// ✅ Good
cards.forEach(card => {
  renderCard(card);
});

const double = (x) => x * 2;

// ❌ Bad: 긴 함수
const createCard = (content, columnId) => {
  const card = document.createElement('div');
  card.className = 'card';
  // 20줄 이상...
  return card;
};
```

#### 매개변수 기본값
```javascript
// ✅ Good
function createCard(content, columnId = 'todo') {
  // ...
}

// ❌ Bad
function createCard(content, columnId) {
  columnId = columnId || 'todo';
  // ...
}
```

### 5.4 네이밍

#### 동사 + 명사
```javascript
// ✅ Good
function createCard() { }
function deleteCard() { }
function renderCards() { }
function initializeApp() { }

// ❌ Bad
function card() { }
function remove() { }
function cards() { }
```

#### Boolean 변수
- `is`, `has`, `should` 접두사

```javascript
// ✅ Good
const isDragging = true;
const hasCards = cards.length > 0;
const shouldSave = true;

// ❌ Bad
const dragging = true;
const cards = true;
```

### 5.5 DOM 조작

#### 쿼리 셀렉터
- 명확한 셀렉터 사용
- 결과를 변수에 캐싱

```javascript
// ✅ Good
const cardsContainer = document.querySelector('.cards-container');
const cards = cardsContainer.querySelectorAll('.card');

// ❌ Bad: 반복 쿼리
document.querySelector('.cards-container').appendChild(card);
document.querySelector('.cards-container').scrollTop = 0;
```

#### 이벤트 리스너
- 이벤트 위임 사용
- 명명된 함수 사용 (디버깅 용이)

```javascript
// ✅ Good
function handleDeleteClick(e) {
  if (e.target.classList.contains('delete-btn')) {
    const card = e.target.closest('.card');
    card.remove();
  }
}

document.querySelector('.board').addEventListener('click', handleDeleteClick);

// ❌ Bad: 각 카드에 개별 리스너
cards.forEach(card => {
  card.querySelector('.delete-btn').addEventListener('click', (e) => {
    e.target.closest('.card').remove();
  });
});
```

### 5.6 에러 처리

#### 방어적 프로그래밍
```javascript
// ✅ Good
function moveCard(cardId, newColumnId) {
  const card = document.getElementById(cardId);
  if (!card) {
    console.error(`Card not found: ${cardId}`);
    return;
  }
  
  const column = document.getElementById(newColumnId);
  if (!column) {
    console.error(`Column not found: ${newColumnId}`);
    return;
  }
  
  column.appendChild(card);
}

// ❌ Bad: 에러 처리 없음
function moveCard(cardId, newColumnId) {
  const card = document.getElementById(cardId);
  const column = document.getElementById(newColumnId);
  column.appendChild(card); // card나 column이 null이면 에러
}
```

### 5.7 주석

#### JSDoc 스타일 (선택 사항)
```javascript
/**
 * 새로운 카드를 생성합니다.
 * @param {string} content - 카드 내용
 * @param {string} columnId - 소속 컬럼 ID
 * @returns {HTMLDivElement} 생성된 카드 엘리먼트
 */
function createCard(content, columnId) {
  // ...
}
```

#### WHY, not WHAT
```javascript
// ✅ Good: 이유를 설명
// 드래그 중 다른 이벤트 방지를 위해 클래스 추가
card.classList.add('dragging');

// ❌ Bad: 코드 그대로 설명
// 카드에 dragging 클래스 추가
card.classList.add('dragging');
```

#### TODO 주석
```javascript
// TODO: 카드 편집 기능 추가
// FIXME: Safari에서 드래그 앤 드롭 버그
// HACK: 임시 해결책, 추후 리팩토링 필요
```

---

## 6. 파일 구조

### 6.1 디렉토리 구조
```
kanban/
├── index.html
├── styles.css
├── script.js
├── README.md
├── docs/
│   ├── plan.md
│   ├── PRD.md
│   ├── TRD.md
│   ├── USER_FLOW.md
│   ├── DATABASE_DESIGN.md
│   ├── DESIGN_SYSTEM.md
│   ├── TASKS.md
│   └── CODING_CONVENTION.md
└── assets/ (향후)
    ├── images/
    └── icons/
```

### 6.2 파일 네이밍
- **kebab-case**: `user-flow.md`, `design-system.md`
- **UPPERCASE**: `README.md`, `LICENSE`

---

## 7. Git 컨벤션

### 7.1 커밋 메시지

#### 형식
```
<type>(<scope>): <subject>

<body>

<footer>
```

#### Type
- `feat`: 새 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 의미 변경 없음 (포매팅, 세미콜론 등)
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가/수정
- `chore`: 빌드 프로세스, 설정 변경

#### 예시
```bash
# ✅ Good
git commit -m "feat(card): 드래그 앤 드롭 기능 추가"
git commit -m "fix(input): 빈 카드 생성 방지"
git commit -m "docs: README 사용법 추가"

# ❌ Bad
git commit -m "update"
git commit -m "bug fix"
git commit -m "WIP"
```

### 7.2 브랜치 전략

#### 현재 프로젝트 (단순)
- `main` 브랜치만 사용
- 직접 커밋 (소규모 개인 프로젝트)

#### 향후 확장 시
```
main (프로덕션)
  ↓
develop (개발)
  ↓
feature/card-edit (기능 브랜치)
feature/dark-mode
```

### 7.3 Merge 정책

**중요**: CLAUDE.md에 따라 **항상 merge, rebase 금지**

```bash
# ✅ Good
git pull --no-rebase origin main

# ❌ Bad
git pull --rebase origin main
git rebase main
```

---

## 8. 코드 리뷰 체크리스트

### 8.1 기능성
- [ ] 요구사항 충족
- [ ] 모든 기능 정상 작동
- [ ] 에러 없음

### 8.2 코드 품질
- [ ] 네이밍이 명확함
- [ ] 중복 코드 없음
- [ ] 함수가 단일 책임만 가짐
- [ ] 매직 넘버/문자열이 상수로 정의됨

### 8.3 스타일
- [ ] 들여쓰기 일관성
- [ ] 세미콜론, 따옴표 일관성
- [ ] 주석이 적절함
- [ ] 불필요한 console.log 제거

### 8.4 성능
- [ ] DOM 쿼리 최소화
- [ ] 이벤트 위임 사용
- [ ] 불필요한 리렌더링 없음

### 8.5 접근성
- [ ] ARIA 레이블 추가
- [ ] 키보드 네비게이션 가능
- [ ] 포커스 아웃라인 명확

### 8.6 보안
- [ ] XSS 방지 (HTML 이스케이프)
- [ ] 사용자 입력 검증

---

## 9. 개발 워크플로

### 9.1 새 기능 추가 시

1. **계획**
   - TASKS.md에서 작업 선택
   - 요구사항 확인

2. **구현**
   - 작은 단위로 커밋
   - 주석 작성

3. **테스트**
   - 수동 테스트 (브라우저)
   - 다양한 시나리오 확인

4. **커밋**
   ```bash
   git add src/exercise/jihye/day03/kanban/
   git commit -m "feat(card): 카드 편집 기능 추가"
   ```

5. **푸시**
   ```bash
   git pull --no-rebase origin main
   git push origin main
   ```

### 9.2 버그 수정 시

1. **재현**
   - 버그 재현 단계 확인
   - 콘솔 에러 로그 확인

2. **디버깅**
   - Chrome DevTools 사용
   - `console.log()` 또는 브레이크포인트

3. **수정**
   - 근본 원인 해결
   - 임시 방편 지양

4. **검증**
   - 버그 재현 안 되는지 확인
   - 다른 기능 영향 없는지 확인

5. **커밋**
   ```bash
   git commit -m "fix(drag): Safari 드래그 앤 드롭 버그 수정"
   ```

---

## 10. 도구 및 환경

### 10.1 권장 도구

#### 에디터
- **VSCode** (추천)
- WebStorm
- Sublime Text

#### VSCode 확장
- **Prettier**: 코드 포매팅
- **ESLint**: JavaScript 린팅
- **Live Server**: 로컬 서버
- **HTMLHint**: HTML 검증

#### 브라우저
- **Chrome DevTools**: 디버깅, 프로파일링
- Firefox Developer Tools
- Safari Web Inspector

### 10.2 포매팅 설정 (Prettier)

`.prettierrc` (선택 사항):
```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80,
  "arrowParens": "always"
}
```

### 10.3 린팅 설정 (ESLint)

`.eslintrc.json` (선택 사항):
```json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 12,
    "sourceType": "module"
  },
  "rules": {
    "indent": ["error", 2],
    "quotes": ["error", "single"],
    "semi": ["error", "always"]
  }
}
```

---

## 11. 협업 가이드

### 11.1 커뮤니케이션

#### 문제 발생 시
1. 에러 메시지 전체 복사
2. 재현 단계 명확히 설명
3. 환경 정보 (브라우저, OS)

#### 기능 제안 시
1. 왜 필요한지 설명
2. 예상되는 영향 범위
3. 대안 검토

### 11.2 코드 공유

#### Pull Request (향후)
1. 제목: `feat(card): 카드 편집 기능 추가`
2. 설명:
   - 무엇을 변경했는가
   - 왜 변경했는가
   - 어떻게 테스트했는가
3. 스크린샷 첨부 (UI 변경 시)

---

## 12. 체크리스트 템플릿

### 새 기능 체크리스트
```markdown
- [ ] 요구사항 확인
- [ ] 구현 완료
- [ ] 코드 리뷰 (자체)
- [ ] 수동 테스트
- [ ] 문서 업데이트
- [ ] 커밋 메시지 작성
- [ ] 푸시
```

### 코드 리뷰 체크리스트
```markdown
- [ ] 기능 정상 작동
- [ ] 코딩 컨벤션 준수
- [ ] 불필요한 코드 없음
- [ ] 주석 적절
- [ ] 성능 이슈 없음
- [ ] 접근성 고려
- [ ] 보안 취약점 없음
```

---

## 요약

### 핵심 규칙
1. **들여쓰기**: 2 스페이스
2. **네이밍**: camelCase (변수/함수), kebab-case (CSS 클래스)
3. **세미콜론**: 항상 사용
4. **따옴표**: 작은따옴표 (`'`) 우선
5. **함수**: 동사 + 명사
6. **주석**: WHY, not WHAT
7. **Git**: `feat/fix/docs` 형식 커밋 메시지
8. **Merge**: 항상 `--no-rebase`

### 참고 문서
- [MDN Web Docs](https://developer.mozilla.org/)
- [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

---

이 컨벤션은 프로젝트 진행 중 필요에 따라 업데이트될 수 있습니다.
