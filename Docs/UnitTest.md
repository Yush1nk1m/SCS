# Unit Test Documentation

이 문서는 SCS 프로젝트의 단위 테스트 설계 문서이다. 단위 테스트는 복잡한 특정 컨트롤러 로직, 전체 서비스 로직, 복잡한 리포지토리 로직에 한해 작성한다.

## AuthService

이 섹션은 인증 관련 API의 서비스에 대한 단위 테스트 설계이다.

| Test ID | API ID |               Method               |
| :-----: | :----: | :--------------------------------: |
| S-A-01  |  A-01  | AuthService.sendVerificationMail() |
| S-A-02  |  A-02  |   AuthService.verifySignupCode()   |
| S-A-03  |  A-03  |        AuthService.signup()        |
| S-A-04  |  A-04  |        AuthService.login()         |
| S-A-05  |  A-05  |   AuthService.refreshJwtTokens()   |
| S-A-06  |  A-06  |        AuthService.logout()        |

### [S-A-01]: AuthService.sendVerificationMail()

|  Test ID  |         Name          | Summary                                   | Expected result |
| :-------: | :-------------------: | :---------------------------------------- | :-------------- |
| S-A-01-01 |        Success        | 예외 발생 없이 성공한다.                  | Resolve         |
| S-A-01-02 |  Failed to send mail  | 메일 전송 중 예외가 발생한다.             | Reject with 500 |
| S-A-01-03 | Failed to create user | 인증 데이터 생성 중 예외가 발생한다.      | Reject with any |
| S-A-01-04 |   Same mail exists    | 동일한 이메일로 가입한 사용자가 존재한다. | Reject with 409 |

### [S-A-02]: AuthService.verifySignupCode()

|  Test ID  |             Name              | Summary                                | Expected result |
| :-------: | :---------------------------: | :------------------------------------- | :-------------- |
| S-A-02-01 |            Success            | 예외 없이 인증 데이터 검증에 성공한다. | Resolve         |
| S-A-02-02 | Failed to update verification | 검증 여부 갱신 중 예외가 발생한다.     | Reject with any |
| S-A-02-03 |     No verification data      | 인증 데이터가 존재하지 않는다.         | Reject with 400 |
| S-A-02-04 |  Failed to find verification  | 인증 데이터 조회 중 예외가 발생한다.   | Reject with any |

### [S-A-03]: AuthService.signup()

|  Test ID  |             Name              | Summary                              | Expected result           |
| :-------: | :---------------------------: | :----------------------------------- | :------------------------ |
| S-A-03-01 |            Success            | 예외 없이 사용자 생성에 성공한다.    | Resolve with created user |
| S-A-03-02 |     Failed to create user     | 사용자 생성 중 예외가 발생한다.      | Reject with any           |
| S-A-03-03 | Failed to delete verification | 인증 데이터 삭제 중 예외가 발생한다. | Reject with any           |
| S-A-03-04 |         Not verified          | 인증 데이터가 검증되지 않았다.       | Reject with 401           |
| S-A-03-05 |  Failed to find verification  | 인증 데이터 조회 중 예외가 발생한다. | Reject with any           |
| S-A-03-06 |        Failed to hash         | 비밀번호 해싱 중 예외가 발생한다.    | Reject with any           |
| S-A-03-07 |    Failed to generate salt    | Salt 생성 중 예외가 발생한다.        | Reject with any           |

### [S-A-04]: AuthService.login()

|  Test ID  |              Name              | Summary                                | Expected result             |
| :-------: | :----------------------------: | :------------------------------------- | :-------------------------- |
| S-A-04-01 |            Success             | 예외 없이 로그인에 성공한다.           | Resolve with created tokens |
| S-A-04-02 | Failed to update refresh token | 리프레시 토큰 갱신 중 예외가 발생한다. | Reject with any             |
| S-A-04-03 |      Failed to get tokens      | 토큰 생성 중 예외가 발생한다.          | Reject with any             |
| S-A-04-04 |   Failed to compare password   | 비밀번호 비교 중 예외가 발생한다.      | Reject with any             |
| S-A-04-05 |     Not valid information      | 사용자 정보가 유효하지 않다.           | Reject with 401             |
| S-A-04-06 |      Failed to find user       | 사용자 정보 조회 중 예외가 발생한다.   | Reject with any             |

### [S-A-05]: AuthService.refreshJwtTokens()

|  Test ID  |              Name               | Summary                                                      | Expected result               |
| :-------: | :-----------------------------: | :----------------------------------------------------------- | :---------------------------- |
| S-A-05-01 |             Success             | 예외 없이 리프레시에 성공한다.                               | Resolve with refreshed tokens |
| S-A-05-02 | Failed to update refresh token  | DB에 업데이트된 리프레시 토큰을 저장하는 중 예외가 발생한다. | Reject with any               |
| S-A-05-03 |      Failed to get tokens       | 토큰 생성 중 예외가 발생한다.                                | Reject with any               |
| S-A-05-04 | Failed to compare refresh token | 리프레시 토큰 비교 중 예외가 발생한다.                       | Reject with any               |
| S-A-05-05 |      Not valid information      | 사용자 정보가 유효하지 않다.                                 | Reject with 401               |
| S-A-05-06 |       Failed to find user       | 사용자 정보 조회 중 예외가 발생한다.                         | Reject with any               |

### [S-A-06]: AuthService.logout()

|  Test ID  |              Name              | Summary                        | Expected result |
| :-------: | :----------------------------: | :----------------------------- | :-------------- |
| S-A-06-01 |            Success             | 예외 없이 로그아웃에 성공한다. | Resolve         |
| S-A-06-02 | Failed to update refresh token | 리프레시 토큰 갱신에 실패한다. | Reject with any |

## UserService

이 섹션은 사용자 관련 API의 서비스에 대한 단위 테스트 설계이다.

| Test ID |  API ID   |               Method                |
| :-----: | :-------: | :---------------------------------: |
| S-U-01  |   U-01    |     UserService.findAllUsers()      |
| S-U-02  | U-02/U-03 |       UserService.findUser()        |
| S-U-03  |   U-04    |  UserService.changeUserPassword()   |
| S-U-04  |   U-05    |  UserService.changeUserNickname()   |
| S-U-05  |   U-06    |      UserService.deleteUser()       |
| S-U-06  |   U-07    |      UserService.getMyBooks()       |
| S-U-07  |   U-08    |     UserService.getLikedBooks()     |
| S-U-08  |   U-09    |  UserService.getUserContribution()  |
| S-U-09  |   U-10    | UserService.changeUserAffiliation() |
| S-U-10  |   U-11    |  UserService.changeUserPosition()   |

### [S-U-01]: UserService.findAllUsers()

|  Test ID  |    Name    | Summary                   | Expected result |
| :-------: | :--------: | :------------------------ | :-------------- |
| S-U-01-01 |  Success   | 모든 사용자를 조회한다.   | Resolve         |
| S-U-01-02 | Empty List | 사용자가 존재하지 않는다. | Resolve         |

### [S-U-02]: UserService.findUser()

|  Test ID  |      Name      | Summary                            | Expected result |
| :-------: | :------------: | :--------------------------------- | :-------------- |
| S-U-02-01 |    Success     | 특정 사용자를 성공적으로 조회한다. | Resolve         |
| S-U-02-02 | User Not Found | 사용자가 존재하지 않는다.          | Reject with 404 |

### [S-U-03]: UserService.changeUserPassword()

|  Test ID  |            Name            | Summary                               | Expected result |
| :-------: | :------------------------: | :------------------------------------ | :-------------- |
| S-U-03-01 |          Success           | 비밀번호를 성공적으로 변경한다.       | Resolve         |
| S-U-03-02 |   Passwords Do Not Match   | 새 비밀번호와 확인 비밀번호가 다르다. | Reject with 400 |
| S-U-03-03 |       User Not Found       | 사용자가 존재하지 않는다.             | Reject with 401 |
| S-U-03-04 | Incorrect Current Password | 현재 비밀번호가 일치하지 않는다.      | Reject with 401 |

### [S-U-04]: UserService.changeUserNickname()

|  Test ID  |      Name      | Summary                       | Expected result |
| :-------: | :------------: | :---------------------------- | :-------------- |
| S-U-04-01 |    Success     | 닉네임을 성공적으로 변경한다. | Resolve         |
| S-U-04-02 | User Not Found | 사용자가 존재하지 않는다.     | Reject with 401 |

### [S-U-05]: UserService.deleteUser()

|  Test ID  |          Name           | Summary                       | Expected result |
| :-------: | :---------------------: | :---------------------------- | :-------------- |
| S-U-05-01 |         Success         | 사용자를 성공적으로 삭제한다. | Resolve         |
| S-U-05-02 | Invalid Confirm Message | 확인 메시지가 올바르지 않다.  | Reject with 400 |
| S-U-05-03 |     User Not Found      | 사용자가 존재하지 않는다.     | Reject with 401 |
| S-U-05-04 |   Incorrect Password    | 비밀번호가 일치하지 않는다.   | Reject with 401 |

### [S-U-06]: UserService.getMyBooks()

|  Test ID  |      Name      | Summary                                | Expected result |
| :-------: | :------------: | :------------------------------------- | :-------------- |
| S-U-06-01 |    Success     | 사용자의 문제집을 성공적으로 조회한다. | Resolve         |
| S-U-06-02 | User Not Found | 사용자가 존재하지 않는다.              | Reject with 401 |
| S-U-06-03 |    No Books    | 사용자가 생성한 문제집이 없다.         | Resolve         |

### [S-U-07]: UserService.getLikedBooks()

|  Test ID  |      Name      | Summary                                         | Expected result |
| :-------: | :------------: | :---------------------------------------------- | :-------------- |
| S-U-07-01 |    Success     | 사용자가 좋아요한 문제집을 성공적으로 조회한다. | Resolve         |
| S-U-07-02 | User Not Found | 사용자가 존재하지 않는다.                       | Reject with 401 |
| S-U-07-03 | No Liked Books | 사용자가 좋아요한 문제집이 없다.                | Resolve         |

### [S-U-08]: UserService.getUserContribution()

|  Test ID  |       Name       | Summary                                | Expected result |
| :-------: | :--------------: | :------------------------------------- | :-------------- |
| S-U-08-01 |     Success      | 사용자의 기여도를 성공적으로 조회한다. | Resolve         |
| S-U-08-02 |   Invalid Type   | 유효하지 않은 기여도 타입이다.         | Reject with any |
| S-U-08-03 | No Contributions | 사용자의 기여도가 없다.                | Resolve         |

### [S-U-09]: UserService.changeUserAffiliation()

|  Test ID  |      Name      | Summary                              | Expected result |
| :-------: | :------------: | :----------------------------------- | :-------------- |
| S-U-09-01 |    Success     | 사용자의 소속을 성공적으로 변경한다. | Resolve         |
| S-U-09-02 | User Not Found | 사용자가 존재하지 않는다.            | Reject with 401 |

### [S-U-10]: UserService.changeUserPosition()

|  Test ID  |      Name      | Summary                                | Expected result |
| :-------: | :------------: | :------------------------------------- | :-------------- |
| S-U-10-01 |    Success     | 사용자의 포지션을 성공적으로 변경한다. | Resolve         |
| S-U-10-02 | User Not Found | 사용자가 존재하지 않는다.              | Reject with 401 |

## SectionService

이 섹션은 섹션 관련 API의 서비스에 대한 단위 테스트 설계이다.

| Test ID | API ID |                  Method                   |
| :-----: | :----: | :---------------------------------------: |
| S-S-01  |  S-01  |      SectionService.getAllSections()      |
| S-S-02  |  S-02  |    SectionService.getSpecificSection()    |
| S-S-03  |  S-03  |      SectionService.createSection()       |
| S-S-04  |  S-04  |   SectionService.updateSectionSubject()   |
| S-S-05  |  S-05  | SectionService.updateSectionDescription() |
| S-S-06  |  S-06  |      SectionService.deleteSection()       |
| S-S-07  |  S-07  |  SectionService.getQuestionsBySection()   |

### [S-S-01]: SectionService.getAllSections()

|  Test ID  |          Name           | Summary                          | Expected result |
| :-------: | :---------------------: | :------------------------------- | :-------------- |
| S-S-01-01 |         Success         | 모든 섹션을 성공적으로 조회한다. | Resolve         |
| S-S-01-02 |       Empty List        | 섹션이 존재하지 않는다.          | Resolve         |
| S-S-01-03 | Failed to find sections | 섹션 조회 중 예외가 발생한다.    | Reject with any |

### [S-S-02]: SectionService.getSpecificSection()

|  Test ID  |       Name        | Summary                          | Expected result |
| :-------: | :---------------: | :------------------------------- | :-------------- |
| S-S-02-01 |      Success      | 특정 섹션을 성공적으로 조회한다. | Resolve         |
| S-S-02-02 | Section Not Found | 섹션이 존재하지 않는다.          | Reject with 404 |

### [S-S-03]: SectionService.createSection()

|  Test ID  |      Name      | Summary                        | Expected result |
| :-------: | :------------: | :----------------------------- | :-------------- |
| S-S-03-01 |    Success     | 새 섹션을 성공적으로 생성한다. | Resolve         |
| S-S-03-02 | User Not Found | 사용자가 존재하지 않는다.      | Reject with 401 |
| S-S-03-03 | Invalid Input  | 유효하지 않은 입력 데이터.     | Reject with 400 |

