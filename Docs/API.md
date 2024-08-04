# API Documentation

이 문서는 SCS 프로젝트의 API 설계 문서이다.

## Auth

이 섹션은 인증 관련 API에 대한 설계이다.

| API ID | Method | URI | Summary |
| :--: | :--: | :--: | :-- |
| A-01 | POST | /auth/v1/email/verification-code | 인증 코드 전송 |
| A-02 | POST | /auth/v1/email/verify-code | 인증 코드 검증 |
| A-03 | POST | /auth/v1/signup | 회원 가입 |
| A-04 | POST | /auth/v1/jwt/login | 로그인 |
| A-05 | POST | /auth/v1/jwt/refresh | 리프레시 |
| A-06 | POST | /auth/v1/jwt/logout | 로그아웃 |

### A-01: 인증 코드 전송

- **Description**: `A-01`로 사용자 이메일에 인증 코드를 전송하고, `A-02`로 인증 코드를 검증한 후, `A-03`으로 회원 가입을 마무리한다.
- **Method**: `POST`
- **URI**: `/auth/v1/email/verification-code`
- **Request**: Body = { email: `user email` }
- **Response data**: None

### A-02: 인증 코드 검증

- **Description**: `A-01`로 사용자 이메일에 인증 코드를 전송하고, `A-02`로 인증 코드를 검증한 후, `A-03`으로 회원 가입을 마무리한다.
- **Method**: `POST`
- **URI**: `/auth/v1/email/verify-code`
- **Request**: Body = { email: `user email`, verificationCode: `verification code` }
- **Response data**: None

### A-03: 회원 가입

- **Description**: `A-01`로 사용자 이메일에 인증 코드를 전송하고, `A-02`로 인증 코드를 검증한 후, `A-03`으로 회원 가입을 마무리한다.
- **Method**: `POST`
- **URI**: `/auth/v1/signup`
- **Request**: Body = { email: `user email`, password: `user password`, nickname: `user nickname`, affiliation: `user's affiliation`, position: `user's position in the field`, verificationCode: `verified code` }
- **Response data**: User entity with no password

### A-04: 로그인

- **Description**: 리프레시 토큰, 액세스 토큰을 사용한 JWT 기반의 방식으로 로그인한다.
- **Method**:`POST`
- **URI**: `/auth/v1/jwt/login`
- **Request**: Body = { email: `user email`, password: `user password` }
- **Response data**: { accessToken: `JWT access token`, refreshToken: `JWT refresh token` }

### A-05: 리프레시

- **Description**: 리프레시 토큰을 사용해 액세스 토큰과 리프레시 토큰을 재발급한다.
- **Method**: `POST`
- **URI**: `/auth/v1/jwt/refresh`
- **Request**: Request header = { Authorization: `Bearer ${refreshToken}` }
- **Response data**: { accessToken: `JWT access token`, refreshToken: `JWT refresh token` }

### A-06: 로그아웃

- **Description**: 데이터베이스에 저장된 리프레시 토큰 정보를 삭제한다.
- **Method**: `POST`
- **URI**: `/auth/v1/jwt/logout`
- **Request**: Request header = { Authorization: `Bearer ${accessToken}` }
- **Response data**: None
- **Precondition**: 로그인되어 있어야 한다.

### Appendix. 회원 가입 API 사용 절차

![Sequence diagram for vefirication](UML/verification.png)