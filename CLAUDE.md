# CLAUDE.md
# 칸반보드 애플리케이션 - Claude Code 가이드

이 문서는 Claude Code가 이 칸반보드 프로젝트에서 작업할 때 따라야 할 가이드를 제공합니다.

---

## 프로젝트 개요

**프로젝트**: 드래그 앤 드롭 기능을 가진 칸반보드 웹 애플리케이션  
**소유자**: jihye (kosa-vibecoding-2026-2nd 실습)  
**기술 스택**: 순수 HTML, CSS, JavaScript (외부 라이브러리 없음)  
**핵심 기능**: To-Do, In-Progress, Done 세 컬럼 간 카드 드래그 앤 드롭

---

## 프로젝트 구조

```
kanban/
├── index.html              # 메인 HTML 파일
├── styles.css              # 스타일시트
├── script.js               # JavaScript 로직
├── CLAUDE.md               # 이 파일 (Claude Code 가이드)
├── plan.md                 # 구현 계획 요약
├── PRD.md                  # 제품 요구사항 정의서
├── TRD.md                  # 기술 요구사항 정의서
├── USER_FLOW.md            # 사용자 흐름도 (Mermaid 차트)
├── DATABASE_DESIGN.md      # 데이터베이스 설계
├── DESIGN_SYSTEM.md        # 디자인 시스템
├── TASKS.md                # 작업 목록 및 체크리스트
└── CODING_CONVENTION.md    # 코딩 컨벤션 및 협업 가이드
```

**중요**: 코드 파일은 `index.html`, `styles.css`, `script.js` 세 개만 존재합니다. 나머지는 모두 설계 문서입니다.

---

## 작업 시작 전 필독

### 1. 설계 문서 참고 순서

새로운 작업을 시작하거나 질문을 받았을 때 다음 순서로 문서를 참고하세요:

1. **[TASKS.md](TASKS.md)** - 현재 진행 중인 작업과 다음 작업 확인
2. **[PRD.md](PRD.md)** - 제품 요구사항 및 기능 스펙 확인
3. **[TRD.md](TRD.md)** - 기술 구현 방법 및 아키텍처 확인
4. **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** - 스타일링 시 색상, 간격, 컴포넌트 스타일 참고
5. **[CODING_CONVENTION.md](CODING_CONVENTION.md)** - 코딩 스타일 및 네이밍 규칙 준수
6. **[USER_FLOW.md](USER_FLOW.md)** - 사용자 플로우 이해 (필요 시)

### 2. 핵심 원칙

- **단순함 우선**: 복잡한 솔루션보다 단순한 솔루션 선택
- **MVP 범위 준수**: 필수 기능만 구현, 향후 개선사항은 나중에
- **순수 바닐라 JS**: 외부 라이브러리 절대 사용 금지
- **문서 우선**: 코드 작성 전 관련 설계 문서 확인

---

## 기술 스택 및 제약사항

### 허용되는 기술
- **HTML5**: 시맨틱 태그 사용
- **CSS3**: Flexbox, CSS Variables, Transitions
- **JavaScript ES6+**: Arrow functions, const/let, Template literals
- **HTML5 Drag and Drop API**: 드래그 앤 드롭 구현

### 금지 사항
- ❌ 외부 라이브러리 (React, Vue, jQuery 등)
- ❌ CSS 프레임워크 (Bootstrap, Tailwind 등)
- ❌ 빌드 도구 (Webpack, Vite 등)
- ❌ 백엔드 서버 (현재 단계에서는 순수 프론트엔드만)

### 데이터 저장
- **현재 MVP**: 메모리만 사용 (페이지 새로고침 시 초기화)
- **향후 Phase 2**: LocalStorage 추가 예정
- **향후 Phase 3**: 백엔드 DB 연동 예정

---

## 로컬 실행 방법

### 개발 서버 시작
```bash
cd /home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban
python3 -m http.server 8765
```

### 브라우저 접속
```
http://localhost:8765/index.html
```

**WSL 환경**: Windows 브라우저에서도 동일 URL로 접근 가능

---

## 코딩 컨벤션 요약

