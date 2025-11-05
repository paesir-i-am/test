# 쑤카 (Sooka) - 중고차 판매 플랫폼

신뢰할 수 있는 중고차 거래 플랫폼입니다.

## 🚀 프로젝트 개요

쑤카는 기존 중고차 판매 사이트의 단점을 개선하여 더 투명하고 신뢰할 수 있는 중고차 거래 환경을 제공하는 플랫폼입니다.

## ✨ 주요 기능

- ✅ 사용자 인증 (회원가입, 로그인)
- ✅ 차량 목록 조회 및 검색
- ✅ 차량 상세 정보
- ✅ 반응형 디자인 (웹 & 모바일)
- ✅ PWA 지원

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: SQLite (개발), PostgreSQL (프로덕션 준비)
- **ORM**: Prisma
- **State Management**: Zustand
- **Authentication**: JWT
- **PWA**: next-pwa

## 📦 설치 및 실행

### 필수 요구사항

- Node.js 18+ 
- npm 또는 yarn

### 설치

```bash
# 의존성 설치
npm install

# 데이터베이스 마이그레이션
npm run db:migrate

# 초기 데이터 추가
npm run db:seed

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

## 📝 테스트 계정

- **관리자**: admin@sooka.com / password123
- **구매자**: buyer@test.com / password123
- **판매자**: seller@test.com / password123

## 🗂️ 프로젝트 구조

```
sharingCar/
├── app/                    # Next.js 앱 라우터
│   ├── api/               # API 라우트
│   ├── auth/              # 인증 페이지
│   └── vehicles/          # 차량 페이지
├── components/            # React 컴포넌트
│   ├── layout/           # 레이아웃 컴포넌트
│   ├── ui/               # UI 컴포넌트 (shadcn/ui)
│   └── vehicle/          # 차량 관련 컴포넌트
├── docs/                  # 프로젝트 문서
├── lib/                   # 유틸리티 함수
├── prisma/               # Prisma 스키마 및 마이그레이션
├── public/               # 정적 파일
│   └── images/          # 이미지 파일
└── types/                # TypeScript 타입 정의
```

## 📚 문서

프로젝트 관련 상세 문서는 `docs/` 폴더를 참고하세요:

- `01_프로젝트_개요서.md` - 프로젝트 개요 및 목표
- `02_요구사항_정의서.md` - 기능 요구사항
- `03_기능_명세서.md` - 상세 기능 명세
- `04_데이터베이스_설계서.md` - 데이터베이스 구조
- `05_API_명세서.md` - API 엔드포인트
- `06_UI_UX_디자인_가이드라인.md` - 디자인 시스템
- `07_개발_환경_설정_가이드.md` - 개발 환경 설정
- `08_테스트_계획서.md` - 테스트 계획

## 🗄️ 데이터베이스

### 개발 환경 (SQLite)

```bash
# Prisma Studio 실행 (데이터베이스 GUI)
npm run db:studio
```

### 프로덕션 환경 (PostgreSQL)

프로덕션에서는 PostgreSQL을 사용하도록 설정하세요:

1. `prisma/schema.prisma`에서 `provider = "postgresql"`로 변경
2. `.env` 파일에 PostgreSQL 연결 문자열 추가
3. 마이그레이션 실행

## 📄 라이선스

이 프로젝트는 개인 프로젝트입니다.

## 👥 기여

이슈나 개선사항이 있으면 GitHub Issues에 등록해주세요.
