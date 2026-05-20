# 칸반보드 (Kanban Board)

드래그 앤 드롭 기능을 가진 간단한 칸반보드 웹 애플리케이션입니다.

## 📋 프로젝트 개요

이 프로젝트는 순수 HTML, CSS, JavaScript로 구현된 칸반보드 애플리케이션입니다. 외부 라이브러리 없이 HTML5 Drag and Drop API를 사용하여 직관적인 작업 관리를 제공합니다.

## ✨ 주요 기능

### MVP 기능 (현재 구현됨)

- ✅ **3개 컬럼 칸반보드**: To-Do, In-Progress, Done
- ✅ **드래그 앤 드롭**: 카드를 컬럼 간 자유롭게 이동
- ✅ **카드 추가**: 각 컬럼에서 새로운 작업 카드 생성
- ✅ **카드 삭제**: 불필요한 카드 제거
- ✅ **시각적 피드백**: 드래그 중 불투명도 변경, 드롭 영역 하이라이트
- ✅ **반응형 디자인**: 다양한 화면 크기 지원 (최소 1024px)
- ✅ **접근성**: ARIA 레이블, 키보드 네비게이션 지원

### Phase 2 기능 (구현 완료 - 테스트 대기)

- ✅ **사용자 인증**: 이메일, Google, GitHub 로그인 (코드 완성)
- ✅ **데이터 영속성**: Supabase PostgreSQL DB 저장 (코드 완성)
- 📋 **OAuth 설정**: Google, GitHub OAuth 앱 설정 필요
- 📋 **로컬 테스트**: config.js 자격증명 입력 후 테스트 필요
- 📋 **GitHub Pages 배포**: 온라인 배포 예정

### 향후 개선 예정 (Phase 3+)

- 🔮 카드 편집 기능
- 🔮 카드 상세 정보 (설명, 마감일, 태그)
- 🔮 다크 모드
- 🔮 컬럼 커스터마이징
- 🔮 팀 협업 기능

## 🚀 실행 방법

### Phase 2 실행 (Supabase 연동)

#### 1. Supabase 설정
```bash
# config.js에 실제 자격증명 입력 (필수)
# config.example.js를 참고하여 수정
```

config.js 예시:
```javascript
const SUPABASE_CONFIG = {
  url: 'https://xxxxx.supabase.co',
  anonKey: 'eyJhbGc...'
};
export default SUPABASE_CONFIG;
```

#### 2. 로컬 서버 시작

```bash
cd /path/to/kanban
python3 -m http.server 8765
```

#### 3. 브라우저 접속

```
http://localhost:8765/index.html
```

**WSL 환경에서 Windows 브라우저 사용 시:**
```
http://<WSL-IP>:8765/index.html
```

WSL IP 확인:
```bash
hostname -I | awk '{print $1}'
```

### Phase 1 실행 (로컬 메모리만 - 구버전)
Phase 1 버전을 사용하려면 git 히스토리에서 이전 커밋을 체크아웃하세요.

## 🎯 사용 방법

### 카드 추가
1. 원하는 컬럼 하단의 **"+ Add Card"** 버튼 클릭
2. 텍스트 입력 필드에 작업 내용 입력
3. **Enter** 키 또는 **Add** 버튼 클릭
4. 취소하려면 **Escape** 키 또는 **Cancel** 버튼 클릭

### 카드 이동
1. 이동할 카드를 마우스로 **클릭 & 드래그**
2. 목표 컬럼으로 이동 (배경색 변경으로 드롭 가능 영역 표시)
3. 마우스 버튼을 놓아 **드롭**

### 카드 삭제
1. 삭제할 카드에 **마우스 오버**
2. 우측 상단의 **× 버튼** 클릭

## 🛠 기술 스택

### 프론트엔드
- **HTML5**: 시맨틱 마크업, Drag and Drop API
- **CSS3**: Flexbox, CSS Variables, Transitions
- **JavaScript (ES6+)**: 순수 바닐라 JS

### 개발 도구
- **로컬 서버**: Python HTTP Server
- **버전 관리**: Git
- **코드 에디터**: VSCode (권장)

### 제약사항
- ❌ 외부 라이브러리 없음 (React, jQuery 등)
- ❌ CSS 프레임워크 없음 (Bootstrap, Tailwind 등)
- ❌ 빌드 도구 없음 (Webpack, Vite 등)

## 📁 프로젝트 구조

```
kanban/
├── index.html              # 메인 HTML 파일 (로그인 페이지 포함)
├── styles.css              # 스타일시트 (로그인 UI 스타일 포함)
├── script.js               # JavaScript 로직 (Supabase DB 연동)
├── auth.js                 # 인증 로직 (Supabase Auth)
├── config.js               # Supabase 자격증명 (gitignore)
├── config.example.js       # Supabase 설정 템플릿
├── .gitignore              # Git 제외 파일 (config.js 포함)
├── README.md               # 이 파일
├── CLAUDE.md               # Claude Code 가이드
├── plan.md                 # 구현 계획
├── PRD.md                  # 제품 요구사항 정의서
├── TRD.md                  # 기술 요구사항 정의서
├── USER_FLOW.md            # 사용자 흐름도
├── DATABASE_DESIGN.md      # 데이터베이스 설계
├── DESIGN_SYSTEM.md        # 디자인 시스템
├── TASKS.md                # 작업 목록
├── CODING_CONVENTION.md    # 코딩 컨벤션
├── SUPABASE.md             # Supabase 설정 가이드 (Phase 2)
└── DEPLOY.md               # GitHub Pages 배포 가이드 (Phase 2)
```

