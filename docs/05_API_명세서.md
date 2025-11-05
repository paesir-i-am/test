# API 명세서

## 1. 문서 정보

### 프로젝트명
**쑤카 (Sooka)**

### 문서 버전
v1.0

### 작성일
2024년 (작성일자)

### 문서 목적
쑤카 프로젝트의 RESTful API 엔드포인트를 정의하여 프론트엔드와 백엔드 간의 통신 규격을 명확히 합니다.

---

## 2. API 기본 정보

### 2.1 기본 URL
```
Base URL: https://api.sooka.com/v1
```

### 2.2 인증 방식
- **인증 방식**: JWT (JSON Web Token)
- **토큰 전달**: HTTP Header의 `Authorization` 필드
- **형식**: `Bearer {token}`
- **예시**: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

### 2.3 응답 형식
- **Content-Type**: `application/json`
- **인코딩**: UTF-8

### 2.4 공통 응답 형식

#### 성공 응답
```json
{
  "success": true,
  "data": {
    // 응답 데이터
  },
  "message": "성공 메시지"
}
```

#### 에러 응답
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "에러 메시지"
  }
}
```

### 2.5 HTTP 상태 코드
- `200`: 성공
- `201`: 생성 성공
- `400`: 잘못된 요청
- `401`: 인증 실패
- `403`: 권한 없음
- `404`: 리소스를 찾을 수 없음
- `500`: 서버 에러

---

## 3. 인증 API

### 3.1 회원가입

#### POST /auth/register

**요청 본문**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "password_confirm": "password123",
  "name": "홍길동",
  "role": "buyer"
}
```

**응답** (201 Created)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "홍길동",
      "role": "buyer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "회원가입이 완료되었습니다"
}
```

**에러 응답**
- `400`: 이메일 형식 오류, 비밀번호 불일치, 약관 미동의
- `409`: 중복된 이메일

---

### 3.2 로그인

#### POST /auth/login

**요청 본문**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "user": {
      "id": 1,
      "email": "user@example.com",
      "name": "홍길동",
      "role": "buyer"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refresh_token": "refresh_token_here"
  },
  "message": "로그인 성공"
}
```

**에러 응답**
- `401`: 잘못된 이메일 또는 비밀번호
- `429`: 로그인 시도 초과 (5회)

---

### 3.3 로그아웃

#### POST /auth/logout

**헤더**
```
Authorization: Bearer {token}
```

**응답** (200 OK)
```json
{
  "success": true,
  "message": "로그아웃되었습니다"
}
```

---

### 3.4 토큰 갱신

#### POST /auth/refresh

**요청 본문**
```json
{
  "refresh_token": "refresh_token_here"
}
```

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "token": "new_token_here"
  }
}
```

---

## 4. 사용자 API

### 4.1 프로필 조회

#### GET /users/me

**헤더**
```
Authorization: Bearer {token}
```

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "홍길동",
    "phone": "010-1234-5678",
    "address": "서울시 강남구",
    "role": "buyer",
    "profile_image_url": "https://example.com/profile.jpg",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### 4.2 프로필 수정

#### PUT /users/me

**헤더**
```
Authorization: Bearer {token}
```

**요청 본문**
```json
{
  "name": "홍길동",
  "phone": "010-1234-5678",
  "address": "서울시 강남구",
  "profile_image_url": "https://example.com/profile.jpg"
}
```

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "name": "홍길동",
    "phone": "010-1234-5678",
    "address": "서울시 강남구",
    "updated_at": "2024-01-02T00:00:00Z"
  },
  "message": "프로필이 수정되었습니다"
}
```

---

### 4.3 비밀번호 변경

#### PUT /users/me/password

**헤더**
```
Authorization: Bearer {token}
```

**요청 본문**
```json
{
  "current_password": "old_password",
  "new_password": "new_password123",
  "new_password_confirm": "new_password123"
}
```

**응답** (200 OK)
```json
{
  "success": true,
  "message": "비밀번호가 변경되었습니다"
}
```

---

## 5. 차량 API

### 5.1 차량 목록 조회

#### GET /vehicles