자세한 내용은 [CODING_CONVENTION.md](CODING_CONVENTION.md) 참고

### HTML
- 들여쓰기: **2 스페이스**
- 시맨틱 태그 우선 사용
- ARIA 레이블 필수

### CSS
- 들여쓰기: **2 스페이스**
- CSS 변수 사용: `var(--primary-color)`
- BEM 스타일 네이밍: `.card__delete-btn`

### JavaScript
- 들여쓰기: **2 스페이스**
- 세미콜론 항상 사용
- `const` 우선, 변경 필요 시 `let`
- 함수 선언식 사용: `function createCard() {}`
- 변수명: camelCase (`cardId`, `columnsContainer`)
- 상수: UPPER_SNAKE_CASE (`MAX_CARDS`)

### 네이밍 규칙
```javascript
// ✅ Good
function createCard() { }
const isDragging = true;
const MAX_CARDS_PER_COLUMN = 100;

// ❌ Bad
function card() { }
const dragging = true;
const maxCards = 100;
```

---

## 주요 구현 가이드

### 1. HTML 구조

**컴포넌트 계층**:
```
.page-container
  └── h1 (제목)
  └── .board
      ├── .column (To-Do)
      │   ├── .column-header
      │   ├── .cards-container
      │   │   └── .card (여러 개)
      │   └── .add-card-form
      ├── .column (In-Progress)
      └── .column (Done)
```

**카드 구조**:
```html
<div class="card" draggable="true" id="card-1234567890">
  <span class="card-content">Task description</span>
  <button class="delete-btn" aria-label="Delete card">×</button>
</div>
```

### 2. CSS 주요 변수

자세한 내용은 [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) → 11. 디자인 토큰 요약 참고

```css
:root {
  /* Colors */
  --primary-color: #0052cc;
  --text-primary: #172b4d;
  --bg-primary: #ffffff;
  --todo-bg: #ebecf0;
  --in-progress-bg: #fff4e6;
  --done-bg: #e3fcef;
  
  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* Typography */
  --font-size-base: 14px;
  --font-weight-regular: 400;
  
  /* Transitions */
  --transition-base: 0.2s;
}
```

### 3. JavaScript 핵심 함수

**필수 구현 함수** (자세한 코드는 [TRD.md](TRD.md) → 4. 핵심 기술 구현 참고):

```javascript
// 초기화
function initializeApp() {
  renderInitialCards();
  attachEventListeners();
}

// 카드 생성
function createCard(content, columnId) {
  // XSS 방지, draggable 설정, 이벤트 리스너 연결
}

// 카드 추가
function addCard(columnId, content) {
  // 검증, createCard 호출, DOM 추가
}

// 드래그 앤 드롭 이벤트 핸들러
function handleDragStart(e) { }
function handleDragOver(e) { }
function handleDrop(e) { }
function handleDragEnd(e) { }

// 카드 삭제
function deleteCard(cardId) { }

// XSS 방지
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
```

### 4. 드래그 앤 드롭 구현 체크리스트

자세한 흐름은 [USER_FLOW.md](USER_FLOW.md) → 3. 카드 이동 흐름 참고

- [ ] `dragstart`: 카드 ID를 `dataTransfer`에 저장, `dragging` 클래스 추가
- [ ] `dragover`: `e.preventDefault()` 호출 (드롭 허용)
- [ ] `dragenter`: 컬럼에 `drag-over` 클래스 추가 (하이라이트)
- [ ] `dragleave`: `drag-over` 클래스 제거
- [ ] `drop`: 카드를 새 컬럼으로 이동 (`appendChild`)
- [ ] `dragend`: 모든 드래그 관련 클래스 제거

---

## 작업 진행 방법

### 1. 새 기능 추가 시

1. **[TASKS.md](TASKS.md)** 에서 다음 작업 확인
2. 관련 설계 문서 읽기 (PRD, TRD, DESIGN_SYSTEM)
3. 작은 단위로 구현 및 커밋
4. 브라우저에서 테스트
5. TASKS.md의 체크리스트 업데이트

### 2. 버그 수정 시

1. 버그 재현 단계 확인
2. Chrome DevTools로 디버깅
3. 근본 원인 해결 (임시 방편 지양)
4. 다른 기능에 영향 없는지 확인

