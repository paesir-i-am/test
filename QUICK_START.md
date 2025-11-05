# 빠른 시작 가이드

## ✅ 데이터베이스 설정 완료

프로젝트에 **SQLite + Prisma** 데이터베이스가 설정되었습니다.

### 현재 상태
- ✅ 데이터베이스: SQLite (`prisma/dev.db`)
- ✅ Prisma Schema: 모든 테이블 정의 완료
- ✅ 마이그레이션: 완료
- ✅ 초기 데이터: 제조사 10개, 관리자 계정 추가됨

## 🚀 사용 방법

### 1. 개발 서버 시작
```bash
npm run dev
```

### 2. 회원가입 테스트
브라우저에서 `http://localhost:3000/auth/register` 접속하여 회원가입

### 3. 로그인 테스트
- 일반 사용자: 방금 가입한 계정
- 관리자: `admin@sooka.com` / `admin123`

### 4. 데이터베이스 확인
```bash
# Prisma Studio (GUI) 열기
npm run db:studio
```

## 📝 API 엔드포인트

### 회원가입
```bash
POST http://localhost:3000/api/auth/register
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123",
  "password_confirm": "password123",
  "name": "홍길동",
  "role": "buyer"
}
```

### 로그인
```bash
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 내 정보 조회
```bash
GET http://localhost:3000/api/auth/me
Authorization: Bearer <token>
```

## 🔧 유용한 명령어

```bash
# 데이터베이스 마이그레이션
npm run db:migrate

# 초기 데이터 추가 (이미 실행됨)
npm run db:seed

# Prisma Client 재생성
npm run db:generate

# 데이터베이스 GUI
npm run db:studio
```

## 📁 파일 구조

```
prisma/
├── schema.prisma      # 데이터베이스 스키마
├── migrations/        # 마이그레이션 파일
└── seed.ts           # 초기 데이터

app/api/
├── auth/
│   ├── register/     # 회원가입 API
│   ├── login/        # 로그인 API
│   └── me/           # 내 정보 조회 API

lib/
├── prisma.ts         # Prisma Client 인스턴스
└── auth.ts           # 인증 유틸리티 (JWT, 비밀번호 해시)
```

## ⚠️ 주의사항

1. **환경 변수**: `.env` 파일에 `JWT_SECRET`이 설정되어 있어야 합니다
2. **데이터베이스 파일**: `prisma/dev.db` 파일이 생성되어 있습니다 (Git에 포함 가능)
3. **프로덕션**: SQLite는 프로덕션에 부적합합니다. PostgreSQL로 전환 권장

## 🔄 PostgreSQL로 전환하기

1. `prisma/schema.prisma`에서:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

2. `.env` 파일에 PostgreSQL URL 추가

3. 마이그레이션 실행:
```bash
npm run db:migrate
```

## 🎉 다음 단계

이제 회원가입과 로그인이 작동합니다! 다음 기능을 구현할 수 있습니다:
- 차량 등록 API
- 차량 목록 조회 API
- 찜하기 기능
- 문의 기능

