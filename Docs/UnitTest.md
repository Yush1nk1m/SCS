# Unit Test Documentation

이 문서는 SCS 프로젝트의 단위 테스트 설계 문서이다.

## Auth

이 섹션은 인증 관련 API에 대한 테스트 설계이다.

### AuthController

이 섹션은 인증 관련 API의 컨트롤러에 대한 단위 테스트 설계이다.

| Test ID | API ID | Method |
| :--: | :--: | :--: |
| C-A-01 | A-01 | AuthController.sendVerificationMail() |

#### [C-A-01]: AuthController.sendVerificationMail()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| C-A-01-01 | Success | 예외 발생 없이 응답에 성공한다. | 컨트롤러가 ResponseDto<null> 타입의 데이터를 반환한다. |
| C-A-01-02 | Exception occurred | 예외가 발생하여 응답에 실패한다. | 컨트롤러가 예외를 던진다. |


### AuthService

이 섹션은 인증 관련 API의 서비스에 대한 단위 테스트 설계이다.

| Test ID | API ID | Method |
| :--: | :--: | :--: |
| S-A-01 | A-01 | AuthService.sendVerificationMail() |

#### [S-A-01]: AuthService.sendVerificationMail()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| S-A-01-01 | Success | 예외 발생 없이 응답에 성공한다. | 컨트롤러가 ResponseDto<null> 타입의 데이터를 반환한다. |
| S-A-01-02 | Exception occurred | 예외가 발생하여 응답에 실패한다. | 컨트롤러가 예외를 던진다. |

### AuthRepository

이 섹션은 인증 관련 API의 리포지토리에 대한 단위 테스트 설계이다.

| Test ID | Method |
| :--: | :--: |
| R-A-01 | AuthRepository.createVerification() |