### 3. 스타일링 작업 시

1. **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)** 에서 해당 컴포넌트 스타일 확인
2. CSS 변수 사용 (하드코딩 금지)
3. 반응형 확인 (최소 1024px)

---

## 테스트 체크리스트

자세한 내용은 [plan.md](plan.md) → Verification Steps 참고

### 기능 테스트
- [ ] 카드 추가 (정상 입력)
- [ ] 카드 추가 (빈 입력 시 에러)
- [ ] 카드 드래그 앤 드롭 (같은 컬럼, 다른 컬럼)
- [ ] 카드 삭제
- [ ] 초기 샘플 카드 표시
- [ ] 드래그 중 시각적 피드백 (불투명도, 하이라이트)

### 브라우저 테스트
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 접근성 테스트
- [ ] Tab 키로 모든 요소 접근
- [ ] 포커스 아웃라인 명확
- [ ] ARIA 레이블 존재

---

## Git 워크플로

### 커밋 메시지 형식
```
<type>(<scope>): <subject>

예시:
feat(card): 드래그 앤 드롭 기능 구현
fix(input): 빈 카드 생성 방지 로직 추가
style(css): 카드 호버 효과 개선
docs(readme): 실행 방법 추가
```

**Type**:
- `feat`: 새 기능
- `fix`: 버그 수정
- `style`: 스타일링 변경
- `refactor`: 리팩토링
- `docs`: 문서 변경
- `test`: 테스트 추가

### 커밋 전 체크리스트
- [ ] 코드가 정상 작동함
- [ ] 콘솔 에러 없음
- [ ] 불필요한 console.log 제거
- [ ] 코딩 컨벤션 준수
- [ ] 변경사항이 다른 기능에 영향 없음

### 스테이징 및 커밋
```bash
# 명시적 경로로 스테이징 (중요!)
git add src/exercise/jihye/day03/kanban/index.html
git add src/exercise/jihye/day03/kanban/styles.css
git add src/exercise/jihye/day03/kanban/script.js

# 또는
git add src/exercise/jihye/day03/kanban/*.html
git add src/exercise/jihye/day03/kanban/*.css
git add src/exercise/jihye/day03/kanban/*.js

# 커밋
git commit -m "feat(kanban): 칸반보드 기본 구조 구현"

# 최신화 (반드시 --no-rebase)
git pull --no-rebase origin main

# 푸시
git push origin main
```

**중요**: 저장소 루트의 CLAUDE.md에 따라 항상 `--no-rebase` 사용, rebase 절대 금지

---

## 문제 해결 가이드

### ⚠️ 자주 발생하는 버그 패턴

#### 1. JavaScript로 설정한 display 스타일이 적용되지 않는 경우

**증상**:
- `element.style.display = 'none'` 실행 후에도 요소가 계속 보임
- 로그인 후 화면 전환이 안 됨 (login-page가 계속 표시)

**원인**:
- CSS 파일에 해당 클래스의 display 속성이 이미 정의되어 있음
- CSS 규칙이 JavaScript inline style보다 우선순위가 높을 수 있음
- 예: `.login-page { display: flex }` vs `loginPage.style.display = 'none'`

**해결 방법**:
```javascript
// ❌ 작동하지 않을 수 있음
element.style.display = 'none';

// ✅ !important로 강제 적용
element.style.setProperty('display', 'none', 'important');
```

**디버깅**:
```javascript
// 현재 적용된 스타일 확인
console.log('Inline style:', element.style.display);
console.log('Computed style:', window.getComputedStyle(element).display);
```

#### 2. PostgreSQL integer 범위 초과 오류

**증상**:
- 카드 생성 시 `value "1779263861894" is out of range for type integer` 에러
- POST 요청이 400 Bad Request로 실패

**원인**:
- `Date.now()`는 매우 큰 숫자 반환 (예: 1779263861894)
- PostgreSQL `integer` 타입 범위: -2147483648 ~ 2147483647
- `position` 필드를 `Date.now()`로 설정하면 범위 초과