## 🎨 디자인 시스템

### 컬러 팔레트
- **To-Do**: 회색 계열 (#ebecf0)
- **In-Progress**: 주황 계열 (#fff4e6)
- **Done**: 녹색 계열 (#e3fcef)
- **Primary**: 파란색 (#0052cc)

### 타이포그래피
- **폰트**: 시스템 폰트 스택 (San Francisco, Segoe UI, Roboto 등)
- **크기**: 14px (기본), 18px (제목)

자세한 내용은 [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) 참고

## 🧪 테스트

### 기능 테스트 체크리스트
- [x] 초기 샘플 카드 4개 표시
- [x] 카드 추가 (정상 입력)
- [x] 카드 추가 (빈 입력 시 에러)
- [x] 카드 드래그 앤 드롭 (같은 컬럼)
- [x] 카드 드래그 앤 드롭 (다른 컬럼)
- [x] 카드 삭제
- [x] 드래그 중 시각적 피드백

### 브라우저 호환성
- ✅ Chrome (최신)
- ✅ Firefox (최신)
- ✅ Safari (최신)
- ✅ Edge (최신)

### 해상도 지원
- ✅ 1920x1080 (Full HD)
- ✅ 1366x768 (일반 노트북)
- ✅ 1024x768 (최소 지원)

## 📚 문서

자세한 기술 문서는 다음을 참고하세요:

### 기본 문서
- **[PRD.md](PRD.md)**: 제품 요구사항 및 기능 스펙
- **[TRD.md](TRD.md)**: 기술 구현 방법 및 아키텍처
- **[USER_FLOW.md](USER_FLOW.md)**: 사용자 플로우 다이어그램 (Mermaid)
- **[DESIGN_SYSTEM.md](DESIGN_SYSTEM.md)**: 디자인 토큰 및 컴포넌트 스타일
- **[TASKS.md](TASKS.md)**: 구현 작업 목록 및 진행 상황
- **[CODING_CONVENTION.md](CODING_CONVENTION.md)**: 코딩 스타일 가이드

### Phase 2 문서 (신규)
- **[SUPABASE.md](SUPABASE.md)**: Supabase 설정 및 DB 연동 가이드
- **[DEPLOY.md](DEPLOY.md)**: GitHub Pages 배포 가이드

## 🤝 기여하기

### 코딩 컨벤션
- **들여쓰기**: 2 스페이스
- **네이밍**: camelCase (변수/함수), kebab-case (CSS)
- **커밋 메시지**: `feat/fix/docs: 설명`

자세한 내용은 [CODING_CONVENTION.md](CODING_CONVENTION.md) 참고

### Git 워크플로
```bash
# 변경사항 스테이징
git add index.html styles.css script.js

# 커밋
git commit -m "feat(kanban): 새 기능 설명"

# 최신화 (항상 --no-rebase 사용)
git pull --no-rebase origin main

# 푸시
git push origin main
```

## 📝 개발 로그

### v2.0.0 (2026-05-20) - Phase 2 완료
- ✅ Supabase 인증 통합 (이메일, Google, GitHub)
- ✅ 로그인/회원가입 UI 구현
- ✅ PostgreSQL DB 연동 (카드 CRUD)
- ✅ 사용자별 데이터 분리 (RLS)
- ✅ auth.js 모듈 생성
- ✅ config.js 보안 설정 (.gitignore)
- 📋 OAuth 앱 설정 대기 중
- 📋 로컬 테스트 대기 중
- 📋 GitHub Pages 배포 대기 중

### v1.0.0 (2026-05-20) - Phase 1 완료
- ✅ MVP 기능 구현 완료
- ✅ HTML/CSS/JS 기본 구조 완성
- ✅ 드래그 앤 드롭 기능 구현
- ✅ 카드 추가/삭제 기능
- ✅ 모든 설계 문서 작성

## ❓ 문제 해결

### 서버가 실행되지 않는 경우
```bash
# 기존 프로세스 종료
lsof -ti:8765 | xargs kill -9

# 다른 포트로 시도
python3 -m http.server 9000
```

### 드래그 앤 드롭이 작동하지 않는 경우
1. `draggable="true"` 속성 확인
2. `dragover` 이벤트에서 `e.preventDefault()` 호출 확인
3. Chrome DevTools Console에서 에러 확인

### 스타일이 적용되지 않는 경우
1. `<link rel="stylesheet" href="styles.css">` 확인
2. 브라우저 캐시 강제 새로고침 (Ctrl+Shift+R)

## 📄 라이선스

이 프로젝트는 교육 목적의 실습 프로젝트입니다.

## 👤 작성자

- **jihye** - KOSA 바이브 코딩 과정 실습
- **날짜**: 2026-05-20

---

**프로젝트**: kosa-vibecoding-2026-2nd  
**경로**: `src/exercise/jihye/day03/kanban/`
