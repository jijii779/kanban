# Design System (디자인 시스템)
# 칸반보드 애플리케이션

## 1. 디자인 원칙

### 1.1 핵심 가치
- **명확성 (Clarity)**: 모든 UI 요소는 그 기능이 즉시 이해되어야 함
- **일관성 (Consistency)**: 동일한 패턴과 시각 언어 사용
- **피드백 (Feedback)**: 모든 사용자 액션에 즉각적인 시각적 응답
- **단순성 (Simplicity)**: 불필요한 장식 없이 기능에 집중

### 1.2 디자인 접근법
- **Mobile-First**: 작은 화면부터 설계 (최소 1024px)
- **Progressive Enhancement**: 기본 기능 우선, 고급 기능은 점진적 추가
- **Accessibility-First**: 키보드 네비게이션, 스크린 리더 지원

---

## 2. 컬러 시스템

### 2.1 Primary Colors (주요 색상)

```css
:root {
  /* Brand Colors */
  --primary-color: #0052cc;          /* 주요 액션, 링크 */
  --primary-hover: #0747a6;          /* 호버 상태 */
  --primary-active: #003d99;         /* 클릭 상태 */
  
  /* Secondary Colors */
  --secondary-color: #5e6c84;        /* 보조 텍스트, 아이콘 */
  --secondary-light: #8993a4;        /* 비활성화 요소 */
}
```

**사용 예시:**
- 버튼 배경: `--primary-color`
- 보조 정보: `--secondary-color`
- 비활성화 버튼: `--secondary-light`

### 2.2 Neutral Colors (중립 색상)

```css
:root {
  /* Background */
  --bg-primary: #ffffff;             /* 카드 배경 */
  --bg-secondary: #f4f5f7;           /* 페이지 배경 */
  --bg-tertiary: #ebecf0;            /* 컬럼 배경 */
  
  /* Text */
  --text-primary: #172b4d;           /* 주요 텍스트 */
  --text-secondary: #5e6c84;         /* 보조 텍스트 */
  --text-disabled: #a5adba;          /* 비활성화 텍스트 */
  
  /* Borders */
  --border-color: #dfe1e6;           /* 기본 테두리 */
  --border-hover: #c1c7d0;           /* 호버 시 테두리 */
  --border-focus: #0052cc;           /* 포커스 시 테두리 */
}
```

### 2.3 Column Colors (컬럼별 색상)

```css
:root {
  /* To-Do Column */
  --todo-bg: #ebecf0;                /* 연한 회색 */
  --todo-border: #dfe1e6;
  --todo-accent: #42526e;
  
  /* In-Progress Column */
  --in-progress-bg: #fff4e6;         /* 연한 주황 */
  --in-progress-border: #ffc400;
  --in-progress-accent: #ff8b00;
  
  /* Done Column */
  --done-bg: #e3fcef;                /* 연한 녹색 */
  --done-border: #00c875;
  --done-accent: #00875a;
}
```

### 2.4 Semantic Colors (의미론적 색상)

```css
:root {
  /* Success */
  --success-color: #00875a;
  --success-bg: #e3fcef;
  
  /* Warning */
  --warning-color: #ff8b00;
  --warning-bg: #fffae6;
  
  /* Error */
  --error-color: #de350b;
  --error-bg: #ffebe6;
  
  /* Info */
  --info-color: #0065ff;
  --info-bg: #deebff;
}
```

### 2.5 Drag & Drop States (드래그 상태 색상)

```css
:root {
  --dragging-opacity: 0.5;           /* 드래그 중 불투명도 */
  --drag-over-bg: #deebff;           /* 드롭 가능 영역 */
  --drag-over-border: #0052cc;       /* 드롭 가능 테두리 */
}
```

---

## 3. 타이포그래피

### 3.1 Font Family

```css
:root {
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 
                  'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 
                  'Helvetica Neue', sans-serif;
  --font-mono: 'SF Mono', 'Monaco', 'Inconsolata', 'Fira Mono', 
               'Droid Sans Mono', 'Source Code Pro', monospace;
}
```

**이유**: 시스템 폰트 스택 사용으로 빠른 렌더링 및 네이티브 느낌 제공

### 3.2 Font Sizes

```css
:root {
  /* Heading Sizes */
  --font-size-h1: 28px;              /* 페이지 제목 */
  --font-size-h2: 22px;              /* 섹션 제목 */
  --font-size-h3: 18px;              /* 컬럼 제목 */
  
  /* Body Sizes */
  --font-size-base: 14px;            /* 기본 텍스트 */
  --font-size-large: 16px;           /* 큰 텍스트 */
  --font-size-small: 12px;           /* 작은 텍스트, 캡션 */
  --font-size-xs: 10px;              /* 매우 작은 텍스트 */
}
```

### 3.3 Font Weights

```css
:root {
  --font-weight-regular: 400;        /* 일반 텍스트 */
  --font-weight-medium: 500;         /* 강조 텍스트 */
  --font-weight-semibold: 600;       /* 제목 */
  --font-weight-bold: 700;           /* 강한 강조 */
}
```

### 3.4 Line Heights

```css
:root {
  --line-height-tight: 1.2;          /* 제목 */
  --line-height-normal: 1.5;         /* 본문 */
  --line-height-relaxed: 1.75;       /* 긴 텍스트 */
}
```

### 3.5 Typography Usage

| 요소 | 크기 | 굵기 | 색상 | 행간 |
|------|------|------|------|------|
| 페이지 제목 | 28px | 600 | --text-primary | 1.2 |
| 컬럼 제목 | 18px | 600 | --text-primary | 1.2 |
| 카드 내용 | 14px | 400 | --text-primary | 1.5 |
| 보조 정보 | 12px | 400 | --text-secondary | 1.5 |
| 버튼 텍스트 | 14px | 500 | varies | 1.2 |

---

## 4. 간격 (Spacing)

### 4.1 Spacing Scale (8pt Grid System)

```css
:root {
  --spacing-xs: 4px;                 /* 0.5x */
  --spacing-sm: 8px;                 /* 1x */
  --spacing-md: 16px;                /* 2x */
  --spacing-lg: 24px;                /* 3x */
  --spacing-xl: 32px;                /* 4x */
  --spacing-2xl: 48px;               /* 6x */
  --spacing-3xl: 64px;               /* 8x */
}
```

### 4.2 Component Spacing

| 요소 | 내부 여백 (padding) | 외부 여백 (margin) |
|------|---------------------|-------------------|
| 카드 | 12px (상하좌우) | 0 0 12px 0 |
| 컬럼 | 16px | 0 16px 0 0 |
| 버튼 | 8px 16px | varies |
| 입력 필드 | 8px 12px | 0 0 8px 0 |
| 페이지 컨테이너 | 24px | 0 auto |

---

## 5. 레이아웃

### 5.1 Grid System

```css
.board {
  display: flex;
  gap: var(--spacing-md);            /* 컬럼 간격: 16px */
  padding: var(--spacing-lg);        /* 보드 여백: 24px */
  overflow-x: auto;                  /* 수평 스크롤 */
}

.column {
  flex: 0 0 320px;                   /* 고정 너비: 320px */
  min-width: 280px;                  /* 최소 너비 */
  max-width: 400px;                  /* 최대 너비 */
}
```

### 5.2 Responsive Breakpoints

```css
/* 현재 MVP는 데스크톱 우선 */
:root {
  --breakpoint-mobile: 768px;        /* 모바일 */
  --breakpoint-tablet: 1024px;       /* 태블릿 */
  --breakpoint-desktop: 1280px;      /* 데스크톱 */
  --breakpoint-wide: 1920px;         /* 와이드 스크린 */
}

/* 최소 지원 해상도: 1024px */
@media (max-width: 1024px) {
  .column {
    flex: 0 0 280px;
  }
}
```

### 5.3 Container Widths

```css
.page-container {
  max-width: 1600px;                 /* 최대 너비 */
  margin: 0 auto;                    /* 중앙 정렬 */
  padding: var(--spacing-lg);
}
```

