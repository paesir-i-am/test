# 데이터베이스 설정 가이드

## 추천 옵션 비교

### 옵션 1: Supabase (추천) ⭐
**가장 빠르고 쉬운 방법**

**장점:**
- ✅ 무료 티어 제공
- ✅ PostgreSQL 기반 (프로덕션 준비됨)
- ✅ 인증 기능 내장 (회원가입/로그인 바로 사용 가능)
- ✅ 실시간 데이터베이스
- ✅ 관리 콘솔 제공
- ✅ 클라우드 기반 (설치 불필요)

**단점:**
- 인터넷 연결 필요
- 클라우드 서비스 의존

**설정 시간:** 5-10분

---

### 옵션 2: Prisma + SQLite (로컬 개발용)
**로컬에서 빠르게 시작**

**장점:**
- ✅ 파일 기반 (설치 불필요)
- ✅ 빠른 설정
- ✅ 오프라인 작동
- ✅ 프로젝트에 포함됨

**단점:**
- 프로덕션에는 부적합
- 동시성 제한
- 나중에 PostgreSQL로 마이그레이션 필요

**설정 시간:** 10-15분

---

### 옵션 3: Prisma + PostgreSQL (로컬)
**프로덕션 환경과 유사**

**장점:**
- ✅ 프로덕션 환경과 동일
- ✅ 확장성 및 성능
- ✅ 트랜잭션 지원

**단점:**
- PostgreSQL 설치 필요
- 설정이 복잡함
- 로컬 환경 의존

**설정 시간:** 20-30분

---

## 빠른 시작: Supabase 사용하기 (추천)

### 1단계: Supabase 계정 생성
1. [Supabase](https://supabase.com) 접속
2. GitHub 계정으로 로그인
3. "New Project" 클릭

### 2단계: 프로젝트 생성
- **Project Name**: `sooka`
- **Database Password**: 강력한 비밀번호 저장 (잃어버리면 복구 불가)
- **Region**: `Northeast Asia (Seoul)` 선택
- **Pricing Plan**: Free 선택

### 3단계: 데이터베이스 URL 가져오기
1. 프로젝트 대시보드 → Settings → API
2. `Project URL`과 `anon public` 키 복사
3. Settings → Database → Connection string에서 `URI` 복사

### 4단계: 환경 변수 설정
`.env.local` 파일에 추가:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

---

## 옵션 2: Prisma + SQLite (로컬 개발)

### 1단계: Prisma 설치
```bash
npm install prisma @prisma/client
npm install -D prisma
```

### 2단계: Prisma 초기화
```bash
npx prisma init --datasource-provider sqlite
```

### 3단계: Schema 작성
`prisma/schema.prisma` 파일 편집

### 4단계: 마이그레이션 실행
```bash
npx prisma migrate dev --name init
npx prisma generate
```

---

## 옵션 3: Prisma + PostgreSQL (로컬)

### 1단계: PostgreSQL 설치
**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Windows:**
- [PostgreSQL 다운로드](https://www.postgresql.org/download/windows/)

**Linux:**
```bash
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

### 2단계: 데이터베이스 생성
```bash
psql postgres
CREATE DATABASE sooka;
CREATE USER sooka_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE sooka TO sooka_user;
\q
```

### 3단계: Prisma 설정
```bash
npm install prisma @prisma/client
npx prisma init --datasource-provider postgresql
```

### 4단계: 환경 변수 설정
`.env` 파일:
```env
DATABASE_URL="postgresql://sooka_user:your_password@localhost:5432/sooka"
```

---

## 다음 단계: 백엔드 API 구현

데이터베이스 설정 후:
1. Prisma Schema 작성 (문서 참고)
2. Next.js API Routes 또는 별도 백엔드 서버 구현
3. 인증 로직 구현 (JWT 또는 Supabase Auth)

---

## 추천 순서

1. **개발 초기**: Supabase 사용 (가장 빠름)
2. **로컬 개발**: Prisma + SQLite (간단함)
3. **프로덕션 준비**: Prisma + PostgreSQL (Supabase 또는 자체 호스팅)

