# UI/UX 디자인 가이드라인

## 1. 문서 정보

### 프로젝트명
**쑤카 (Sooka)**

### 디자인 시스템
**shadcn/ui 기반 디자인 시스템**

### 문서 버전
v2.0

### 작성일
2024년 (작성일자)

### 참고 리소스
- [shadcn/ui 공식 사이트](https://ui.shadcn.com/)
- shadcn/ui는 Tailwind CSS와 Radix UI를 기반으로 한 오픈소스 컴포넌트 라이브러리입니다.

### 문서 목적
shadcn/ui 디자인 시스템을 기반으로 쑤카 프로젝트의 일관된 UI/UX 디자인 시스템을 정의하여 사용자 경험을 향상시킵니다.

---

## 2. 디자인 원칙

### 2.1 핵심 원칙
1. **신뢰성**: 투명하고 정확한 정보 제공
2. **직관성**: 누구나 쉽게 사용할 수 있는 인터페이스
3. **효율성**: 빠르고 간편한 작업 흐름
4. **일관성**: 통일된 디자인 언어
5. **접근성**: 모든 사용자가 접근 가능한 인터페이스

### 2.2 사용자 중심 설계
- 사용자 목표를 우선시
- 명확한 피드백 제공
- 에러 방지 및 복구 지원
- 접근성 고려 (WCAG 2.1 AA 준수)

---

## 3. 디자인 시스템 (shadcn/ui 기반)

### 3.1 컬러 팔레트

shadcn/ui는 CSS 변수를 사용한 다크/라이트 테마를 지원합니다.

#### Light Theme (기본)

##### Primary Colors (주요 색상)
```css
--primary: 0 0% 9%;                    /* hsl(0, 0%, 9%) - 검정색 (#171717) */
--primary-foreground: 0 0% 98%;        /* 흰색 텍스트 */
```

##### Secondary Colors (보조 색상)
```css
--secondary: 210 40% 96.1%;            /* hsl(210, 40%, 96.1%) - 연한 회색 */
--secondary-foreground: 222.2 47.4% 11.2%;
```

##### Background Colors (배경 색상)
```css
--background: 0 0% 100%;               /* hsl(0, 0%, 100%) - 흰색 */
--foreground: 222.2 84% 4.9%;          /* hsl(222.2, 84%, 4.9%) - 거의 검은색 */
--muted: 210 40% 96.1%;                /* hsl(210, 40%, 96.1%) - 연한 회색 배경 */
--muted-foreground: 215.4 16.3% 46.9%; /* hsl(215.4, 16.3%, 46.9%) - 회색 텍스트 */
```

##### Accent Colors (강조 색상)
```css
--accent: 210 40% 96.1%;               /* 호버 시 배경 */
--accent-foreground: 222.2 47.4% 11.2%;
```

##### Border & Input Colors (테두리 및 입력 필드)
```css
--border: 214.3 31.8% 91.4%;           /* hsl(214.3, 31.8%, 91.4%) - 연한 회색 테두리 */
--input: 214.3 31.8% 91.4%;            /* 입력 필드 테두리 */
--ring: 0 0% 9%;                       /* 포커스 링 색상 (검정색) */
```

##### Status Colors (상태 색상)
```css
--destructive: 0 84.2% 60.2%;          /* hsl(0, 84.2%, 60.2%) - 빨간색 (에러) */
--destructive-foreground: 210 40% 98%;  /* 흰색 텍스트 */

/* Success, Warning, Info는 커스텀으로 추가 */
--success: 142.1 76.2% 36.3%;          /* hsl(142.1, 76.2%, 36.3%) - 초록색 */
--warning: 32.1 94.6% 43.7%;           /* hsl(32.1, 94.6%, 43.7%) - 주황색 */
--info: 199.4 89.1% 48.2%;             /* hsl(199.4, 89.1%, 48.2%) - 파란색 */
```

#### Dark Theme (향후 지원)
```css
--background: 222.2 84% 4.9%;
--foreground: 210 40% 98%;
--primary: 0 0% 98%;
--primary-foreground: 0 0% 9%;
--secondary: 217.2 32.6% 17.5%;
--secondary-foreground: 210 40% 98%;
--muted: 217.2 32.6% 17.5%;
--muted-foreground: 215 20.2% 65.1%;
--accent: 217.2 32.6% 17.5%;
--accent-foreground: 210 40% 98%;
--border: 217.2 32.6% 17.5%;
--input: 217.2 32.6% 17.5%;
--ring: 0 0% 98%;
--destructive: 0 62.8% 30.6%;
--destructive-foreground: 210 40% 98%;
```

#### 색상 사용 가이드
- **Primary**: 주요 액션 버튼, 링크, 브랜드 아이덴티티 (검정색 계열)
- **Secondary**: 보조 버튼, 배경 요소
- **Muted**: 비활성 상태, 배경 강조
- **Destructive**: 삭제, 에러 상태
- **Border**: 모든 테두리 요소
- **Ring**: 포커스 상태 (outline 대신)

---

### 3.2 타이포그래피

#### 폰트 패밀리
shadcn/ui는 시스템 폰트를 기본으로 사용합니다.

```css
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 
             "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", 
             sans-serif, "Apple Color Emoji", "Segoe UI Emoji", 
             "Segoe UI Symbol", "Noto Color Emoji";

/* 한글 지원 */
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
             "Segoe UI", Roboto, "Noto Sans KR", sans-serif;
```

#### 타이포그래피 스케일
```css
/* Heading 1 - 페이지 제목 */
font-size: 2.25rem;      /* 36px */
line-height: 2.5rem;      /* 40px */
font-weight: 800;
letter-spacing: -0.025em;

/* Heading 2 - 섹션 제목 */
font-size: 1.875rem;     /* 30px */
line-height: 2.25rem;     /* 36px */
font-weight: 700;
letter-spacing: -0.025em;

/* Heading 3 - 서브 제목 */
font-size: 1.5rem;       /* 24px */
line-height: 2rem;       /* 32px */
font-weight: 600;

/* Heading 4 */
font-size: 1.25rem;      /* 20px */
line-height: 1.75rem;    /* 28px */
font-weight: 600;

/* Body Large */
font-size: 1.125rem;     /* 18px */
line-height: 1.75rem;     /* 28px */
font-weight: 400;

/* Body (기본) */
font-size: 1rem;         /* 16px */
line-height: 1.5rem;      /* 24px */
font-weight: 400;

/* Body Small */
font-size: 0.875rem;     /* 14px */
line-height: 1.25rem;     /* 20px */
font-weight: 400;

/* Caption */
font-size: 0.75rem;      /* 12px */
line-height: 1rem;        /* 16px */
font-weight: 400;
```

---

### 3.3 간격 시스템 (Spacing)

shadcn/ui는 Tailwind CSS의 기본 간격 시스템을 사용합니다.

#### 간격 규모
- `0`: 0px
- `1`: 4px (0.25rem)
- `2`: 8px (0.5rem)
- `3`: 12px (0.75rem)
- `4`: 16px (1rem)
- `5`: 20px (1.25rem)
- `6`: 24px (1.5rem)
- `8`: 32px (2rem)
- `10`: 40px (2.5rem)
- `12`: 48px (3rem)
- `16`: 64px (4rem)
- `20`: 80px (5rem)
- `24`: 96px (6rem)

#### 사용 예시
- 컴포넌트 내부 간격: `p-4` (16px)
- 컴포넌트 간 간격: `gap-6` (24px)
- 섹션 간 간격: `py-12` 또는 `py-16` (48px-64px)
- 페이지 여백: `px-4 md:px-6 lg:px-8` (반응형)

---

### 3.4 그림자 (Shadows)

shadcn/ui는 미묘하고 부드러운 그림자를 사용합니다.

```css
/* Small - 작은 요소 (버튼 호버) */
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* Default - 카드, 입력 필드 */
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);

/* Medium - 드롭다운, 모달 */
box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);

/* Large - 큰 모달, 팝오버 */
box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);

/* XL - 최상위 레이어 */
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
```

---

### 3.5 Border Radius

shadcn/ui는 일관된 border-radius를 사용합니다.

```css
/* None */
border-radius: 0;

/* Small - 작은 버튼, 태그 */
border-radius: 0.25rem;  /* 4px */

/* Default - 기본 버튼, 입력 필드, 카드 */
border-radius: 0.375rem; /* 6px */

/* Medium - 큰 카드 */
border-radius: 0.5rem;   /* 8px */

/* Large - 모달 */
border-radius: 0.75rem;  /* 12px */

/* XL - 큰 모달 */
border-radius: 1rem;     /* 16px */

/* Full - 원형 요소 */
border-radius: 9999px;
```

---

### 3.6 트랜지션 및 애니메이션

shadcn/ui는 부드러운 트랜지션을 사용합니다.

```css
/* 기본 트랜지션 */
transition-property: color, background-color, border-color, 
                     text-decoration-color, fill, stroke, 
                     opacity, box-shadow, transform, filter, 
                     backdrop-filter;
transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
transition-duration: 150ms;

/* 빠른 트랜지션 (버튼 호버) */
transition-duration: 100ms;

/* 느린 트랜지션 (모달, 드로어) */
transition-duration: 300ms;
```

---

## 4. 컴포넌트 디자인

### 4.1 버튼 (Button)

#### Primary Button
```css
background-color: hsl(var(--primary));
color: hsl(var(--primary-foreground));
padding: 0.5rem 1rem;           /* 8px 16px */
border-radius: 0.375rem;        /* 6px */
font-weight: 500;
font-size: 0.875rem;             /* 14px */
line-height: 1.25rem;            /* 20px */
transition: all 150ms;
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* 호버 */
hover: {
  background-color: hsl(var(--primary) / 0.9);
}

/* 포커스 */
focus-visible: {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* 비활성화 */
disabled: {
  opacity: 0.5;
  cursor: not-allowed;
}
```

#### Secondary Button
```css
background-color: hsl(var(--secondary));
color: hsl(var(--secondary-foreground));
border: 1px solid hsl(var(--border));
/* 나머지는 Primary와 동일 */
```

#### Ghost Button
```css
background-color: transparent;
color: hsl(var(--foreground));
hover: {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}
```

#### Destructive Button
```css
background-color: hsl(var(--destructive));
color: hsl(var(--destructive-foreground));
hover: {
  background-color: hsl(var(--destructive) / 0.9);
}
```

#### 버튼 크기
- **sm**: `h-9 px-3 text-xs` (36px 높이)
- **default**: `h-10 px-4 py-2` (40px 높이)
- **lg**: `h-11 px-8` (44px 높이)
- **icon**: `h-10 w-10` (40x40px)

---

### 4.2 입력 필드 (Input)

```css
display: flex;
width: 100%;
border-radius: 0.375rem;        /* 6px */
border: 1px solid hsl(var(--input));
background-color: hsl(var(--background));
padding: 0.5rem 0.75rem;        /* 8px 12px */
font-size: 0.875rem;             /* 14px */
line-height: 1.25rem;            /* 20px */
transition: colors 150ms;
box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);

/* 포커스 */
focus-visible: {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
  border-color: hsl(var(--ring));
}

/* Placeholder */
placeholder: {
  color: hsl(var(--muted-foreground));
}

/* Disabled */
disabled: {
  cursor: not-allowed;
  opacity: 0.5;
}

/* 에러 상태 */
error: {
  border-color: hsl(var(--destructive));
}
```

---

### 4.3 카드 (Card)

```css
border-radius: 0.5rem;          /* 8px */
border: 1px solid hsl(var(--border));
background-color: hsl(var(--card));
color: hsl(var(--card-foreground));
box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
```

#### Card Header
```css
padding: 1.5rem;                /* 24px */
display: flex;
flex-direction: column;
space-y: 1.5rem;
```

#### Card Content
```css
padding: 1.5rem;
padding-top: 0;
```

#### Card Footer
```css
padding: 1.5rem;
padding-top: 0;
display: flex;
align-items: center;
```

---

### 4.4 모달 (Dialog)

```css
/* Overlay */
background-color: rgba(0, 0, 0, 0.5);
backdrop-filter: blur(4px);

/* Dialog Content */
background-color: hsl(var(--background));
border-radius: 0.75rem;         /* 12px */
border: 1px solid hsl(var(--border));
box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 
            0 8px 10px -6px rgb(0 0 0 / 0.1);
padding: 1.5rem;                 /* 24px */
max-width: 32rem;                /* 512px */
width: 100%;
```

---

### 4.5 네비게이션 (Navigation)

#### Header
```css
height: 4rem;                    /* 64px */
border-bottom: 1px solid hsl(var(--border));
background-color: hsl(var(--background));
padding: 0 1rem;                 /* 0 16px */
display: flex;
align-items: center;
justify-content: space-between;
position: sticky;
top: 0;
z-index: 50;
backdrop-filter: blur(8px);
background-color: hsl(var(--background) / 0.8);
```

#### Navigation Menu Item
```css
padding: 0.5rem 1rem;            /* 8px 16px */
border-radius: 0.375rem;        /* 6px */
font-size: 0.875rem;             /* 14px */
font-weight: 500;
transition: all 150ms;

/* 호버 */
hover: {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

/* 활성 */
active: {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}
```

---

## 5. 레이아웃

### 5.1 컨테이너

```css
width: 100%;
margin-left: auto;
margin-right: auto;
padding-left: 1rem;              /* 16px */
padding-right: 1rem;             /* 16px */

/* 반응형 최대 너비 */
max-width: 640px;                /* sm */
max-width: 768px;                /* md */
max-width: 1024px;               /* lg */
max-width: 1280px;               /* xl */
max-width: 1536px;               /* 2xl */
```

### 5.2 그리드 시스템

```css
display: grid;
gap: 1.5rem;                     /* 24px */

/* 반응형 컬럼 */
grid-template-columns: 1fr;                          /* 모바일 */
grid-template-columns: repeat(2, minmax(0, 1fr));   /* 태블릿 */
grid-template-columns: repeat(3, minmax(0, 1fr));    /* 데스크톱 */
grid-template-columns: repeat(4, minmax(0, 1fr));    /* 큰 화면 */
```

---

## 6. 반응형 디자인

### 6.1 브레이크포인트 (Tailwind CSS 기본)

```css
/* sm: 640px */
@media (min-width: 640px) { }

/* md: 768px */
@media (min-width: 768px) { }

/* lg: 1024px */
@media (min-width: 1024px) { }

/* xl: 1280px */
@media (min-width: 1280px) { }

/* 2xl: 1536px */
@media (min-width: 1536px) { }
```

### 6.2 모바일 우선 설계 (Mobile First)

- 모든 스타일은 모바일을 기본으로 작성
- `md:`, `lg:` 등의 접두사로 큰 화면 스타일 추가
- 터치 친화적 버튼 크기 (최소 44px)
- 간소화된 네비게이션 (햄버거 메뉴)

---

## 7. 사용자 경험 (UX)

### 7.1 로딩 상태
- **스켈레톤 UI**: 콘텐츠 구조를 보여주는 로딩 상태
- **스피너**: 작은 작업 처리 중
- **프로그레스 바**: 진행률 표시

### 7.2 에러 처리
- **에러 메시지**: 명확하고 해결 가능한 안내
- **에러 페이지**: 404, 500 등 친화적인 페이지
- **재시도 옵션**: 실패 시 재시도 버튼 제공

### 7.3 성공 피드백
- **Toast 알림**: 성공 메시지 표시
- **시각적 피드백**: 버튼 클릭 애니메이션
- **상태 변경**: 즉각적인 UI 업데이트

---

## 8. 접근성 (Accessibility)

### 8.1 WCAG 2.1 AA 준수
- **대비율**: 최소 4.5:1 (텍스트), 3:1 (UI 컴포넌트)
- **키보드 네비게이션**: 모든 기능 접근 가능
- **스크린 리더**: 적절한 ARIA 레이블
- **포커스 표시**: 명확한 포커스 인디케이터 (ring)

### 8.2 구현 가이드
- 시맨틱 HTML 태그 사용
- `alt` 속성 (이미지)
- `aria-label` (아이콘 버튼)
- `role` 속성 (필요 시)
- `aria-describedby` (에러 메시지 연결)

---

## 9. 아이콘

### 9.1 아이콘 라이브러리
- **추천**: lucide-react (shadcn/ui 기본)
- **크기**: 16px, 20px, 24px
- **스타일**: Outline, Stroke width: 2

### 9.2 주요 아이콘
- 검색: `Search`
- 찜하기: `Heart`
- 필터: `Filter`
- 정렬: `ArrowUpDown`
- 설정: `Settings`
- 알림: `Bell`

---

## 10. 다크 모드 (향후 지원)

### 10.1 테마 전환
- CSS 변수를 사용한 동적 테마 전환
- `prefers-color-scheme` 미디어 쿼리 지원
- 사용자 설정 저장

### 10.2 구현 방법
```css
[data-theme="dark"] {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  /* ... 다크 테마 변수 */
}
```

---

## 11. 디자인 토큰

### 11.1 CSS 변수 구조
```css
:root {
  /* 색상 */
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  
  /* 간격 */
  --spacing-unit: 0.25rem;  /* 4px */
  
  /* Border Radius */
  --radius: 0.375rem;        /* 6px */
  
  /* 트랜지션 */
  --transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 12. 컴포넌트 라이브러리

### 12.1 shadcn/ui 컴포넌트
- Button
- Input
- Card
- Dialog
- Dropdown Menu
- Select
- Tabs
- Toast
- Form
- Label

### 12.2 커스텀 컴포넌트
- VehicleCard
- SearchBar
- FilterPanel
- ImageGallery

---

## 문서 승인

| 역할 | 이름 | 서명 | 날짜 |
|------|------|------|------|
| 프로젝트 매니저 | | | |
| 디자이너 | | | |
| 프론트엔드 개발자 | | | |

---

**문서 버전**: 2.0  
**디자인 시스템**: shadcn/ui  
**최종 수정일**: 2024년 (작성일자)  
**다음 리뷰일**: 프로젝트 진행 중 필요시 수정