---

## 6. 컴포넌트 스타일

### 6.1 Card (카드)

```css
.card {
  background: var(--bg-primary);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
  cursor: grab;
  transition: all 0.2s ease;
}

.card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.card:active {
  cursor: grabbing;
}

.card.dragging {
  opacity: 0.5;
  transform: rotate(3deg);
}
```

**시각적 계층:**
- **Elevation 1** (기본): `box-shadow: 0 1px 3px rgba(0,0,0,0.12)`
- **Elevation 2** (호버): `box-shadow: 0 4px 8px rgba(0,0,0,0.15)`
- **Elevation 3** (드래그): `box-shadow: 0 8px 16px rgba(0,0,0,0.2)`

### 6.2 Column (컬럼)

```css
.column {
  background: var(--bg-tertiary);
  border-radius: 12px;
  padding: 16px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}

.column.drag-over {
  background: var(--drag-over-bg);
  border: 2px dashed var(--drag-over-border);
  box-shadow: inset 0 0 0 2px var(--primary-color);
}

.column-header {
  font-size: var(--font-size-h3);
  font-weight: var(--font-weight-semibold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

### 6.3 Button (버튼)

```css
/* Primary Button */
.btn-primary {
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-primary:hover {
  background: var(--primary-hover);
}

.btn-primary:active {
  background: var(--primary-active);
}

.btn-primary:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  padding: 8px 16px;
  font-size: var(--font-size-base);
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-secondary:hover {
  background: var(--bg-secondary);
  border-color: var(--border-hover);
}

/* Icon Button (Delete) */
.delete-btn {
  background: transparent;
  color: var(--text-secondary);
  border: none;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  opacity: 0;
}

.card:hover .delete-btn {
  opacity: 1;
}

.delete-btn:hover {
  background: var(--error-bg);
  color: var(--error-color);
}
```

### 6.4 Input (입력 필드)

```css
.input-field {
  width: 100%;
  padding: 8px 12px;
  border: 2px solid var(--border-color);
  border-radius: 6px;
  font-size: var(--font-size-base);
  font-family: var(--font-primary);
  color: var(--text-primary);
  background: var(--bg-primary);
  transition: border-color 0.2s ease;
}

.input-field:hover {
  border-color: var(--border-hover);
}

.input-field:focus {
  outline: none;
  border-color: var(--border-focus);
  box-shadow: 0 0 0 3px rgba(0, 82, 204, 0.1);
}

.input-field::placeholder {
  color: var(--text-disabled);
}

.input-field.error {
  border-color: var(--error-color);
}
```

### 6.5 Add Card Form (카드 추가 폼)

```css
.add-card-form {
  margin-top: auto;
  padding-top: var(--spacing-md);
}

.add-card-btn {
  width: 100%;
  padding: 10px;
  background: rgba(0, 82, 204, 0.08);
  border: none;
  border-radius: 6px;
  color: var(--primary-color);
  font-weight: var(--font-weight-medium);
  cursor: pointer;
  transition: background 0.2s ease;
}

.add-card-btn:hover {
  background: rgba(0, 82, 204, 0.15);
}

.add-card-input {
  margin-bottom: 8px;
  min-height: 60px;
  resize: vertical;
}
```

---

## 7. 애니메이션 & 트랜지션

### 7.1 Duration (지속 시간)

```css
:root {
  --transition-fast: 0.1s;           /* 즉각 반응 */
  --transition-base: 0.2s;           /* 기본 트랜지션 */
  --transition-slow: 0.3s;           /* 느린 트랜지션 */
  --transition-slower: 0.5s;         /* 매우 느린 트랜지션 */
}
```

### 7.2 Easing (가속도)

```css
:root {
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-smooth: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

### 7.3 Common Transitions

```css
/* 기본 트랜지션 */
.transition-base {
  transition: all var(--transition-base) var(--ease-in-out);
}

/* 호버 효과 */
.hover-lift {
  transition: transform var(--transition-base) var(--ease-out);
}
.hover-lift:hover {
  transform: translateY(-2px);
}

/* 드래그 앤 드롭 */
.dragging {
  transition: opacity var(--transition-fast) var(--ease-in-out),
              transform var(--transition-fast) var(--ease-in-out);
}
```

### 7.4 Keyframe Animations

```css
/* 카드 추가 애니메이션 */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-enter {
  animation: slideInUp var(--transition-base) var(--ease-out);
}

/* 드롭 영역 펄스 */
@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 0 0 rgba(0, 82, 204, 0.4);
  }
  50% {
    box-shadow: 0 0 0 10px rgba(0, 82, 204, 0);
  }
}

.drag-over {
  animation: pulse 1.5s ease-in-out infinite;
}
```

---

## 8. 아이콘 시스템

### 8.1 Icon Style
- **Type**: Text-based (×, +) 또는 Unicode symbols
- **Size**: 16px, 20px, 24px
- **Weight**: 400 (regular)

### 8.2 Common Icons

```html
<!-- 삭제 -->
<button class="delete-btn" aria-label="Delete card">×</button>

<!-- 추가 -->
<button class="add-btn" aria-label="Add card">+ Add Card</button>

<!-- 드래그 핸들 (향후) -->
<span class="drag-handle" aria-label="Drag to move">⋮⋮</span>
```

---

## 9. 접근성 (Accessibility)

### 9.1 Focus States

```css
*:focus {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}

*:focus:not(:focus-visible) {
  outline: none;
}

*:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
```

### 9.2 ARIA Labels

```html
<!-- 카드 -->
<div class="card" role="article" aria-label="Task: Review code">
  <span class="card-content">Review code</span>
  <button class="delete-btn" aria-label="Delete task">×</button>
</div>

<!-- 컬럼 -->
<div class="column" role="region" aria-label="To-Do column">
  <h3 class="column-header">To-Do</h3>
  <div class="cards-container" role="list">
    <!-- 카드들 -->
  </div>
</div>

<!-- 입력 필드 -->
<input 
  type="text" 
  class="input-field" 
  aria-label="New card content"
  placeholder="Enter task description..."
>
```

### 9.3 Keyboard Navigation

| 키 | 액션 |
|----|------|
| Tab | 다음 요소로 포커스 이동 |
| Shift+Tab | 이전 요소로 포커스 이동 |
| Enter | 버튼 클릭, 폼 제출 |
| Escape | 입력 취소, 모달 닫기 |
| Space | 체크박스 토글 (향후) |

---

## 10. 다크 모드 (향후 구현)

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg-primary: #1f2937;
    --bg-secondary: #111827;
    --bg-tertiary: #374151;
    
    --text-primary: #f9fafb;
    --text-secondary: #d1d5db;
    
    --border-color: #4b5563;
    --border-hover: #6b7280;
  }
}
```

---

## 11. 디자인 토큰 요약

```css
:root {
  /* Colors */
  --primary-color: #0052cc;
  --text-primary: #172b4d;
  --bg-primary: #ffffff;
  --border-color: #dfe1e6;
  
  /* Typography */
  --font-primary: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-size-base: 14px;
  --font-weight-regular: 400;
  --line-height-normal: 1.5;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* Border Radius */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  
  /* Shadows */
  --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.15);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.2);
  
  /* Transitions */
  --transition-base: 0.2s;
  --ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 12. 컴포넌트 체크리스트

각 컴포넌트는 다음 상태를 지원해야 합니다:

- [ ] **Default** (기본 상태)
- [ ] **Hover** (마우스 오버)
- [ ] **Active** (클릭/드래그 중)
- [ ] **Focus** (키보드 포커스)
- [ ] **Disabled** (비활성화)
- [ ] **Error** (에러 상태)
- [ ] **Loading** (로딩 중, 향후)

---

이 디자인 시스템은 칸반보드 애플리케이션의 일관된 시각적 경험을 보장하며, 향후 확장 시에도 참고할 수 있습니다.