**해결 방법**:
```javascript
// ❌ 범위 초과
position: Date.now()

// ✅ 작은 숫자 사용 (카운터 기반)
const { count } = await supabase
  .from('cards')
  .select('*', { count: 'exact', head: true })
  .eq('column_id', columnId);

position: (count || 0) + 1
```

또는 데이터베이스 스키마에서 `bigint` 타입 사용.

#### 3. OAuth 리다이렉트 후 세션 복구 실패

**증상**:
- GitHub/Google 로그인 후 다시 로그인 화면으로 돌아감
- `SIGNED_IN` 이벤트는 발생하지만 user가 `null`

**원인**:
- OAuth 리다이렉트 직후 `getUser()` 호출 시 세션이 아직 복구 안 됨
- `onAuthStateChange` 이벤트와 `checkAuth()` 타이밍 충돌

**해결 방법**:
```javascript
// ❌ 세션 복구 안 기다림
async function checkAuth() {
  const user = await getCurrentUser();
  // ...
}

// ✅ 세션 먼저 복구
async function checkAuth() {
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user || await getCurrentUser();
  // ...
}
```

---

### 일반적인 디버깅 절차

#### Step 1: 콘솔 로그 확인
```javascript
// 함수 진입점 로깅
console.log('[functionName] Starting with:', { param1, param2 });

// 중간 단계 로깅
console.log('[functionName] Step 1 complete:', result1);

// 에러 로깅
console.error('[functionName] Error:', error);
```

#### Step 2: DOM 상태 확인
```javascript
// 요소 존재 확인
console.log('Element exists:', !!document.getElementById('element-id'));

// 현재 스타일 확인
const element = document.getElementById('element-id');
console.log('Computed style:', window.getComputedStyle(element).display);
```

#### Step 3: 네트워크 요청 확인
- Chrome DevTools → Network 탭
- Supabase 요청 상태 코드 확인 (200, 400, 403 등)
- Response 탭에서 에러 메시지 확인

#### Step 4: 테스트 페이지 사용
- `test.html` 파일로 단계별 테스트
- 각 기능을 독립적으로 검증

---

### 드래그 앤 드롭이 작동하지 않는 경우
1. `draggable="true"` 속성 확인
2. `dragover` 이벤트에서 `e.preventDefault()` 호출 확인
3. `dataTransfer.setData/getData` 사용 확인
4. Chrome DevTools의 Event Listeners 패널 확인

### 스타일이 적용되지 않는 경우
1. `<link rel="stylesheet" href="styles.css">` 확인
2. CSS 셀렉터 오타 확인
3. 브라우저 캐시 강제 새로고침 (Ctrl+Shift+R)
4. DevTools의 Elements 패널에서 computed styles 확인
5. **CSS 우선순위 문제**: `style.setProperty(prop, value, 'important')` 사용

### JavaScript 에러 발생 시
1. Console 패널에서 에러 메시지 확인
2. `<script src="script.js" defer>` 또는 `DOMContentLoaded` 사용 확인
3. 변수명 오타 확인
4. `null` 체크 누락 확인

### Supabase 인증/DB 오류 발생 시
1. **403 Forbidden**: RLS (Row Level Security) 정책 확인
2. **400 Bad Request**: 데이터 타입/범위 확인 (integer 오버플로우)
3. **401 Unauthorized**: 세션 만료, 재로그인 필요
4. 콘솔에서 Supabase 에러 메시지 확인

---

## 자주 묻는 질문

### Q1: 카드 데이터를 어디에 저장하나요?
**A**: 현재 MVP는 메모리만 사용합니다. DOM 자체가 데이터의 진실의 원천(Source of Truth)입니다. LocalStorage는 Phase 2에서 추가 예정입니다.

### Q2: 외부 아이콘 라이브러리를 사용해도 되나요?
**A**: 안 됩니다. 텍스트 기반 아이콘(×, +) 또는 Unicode 심볼만 사용하세요.

### Q3: CSS 프리프로세서(SASS/LESS)를 사용할 수 있나요?
**A**: 안 됩니다. 순수 CSS만 사용하며, CSS 변수로 충분합니다.

