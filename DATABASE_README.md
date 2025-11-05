# 데이터베이스 설정 완료 ✅

## 현재 설정

- **데이터베이스**: SQLite (로컬 파일: `prisma/dev.db`)
- **ORM**: Prisma
- **인증**: JWT (jsonwebtoken)
- **비밀번호 암호화**: bcryptjs

## 초기 데이터

다음 명령어로 초기 데이터를 추가할 수 있습니다:

```bash
npm run db:seed
```

이 명령어는 다음을 생성합니다:
- 제조사 데이터 (현대, 기아, BMW 등 10개)
- 관리자 계정 (admin@sooka.com / admin123)

## 사용 가능한 명령어

```bash
# 데이터베이스 마이그레이션
npm run db:migrate

# Prisma Client 생성
npm run db:generate

# 초기 데이터 추가
npm run db:seed

# 데이터베이스 GUI 열기 (Prisma Studio)
npm run db:studio
```

## API 엔드포인트

### 회원가입
```
POST /api/auth/register
Body: {
  email: string
  password: string
  password_confirm: string
  name: string
  role: 'buyer' | 'seller' | 'both'
}
```

### 로그인
```
POST /api/auth/login
Body: {
  email: string
  password: string
}
```

### 사용자 정보 조회
```
GET /api/auth/me
Headers: {
  Authorization: Bearer <token>
}
```

## 테스트 계정

- **관리자**: admin@sooka.com / admin123

## 다음 단계

1. 환경 변수 설정 (`.env` 파일에 `JWT_SECRET` 추가)
2. 개발 서버 재시작
3. 회원가입/로그인 테스트

## PostgreSQL로 전환하기

나중에 PostgreSQL로 전환하려면:

1. `prisma/schema.prisma`에서:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. `.env` 파일에 PostgreSQL URL 추가:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/sooka"
```

3. 마이그레이션 실행:
```bash
npm run db:migrate
```

## Supabase 사용하기

Supabase를 사용하려면 `DATABASE_SETUP.md` 파일을 참고하세요.

