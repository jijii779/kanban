# Supabase 설정 가이드
# 칸반보드 애플리케이션

이 문서는 칸반보드 애플리케이션에 Supabase 백엔드를 연동하는 방법을 설명합니다.

---

## 1. Supabase 프로젝트 설정

### 방법 선택

#### 옵션 A: 기존 프로젝트 사용 (권장) ✅

**todo 프로젝트에서 이미 Supabase를 사용 중이라면 새 프로젝트를 만들 필요 없습니다!**

**장점**:
- OAuth 설정 재사용
- 관리 간편
- 무료 플랜 프로젝트 수 절약

**진행 방법**:
1. 기존 todo 프로젝트 대시보드 접속
2. **Section 2**로 이동하여 `cards` 테이블만 추가
3. 기존 Project URL과 anon key 사용

#### 옵션 B: 새 프로젝트 생성

**todo와 완전히 분리하고 싶다면:**

1. [Supabase 웹사이트](https://supabase.com) 접속
2. 대시보드에서 "New project" 클릭
3. 새 프로젝트 생성:
   - **Organization**: 개인 계정 선택
   - **Project name**: `kanban-jihye` (또는 원하는 이름)
   - **Database Password**: 강력한 비밀번호 생성 및 저장
   - **Region**: `Northeast Asia (Seoul)` 선택
   - "Create new project" 클릭

### 1.1 API 키 확인

어떤 옵션을 선택하든, 프로젝트 대시보드에서 API 키 확인:

1. **Settings** → **API** 이동
2. 다음 정보 복사:
   - **Project URL**: `https://xxxxx.supabase.co`
   - **anon public** key: `eyJhbGc...` (공개 키)

**중요**: todo와 같은 프로젝트를 사용하는 경우, 이미 복사해둔 정보를 그대로 사용하면 됩니다!

---

## 2. 데이터베이스 테이블 생성

### 2.1 SQL 편집기로 테이블 생성

Supabase 대시보드에서 **SQL Editor** → **New query** 클릭 후 다음 SQL 실행:

```sql
-- 1. cards 테이블 생성
CREATE TABLE cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  column_id TEXT NOT NULL CHECK (column_id IN ('todo', 'in-progress', 'done')),
  position INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 인덱스 생성 (성능 최적화)
CREATE INDEX idx_cards_user_id ON cards(user_id);
CREATE INDEX idx_cards_column_id ON cards(user_id, column_id);
CREATE INDEX idx_cards_position ON cards(user_id, column_id, position);

-- 3. updated_at 자동 갱신 트리거
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_cards_updated_at
  BEFORE UPDATE ON cards
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 4. Row Level Security (RLS) 활성화
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;

-- 5. RLS 정책: 사용자는 자신의 카드만 조회 가능
CREATE POLICY "Users can view their own cards"
  ON cards FOR SELECT
  USING (auth.uid() = user_id);

-- 6. RLS 정책: 사용자는 자신의 카드만 추가 가능
CREATE POLICY "Users can insert their own cards"
  ON cards FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- 7. RLS 정책: 사용자는 자신의 카드만 수정 가능
CREATE POLICY "Users can update their own cards"
  ON cards FOR UPDATE
  USING (auth.uid() = user_id);

-- 8. RLS 정책: 사용자는 자신의 카드만 삭제 가능
CREATE POLICY "Users can delete their own cards"
  ON cards FOR DELETE
  USING (auth.uid() = user_id);
```

### 2.2 테이블 구조 확인

**Table Editor**로 이동하여 `cards` 테이블이 생성되었는지 확인:

| 컬럼명 | 타입 | 설명 |
|--------|------|------|
| `id` | UUID | 카드 고유 ID (자동 생성) |
| `user_id` | UUID | 소유자 ID (FK → auth.users) |
| `content` | TEXT | 카드 내용 |
| `column_id` | TEXT | 소속 컬럼 (todo/in-progress/done) |
| `position` | INTEGER | 컬럼 내 순서 |
| `created_at` | TIMESTAMP | 생성 시간 |
| `updated_at` | TIMESTAMP | 수정 시간 |

---

## 3. 인증 설정

### 3.1 이메일 인증 설정

1. **Authentication** → **Providers** 이동
2. **Email** 활성화 (기본적으로 활성화되어 있음)
3. 설정:
   - **Enable email confirmations**: OFF (개발 중에는 비활성화)
   - **Enable email signup**: ON

### 3.2 Google OAuth 설정

#### 기존 프로젝트 사용 시 (todo에서 이미 설정함) ✅

**todo 프로젝트에서 이미 Google OAuth를 설정했다면 이 섹션은 스킵하세요!**

Supabase **Authentication** → **Providers** → **Google**에서 이미 활성화되어 있는지만 확인하면 됩니다.

#### 처음 설정하는 경우

<details>
<summary>Google Cloud Console 설정 (클릭하여 펼치기)</summary>

1. [Google Cloud Console](https://console.cloud.google.com) 접속
2. 기존 프로젝트 선택 또는 새 프로젝트 생성
3. **APIs & Services** → **OAuth consent screen** 이동
   - User Type: **External** 선택
   - App name: `My Apps` (todo와 kanban 모두 포함)
   - User support email: 본인 이메일
   - Developer contact: 본인 이메일
   - "Save and Continue"
4. **Credentials** → **Create Credentials** → **OAuth client ID**
   - Application type: **Web application**
   - Name: `Kanban Board Web Client`
   - Authorized redirect URIs:
     ```
     https://xxxxx.supabase.co/auth/v1/callback
     ```
     (Supabase 프로젝트 URL에서 `xxxxx` 부분 교체)
   - "Create" 클릭
5. **Client ID**와 **Client Secret** 복사
6. Supabase **Authentication** → **Providers** → **Google**에 입력

</details>

### 3.3 GitHub OAuth 설정

#### 기존 프로젝트 사용 시 (todo에서 이미 설정함) ✅

**todo 프로젝트에서 이미 GitHub OAuth를 설정했다면 이 섹션도 스킵하세요!**

Supabase **Authentication** → **Providers** → **GitHub**에서 이미 활성화되어 있는지만 확인하면 됩니다.

#### 처음 설정하는 경우

<details>
<summary>GitHub OAuth App 설정 (클릭하여 펼치기)</summary>

1. GitHub [Settings](https://github.com/settings/developers) → **OAuth Apps** 이동
2. "New OAuth App" 클릭
3. 정보 입력:
   - **Application name**: `My Apps`
   - **Homepage URL**: `https://your-username.github.io`
   - **Authorization callback URL**:
     ```
     https://xxxxx.supabase.co/auth/v1/callback
     ```
4. "Register application" 클릭
5. **Client ID** 복사
6. "Generate a new client secret" 클릭하여 **Client Secret** 복사
7. Supabase **Authentication** → **Providers** → **GitHub**에 입력

</details>

---

## 4. 환경 변수 설정

### 4.1 config.js 파일 생성

프로젝트 루트에 `config.js` 파일 생성:

```javascript
// config.js
const SUPABASE_CONFIG = {
  url: 'https://xxxxx.supabase.co',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
};

export default SUPABASE_CONFIG;
```

**중요**: 실제 프로젝트 URL과 anon key로 교체하세요!

### 4.2 .gitignore 설정

`config.js`를 Git에 커밋하지 않도록 `.gitignore` 추가:

```
config.js
.env
*.local
```

### 4.3 config.example.js 생성

다른 사람이 참고할 수 있도록 템플릿 제공:

```javascript
// config.example.js
const SUPABASE_CONFIG = {
  url: 'YOUR_SUPABASE_PROJECT_URL',
  anonKey: 'YOUR_SUPABASE_ANON_KEY'
};

export default SUPABASE_CONFIG;
```

---

## 5. JavaScript 연동

### 5.1 Supabase 클라이언트 초기화

```javascript
// Supabase CDN으로 라이브러리 로드 (index.html에 추가)
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

// script.js에서 초기화
import SUPABASE_CONFIG from './config.js';

const supabase = window.supabase.createClient(
  SUPABASE_CONFIG.url,
  SUPABASE_CONFIG.anonKey
);
```

### 5.2 인증 함수

#### 이메일 회원가입
```javascript
async function signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password
  });
  
  if (error) {
    console.error('Signup error:', error.message);
    return null;
  }
  
  return data.user;
}
```

#### 이메일 로그인
```javascript
async function signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) {
    console.error('Login error:', error.message);
    return null;
  }
  
  return data.user;
}
```

#### Google 로그인
```javascript
async function signInWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: window.location.origin
    }
  });
  
  if (error) console.error('Google login error:', error.message);
}
```

#### GitHub 로그인
```javascript
async function signInWithGitHub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin
    }
  });
  
  if (error) console.error('GitHub login error:', error.message);
}
```

#### 로그아웃
```javascript
async function signOut() {
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error('Logout error:', error.message);
    return false;
  }
  
  return true;
}
```

#### 현재 사용자 확인
```javascript
async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}
```

### 5.3 카드 CRUD 함수

#### 카드 목록 조회
```javascript
async function fetchCards() {
  const { data, error } = await supabase
    .from('cards')
    .select('*')
    .order('position', { ascending: true });
  
  if (error) {
    console.error('Fetch cards error:', error.message);
    return [];
  }
  
  return data;
}
```

#### 카드 추가
```javascript
async function createCard(content, columnId) {
  const user = await getCurrentUser();
  if (!user) return null;
  
  // 현재 컬럼의 마지막 position 찾기
  const { data: existingCards } = await supabase
    .from('cards')
    .select('position')
    .eq('column_id', columnId)
    .order('position', { ascending: false })
    .limit(1);
  
  const newPosition = existingCards.length > 0 ? existingCards[0].position + 1 : 0;
  
  const { data, error } = await supabase
    .from('cards')
    .insert({
      user_id: user.id,
      content,
      column_id: columnId,
      position: newPosition
    })
    .select()
    .single();
  
  if (error) {
    console.error('Create card error:', error.message);
    return null;
  }
  
  return data;
}
```

#### 카드 이동
```javascript
async function moveCard(cardId, newColumnId, newPosition) {
  const { data, error } = await supabase
    .from('cards')
    .update({
      column_id: newColumnId,
      position: newPosition
    })
    .eq('id', cardId)
    .select()
    .single();
  
  if (error) {
    console.error('Move card error:', error.message);
    return null;
  }
  
  return data;
}
```

#### 카드 삭제
```javascript
async function deleteCard(cardId) {
  const { error } = await supabase
    .from('cards')
    .delete()
    .eq('id', cardId);
  
  if (error) {
    console.error('Delete card error:', error.message);
    return false;
  }
  
  return true;
}
```

---

## 6. 실시간 동기화 (선택 사항)

Supabase Realtime으로 다른 기기에서의 변경사항 즉시 반영:

```javascript
// 카드 변경 구독
const cardSubscription = supabase
  .channel('cards-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'cards'
    },
    (payload) => {
      console.log('Card changed:', payload);
      // UI 업데이트
      refreshCards();
    }
  )
  .subscribe();

// 구독 해제 (페이지 종료 시)
function cleanup() {
  supabase.removeChannel(cardSubscription);
}
```

---

## 7. 보안 체크리스트

- [x] RLS 정책 설정됨 (사용자는 자신의 데이터만 접근)
- [x] anon key는 공개 가능 (RLS로 보호됨)
- [x] service_role key는 절대 프론트엔드에 노출 금지
- [ ] config.js를 .gitignore에 추가
- [ ] GitHub Pages 배포 시 환경 변수 관리 방법 고려

---

## 8. 테스트

### 8.1 로컬 테스트
1. `config.js` 파일에 실제 Supabase 정보 입력
2. 로컬 서버 실행: `python3 -m http.server 8765`
3. 브라우저에서 `http://localhost:8765` 접속
4. 회원가입 및 로그인 테스트
5. 카드 추가/이동/삭제 테스트
6. Supabase 대시보드에서 데이터 확인

### 8.2 Supabase 대시보드 확인
1. **Table Editor** → **cards** 테이블에서 데이터 확인
2. **Authentication** → **Users**에서 가입된 사용자 확인

---

## 9. 문제 해결

### 9.1 "Failed to fetch" 에러
- Supabase 프로젝트 URL과 anon key 확인
- 브라우저 콘솔에서 CORS 에러 확인
- Supabase 프로젝트가 일시 중지되지 않았는지 확인

### 9.2 "Row Level Security policy violation" 에러
- RLS 정책이 올바르게 설정되었는지 확인
- 사용자가 로그인되어 있는지 확인 (`auth.uid()` 존재)

### 9.3 Google/GitHub 로그인이 안 됨
- OAuth 콜백 URL이 정확한지 확인
- Google Cloud Console / GitHub OAuth App 설정 확인
- Supabase에 Client ID/Secret이 올바르게 입력되었는지 확인

---

## 10. 참고 자료

- [Supabase 공식 문서](https://supabase.com/docs)
- [Supabase JavaScript 클라이언트 가이드](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security 가이드](https://supabase.com/docs/guides/auth/row-level-security)
- [OAuth 통합 가이드](https://supabase.com/docs/guides/auth/social-login)

---

**작성 일시**: 2026-05-20  
**작성자**: jihye