**쿼리 파라미터**
- `page`: 페이지 번호 (기본값: 1)
- `limit`: 페이지당 항목 수 (기본값: 20, 최대: 100)
- `search`: 검색 키워드
- `manufacturer_id`: 제조사 ID
- `model_id`: 모델 ID
- `min_price`: 최소 가격
- `max_price`: 최대 가격
- `min_year`: 최소 연식
- `max_year`: 최대 연식
- `min_mileage`: 최소 주행거리
- `max_mileage`: 최대 주행거리
- `fuel_type`: 연료 유형 (gasoline, diesel, hybrid, electric, lpg)
- `transmission`: 변속기 유형 (manual, automatic)
- `region`: 지역
- `has_accident`: 사고 이력 유무 (true/false)
- `sort`: 정렬 기준 (created_at, price_asc, price_desc, mileage_asc, mileage_desc, view_count)
- `order`: 정렬 방향 (asc, desc)

**예시 요청**
```
GET /vehicles?page=1&limit=20&manufacturer_id=1&min_price=10000000&max_price=30000000&sort=price_asc
```

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "vehicles": [
      {
        "id": 1,
        "manufacturer": {
          "id": 1,
          "name": "현대"
        },
        "model": {
          "id": 1,
          "name": "소나타"
        },
        "detail_model_name": "소나타 DN8",
        "year": 2020,
        "mileage": 50000,
        "price": 25000000,
        "fuel_type": "gasoline",
        "transmission": "automatic",
        "color": "흰색",
        "region": "서울시 강남구",
        "thumbnail_image": "https://example.com/thumbnail.jpg",
        "view_count": 150,
        "status": "approved",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}
```

---

### 5.2 차량 상세 조회

#### GET /vehicles/:id

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "seller": {
      "id": 2,
      "name": "판매자",
      "phone": "010-1234-5678"
    },
    "manufacturer": {
      "id": 1,
      "name": "현대"
    },
    "model": {
      "id": 1,
      "name": "소나타"
    },
    "detail_model_name": "소나타 DN8",
    "year": 2020,
    "mileage": 50000,
    "price": 25000000,
    "fuel_type": "gasoline",
    "transmission": "automatic",
    "color": "흰색",
    "region": "서울시 강남구",
    "options": ["선루프", "네비게이션", "후방카메라"],
    "accident_history": false,
    "accident_details": null,
    "repair_history": "정기점검 완료",
    "description": "깨끗하게 관리된 차량입니다.",
    "vehicle_number": "12가3456",
    "status": "approved",
    "view_count": 151,
    "images": [
      {
        "id": 1,
        "image_url": "https://example.com/image1.jpg",
        "image_order": 1,
        "is_thumbnail": true
      },
      {
        "id": 2,
        "image_url": "https://example.com/image2.jpg",
        "image_order": 2,
        "is_thumbnail": false
      }
    ],
    "is_favorite": false,
    "created_at": "2024-01-01T00:00:00Z",
    "updated_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### 5.3 차량 등록

#### POST /vehicles

**헤더**
```
Authorization: Bearer {token}
```

**요청 본문**
```json
{
  "manufacturer_id": 1,
  "model_id": 1,
  "detail_model_name": "소나타 DN8",
  "year": 2020,
  "mileage": 50000,
  "price": 25000000,
  "fuel_type": "gasoline",
  "transmission": "automatic",
  "color": "흰색",
  "region": "서울시 강남구",
  "options": ["선루프", "네비게이션", "후방카메라"],
  "accident_history": false,
  "accident_details": null,
  "repair_history": "정기점검 완료",
  "description": "깨끗하게 관리된 차량입니다.",
  "vehicle_number": "12가3456",
  "images": [
    {
      "image_url": "https://example.com/image1.jpg",
      "image_order": 1,
      "is_thumbnail": true
    }
  ]
}
```

**응답** (201 Created)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "status": "pending",
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "차량이 등록되었습니다. 관리자 승인 후 노출됩니다."
}
```

---

### 5.4 차량 수정

#### PUT /vehicles/:id

**헤더**
```
Authorization: Bearer {token}
```

**요청 본문**
```json
{
  "price": 24000000,
  "description": "수정된 설명입니다.",
  "status": "reserved"
}
```

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "updated_at": "2024-01-02T00:00:00Z"
  },
  "message": "차량 정보가 수정되었습니다"
}
```

---

### 5.5 차량 삭제

#### DELETE /vehicles/:id

**헤더**
```
Authorization: Bearer {token}
```

**응답** (200 OK)
```json
{
  "success": true,
  "message": "차량이 삭제되었습니다"
}
```

---

### 5.6 내 차량 목록 조회

#### GET /vehicles/my

**헤더**
```
Authorization: Bearer {token}
```

**쿼리 파라미터**
- `page`: 페이지 번호
- `limit`: 페이지당 항목 수
- `status`: 차량 상태 (pending, approved, sold, rejected)

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "vehicles": [
      {
        "id": 1,
        "manufacturer": { "name": "현대" },
        "model": { "name": "소나타" },
        "price": 25000000,
        "status": "approved",
        "view_count": 150,
        "inquiry_count": 5,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "total_pages": 1
    }
  }
}
```