### [S-S-04]: SectionService.updateSectionSubject()

|  Test ID  |       Name        | Summary                          | Expected result |
| :-------: | :---------------: | :------------------------------- | :-------------- |
| S-S-04-01 |      Success      | 섹션 주제를 성공적으로 수정한다. | Resolve         |
| S-S-04-02 | Section Not Found | 섹션이 존재하지 않는다.          | Reject with 404 |
| S-S-04-03 |  Invalid Subject  | 유효하지 않은 주제.              | Reject with 400 |

### [S-S-05]: SectionService.updateSectionDescription()

|  Test ID  |        Name         | Summary                          | Expected result |
| :-------: | :-----------------: | :------------------------------- | :-------------- |
| S-S-05-01 |       Success       | 섹션 설명을 성공적으로 수정한다. | Resolve         |
| S-S-05-02 |  Section Not Found  | 섹션이 존재하지 않는다.          | Reject with 404 |
| S-S-05-03 | Invalid Description | 유효하지 않은 설명.              | Reject with 400 |

### [S-S-06]: SectionService.deleteSection()

|  Test ID  |       Name        | Summary                     | Expected result |
| :-------: | :---------------: | :-------------------------- | :-------------- |
| S-S-06-01 |      Success      | 섹션을 성공적으로 삭제한다. | Resolve         |
| S-S-06-02 | Section Not Found | 섹션이 존재하지 않는다.     | Reject with 404 |

### [S-S-07]: SectionService.getQuestionsBySection()

|  Test ID  |       Name        | Summary                                   | Expected result |
| :-------: | :---------------: | :---------------------------------------- | :-------------- |
| S-S-07-01 |      Success      | 특정 섹션의 질문들을 성공적으로 조회한다. | Resolve         |
| S-S-07-02 | Section Not Found | 섹션이 존재하지 않는다.                   | Reject with 404 |
| S-S-07-03 |   No Questions    | 해당 섹션에 질문이 없다.                  | Resolve         |

## QuestionService

이 섹션은 질문 관련 API의 서비스에 대한 단위 테스트 설계이다.

| Test ID | API ID |                 Method                  |
| :-----: | :----: | :-------------------------------------: |
| S-Q-01  |  Q-01  |  QuestionService.getSpecificQuestion()  |
| S-Q-02  |  Q-02  |    QuestionService.createQuestion()     |
| S-Q-03  |  Q-03  | QuestionService.updateQuestionContent() |
| S-Q-04  |  Q-04  |    QuestionService.deleteQuestion()     |
| S-Q-05  |  Q-05  | QuestionService.getActionsByQuestion()  |

### [S-Q-01]: QuestionService.getSpecificQuestion()

|  Test ID  |        Name        | Summary                          | Expected result |
| :-------: | :----------------: | :------------------------------- | :-------------- |
| S-Q-01-01 |      Success       | 특정 질문을 성공적으로 조회한다. | Resolve         |
| S-Q-01-02 | Question Not Found | 질문이 존재하지 않는다.          | Reject with 404 |

### [S-Q-02]: QuestionService.createQuestion()

|  Test ID  |       Name        | Summary                        | Expected result |
| :-------: | :---------------: | :----------------------------- | :-------------- |
| S-Q-02-01 |      Success      | 새 질문을 성공적으로 생성한다. | Resolve         |
| S-Q-02-02 |  User Not Found   | 사용자가 존재하지 않는다.      | Reject with 401 |
| S-Q-02-03 | Section Not Found | 섹션이 존재하지 않는다.        | Reject with 404 |
| S-Q-02-04 |   Invalid Input   | 유효하지 않은 입력 데이터.     | Reject with 400 |

### [S-Q-03]: QuestionService.updateQuestionContent()

|  Test ID  |        Name        | Summary                          | Expected result |
| :-------: | :----------------: | :------------------------------- | :-------------- |
| S-Q-03-01 |      Success       | 질문 내용을 성공적으로 수정한다. | Resolve         |
| S-Q-03-02 | Question Not Found | 질문이 존재하지 않는다.          | Reject with 404 |
| S-Q-03-03 |  Invalid Content   | 유효하지 않은 질문 내용.         | Reject with 400 |

### [S-Q-04]: QuestionService.deleteQuestion()

|  Test ID  |        Name        | Summary                     | Expected result |
| :-------: | :----------------: | :-------------------------- | :-------------- |
| S-Q-04-01 |      Success       | 질문을 성공적으로 삭제한다. | Resolve         |
| S-Q-04-02 | Question Not Found | 질문이 존재하지 않는다.     | Reject with 404 |