### Q4: 카드 편집 기능은 언제 추가하나요?
**A**: Phase 6 (향후 개선사항)에서 추가 예정입니다. 현재는 MVP 필수 기능만 구현합니다. [TASKS.md](TASKS.md) → Phase 6 참고

### Q5: 다크 모드를 구현해야 하나요?
**A**: 아니오, MVP 범위 밖입니다. [PRD.md](PRD.md) → 2.2 향후 고려사항 참고

---

## 현재 진행 상황

**진행률**: 문서 작성 완료, 코드 구현 미시작

### 완료된 작업
- ✅ 모든 설계 문서 작성 (PRD, TRD, USER_FLOW, DATABASE_DESIGN, DESIGN_SYSTEM, TASKS, CODING_CONVENTION)

### 다음 작업
1. Task 1.1: 프로젝트 구조 생성 (`index.html`, `styles.css`, `script.js` 생성)
2. Task 1.2: HTML 기본 구조 작성
3. Task 1.3: CSS 변수 및 리셋 스타일 정의

자세한 작업 목록 및 순서는 **[TASKS.md](TASKS.md)** 참고

---

## Claude Code가 해야 할 일 / 하지 말아야 할 일

### ✅ DO (해야 할 일)

1. **문서 우선 접근**
   - 코드 작성 전 관련 설계 문서 확인
   - 불확실하면 PRD/TRD 참고

2. **작은 단위로 작업**
   - 한 번에 하나의 기능만 구현
   - 각 기능 완료 후 테스트

3. **명확한 커밋 메시지**
   - `feat/fix/style/docs` 형식 준수
   - 변경 내용을 구체적으로 작성

4. **방어적 프로그래밍**
   - `null` 체크
   - 사용자 입력 검증
   - XSS 방지 (`escapeHtml()`)

5. **접근성 고려**
   - ARIA 레이블 추가
   - 키보드 네비게이션 지원
   - 명확한 포커스 아웃라인

### ❌ DON'T (하지 말아야 할 일)

1. **외부 라이브러리 추가**
   - jQuery, React, Lodash 등 절대 금지

2. **MVP 범위 초과**
   - 카드 편집, 다크 모드 등은 나중에
   - 요청받지 않은 기능 추가 금지

3. **복잡한 추상화**
   - 과도한 클래스/모듈화 지양
   - 간단한 함수로 충분

4. **하드코딩된 값**
   - CSS 변수 대신 직접 색상 입력 금지
   - 매직 넘버는 상수로 정의

5. **Git rebase 사용**
   - 항상 `--no-rebase`
   - 저장소 CLAUDE.md의 정책 준수

---

## 빠른 참조

| 문서 | 용도 |
|------|------|
| [PRD.md](PRD.md) | 제품 요구사항, 기능 스펙, 수락 기준 |
| [TRD.md](TRD.md) | 기술 구현 방법, 코드 예시, 아키텍처 |
| [TASKS.md](TASKS.md) | 작업 목록, 체크리스트, 진행 상황 |
| [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) | 컬러, 타이포그래피, 컴포넌트 스타일 |
| [CODING_CONVENTION.md](CODING_CONVENTION.md) | 코딩 스타일, 네이밍, Git 컨벤션 |
| [USER_FLOW.md](USER_FLOW.md) | 사용자 플로우, 상호작용 흐름도 |
| [DATABASE_DESIGN.md](DATABASE_DESIGN.md) | 데이터 모델 (향후 확장 시 참고) |
| [plan.md](plan.md) | 구현 계획 요약, 검증 단계 |

---

## 마지막 체크리스트

코드를 작성하거나 커밋하기 전 다음을 확인하세요:

- [ ] 관련 설계 문서를 읽었는가?
- [ ] MVP 범위 내의 작업인가?
- [ ] 코딩 컨벤션을 준수했는가?
- [ ] 브라우저에서 테스트했는가?
- [ ] 콘솔 에러가 없는가?
- [ ] 커밋 메시지가 명확한가?
- [ ] `git pull --no-rebase`를 사용했는가?

---

**문서 버전**: 1.0  
**최종 업데이트**: 2026-05-20  
**작성자**: jihye + Claude Code