---

## 6. 찜하기 API

### 6.1 찜하기 추가

#### POST /favorites

**헤더**
```
Authorization: Bearer {token}
```

**요청 본문**
```json
{
  "vehicle_id": 1
}
```

**응답** (201 Created)
```json
{
  "success": true,
  "message": "찜하기가 추가되었습니다"
}
```

---

### 6.2 찜하기 삭제

#### DELETE /favorites/:vehicle_id

**헤더**
```
Authorization: Bearer {token}
```

**응답** (200 OK)
```json
{
  "success": true,
  "message": "찜하기가 취소되었습니다"
}
```

---

### 6.3 찜한 차량 목록 조회

#### GET /favorites

**헤더**
```
Authorization: Bearer {token}
```

**쿼리 파라미터**
- `page`: 페이지 번호
- `limit`: 페이지당 항목 수

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "favorites": [
      {
        "id": 1,
        "vehicle": {
          "id": 1,
          "manufacturer": { "name": "현대" },
          "model": { "name": "소나타" },
          "price": 25000000,
          "thumbnail_image": "https://example.com/thumbnail.jpg",
          "status": "approved"
        },
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "total_pages": 1
    }
  }
}
```

---

## 7. 문의 API

### 7.1 문의하기

#### POST /inquiries

**헤더**
```
Authorization: Bearer {token}
```

**요청 본문**
```json
{
  "vehicle_id": 1,
  "title": "차량 문의드립니다",
  "content": "차량 상태와 시승 가능 여부를 문의드립니다."
}
```

**응답** (201 Created)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "created_at": "2024-01-01T00:00:00Z"
  },
  "message": "문의가 전송되었습니다"
}
```

---

### 7.2 문의 목록 조회

#### GET /inquiries

**헤더**
```
Authorization: Bearer {token}
```

**쿼리 파라미터**
- `type`: 문의 타입 (sent, received) - 기본값: all
- `page`: 페이지 번호
- `limit`: 페이지당 항목 수

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "inquiries": [
      {
        "id": 1,
        "vehicle": {
          "id": 1,
          "manufacturer": { "name": "현대" },
          "model": { "name": "소나타" },
          "thumbnail_image": "https://example.com/thumbnail.jpg"
        },
        "buyer": {
          "id": 1,
          "name": "구매자"
        },
        "seller": {
          "id": 2,
          "name": "판매자"
        },
        "title": "차량 문의드립니다",
        "status": "pending",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 10,
      "total_pages": 1
    }
  }
}
```

---

### 7.3 문의 상세 조회

#### GET /inquiries/:id

**헤더**
```
Authorization: Bearer {token}
```

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "vehicle": {
      "id": 1,
      "manufacturer": { "name": "현대" },
      "model": { "name": "소나타" }
    },
    "buyer": {
      "id": 1,
      "name": "구매자"
    },
    "seller": {
      "id": 2,
      "name": "판매자"
    },
    "title": "차량 문의드립니다",
    "content": "차량 상태와 시승 가능 여부를 문의드립니다.",
    "reply": null,
    "status": "pending",
    "created_at": "2024-01-01T00:00:00Z"
  }
}
```

---

### 7.4 문의 답변

#### POST /inquiries/:id/reply

**헤더**
```
Authorization: Bearer {token}
```

