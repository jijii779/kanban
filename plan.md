# Kanban Board Implementation Plan

## Context
jihye 참가자가 day03 실습으로 HTML, CSS, JavaScript를 사용한 칸반보드를 요청했습니다. 칸반보드는 세 개의 컬럼(To-Do, In-Progress, Done)으로 구성되며, 카드를 드래그 앤 드롭으로 컬럼 간 이동할 수 있어야 합니다.

현재 `/home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/` 디렉토리는 비어있으며, 새로운 정적 웹 애플리케이션을 생성해야 합니다.

## Implementation Approach

### 1. 파일 구조
다음 세 개의 파일을 생성합니다:
- `index.html` - 칸반보드의 구조와 레이아웃
- `styles.css` - 칸반보드 스타일링 (모던하고 깔끔한 디자인)
- `script.js` - 드래그 앤 드롭 기능과 카드 관리 로직

### 2. 주요 기능

#### HTML 구조
- 세 개의 컬럼 컨테이너: "To-Do", "In-Progress", "Done"
- 각 컬럼에 카드를 추가할 수 있는 입력 폼
- 초기 샘플 카드 몇 개 포함

#### CSS 스타일링
- Flexbox를 사용한 반응형 레이아웃
- 각 컬럼을 시각적으로 구분 (배경색, 테두리)
- 카드 스타일: 그림자 효과, hover 상태, 드래그 중 시각적 피드백
- 드래그 오버 시 드롭 영역 하이라이트

#### JavaScript 기능
- **HTML5 Drag and Drop API 사용**:
  - `dragstart`: 드래그 시작 시 카드 데이터 저장
  - `dragover`: 드롭 가능 영역 표시 (event.preventDefault() 필수)
  - `drop`: 카드를 새 컬럼으로 이동
  - `dragend`: 드래그 종료 시 정리
  
- **카드 추가 기능**:
  - 각 컬럼에 "Add Card" 버튼
  - 텍스트 입력으로 새 카드 생성
  
- **카드 삭제 기능**:
  - 각 카드에 삭제 버튼 (×) 추가

### 3. 기술 스택
- 순수 HTML, CSS, JavaScript (외부 라이브러리 없음)
- HTML5 Drag and Drop API
- CSS Flexbox
- DOM 조작 (querySelector, createElement, appendChild 등)

### 4. 드래그 앤 드롭 구현 상세

```javascript
// 드래그 시작: 카드 ID 저장
card.addEventListener('dragstart', (e) => {
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text/html', e.target.id);
  e.target.classList.add('dragging');
});

// 드래그 오버: 드롭 허용
column.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  column.classList.add('drag-over');
});

// 드롭: 카드 이동
column.addEventListener('drop', (e) => {
  e.preventDefault();
  const cardId = e.dataTransfer.getData('text/html');
  const card = document.getElementById(cardId);
  column.querySelector('.cards-container').appendChild(card);
  column.classList.remove('drag-over');
});
```

## Critical Files
- `/home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/index.html` (생성)
- `/home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/styles.css` (생성)
- `/home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/script.js` (생성)

## Verification Steps

1. **로컬 서버 실행**:
   ```bash
   cd /home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban
   python3 -m http.server 8765
   ```

2. **브라우저에서 확인**:
   - `http://localhost:8765/index.html` 접속
   - 세 개의 컬럼이 나란히 표시되는지 확인

3. **드래그 앤 드롭 테스트**:
   - To-Do 컬럼의 카드를 드래그하여 In-Progress로 이동
   - In-Progress의 카드를 Done으로 이동
   - 드래그 중 시각적 피드백 확인 (불투명도, 커서 변화)
   - 드롭 영역 하이라이트 확인

4. **카드 관리 테스트**:
   - 각 컬럼에서 "Add Card" 버튼으로 새 카드 추가
   - 카드의 삭제 버튼(×)으로 카드 제거
   - 빈 입력으로 카드 추가 시도 시 추가 안 되는지 확인

5. **반응형 확인**:
   - 브라우저 창 크기 조절 시 레이아웃 유지 확인
