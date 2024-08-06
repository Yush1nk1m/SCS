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
- **Response data**: None

### A-02: 인증 코드 검증

- **Description**: `A-01`로 사용자 이메일에 인증 코드를 전송하고, `A-02`로 인증 코드를 검증한 후, `A-03`으로 회원 가입을 마무리한다.
- **Method**: `POST`
- **URI**: `/v1/auth/email/verify-code`
- **Request**: Body = { email: `user email`, verificationCode: `verification code` }
- **Response data**: None

### A-03: 회원 가입

- **Description**: `A-01`로 사용자 이메일에 인증 코드를 전송하고, `A-02`로 인증 코드를 검증한 후, `A-03`으로 회원 가입을 마무리한다.
- **Method**: `POST`
- **URI**: `/v1/auth/signup`
- **Request**: Body = { email: `user email`, password: `user password`, nickname: `user nickname`, affiliation: `user's affiliation`, position: `user's position in the field`, verificationCode: `verified code` }
- **Response data**: User entity with no password

### A-04: 로그인

- **Description**: 리프레시 토큰, 액세스 토큰을 사용한 JWT 기반의 방식으로 로그인한다.
- **Method**:`POST`
- **URI**: `/v1/auth/jwt/login`
- **Request**: Body = { email: `user email`, password: `user password` }
- **Response data**: { accessToken: `JWT access token`, refreshToken: `JWT refresh token` }

### A-05: 리프레시

- **Description**: 리프레시 토큰을 사용해 액세스 토큰과 리프레시 토큰을 재발급한다.
- **Method**: `POST`
- **URI**: `/v1/auth/jwt/refresh`
- **Request**: Request header = { Authorization: `Bearer ${refreshToken}` }
- **Response data**: { accessToken: `JWT access token`, refreshToken: `JWT refresh token` }

### A-06: 로그아웃

- **Description**: 데이터베이스에 저장된 리프레시 토큰 정보를 삭제한다.
- **Method**: `POST`
- **URI**: `/v1/auth/jwt/logout`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**: None

### Appendix. 회원 가입 API 사용 절차

![Sequence diagram for vefirication](UML/verification.png)

### Appendix. 사용자 인증 API 사용 절차

![Sequence diagram for login](UML/jwt-login.png)

![Sequence diagram for refresh](UML/jwt-refresh.png)

![Sequence diagram for logout](UML/jwt-logout.png)

## User

이 섹션은 사용자 관련 API에 대한 설계이다.

| API ID | Method |      URI      | Summary                   |
| :----: | :----: | :-----------: | :------------------------ |
|  U-01  |  GET   |   /v1/users   | 모든 사용자 정보 조회     |
|  U-02  |  GET   | /v1/users/:id | 특정 사용자 정보 조회     |
|  U-03  |  GET   | /v1/users/me  | 로그인한 사용자 정보 조회 |
|  U-04  | PATCH  |   /v1/users   | 로그인한 사용자 정보 변경 |
|  U-05  | DELETE |   /v1/users   | 로그인한 사용자 회원 탈퇴 |

### U-01: 모든 사용자 정보 조회

- **Description**: 모든 사용자의 기본적인 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/users`
- **Request**: None
- **Response data**: [ { id: `user's id`, email: `user's email`, nickname: `user's nickname`, affiliation: `user's affiliation`, position: `position` }, { ... }, ... ]

### U-02: 특정 사용자 정보 조회

- **Description**: 특정 사용자의 기본적인 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/users/:id`
- **Request**: URI 경로에 사용자의 ID를 전달한다.
- **Response data**: { id: `user's id`, email: `user's email`, nickname: `user's nickname`, affiliation: `user's affiliation`, position: `position` }

### U-03: 로그인한 사용자 정보 조회

- **Description**: 로그인한 사용자의 기본적인 정보를 조회한다.
- **Method**: `GET`
- **URI**: `/v1/users/me`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**: { id: `user's id`, email: `user's email`, nickname: `user's nickname`, affiliation: `user's affiliation`, position: `position` }

### U-04: 로그인한 사용자 정보 변경

- **Description**: 로그인한 사용자의 기본적인 정보를 변경한다.
- **Method**: `PATCH`
- **URI**: `/v1/users`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } &
- **Response data**:

### U-05: 로그인한 사용자 회원 탈퇴

- **Description**: 로그인한 사용자의 정보를 삭제한다.
- **Method**: `DELETE`
- **URI**: `/v1/users`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` } &
- **Response data**:
