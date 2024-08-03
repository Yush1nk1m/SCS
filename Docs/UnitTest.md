# Unit Test Documentation

이 문서는 SCS 프로젝트의 단위 테스트 설계 문서이다.

## Auth

이 섹션은 인증 관련 API에 대한 테스트 설계이다.

### AuthController

이 섹션은 인증 관련 API의 컨트롤러에 대한 단위 테스트 설계이다.

| Test ID | API ID | Method |
| :--: | :--: | :--: |
| C-A-01 | A-01 | AuthController.sendVerificationMail() |
| C-A-02 | A-02 | AuthController.verifySignupCode() |
| C-A-03 | A-03 | AuthController.signup() |

#### [C-A-01]: AuthController.sendVerificationMail()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| C-A-01-01 | Success | 예외 발생 없이 응답에 성공한다. | 컨트롤러가 성공 응답을 반환한다. |
| C-A-01-02 | Exception occurred | 예외가 발생하여 응답에 실패한다. | 컨트롤러가 예외를 던진다. |

#### [C-A-02]: AuthController.verifySignupCode()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| C-A-02-01 | Success | 예외 발생 없이 인증에 성공한다. | 컨트롤러가 성공 응답을 반환한다. |
| C-A-02-02 | Not verified | 예외는 발생하지 않았지만 응답 코드가 유효하지 않아 인증에 실패한다. | 컨트롤러가 실패 응답을 반환한다. |
| C-A-02-03 | Exception occurred | 예외가 발생하여 응답에 실패한다. | 컨트롤러가 예외를 던진다. |

#### [C-A-03]: AuthController.signup()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| C-A-03-01 | Success | 예외 발생 없이 회원 가입에 성공한다. | 컨트롤러가 성공 응답을 반환한다. |
| C-A-03-02 | Exception occurred | 예외가 발생하여 응답에 실패한다. | 컨트롤러가 예외를 던진다. |


### AuthService

이 섹션은 인증 관련 API의 서비스에 대한 단위 테스트 설계이다.

| Test ID | API ID | Method |
| :--: | :--: | :--: |
| S-A-01 | A-01 | AuthService.sendVerificationMail() |
| S-A-02 | A-02 | AuthService.verifySignupCode() |
| S-A-03 | A-03 | AuthService.signup() |

#### [S-A-01]: AuthService.sendVerificationMail()
리
| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| S-A-01-01 | Success | 예외 발생 없이 응답에 성공한다. | 컨트롤러가 ResponseDto<null> 타입의 데이터를 반환한다. |
| S-A-01-02 | Failed to find a user | 같은 이메일의 사용자가 있는지 찾는 중 예외가 발생한다. | 서비스가 예외를 던진다. |
| S-A-01-03 | User exists | 같은 이메일의 사용자가 이미 존재한다. | Conflict 예외가 발생하고 서비스가 이를 던진다. |
| S-A-01-04 | Failed to create a verification | 인증 코드를 데이터베이스에 기록하는 중 예외가 발생한다. | 서비스가 예외를 던진다. |
| S-A-01-05 | Failed to send a mail | 인증 코드 전송 중 예외가 발생한다. | 서비스가 InternalServerError 예외를 던진다. |

#### [S-A-02]: AuthService.verifySignupCode()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| S-A-02-01 | Success | 예외 발생 없이 응답에 성공한다. | 서비스가 true를 반환한다. |
| S-A-02-02 | Not found | 인증 코드가 발견되지 않았다. | 서비스가 false를 반환한다. |
| S-A-02-03 | Exception occurred while finding | 인증 코드를 찾는 중 예외가 발생한다. | 서비스는 예외를 던진다. |
| S-A-02-04 | Exception occurred while updating | 인증 여부를 갱신하는 중 예외가 발생한다. | 서비스는 예외를 던진다. |

#### [S-A-03]: AuthService.signup()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| S-A-03-01 | Success | 회원 가입에 성공한다. | 서비스는 사용자 데이터에서 비밀번호 값을 제거하고 반환한다. |
| S-A-03-02 | Exception occurred while finding | 인증 정보를 찾는 중 예외가 발생한다. | 서비스는 예외를 던진다. |
| S-A-03-03 | Not verified | 데이터베이스에 인증 정보가 존재하지 않는다. | 서비스는 Unauthorized 예외를 반환한다. |
| S-A-03-04 | Exception occurred while deleting | 인증 정보 삭제 중 예외가 발생한다. | 서비스는 예외를 던진다. |
| S-A-03-05 | Exception occurred while creating | 사용자 정보 생성 중 예외가 발생한다. | 서비스는 예외를 던진다. |

### AuthRepository

이 섹션은 인증 관련 API의 리포지토리에 대한 단위 테스트 설계이다.

| Test ID | Method |
| :--: | :--: |
| R-A-01 | AuthRepository.createVerification() |
| R-A-02 | AuthRepository.updateVerification() |
| R-A-03 | AuthRepository.findVerification() |
| R-A-04 | AuthRepository.deleteVerification() |

#### [R-A-01]: AuthRepository.createVerification()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| R-A-01-01 | Success | DB에 데이터를 저장하는 것에 성공한다. | 리포지토리는 반환 값 없이 resolve한다. |
| R-A-01-02 | Exception occurred | 예외가 발생하여 DB에 데이터를 저장하는 것에 실패한다. | 리포지토리는 예외를 던진다. |

#### [R-A-02]: AuthRepository.updateVerification()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| R-A-02-01 | Success | DB의 데이터를 업데이트하는 것에 성공한다. | 리포지토리는 반환 값 없이 resolve한다. |
| R-A-02-02 | Exception occurred | 예외가 발생하여 DB의 데이터를 업데이트하는 것에 실패한다. | 리포지토리는 예외를 던진다. |

#### [R-A-03]: AuthRepository.findVerification()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| R-A-03-01 | Success | DB에서 데이터를 조회하는 데 성공한다. | 리포지토리는 조회된 데이터를 resolve한다. |
| R-A-03-02 | Not found | DB에서 조회된 데이터가 없다. | 리포지토리는 null을 resolve한다. |
| R-A-03-03 | Exception occurred | 예외가 발생하여 DB에서 데이터를 조회하는 데 실패한다. | 리포지토리는 예외를 던진다. |

#### [R-A-04]: AuthRepository.deleteVerification()

| Test ID | Name | Summary | Expected result |
| :--: | :--: | :-- | :-- |
| R-A-04-01 | Success | DB에서 데이터를 삭제하는 데 실패한다. | 리포지토리는 반환 값 없이 resolve한다. |
| R-A-04-02 | Exception occurred | 예외가 발생하여 DB에서 데이터를 삭제하는 데 실패한다. | 리포지토리는 예외를 던진다. |