**요청 본문**
```json
{
  "reply": "시승 가능합니다. 연락주시면 시간 조율하겠습니다."
}
```

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "id": 1,
    "reply": "시승 가능합니다. 연락주시면 시간 조율하겠습니다.",
    "reply_at": "2024-01-02T00:00:00Z",
    "status": "replied"
  },
  "message": "답변이 전송되었습니다"
}
```

---

## 8. 관리자 API

### 8.1 차량 승인 대기 목록

#### GET /admin/vehicles/pending

**헤더**
```
Authorization: Bearer {admin_token}
```

**쿼리 파라미터**
- `page`: 페이지 번호
- `limit`: 페이지당 항목 수

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "vehicles": [
      {
        "id": 1,
        "seller": {
          "id": 2,
          "name": "판매자",
          "email": "seller@example.com"
        },
        "manufacturer": { "name": "현대" },
        "model": { "name": "소나타" },
        "price": 25000000,
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 5,
      "total_pages": 1
    }
  }
}
```

---

### 8.2 차량 승인/거부

#### PUT /admin/vehicles/:id/approve

**헤더**
```
Authorization: Bearer {admin_token}
```

**요청 본문**
```json
{
  "action": "approve" // 또는 "reject"
}
```

**거부 시**
```json
{
  "action": "reject",
  "reason": "부적절한 내용이 포함되어 있습니다"
}
```

**응답** (200 OK)
```json
{
  "success": true,
  "message": "차량이 승인되었습니다"
}
```

---

### 8.3 사용자 목록 조회

#### GET /admin/users

**헤더**
```
Authorization: Bearer {admin_token}
```

**쿼리 파라미터**
- `page`: 페이지 번호
- `limit`: 페이지당 항목 수
- `role`: 사용자 역할
- `status`: 계정 상태
- `search`: 검색 키워드

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": 1,
        "email": "user@example.com",
        "name": "홍길동",
        "role": "buyer",
        "status": "active",
        "created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "total_pages": 5
    }
  }
}
```

---

### 8.4 사용자 정지/해제

#### PUT /admin/users/:id/status

**헤더**
```
Authorization: Bearer {admin_token}
```

**요청 본문**
```json
{
  "status": "suspended" // 또는 "active"
}
```

**응답** (200 OK)
```json
{
  "success": true,
  "message": "사용자 상태가 변경되었습니다"
}
```

---

## 9. 공통 API

### 9.1 제조사 목록 조회

#### GET /manufacturers

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "manufacturers": [
      {
        "id": 1,
        "name": "현대",
        "name_en": "Hyundai",
        "logo_url": "https://example.com/logo.jpg"
      }
    ]
  }
}
```

---

### 9.2 모델 목록 조회

#### GET /models

**쿼리 파라미터**
- `manufacturer_id`: 제조사 ID (필수)

**응답** (200 OK)
```json
{
  "success": true,
  "data": {
    "models": [
      {
        "id": 1,
        "manufacturer_id": 1,
        "name": "소나타",
        "name_en": "Sonata"
      }
    ]
  }
}
```

---

## 10. 에러 코드

| 코드 | 설명 |
|------|------|
| `VALIDATION_ERROR` | 입력 값 검증 실패 |
| `UNAUTHORIZED` | 인증 실패 |
| `FORBIDDEN` | 권한 없음 |
| `NOT_FOUND` | 리소스를 찾을 수 없음 |
| `DUPLICATE_EMAIL` | 중복된 이메일 |
| `INVALID_CREDENTIALS` | 잘못된 인증 정보 |
| `TOKEN_EXPIRED` | 토큰 만료 |
| `RATE_LIMIT_EXCEEDED` | 요청 제한 초과 |
| `INTERNAL_ERROR` | 서버 내부 에러 |

---

## 문서 승인

| 역할 | 이름 | 서명 | 날짜 |
|------|------|------|------|
| 프로젝트 매니저 | | | |
| 기술 리더 | | | |
| 백엔드 개발자 | | | |
| 프론트엔드 개발자 | | | |

---

**문서 버전**: 1.0  
**최종 수정일**: 2024년 (작성일자)  
**다음 리뷰일**: 프로젝트 진행 중 필요시 수정

