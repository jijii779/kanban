# patch.md
# 칸반보드 패치 적용 및 배포 절차

이 문서는 kosa-vibecoding 저장소에서 수정한 파일을 별도의 kanban 저장소(jijii779/kanban)에 적용하고 GitHub에 푸시하는 절차를 설명합니다.

---

## 배경

- **작업 저장소**: `/home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/`
- **배포 저장소**: `/home/xpert/work/kanban/`
- **GitHub 원격**: `https://github.com/jijii779/kanban.git`

작업 저장소에서 개발 및 테스트 후, 배포 저장소로 복사하여 GitHub Pages 등에 배포합니다.

---

## 기본 절차

### 1. 수정된 파일 확인

```bash
cd /home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban
git status
```

수정된 파일 목록을 확인합니다.

### 2. 파일 복사

단일 파일 복사:
```bash
cp /home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/[파일명] \
   /home/xpert/work/kanban/[파일명]
```

여러 파일 복사:
```bash
# 주요 코드 파일 전체 복사
cp /home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/*.{html,css,js} \
   /home/xpert/work/kanban/

# 문서 파일 전체 복사
cp /home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/*.md \
   /home/xpert/work/kanban/
```

### 3. 배포 저장소로 이동

```bash
cd /home/xpert/work/kanban
```

### 4. 변경사항 확인

```bash
git status
git diff [파일명]
```

### 5. 스테이징

```bash
# 특정 파일만
git add script.js auth.js

# 또는 모든 변경사항
git add .
```

### 6. 커밋

```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <subject>

<body>

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>
EOF
)"
```

**커밋 타입**:
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 스타일링 변경
- `refactor`: 리팩토링
- `test`: 테스트 추가
- `debug`: 디버깅 로그 추가

### 7. 푸시

```bash
git push origin main
```

---

## 원라이너 (One-liner) 스크립트

자주 사용하는 패턴을 원라이너로 정리:

### 패턴 1: 단일 파일 복사 + 커밋 + 푸시

```bash
cp /home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/script.js \
   /home/xpert/work/kanban/script.js && \
cd /home/xpert/work/kanban && \
git add script.js && \
git commit -m "fix(script): 버그 수정" && \
git push origin main
```

### 패턴 2: 여러 파일 복사 + 커밋 + 푸시

```bash
cp /home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/{script.js,auth.js,styles.css} \
   /home/xpert/work/kanban/ && \
cd /home/xpert/work/kanban && \
git add script.js auth.js styles.css && \
git commit -m "feat: 기능 추가" && \
git push origin main
```

### 패턴 3: 모든 코드 파일 동기화

```bash
cp /home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/*.{html,css,js} \
   /home/xpert/work/kanban/ && \
cd /home/xpert/work/kanban && \
git add *.html *.css *.js && \
git commit -m "sync: 코드 파일 전체 동기화" && \
git push origin main
```

---

## 자주 복사하는 파일 목록

### 핵심 코드 파일
- `index.html` - 메인 HTML
- `styles.css` - 스타일시트
- `script.js` - 메인 JavaScript
- `auth.js` - 인증 로직
- `config.js` - Supabase 설정 (주의: 민감 정보)

### 문서 파일
- `CLAUDE.md` - Claude Code 가이드
- `README.md` - 프로젝트 설명
- `PRD.md`, `TRD.md`, `TASKS.md` 등

### 테스트/디버깅 파일
- `test.html` - 디버깅 테스트 페이지

---

## 주의사항

### 1. config.js 처리
`config.js`에는 Supabase API 키가 포함되어 있습니다. 공개 저장소에 푸시할 때 주의하세요.

```bash
# .gitignore 확인
cat /home/xpert/work/kanban/.gitignore | grep config.js

# config.js가 .gitignore에 없다면 추가
echo "config.js" >> /home/xpert/work/kanban/.gitignore
```

대신 `config.example.js`를 제공하고, 사용자가 직접 `config.js`를 생성하도록 안내합니다.

### 2. 작업 디렉터리 확인
복사 전 현재 디렉터리를 확인하세요:

```bash
pwd
# /home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban
```

### 3. 충돌 방지
배포 저장소에서 직접 수정하지 말고, 항상 작업 저장소에서 수정 후 복사하세요.

### 4. 커밋 메시지 품질
- 명확한 제목 (50자 이내)
- 자세한 본문 (무엇을, 왜, 어떻게)
- Co-Authored-By 포함

---

## 빠른 참조 체크리스트

패치 적용 전 체크리스트:

- [ ] 작업 저장소에서 변경사항 테스트 완료
- [ ] 브라우저에서 기능 동작 확인
- [ ] 콘솔 에러 없음
- [ ] 불필요한 디버그 로그 제거 (또는 의도적으로 남김)
- [ ] 민감 정보(API 키 등) 제외 확인
- [ ] 커밋 메시지 작성 완료

패치 적용 후 체크리스트:

- [ ] GitHub에 푸시 완료
- [ ] GitHub Pages 배포 확인 (해당 시)
- [ ] 배포된 URL에서 기능 테스트
- [ ] 변경사항이 올바르게 반영되었는지 확인

---

## 트러블슈팅

### 문제: "파일이 이미 수정됨" 경고

```bash
# 배포 저장소의 변경사항 확인
cd /home/xpert/work/kanban
git status

# 필요시 stash 또는 reset
git stash
# 또는
git reset --hard HEAD
```

### 문제: 푸시 거부 (원격이 로컬보다 앞섬)

```bash
# 원격 변경사항 가져오기
git pull --no-rebase origin main

# 충돌 해결 후 다시 푸시
git push origin main
```

### 문제: 복사 후 권한 문제

```bash
# 파일 권한 확인
ls -la /home/xpert/work/kanban/

# 필요시 권한 수정
chmod 644 /home/xpert/work/kanban/*.{html,css,js}
```

---

## 고급: 자동화 스크립트

### sync.sh 생성

```bash
#!/bin/bash
# sync.sh - 작업 저장소 → 배포 저장소 동기화 스크립트

SOURCE="/home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban"
TARGET="/home/xpert/work/kanban"

echo "📦 Syncing files from $SOURCE to $TARGET..."

# 코드 파일 복사
cp "$SOURCE"/*.{html,css,js} "$TARGET/" 2>/dev/null

# 문서 파일 복사 (선택)
# cp "$SOURCE"/*.md "$TARGET/" 2>/dev/null

cd "$TARGET"

echo "📊 Changed files:"
git status --short

echo ""
read -p "Commit and push? (y/n): " -n 1 -r
echo

if [[ $REPLY =~ ^[Yy]$ ]]; then
    git add .
    read -p "Commit message: " msg
    git commit -m "$msg

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"
    git push origin main
    echo "✅ Sync complete!"
else
    echo "❌ Sync cancelled."
fi
```

사용법:

```bash
chmod +x sync.sh
./sync.sh
```

---

## 참고 링크

- **작업 저장소**: `/home/xpert/work/kosa-vibecoding-2026-2nd/src/exercise/jihye/day03/kanban/`
- **배포 저장소**: `/home/xpert/work/kanban/`
- **GitHub**: https://github.com/jijii779/kanban
- **GitHub Pages** (해당 시): https://jijii779.github.io/kanban/

---

**문서 버전**: 1.0  
**최종 업데이트**: 2026-05-20  
**작성자**: jihye + Claude Code