### [S-Q-05]: QuestionService.getActionsByQuestion()

|  Test ID  |        Name        | Summary                                   | Expected result |
| :-------: | :----------------: | :---------------------------------------- | :-------------- |
| S-Q-05-01 |      Success       | 특정 질문의 답변들을 성공적으로 조회한다. | Resolve         |
| S-Q-05-02 | Question Not Found | 질문이 존재하지 않는다.                   | Reject with 404 |
| S-Q-05-03 |     No Actions     | 해당 질문에 답변이 없다.                  | Resolve         |

## ActionService

이 섹션은 액션 관련 API의 서비스에 대한 단위 테스트 설계이다.

| Test ID | API ID |              Method               |
| :-----: | :----: | :-------------------------------: |
| S-AC-01 | AC-01  | ActionService.getSpecificAction() |
| S-AC-02 | AC-02  |   ActionService.createAction()    |
| S-AC-03 | AC-03  |   ActionService.updateAction()    |
| S-AC-04 | AC-04  |   ActionService.deleteAction()    |
| S-AC-05 | AC-05  |   ActionService.getRawContent()   |
| S-AC-06 | AC-06  |    ActionService.toggleLike()     |
| S-AC-07 | AC-07  |      ActionService.getLike()      |
| S-AC-08 | AC-08  |    ActionService.getComments()    |

### [S-AC-01]: ActionService.getSpecificAction()

|  Test ID   |       Name       | Summary                          | Expected result |
| :--------: | :--------------: | :------------------------------- | :-------------- |
| S-AC-01-01 |     Success      | 특정 답변을 성공적으로 조회한다. | Resolve         |
| S-AC-01-02 | Action Not Found | 답변이 존재하지 않는다.          | Reject with 404 |

### [S-AC-02]: ActionService.createAction()

|  Test ID   |        Name        | Summary                        | Expected result |
| :--------: | :----------------: | :----------------------------- | :-------------- |
| S-AC-02-01 |      Success       | 새 답변을 성공적으로 생성한다. | Resolve         |
| S-AC-02-02 |   User Not Found   | 사용자가 존재하지 않는다.      | Reject with 401 |
| S-AC-02-03 | Question Not Found | 질문이 존재하지 않는다.        | Reject with 404 |
| S-AC-02-04 |   Invalid Input    | 유효하지 않은 입력 데이터.     | Reject with 400 |

### [S-AC-03]: ActionService.updateAction()

|  Test ID   |        Name         | Summary                     | Expected result |
| :--------: | :-----------------: | :-------------------------- | :-------------- |
| S-AC-03-01 |       Success       | 답변을 성공적으로 수정한다. | Resolve         |
| S-AC-03-02 |  Action Not Found   | 답변이 존재하지 않는다.     | Reject with 404 |
| S-AC-03-03 | User Not Authorized | 사용자에게 권한이 없다.     | Reject with 403 |
| S-AC-03-04 |    Invalid Input    | 유효하지 않은 입력 데이터.  | Reject with 400 |

### [S-AC-04]: ActionService.deleteAction()

|  Test ID   |        Name         | Summary                     | Expected result |
| :--------: | :-----------------: | :-------------------------- | :-------------- |
| S-AC-04-01 |       Success       | 답변을 성공적으로 삭제한다. | Resolve         |
| S-AC-04-02 |  Action Not Found   | 답변이 존재하지 않는다.     | Reject with 404 |
| S-AC-04-03 | User Not Authorized | 사용자에게 권한이 없다.     | Reject with 403 |

### [S-AC-05]: ActionService.getRawContent()

|  Test ID   |        Name         | Summary                           | Expected result |
| :--------: | :-----------------: | :-------------------------------- | :-------------- |
| S-AC-05-01 |       Success       | Raw 컨텐츠를 성공적으로 가져온다. | Resolve         |
| S-AC-05-02 |  Action Not Found   | 답변이 존재하지 않는다.           | Reject with 404 |
| S-AC-05-03 | User Not Authorized | 사용자에게 권한이 없다.           | Reject with 403 |

### [S-AC-06]: ActionService.toggleLike()

|  Test ID   |       Name       | Summary                       | Expected result |
| :--------: | :--------------: | :---------------------------- | :-------------- |
| S-AC-06-01 |  Success - Like  | 좋아요를 성공적으로 등록한다. | Resolve         |
| S-AC-06-02 | Success - Unlike | 좋아요를 성공적으로 취소한다. | Resolve         |
| S-AC-06-03 |  User Not Found  | 사용자가 존재하지 않는다.     | Reject with 401 |
| S-AC-06-04 | Action Not Found | 답변이 존재하지 않는다.       | Reject with 404 |

### [S-AC-07]: ActionService.getLike()

|  Test ID   |        Name         | Summary                                           | Expected result |
| :--------: | :-----------------: | :------------------------------------------------ | :-------------- |
| S-AC-07-01 |   Success - Liked   | 좋아요 상태를 성공적으로 조회한다 (좋아요 함).    | Resolve         |
| S-AC-07-02 | Success - Not Liked | 좋아요 상태를 성공적으로 조회한다 (좋아요 안 함). | Resolve         |
| S-AC-07-03 |   User Not Found    | 사용자가 존재하지 않는다.                         | Reject with 401 |
| S-AC-07-04 |  Action Not Found   | 답변이 존재하지 않는다.                           | Reject with 404 |

### [S-AC-08]: ActionService.getComments()

|  Test ID   |         Name         | Summary                                      | Expected result |
| :--------: | :------------------: | :------------------------------------------- | :-------------- |
| S-AC-08-01 |       Success        | 답변의 댓글들을 성공적으로 조회한다.         | Resolve         |
| S-AC-08-02 |   Action Not Found   | 답변이 존재하지 않는다.                      | Reject with 404 |
| S-AC-08-03 |     No Comments      | 해당 답변에 댓글이 없다.                     | Resolve         |
| S-AC-08-04 |      Pagination      | 페이지네이션이 올바르게 동작한다.            | Resolve         |
| S-AC-08-05 | Sort by Created Date | 생성일 기준으로 정렬된 댓글 목록을 반환한다. | Resolve         |

## CommentService

이 섹션은 댓글 관련 API의 서비스에 대한 단위 테스트 설계이다.

| Test ID | API ID |             Method             |
| :-----: | :----: | :----------------------------: |
| S-CM-01 | CM-01  | CommentService.createComment() |
| S-CM-02 | CM-02  | CommentService.updateComment() |
| S-CM-03 | CM-03  | CommentService.deleteComment() |

### [S-CM-01]: CommentService.createComment()

|  Test ID   |       Name       | Summary                        | Expected result |
| :--------: | :--------------: | :----------------------------- | :-------------- |
| S-CM-01-01 |     Success      | 새 댓글을 성공적으로 생성한다. | Resolve         |
| S-CM-01-02 |  User Not Found  | 사용자가 존재하지 않는다.      | Reject with 401 |
| S-CM-01-03 | Action Not Found | 답변이 존재하지 않는다.        | Reject with 404 |
| S-CM-01-04 |  Invalid Input   | 유효하지 않은 입력 데이터.     | Reject with 400 |

### [S-CM-02]: CommentService.updateComment()

|  Test ID   |        Name         | Summary                     | Expected result |
| :--------: | :-----------------: | :-------------------------- | :-------------- |
| S-CM-02-01 |       Success       | 댓글을 성공적으로 수정한다. | Resolve         |
| S-CM-02-02 |  Comment Not Found  | 댓글이 존재하지 않는다.     | Reject with 404 |
| S-CM-02-03 | User Not Authorized | 사용자에게 권한이 없다.     | Reject with 403 |
| S-CM-02-04 |    Invalid Input    | 유효하지 않은 입력 데이터.  | Reject with 400 |

### [S-CM-03]: CommentService.deleteComment()

|  Test ID   |        Name         | Summary                     | Expected result |
| :--------: | :-----------------: | :-------------------------- | :-------------- |
| S-CM-03-01 |       Success       | 댓글을 성공적으로 삭제한다. | Resolve         |
| S-CM-03-02 |  Comment Not Found  | 댓글이 존재하지 않는다.     | Reject with 404 |
| S-CM-03-03 | User Not Authorized | 사용자에게 권한이 없다.     | Reject with 403 |

## BookService

이 섹션은 문제집 관련 API의 서비스에 대한 단위 테스트 설계이다.

| Test ID | API ID |               Method               |
| :-----: | :----: | :--------------------------------: |
| S-B-01  |  B-01  |       BookService.getBooks()       |
| S-B-02  |  B-02  |       BookService.getBook()        |
| S-B-03  |  B-03  |      BookService.createBook()      |
| S-B-04  |  B-04  |      BookService.updateBook()      |
| S-B-06  |  B-06  |      BookService.deleteBook()      |
| S-B-07  |  B-07  |     BookService.saveQuestion()     |
| S-B-08  |  B-08  |    BookService.deleteQuestion()    |
| S-B-09  |  B-09  |      BookService.toggleLike()      |
| S-B-10  |  B-10  |       BookService.getLike()        |
| S-B-11  |  B-11  | BookService.updateBookVisibility() |
| S-B-12  |  B-12  |  BookService.getQuestionsOfBook()  |

