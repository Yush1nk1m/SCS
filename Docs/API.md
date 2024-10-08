# API Documentation

이 문서는 SCS 프로젝트의 API 설계 문서이다.

## Auth

이 섹션은 인증 관련 API에 대한 설계이다.

| API ID | Method |               URI                | Summary        |
| :----: | :----: | :------------------------------: | :------------- |
|  A-01  |  POST  | /v1/auth/email/verification-code | 인증 코드 전송 |
|  A-02  |  POST  |    /v1/auth/email/verify-code    | 인증 코드 검증 |
|  A-03  |  POST  |         /v1/auth/signup          | 회원 가입      |
|  A-04  |  POST  |        /v1/auth/jwt/login        | 로그인         |
|  A-05  |  POST  |       /v1/auth/jwt/refresh       | 리프레시       |
|  A-06  |  POST  |       /v1/auth/jwt/logout        | 로그아웃       |

### A-01: 인증 코드 전송

- **Description**: `A-01`로 사용자 이메일에 인증 코드를 전송하고, `A-02`로 인증 코드를 검증한 후, `A-03`으로 회원 가입을 마무리한다.
- **Method**: `POST`
- **URI**: `/v1/auth/email/verification-code`
- **Request**: Body = { email: `user email` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### A-02: 인증 코드 검증

- **Description**: `A-01`로 사용자 이메일에 인증 코드를 전송하고, `A-02`로 인증 코드를 검증한 후, `A-03`으로 회원 가입을 마무리한다.
- **Method**: `POST`
- **URI**: `/v1/auth/email/verify-code`
- **Request**: Body = { email: `user email`, verificationCode: `verification code` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### A-03: 회원 가입

- **Description**: `A-01`로 사용자 이메일에 인증 코드를 전송하고, `A-02`로 인증 코드를 검증한 후, `A-03`으로 회원 가입을 마무리한다.
- **Method**: `POST`
- **URI**: `/v1/auth/signup`
- **Request**: Body = { email: `user email`, password: `user password`, nickname: `user nickname`, affiliation: `user's affiliation`, position: `user's position in the field`, verificationCode: `verified code` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "nickname": "닉네임",
    "affiliation": "서강대학교",
    "position": "백엔드"
  }
}
```

### A-04: 로그인

- **Description**: 리프레시 토큰, 액세스 토큰을 사용한 JWT 기반의 방식으로 로그인한다.
- **Method**:`POST`
- **URI**: `/v1/auth/jwt/login`
- **Request**: Body = { email: `user email`, password: `user password` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### A-05: 리프레시

- **Description**: 리프레시 토큰을 사용해 액세스 토큰과 리프레시 토큰을 재발급한다.
- **Method**: `POST`
- **URI**: `/v1/auth/jwt/refresh`
- **Request**: Request header = { Authorization: `Bearer ${refreshToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### A-06: 로그아웃

- **Description**: 데이터베이스에 저장된 리프레시 토큰 정보를 삭제한다.
- **Method**: `POST`
- **URI**: `/v1/auth/jwt/logout`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### Appendix. 회원 가입 API 사용 절차

![Sequence diagram for vefirication](UML/verification.png)

### Appendix. 사용자 인증 API 사용 절차

![Sequence diagram for login](UML/jwt-login.png)

![Sequence diagram for refresh](UML/jwt-refresh.png)

![Sequence diagram for logout](UML/jwt-logout.png)

## User

이 섹션은 사용자 관련 API에 대한 설계이다.

| API ID | Method |          URI           | Summary                                |
| :----: | :----: | :--------------------: | :------------------------------------- |
|  U-01  |  GET   |       /v1/users        | 모든 사용자 정보 조회                  |
|  U-02  |  GET   |     /v1/users/:id      | 특정 사용자 정보 조회                  |
|  U-03  |  GET   |      /v1/users/me      | 로그인한 사용자 정보 조회              |
|  U-04  | PATCH  |   /v1/users/password   | 로그인한 사용자 비밀번호 변경          |
|  U-05  | PATCH  |   /v1/users/nickname   | 로그인한 사용자 닉네임 변경            |
|  U-06  | DELETE |       /v1/users        | 로그인한 사용자 회원 탈퇴              |
|  U-07  |  GET   |    /v1/users/books     | 로그인한 사용자가 생성한 문제집 조회   |
|  U-08  |  GET   | /v1/users/books/liked  | 로그인한 사용자가 좋아요한 문제집 조회 |
|  U-09  |  GET   | /v1/users/contribution | 로그인한 사용자의 커뮤니티 기여도 조회 |
|  U-10  | PATCH  | /v1/users/affiliation  | 로그인한 사용자 소속 변경              |
|  U-11  | PATCH  |   /v1/users/position   | 로그인한 사용자 포지션 변경            |

### U-01: 모든 사용자 정보 조회

- **Description**: 모든 사용자의 기본적인 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/users`
- **Request**: None
- **Response data**:

```
{
  "message": "Request has been processed.",
  "users": [
    {
      "id": 1,
      "email": "user@example.com",
      "nickname": "닉네임",
      "affiliation": "서강대학교",
      "position": "백엔드"
    }
  ]
}
```

### U-02: 특정 사용자 정보 조회

- **Description**: 특정 사용자의 기본적인 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/users/:id`
- **Request**: URI 경로에 사용자의 ID를 전달한다.
- **Response data**:

```
{
  "message": "Request has been processed.",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "nickname": "닉네임",
    "affiliation": "서강대학교",
    "position": "백엔드"
  }
}
```

### U-03: 로그인한 사용자 정보 조회

- **Description**: 로그인한 사용자의 기본적인 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/users/me`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "nickname": "닉네임",
    "affiliation": "서강대학교",
    "position": "백엔드"
  }
}
```

### U-04: 로그인한 사용자 비밀번호 변경

- **Description**: 로그인한 사용자의 비밀번호를 변경한다.
- **Method**: `PATCH`
- **URI**: `/v1/users/password`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { password: `current password`, newPassword: `new password`, confirmPassword: `new confirm password` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### U-05: 로그인한 사용자 닉네임 변경

- **Description**: 로그인한 사용자의 닉네임을 변경한다.
- **Method**: `PATCH`
- **URI**: `/v1/users/nickname`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { nickname: `new nickname` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### U-06: 로그인한 사용자 회원 탈퇴

- **Description**: 로그인한 사용자의 정보를 삭제한다.
- **Method**: `DELETE`
- **URI**: `/v1/users`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { password: `user's password`, confirmMessage: `회원 탈퇴를 희망합니다.` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### U-07: 로그인한 사용자가 생성한 문제집 조회

- **Description**: 로그인한 사용자가 생성한 문제집들을 조회한다. 페이지네이션을 지원한다. 쿼리 파라미터의 기본 값은 { page=1, limit=10, sort=createdAt, order=desc }이다.
- **Method**: `GET`
- **URI**: `/v1/users/books`
- **Query Parameters**: page: `page number`, limit: `items per page`, sort: `createdAt` or `likeCount`, order: `asc` or `desc`, search: `search value`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "books": [
    {
      "id": 1,
      "title": "백엔드 신입 면접 대비 문제집",
      "description": "백엔드 신입 취준을 위한 문제집입니다.",
      "likeCount": 10,
      "createdAt": "2024-08-14T12:34:56Z",
      "updatedAt": "2024-08-14T12:34:56Z",
      "publisher": {
        "id": 1,
        "nickname": "닉네임"
      }
    }
  ],
  "total": 5
}
```

### U-08: 로그인한 사용자가 좋아요한 문제집 조회

- **Description**: 로그인한 사용자가 좋아요한 문제집들을 조회한다. 페이지네이션을 지원한다. 쿼리 파라미터의 기본 값은 { page=1, limit=10, sort=createdAt, order=desc }이다.
- **Method**: `GET`
- **URI**: `/v1/users/books/liked`
- **Query Parameters**: page: `page number`, limit: `items per page`, sort: `createdAt` or `likeCount`, order: `asc` or `desc`, search: `search value` page: `page number`, limit: `items per page`, sort: `createdAt` or `likeCount`, order: `asc` or `desc`, search: `search value`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "books": [
    {
      "id": 1,
      "visibility": "public",
      "title": "백엔드 신입 면접 대비 문제집",
      "description": "백엔드 신입 취준을 위한 문제집입니다.",
      "likeCount": 10,
      "createdAt": "2024-08-14T12:34:56Z",
      "updatedAt": "2024-08-14T12:34:56Z",
      "publisher": {
        "id": 1,
        "nickname": "닉네임"
      }
    }
  ],
  "total": 5
}
```

### U-09: 로그인한 사용자의 커뮤니티 기여도 조회

- **Description**: 로그인한 사용자의 커뮤니티 기여도를 조회한다. 기여의 종류는 1. 생성한 모든 요소(질문, 액션, 문제집)의 개수, 2. 생성한 질문의 총 스크랩된 횟수, 3. 생성한 액션의 총 좋아요 개수, 4. 생성한 문제집의 총 좋아요 개수로 구분된다.
- **Method**: `GET`
- **URI**: `/v1/users/contribution`
- **Query Parameters**: type: 1. `created`, 2. `question`, 3. `action`, 4. `book`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "total": 0,
  "percentile": 0
}
```

### U-10: 로그인한 사용자 소속 변경

- **Description**: 로그인한 사용자의 소속을 변경한다.
- **Method**: `PATCH`
- **URI**: `/v1/users/affiliation`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { affiliation: `new affiliation` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "nickname": "닉네임",
    "affiliation": "서강대학교",
    "position": "백엔드"
  }
}
```

### U-10: 로그인한 사용자 포지션 변경

- **Description**: 로그인한 사용자의 포지션을 변경한다.
- **Method**: `PATCH`
- **URI**: `/v1/users/position`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { position: `new position` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "nickname": "닉네임",
    "affiliation": "서강대학교",
    "position": "백엔드"
  }
}
```

## Section

이 섹션은 섹션 관련 API에 대한 설계이다.

| API ID | Method |             URI              | Summary                 |
| :----: | :----: | :--------------------------: | :---------------------- |
|  S-01  |  GET   |         /v1/sections         | 모든 섹션 조회          |
|  S-02  |  GET   |       /v1/sections/:id       | 특정 섹션 조회          |
|  S-03  |  POST  |         /v1/sections         | 새 섹션 생성            |
|  S-04  | PATCH  |   /v1/sections/:id/subject   | 섹션 제목 수정          |
|  S-05  | PATCH  | /v1/sections/:id/description | 섹션 설명 수정          |
|  S-06  | DELETE |       /v1/sections/:id       | 섹션 삭제               |
|  S-07  |  GET   |  /v1/sections/:id/questions  | 특정 섹션의 질문들 조회 |

### S-01: 모든 섹션 조회

- **Description**: 모든 섹션의 기본 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/sections`
- **Query Parameters**: sort: `subject` or `id`, order: `ASC` or `DESC`
- **Request**: URI 경로에 정렬 조건을 전달한다.
- **Response data**:

```
{
  "message": "Request has been processed.",
  "sections": [
    {
      "id": 1,
      "subject": "네트워크",
      "description": "네트워크 관련 질문들",
      "createdAt": "2024-08-14T12:34:56Z",
      "updatedAt": "2024-08-14T12:34:56Z",
      "creator": {
        "id": 1,
        "nickname": "닉네임"
      }
    }
  ]
}
```

### S-02: 특정 섹션 조회

- **Description**: 특정 섹션의 상세 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/sections/:id`
- **Request**: URI 경로에 섹션의 ID를 전달한다.
- **Response data**:

```
{
  "message": "Request has been processed.",
  "section": {
    "id": 1,
    "subject": "네트워크",
    "description": "네트워크 관련 질문들",
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "creator": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### S-03: 새 섹션 생성

- **Description**: 새로운 섹션을 생성한다. 관리자만 접근 가능하다.
- **Method**: `POST`
- **URI**: `/v1/sections`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { subject: `section's subject`, description: `section's description` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "section": {
    "id": 1,
    "subject": "네트워크",
    "description": "네트워크 관련 질문들",
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "creator": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### S-04: 섹션 제목 수정

- **Description**: 특정 섹션의 제목을 수정한다. 관리자만 접근 가능하다.
- **Method**: `PATCH`
- **URI**: `/v1/sections/:id/subject`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { subject: `new section's subject` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "section": {
    "id": 1,
    "subject": "네트워크",
    "description": "네트워크 관련 질문들",
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "creator": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### S-05: 섹션 설명 수정

- **Description**: 특정 섹션의 설명을 수정한다. 관리자만 접근 가능하다.
- **Method**: `PATCH`
- **URI**: `/v1/sections/:id/description`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { description: `new section's description` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "section": {
    "id": 1,
    "subject": "네트워크",
    "description": "네트워크 관련 질문들",
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "creator": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### S-06: 섹션 삭제

- **Description**: 특정 섹션을 삭제한다. 관리자만 접근 가능하다.
- **Method**: `DELETE`
- **URI**: `/v1/sections/:id`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### S-07: 특정 섹션의 질문들 조회

- **Description**: 특정 섹션에 속한 모든 질문을 조회한다. 페이지네이션을 지원한다. 쿼리 파라미터의 기본 값은 { page=1, limit=10, sort=createdAt, order=desc }이다.
- **Method**: `GET`
- **URI**: `/v1/sections/:id/questions?page={page number}&limit={items per page}&sort={createdAt or saved}&order={asc or desc}`
- **Query Parameters**: page: `page number`, limit: `items per page`, sort: `createdAt` or `saved`, order: `asc` or `desc`, search: `searching value`
- **Request**: URI 경로에 섹션의 ID를 전달한다.
- **Response data**:

```
{
  "message": "Request has been processed.",
  "questions": [
    {
      "id": 1,
      "content": "TCP와 UDP의 차이점은 무엇인가요?",
      "saved": 5,
      "createdAt": "2024-08-14T12:34:56Z",
      "updatedAt": "2024-08-14T12:34:56Z",
      "writer": {
        "id": 1,
        "nickname": "닉네임"
      }
    }
  ],
  "total": 5
}
```

## Question

이 섹션은 질문 관련 API에 대한 설계이다.

| API ID | Method |            URI            | Summary                 |
| :----: | :----: | :-----------------------: | :---------------------- |
|  Q-01  |  GET   |     /v1/questions/:id     | 특정 질문 조회          |
|  Q-02  |  POST  |       /v1/questions       | 새 질문 생성            |
|  Q-03  | PATCH  |     /v1/questions/:id     | 질문 내용 수정          |
|  Q-04  | DELETE |     /v1/questions/:id     | 질문 삭제               |
|  Q-05  |  GET   | /v1/questions/:id/actions | 특정 질문의 답변들 조회 |

### Q-01: 특정 질문 조회

- **Description**: 특정 질문의 상세 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/questions/:id`
- **Request**: URI 경로에 질문의 ID를 전달한다.
- **Response data**:

```
{
  "message": "Request has been processed.",
  "question": {
    "id": 1,
    "content": "TCP와 UDP의 차이점은 무엇인가요?",
    "saved": 5,
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "writer": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### Q-02: 새 질문 생성

- **Description**: 새로운 질문을 생성한다.
- **Method**: `POST`
- **URI**: `/v1/questions`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { content: `question content`, sectionId: `section's id` }
- **Response data**:

```
{
    message: `result message`,
    question: {
        id: `question's id`,
        content: `question's content`,
        createdAt: `question's created date`,
        updatedAt: `question's updated date`,
        saved: `question's saved count`,
        writer: {
            id: `writer's id`,
            nickname: `writer's nickname`
        },
    }
}
```

### Q-03: 질문 내용 수정

- **Description**: 특정 질문의 내용을 수정한다. 관리자만 수정 가능하다.
- **Method**: `PATCH`
- **URI**: `/v1/questions/:id`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { content: `updated question content` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "question": {
    "id": 1,
    "content": "TCP와 UDP의 차이점은 무엇인가요?",
    "saved": 5,
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "writer": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### Q-04: 질문 삭제

- **Description**: 특정 질문을 삭제한다. 관리자만 삭제 가능하다.
- **Method**: `DELETE`
- **URI**: `/v1/questions/:id`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### Q-05: 특정 질문의 답변들 조회

- **Description**: 특정 질문에 대한 모든 답변을 조회한다. 페이지네이션을 지원한다.
- **Method**: `GET`
- **URI**: `/v1/questions/:id/actions`
- **Query Parameters**: page: `page number`, limit: `items per page`, sort: `updatedAt` or `likeCount`, order: `ASC` or `DESC`, search: `searching value`
- **Request**: URI 경로에 질문의 ID를 전달하고 쿼리 파라미터로 옵션을 전달한다.
- **Response data**:

```
{
  "message": "Request has been processed.",
  "actions": [
    {
      "id": 1,
      "title": "관리자님이 2024. 08. 14. 작성한 답변입니다.",
      "imageUrls": [
        "http://example.com/image1.jpg"
      ],
      "likeCount": 10,
      "createdAt": "2024-08-14T12:34:56Z",
      "updatedAt": "2024-08-14T12:34:56Z",
      "writer": {
        "id": 1,
        "nickname": "닉네임"
      }
    }
  ],
  "total": 5
}
```

## Action

이 섹션은 답변 관련 API에 대한 설계이다.

| API ID | Method |             URI             | Summary                              |
| :----: | :----: | :-------------------------: | :----------------------------------- |
| AC-01  |  GET   |       /v1/actions/:id       | 특정 답변 조회                       |
| AC-02  |  POST  |  /v1/questions/:id/actions  | 새 답변 생성                         |
| AC-03  | PATCH  |       /v1/actions/:id       | 답변 수정                            |
| AC-04  | DELETE |       /v1/actions/:id       | 답변 삭제                            |
| AC-05  |  GET   | /v1/actions/:id/raw-content | 특정 답변의 Raw 마크다운 컨텐츠 조회 |
| AC-06  |  POST  |    /v1/actions/:id/like     | 좋아요 등록/취소                     |
| AC-07  |  GET   |    /v1/actions/:id/like     | 좋아요 여부 조회                     |
| AC-08  |  GET   |  /v1/actions/:id/comments   | 댓글 목록 조회                       |

### AC-01: 특정 답변 조회

- **Description**: 특정 답변의 상세 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/actions/:id`
- **Request**: URI 경로에 답변의 ID를 전달한다.
- **Response data**:

```
{
  "message": "Request has been processed.",
  "action": {
    "id": 1,
    "title": "관리자님이 2024. 08. 14. 작성한 답변입니다.",
    "content": "TCP는 연결 지향적이고...",
    "likeCount": 10,
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "writer": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### AC-02: 새 답변 생성

- **Description**: 특정 질문에 대한 새로운 답변을 생성한다.
- **Method**: `POST`
- **URI**: `/v1/actions`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { title: `action title`, content: `action content (markdown)`, questionId: `question's id` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "action": {
    "id": 1,
    "title": "관리자님이 2024. 08. 14. 작성한 답변입니다.",
    "content": "TCP는 연결 지향적이고...",
    "likeCount": 10,
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "writer": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### AC-03: 답변 수정

- **Description**: 특정 답변의 내용을 수정한다. 답변 작성자만 수정 가능하다.
- **Method**: `PATCH`
- **URI**: `/v1/actions/:id`
- **Request**: Request header = { Authorization: Bearer ${accessToken} } & Body = { title: `updated action title`, content: `updated action content` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "action": {
    "id": 1,
    "title": "관리자님이 2024. 08. 14. 작성한 답변입니다.",
    "content": "TCP는 연결 지향적이고...",
    "likeCount": 10,
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "writer": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### AC-04: 답변 삭제

- **Description**: 특정 답변을 삭제한다. 답변 작성자만 삭제 가능하다.
- **Method**: `DELETE`
- **URI**: `/v1/actions/:id`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### AC-05: 특정 답변의 Raw 마크다운 컨텐츠 조회

- **Description**: 특정 답변의 Raw 마크다운 컨텐츠를 조회한다. Action을 수정하는 등의 작업에 필요하다.
- **Method**: `GET`
- **URI**: `/v1/actions/:id/raw-content`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "content": "# TCP와 UDP\n\nTCP는..."
}
```

### AC-06: 좋아요 등록/취소

- **Description**: 특정 답변에 대해 사용자의 좋아요 등록 및 취소를 등록한다.
- **Method**: `POST`
- **URI**: `/v1/actions/:id/like`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "likeCount": 10,
  "liked": false
}
```

### AC-07: 좋아요 여부 조회

- **Description**: 특정 답변에 대해 사용자가 좋아요를 등록했는지 여부를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/actions/:id/like`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "likeCount": 10,
  "liked": false
}
```

### AC-08: 댓글 목록 조회

댓글 목록 조회

- **Description**: 특정 답변에 달린 댓글들을 조회한다.
- **Method**: `GET`
- **URI**: `/v1/actions/:id/comments`
- **Request**: URI 경로에 Action의 ID를 전달한다.
- **Response data**:

```
{
  "message": "Request has been processed.",
  "comments": [
    {
      "id": 1,
      "content": "이 게시물은 큰 도움이 되었습니다 ...",
      "createdAt": "2024-08-14T12:34:56Z",
      "updatedAt": "2024-08-14T12:34:56Z",
      "writer": {
        "id": 1,
        "nickname": "닉네임"
      }
    }
  ],
  "total": 15
}
```

## Upload

이 섹션은 파일 업로드 관련 API에 대한 설계이다.

| API ID | Method |           URI            | Summary             |
| :----: | :----: | :----------------------: | :------------------ |
| UP-01  |  POST  |    /v1/upload/images     | 이미지 업로드       |
| UP-02  |  POST  | /v1/upload/presigned-url | Pre-signed URL 생성 |

### UP-01: 이미지 업로드

- **Description**: 이미지 파일을 서버에 업로드한다. 업로드된 이미지의 URL을 반환한다.
- **Method**: `POST`
- **URI**: `/v1/upload/images`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}`, Content-Type: `multipart/form-data` } & Body = { image: `image file` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "url": "s3://aws.amazon.com/..."
}
```

### UP-02: Presigned URL 생성

- **Description**: S3에 직접 업로드할 수 있는 Presigned URL을 생성한다.
- **Method**: `POST`
- **URI**: `/v1/upload/presigned-url`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "key": "image.png",
  "url": "s3://aws.amazon.com/..."
}
```

## Comment

이 섹션은 댓글 관련 API에 대한 설계다.

| API ID | Method |           URI            | Summary      |
| :----: | :----: | :----------------------: | :----------- |
| CM-01  |  POST  | /v1/actions/:id/comments | 새 댓글 작성 |
| CM-02  | PATCH  |     /v1/comments/:id     | 댓글 수정    |
| CM-03  | DELETE |     /v1/comments/:id     | 댓글 삭제    |

### CM-01: 새 댓글 작성

- **Description**: 특정 답변에 새로운 댓글을 작성한다.
- **Method**: `POST`
- **URI**: `/v1/comments`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { actionId: `action's id`, content: `comment content` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "comment": {
    "id": 1,
    "content": "이 게시물은 큰 도움이 되었습니다 ...",
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "writer": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### CM-02: 댓글 수정

- **Description**: 사용자가 작성한 댓글을 수정한다.
- **Method**: `PATCH`
- **URI**: `/v1/comments/:id`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { content: `updated comment content` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "comment": {
    "id": 1,
    "content": "이 게시물은 큰 도움이 되었습니다 ...",
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "writer": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### CM-03: 댓글 삭제

- **Description**: 사용자가 작성한 댓글을 삭제한다.
- **Method**: `DELETE`
- **URI**: `/v1/comments/:id`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

## Book

이 섹션은 문제집 관련 API에 대한 설계이다.

| API ID | Method |            URI            | Summary                          |
| :----: | :----: | :-----------------------: | :------------------------------- |
|  B-01  |  GET   |         /v1/books         | 모든 문제집 조회                 |
|  B-02  |  GET   |       /v1/books/:id       | 특정 문제집 조회                 |
|  B-03  |  POST  |         /v1/books         | 새 문제집 생성                   |
|  B-04  | PATCH  |    /v1/books/:id/title    | 문제집 제목 수정                 |
|  B-05  | PATCH  | /v1/books/:id/description | 문제집 설명 수정                 |
|  B-06  | DELETE |       /v1/books/:id       | 문제집 삭제                      |
|  B-07  |  POST  |  /v1/books/:id/questions  | 문제집에 질문 추가 (스크랩)      |
|  B-08  | DELETE |  /v1/books/:id/questions  | 문제집에서 질문 삭제             |
|  B-09  |  POST  |    /v1/books/:id/like     | 문제집 좋아요 등록/취소          |
|  B-10  |  GET   |    /v1/books/:id/like     | 사용자의 문제집 좋아요 여부 조회 |
|  B-11  | PATCH  | /v1/books/:id/visibility  | 문제집 공개 범위 수정            |
|  B-12  |  GET   |  /v1/books/:id/questions  | 문제집에 저장된 질문 조회        |

### B-01: 모든 문제집 조회

- **Description**: 모든 사용자가 생성한 문제집들을 조회한다. 페이지네이션을 지원한다. 쿼리 파라미터의 기본 값은 { page=1, limit=10, sort=createdAt, order=desc }이다.
- **Method**: `GET`
- **URI**: `/v1/books`
- **Query Parameters**: page: `page number`, limit: `items per page`, sort: `createdAt` or `likeCount`, order: `asc` or `desc`, search: `searching value`
- **Request**: URI 경로를 통해 요청한다.
- **Response data**:

```
{
  "message": "Request has been processed.",
  "books": [
    {
      "id": 1,
      "visibility": "public",
      "title": "백엔드 신입 면접 대비 문제집",
      "description": "백엔드 신입 취준을 위한 문제집입니다.",
      "likeCount": 10,
      "createdAt": "2024-08-14T12:34:56Z",
      "updatedAt": "2024-08-14T12:34:56Z",
      "publisher": {
        "id": 1,
        "nickname": "닉네임"
      }
    }
  ],
  "total": 5
}
```

### B-02: 특정 문제집 조회

- **Description**: 특정 ID의 문제집의 상세 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/books/:id`
- **Request**: URI 경로를 통해 요청한다.
- **Response data**:

```
{
  "message": "Request has been processed.",
  "book": {
    "id": 1,
    "visibility": "public",
    "title": "백엔드 신입 면접 대비 문제집",
    "description": "백엔드 신입 취준을 위한 문제집입니다.",
    "likeCount": 10,
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "publisher": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### B-03: 새 문제집 생성

- **Description**: 새로운 문제집을 생성한다.
- **Method**: `POST`
- **URI**: `/v1/books`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { visibility: `"public"` or `"private"`, title: `book's title`, description: `book's description` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "book": {
    "id": 1,
    "visibility": "public",
    "title": "백엔드 신입 면접 대비 문제집",
    "description": "백엔드 신입 취준을 위한 문제집입니다.",
    "likeCount": 10,
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "publisher": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### B-04: 문제집 수정

- **Description**: 문제집을 수정한다.
- **Method**: `PATCH`
- **URI**: `/v1/books/:id/title`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & Body = { title: `book's new title`, description: `book's new description` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "book": {
    "id": 1,
    "visibility": "public",
    "title": "백엔드 신입 면접 대비 문제집",
    "description": "백엔드 신입 취준을 위한 문제집입니다.",
    "likeCount": 10,
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "publisher": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### B-05: Deprecated

### B-06: 문제집 삭제

- **Description**: 문제집을 삭제한다.
- **Method**: `DELETE`
- **URI**: `/v1/books/:id`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### B-07: 문제집에 질문 추가 (스크랩)

- **Description**: 질문을 스크랩하여 문제집에 저장한다.
- **Method**: `POST`
- **URI**: `/v1/books/:bookId/questions/:questionId`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### B-08: 문제집에서 질문 삭제

- **Description**: 문제집에서 질문을 삭제한다.
- **Method**: `DELETE`
- **URI**: `/v1/books/:bookId/questions/:questionId`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed."
}
```

### B-09: 문제집 좋아요 등록/취소

- **Description**: 문제집에 좋아요를 등록하거나 취소한다.
- **Method**: `POST`
- **URI**: `/v1/books/:id/like`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "likeCount": 10,
  "liked": false
}
```

### B-10: 사용자의 문제집 좋아요 여부 조회

- **Description**: 사용자가 문제집에 좋아요를 등록했는지 여부를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/books/:id/like`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "likeCount": 10,
  "liked": false
}
```

### B-11: 문제집 공개 범위 수정

- **Description**: 문제집의 공개 범위를 수정한다.
- **Method**: `PATCH`
- **URI**: `/v1/books/:id/visibility`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } & body = { visibility: `"public"` or `"private"` }
- **Response data**:

```
{
  "message": "Request has been processed.",
  "book": {
    "id": 1,
    "visibility": "public",
    "title": "백엔드 신입 면접 대비 문제집",
    "description": "백엔드 신입 취준을 위한 문제집입니다.",
    "likeCount": 10,
    "createdAt": "2024-08-14T12:34:56Z",
    "updatedAt": "2024-08-14T12:34:56Z",
    "publisher": {
      "id": 1,
      "nickname": "닉네임"
    }
  }
}
```

### B-12: 문제집에 저장된 질문 조회

- **Description**: 문제집에 저장된 질문들을 조회한다. 페이지네이션을 지원한다. 쿼리 파라미터의 기본 값은 { page=1, limit=10, sort=createdAt, order=desc }이다.
- **Method**: `GET`
- **URI**: `/v1/books/:id/questions`
- **Query Parameters**: page: `page number`, limit: `items per page`, sort: `createdAt` or `saved`, order: `asc` or `desc`, search: `searching value`
- **Request**:
- **Response data**:
