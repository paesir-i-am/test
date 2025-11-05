# 쑤카 (Sooka) - 중고차 판매 플랫폼

기존 중고차 판매 플랫폼의 단점을 개선한 신뢰성 높은 중고차 거래 플랫폼입니다.

## 🚀 기술 스택

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Form**: React Hook Form + Zod
- **PWA**: next-pwa

## 📋 주요 기능

- 사용자 인증 (회원가입, 로그인)
- 차량 등록 및 관리
- 차량 검색 및 필터링
- 찜하기 기능
- 문의 기능
- 관리자 기능
- 반응형 웹 디자인 (모바일, 태블릿, 데스크톱)
- PWA 지원

## 🛠️ 개발 환경 설정

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 📁 프로젝트 구조

```
sooka/
├── app/                  # Next.js App Router
│   ├── (auth)/          # 인증 관련 페이지
│   ├── (dashboard)/     # 대시보드 페이지
│   ├── vehicles/        # 차량 관련 페이지
│   └── layout.tsx       # 루트 레이아웃
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트
│   ├── vehicle/        # 차량 관련 컴포넌트
│   └── layout/        # 레이아웃 컴포넌트
├── lib/                # 유틸리티 함수
├── hooks/              # Custom Hooks
├── store/              # Zustand 스토어
├── types/              # TypeScript 타입 정의
└── public/             # 정적 파일
```

## 📚 문서

자세한 내용은 `docs/` 폴더의 문서를 참고하세요.

- 프로젝트 개요서
- 요구사항 정의서
- 기능 명세서
- 데이터베이스 설계서
- API 명세서
- UI/UX 디자인 가이드라인
- 개발 환경 설정 가이드
- 테스트 계획서

## 📄 라이선스

프로젝트 내부 사용