### [S-B-01]: BookService.getBooks()

|  Test ID  |         Name         | Summary                                    | Expected result |
| :-------: | :------------------: | :----------------------------------------- | :-------------- |
| S-B-01-01 |       Success        | 모든 문제집을 성공적으로 조회한다.         | Resolve         |
| S-B-01-02 |       No Books       | 문제집이 존재하지 않는다.                  | Resolve         |
| S-B-01-03 |      Pagination      | 페이지네이션이 올바르게 동작한다.          | Resolve         |
| S-B-01-04 | Sort by Created Date | 생성일 기준으로 정렬된 목록을 반환한다.    | Resolve         |
| S-B-01-05 |  Sort by Like Count  | 좋아요 수 기준으로 정렬된 목록을 반환한다. | Resolve         |
| S-B-01-06 |        Search        | 검색어에 맞는 문제집들을 반환한다.         | Resolve         |

### [S-B-02]: BookService.getBook()

|  Test ID  |      Name      | Summary                            | Expected result |
| :-------: | :------------: | :--------------------------------- | :-------------- |
| S-B-02-01 |    Success     | 특정 문제집을 성공적으로 조회한다. | Resolve         |
| S-B-02-02 | Book Not Found | 문제집이 존재하지 않는다.          | Reject with 404 |

### [S-B-03]: BookService.createBook()

|  Test ID  |      Name      | Summary                          | Expected result |
| :-------: | :------------: | :------------------------------- | :-------------- |
| S-B-03-01 |    Success     | 새 문제집을 성공적으로 생성한다. | Resolve         |
| S-B-03-02 | User Not Found | 사용자가 존재하지 않는다.        | Reject with 401 |
| S-B-03-03 | Invalid Input  | 유효하지 않은 입력 데이터.       | Reject with 400 |

### [S-B-04]: BookService.updateBook()

|  Test ID  |        Name         | Summary                       | Expected result |
| :-------: | :-----------------: | :---------------------------- | :-------------- |
| S-B-04-01 |       Success       | 문제집을 성공적으로 수정한다. | Resolve         |
| S-B-04-02 |   Book Not Found    | 문제집이 존재하지 않는다.     | Reject with 404 |
| S-B-04-03 | User Not Authorized | 사용자에게 권한이 없다.       | Reject with 403 |
| S-B-04-04 |    Invalid Input    | 유효하지 않은 입력 데이터.    | Reject with 400 |

### [S-B-06]: BookService.deleteBook()

|  Test ID  |        Name         | Summary                       | Expected result |
| :-------: | :-----------------: | :---------------------------- | :-------------- |
| S-B-06-01 |       Success       | 문제집을 성공적으로 삭제한다. | Resolve         |
| S-B-06-02 |   Book Not Found    | 문제집이 존재하지 않는다.     | Reject with 404 |
| S-B-06-03 | User Not Authorized | 사용자에게 권한이 없다.       | Reject with 403 |

### [S-B-07]: BookService.saveQuestion()

|  Test ID  |        Name         | Summary                              | Expected result |
| :-------: | :-----------------: | :----------------------------------- | :-------------- |
| S-B-07-01 |       Success       | 질문을 문제집에 성공적으로 저장한다. | Resolve         |
| S-B-07-02 |   Book Not Found    | 문제집이 존재하지 않는다.            | Reject with 404 |
| S-B-07-03 | Question Not Found  | 질문이 존재하지 않는다.              | Reject with 404 |
| S-B-07-04 | User Not Authorized | 사용자에게 권한이 없다.              | Reject with 403 |
| S-B-07-05 |   Question Exists   | 질문이 이미 문제집에 존재한다.       | Reject with 409 |

### [S-B-08]: BookService.deleteQuestion()

|  Test ID  |         Name         | Summary                                | Expected result |
| :-------: | :------------------: | :------------------------------------- | :-------------- |
| S-B-08-01 |       Success        | 질문을 문제집에서 성공적으로 삭제한다. | Resolve         |
| S-B-08-02 |    Book Not Found    | 문제집이 존재하지 않는다.              | Reject with 404 |
| S-B-08-03 |  Question Not Found  | 질문이 존재하지 않는다.                | Reject with 404 |
| S-B-08-04 | User Not Authorized  | 사용자에게 권한이 없다.                | Reject with 403 |
| S-B-08-05 | Question Not In Book | 질문이 문제집에 존재하지 않는다.       | Reject with 409 |

