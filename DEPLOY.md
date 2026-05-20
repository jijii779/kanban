# GitHub Pages 배포 가이드
# 칸반보드 애플리케이션

이 문서는 칸반보드 애플리케이션을 GitHub Pages에 배포하는 방법을 설명합니다.

---

## 1. GitHub Pages란?

GitHub Pages는 GitHub 저장소에서 직접 호스팅되는 무료 정적 웹사이트 서비스입니다.

### 장점
- ✅ **무료**: 비용 없이 웹사이트 호스팅
- ✅ **간편함**: Git push만으로 자동 배포
- ✅ **HTTPS**: 자동으로 HTTPS 지원
- ✅ **커스텀 도메인**: 원하는 도메인 연결 가능

### 제약사항
- ❌ 백엔드 코드 실행 불가 (순수 정적 파일만)
- ❌ 환경 변수 숨기기 어려움 (Supabase anon key는 공개 가능)

---

## 2. 배포 전 준비사항

### 2.1 파일 체크리스트

배포할 파일들이 준비되었는지 확인:

```
kanban/
├── index.html          ✅ 메인 HTML
├── styles.css          ✅ 스타일시트
├── script.js           ✅ JavaScript 로직
├── config.js           ✅ Supabase 설정 (환경 변수)
└── README.md           ✅ 프로젝트 설명
```

### 2.2 config.js 확인

`config.js`에 실제 Supabase 정보가 입력되어 있는지 확인:

```javascript
const SUPABASE_CONFIG = {
  url: 'https://xxxxx.supabase.co',  // 실제 URL로 교체
  anonKey: 'eyJhbGc...'               // 실제 anon key로 교체
};

export default SUPABASE_CONFIG;
```

**중요**: 
- `anon key`는 GitHub에 공개해도 안전합니다 (Row Level Security로 보호됨)
- `service_role key`는 절대 공개하면 안 됩니다!

### 2.3 경로 확인

Supabase OAuth 콜백 URL 설정:
- Google OAuth: `https://weable-kosa.github.io/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/`
- GitHub OAuth: 동일

---

## 3. GitHub Pages 배포 방법

### 방법 1: 저장소 전체 배포 (권장)

이 방법은 저장소 전체를 GitHub Pages로 호스팅합니다.

#### 3.1 GitHub 저장소 설정

1. 저장소 페이지에서 **Settings** → **Pages** 이동
2. **Source** 섹션에서:
   - Branch: `main` 선택
   - Folder: `/ (root)` 선택
3. "Save" 클릭

#### 3.2 배포 URL 확인

5분 정도 기다린 후 배포 완료:
```
https://weable-kosa.github.io/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/
```

### 방법 2: 별도 브랜치 사용 (선택 사항)

칸반보드만 따로 배포하고 싶다면 `gh-pages` 브랜치 사용:

#### 3.2.1 gh-pages 브랜치 생성

```bash
cd /home/xpert/work/kosa-vibecoding-2026-2nd

# 현재 kanban 폴더만 복사하여 gh-pages 브랜치 생성
git checkout --orphan gh-pages
git rm -rf .
cp -r src/exercise/jihye/day03/kanban/* .
git add .
git commit -m "Deploy kanban to GitHub Pages"
git push origin gh-pages
```

#### 3.2.2 GitHub Pages 설정

1. **Settings** → **Pages** 이동
2. Branch: `gh-pages` 선택
3. Folder: `/ (root)` 선택

배포 URL:
```
https://weable-kosa.github.io/kosa-vibecoding-2026-2nd/
```

---

## 4. 배포 자동화 (GitHub Actions)

### 4.1 Workflow 파일 생성

`.github/workflows/deploy.yml` 생성:

```yaml
name: Deploy Kanban to GitHub Pages

on:
  push:
    branches: [ main ]
    paths:
      - 'src/exercise/jihye/day03/kanban/**'

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Pages
        uses: actions/configure-pages@v4

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'src/exercise/jihye/day03/kanban'

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4.2 자동 배포 확인

1. 코드 수정 후 `git push`
2. **Actions** 탭에서 배포 진행 상황 확인
3. 배포 완료 후 URL 접속

---

## 5. Supabase OAuth 리다이렉트 URL 업데이트

### 5.1 Google OAuth

Google Cloud Console → OAuth 2.0 클라이언트:
- **Authorized redirect URIs**에 추가:
  ```
  https://weable-kosa.github.io/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/
  https://xxxxx.supabase.co/auth/v1/callback
  ```

### 5.2 GitHub OAuth

GitHub OAuth App 설정:
- **Authorization callback URL**:
  ```
  https://xxxxx.supabase.co/auth/v1/callback
  ```

### 5.3 Supabase 설정

Supabase **Authentication** → **URL Configuration**:
- **Site URL**:
  ```
  https://weable-kosa.github.io/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/
  ```
- **Redirect URLs**에 추가:
  ```
  https://weable-kosa.github.io/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/**
  ```

---

## 6. 배포 후 테스트

### 6.1 기능 테스트 체크리스트

배포된 URL에서 모든 기능 확인:

- [ ] 페이지 로딩 정상
- [ ] 이메일 회원가입 및 로그인
- [ ] Google 소셜 로그인
- [ ] GitHub 소셜 로그인
- [ ] 카드 추가
- [ ] 카드 드래그 앤 드롭
- [ ] 카드 삭제
- [ ] 로그아웃 후 재로그인 시 데이터 유지

### 6.2 브라우저별 테스트

- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### 6.3 모바일 테스트

- [ ] iOS Safari
- [ ] Android Chrome

---

## 7. 문제 해결

### 7.1 "404 Not Found" 에러

**원인**: 파일 경로가 잘못됨

**해결**:
1. 저장소의 파일 구조 확인
2. GitHub Pages 설정에서 올바른 브랜치와 폴더 선택
3. URL 경로 확인 (대소문자 구분)

### 7.2 "Failed to fetch" 에러

**원인**: CORS 또는 Supabase 연결 실패

**해결**:
1. `config.js`의 Supabase URL 확인
2. 브라우저 개발자 도구 콘솔에서 에러 확인
3. Supabase 프로젝트가 활성 상태인지 확인

### 7.3 OAuth 리다이렉트 에러

**원인**: 콜백 URL 불일치

**해결**:
1. Google Cloud Console / GitHub OAuth App에서 콜백 URL 확인
2. Supabase **Authentication** → **URL Configuration** 확인
3. `http` vs `https` 프로토콜 확인

### 7.4 데이터가 표시되지 않음

**원인**: Row Level Security 정책 문제

**해결**:
1. Supabase에서 로그인 확인 (`auth.uid()` 존재)
2. RLS 정책이 올바르게 설정되었는지 확인
3. 브라우저 콘솔에서 에러 메시지 확인

---

## 8. 성능 최적화

### 8.1 파일 최소화

배포 전 CSS/JS 파일 압축:

```bash
# CSS 압축 (선택 사항)
npx cssnano styles.css > styles.min.css

# JavaScript 압축 (선택 사항)
npx terser script.js -o script.min.js
```

### 8.2 이미지 최적화

이미지 사용 시 WebP 형식 사용:
```bash
cwebp image.png -o image.webp
```

### 8.3 캐싱 설정

GitHub Pages는 자동으로 캐싱 설정됨:
- HTML: 10분
- CSS/JS: 1년

---

## 9. 커스텀 도메인 설정 (선택 사항)

### 9.1 도메인 구입

원하는 도메인 구입 (예: `kanban-jihye.com`)

### 9.2 DNS 설정

도메인 제공업체에서 DNS 레코드 추가:

```
Type    Host    Value
------  ------  -------------------------
A       @       185.199.108.153
A       @       185.199.109.153
A       @       185.199.110.153
A       @       185.199.111.153
CNAME   www     weable-kosa.github.io
```

### 9.3 GitHub Pages 설정

1. **Settings** → **Pages** 이동
2. **Custom domain**에 도메인 입력
3. "Enforce HTTPS" 체크

---

## 10. 모니터링

### 10.1 Google Analytics (선택 사항)

`index.html`의 `<head>` 태그에 추가:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 10.2 Supabase 사용량 확인

Supabase 대시보드 → **Settings** → **Usage**:
- MAU (Monthly Active Users)
- 데이터베이스 크기
- Bandwidth

---

## 11. 업데이트 및 롤백

### 11.1 업데이트

```bash
# 코드 수정 후
git add .
git commit -m "Update kanban feature"
git push origin main

# GitHub Actions가 자동으로 배포
```

### 11.2 롤백

이전 버전으로 되돌리기:

```bash
# 이전 커밋 확인
git log --oneline

# 특정 커밋으로 롤백
git revert <commit-hash>
git push origin main
```

---

## 12. 체크리스트

배포 전 최종 확인:

- [ ] Supabase 프로젝트 생성 완료
- [ ] `cards` 테이블 및 RLS 정책 설정
- [ ] Google OAuth 설정
- [ ] GitHub OAuth 설정
- [ ] `config.js`에 실제 Supabase 정보 입력
- [ ] 로컬에서 모든 기능 테스트 완료
- [ ] GitHub에 코드 푸시
- [ ] GitHub Pages 활성화
- [ ] 배포된 URL에서 기능 테스트
- [ ] OAuth 콜백 URL 업데이트
- [ ] 모든 인증 방식 테스트

---

## 13. 참고 자료

- [GitHub Pages 공식 문서](https://docs.github.com/en/pages)
- [GitHub Actions 문서](https://docs.github.com/en/actions)
- [Supabase URL Configuration](https://supabase.com/docs/guides/auth#url-configuration)

---

**배포 URL**: `https://weable-kosa.github.io/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/`

**작성 일시**: 2026-05-20  
**작성자**: jihye