### [S-B-09]: BookService.toggleLike()

|  Test ID  |       Name       | Summary                       | Expected result |
| :-------: | :--------------: | :---------------------------- | :-------------- |
| S-B-09-01 |  Success - Like  | 좋아요를 성공적으로 등록한다. | Resolve         |
| S-B-09-02 | Success - Unlike | 좋아요를 성공적으로 취소한다. | Resolve         |
| S-B-09-03 |  User Not Found  | 사용자가 존재하지 않는다.     | Reject with 401 |
| S-B-09-04 |  Book Not Found  | 문제집이 존재하지 않는다.     | Reject with 404 |

### [S-B-10]: BookService.getLike()

|  Test ID  |        Name         | Summary                                           | Expected result |
| :-------: | :-----------------: | :------------------------------------------------ | :-------------- |
| S-B-10-01 |   Success - Liked   | 좋아요 상태를 성공적으로 조회한다 (좋아요 함).    | Resolve         |
| S-B-10-02 | Success - Not Liked | 좋아요 상태를 성공적으로 조회한다 (좋아요 안 함). | Resolve         |
| S-B-10-03 |   User Not Found    | 사용자가 존재하지 않는다.                         | Reject with 401 |
| S-B-10-04 |   Book Not Found    | 문제집이 존재하지 않는다.                         | Reject with 404 |

### [S-B-11]: BookService.updateBookVisibility()

|  Test ID  |        Name         | Summary                                 | Expected result |
| :-------: | :-----------------: | :-------------------------------------- | :-------------- |
| S-B-11-01 |       Success       | 문제집 공개 범위를 성공적으로 수정한다. | Resolve         |
| S-B-11-02 |   Book Not Found    | 문제집이 존재하지 않는다.               | Reject with 404 |
| S-B-11-03 | User Not Authorized | 사용자에게 권한이 없다.                 | Reject with 403 |
| S-B-11-04 | Invalid Visibility  | 유효하지 않은 공개 범위 값.             | Reject with 400 |

### [S-B-12]: BookService.getQuestionsOfBook()

|  Test ID  |         Name         | Summary                                         | Expected result |
| :-------: | :------------------: | :---------------------------------------------- | :-------------- |
| S-B-12-01 |       Success        | 문제집의 질문들을 성공적으로 조회한다.          | Resolve         |
| S-B-12-02 |    Book Not Found    | 문제집이 존재하지 않는다.                       | Reject with 404 |
| S-B-12-03 |     No Questions     | 문제집에 질문이 없다.                           | Resolve         |
| S-B-12-04 |      Pagination      | 페이지네이션이 올바르게 동작한다.               | Resolve         |
| S-B-12-05 | Sort by Created Date | 생성일 기준으로 정렬된 질문 목록을 반환한다.    | Resolve         |
| S-B-12-06 | Sort by Saved Count  | 저장 횟수 기준으로 정렬된 질문 목록을 반환한다. | Resolve         |
| S-B-12-07 |        Search        | 검색어에 맞는 질문들을 반환한다.                | Resolve         |

## UploadService

이 섹션은 업로드 관련 API의 서비스에 대한 단위 테스트 설계이다.

| Test ID | API ID |             Method              |
| :-----: | :----: | :-----------------------------: |
| S-UP-01 | UP-01  |   UploadService.uploadImage()   |
| S-UP-02 | UP-02  | UploadService.getPresignedUrl() |

### [S-UP-01]: UploadService.uploadImage()

|  Test ID   |       Name        | Summary                         | Expected result |
| :--------: | :---------------: | :------------------------------ | :-------------- |
| S-UP-01-01 |      Success      | 이미지를 성공적으로 업로드한다. | Resolve         |
| S-UP-01-02 |  User Not Found   | 사용자가 존재하지 않는다.       | Reject with 401 |
| S-UP-01-03 |   Invalid File    | 유효하지 않은 파일 형식.        | Reject with 400 |
| S-UP-01-04 | S3 Upload Failure | S3 업로드 중 오류가 발생한다.   | Reject with 500 |

### [S-UP-02]: UploadService.getPresignedUrl()

|  Test ID   |    Name     | Summary                              | Expected result |
| :--------: | :---------: | :----------------------------------- | :-------------- |
| S-UP-02-01 |   Success   | Presigned URL을 성공적으로 생성한다. | Resolve         |
| S-UP-02-02 | Invalid Key | 유효하지 않은 키 값.                 | Reject with 400 |
| S-UP-02-03 |  S3 Error   | S3 관련 오류가 발생한다.             | Reject with 500 |
