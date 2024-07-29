# 프로젝트 설계 메모장

서비스에 대한 메모를 아무렇게나 작성하는 메모장

## 서비스 개요

본 서비스는 CS 분야별로 전공 지식에 대한 면접 자리에서 나올 수 있는 질문과 그에 대한 답을 커뮤니티 형태로 관리하는 서비스임

네트워크 섹션, 데이터베이스 섹션, 자바스크립트 섹션처럼 어떤 '주제'들은 `Section`이란 단위로 묶이게 됨

그리고 주제별로 사용자들은 `Question`을 올릴 수 있음

질문마다 사용자들이 그에 대한 게시물 형태의 답변인 `Action`을 올리면 '댓글 수', '추천 수' 등의 기준으로 상단에 순서대로 표시되게 할 예정. 어떤 질문에 대한 답을 정해놓기보단 다른 사용자들의 답을 보면서 자신만의 답을 구성해 가는 과정을 유도하고 싶음.

다른 사용자들은 액션을 보고 댓글을 달 수도 있고, 추천을 할 수도 있음

섹션마다 자기가 유심히 공부해야 할 질문이 있다면 이를 스크랩해서 `Book`에 저장한 후 선별적으로 공부할 수 있게 하고 싶음.

## 서비스에 필요한 개체

- User: 회원
  - id: 고유 부여되는 아이디
  - email: 아이디로 사용하고 인증시킬 거임
  - password: 비밀번호로 사용하고 salt 부여해서 단방향 암호화할 거임
  - nickname: 활동할 닉네임
  - affiliation: 소속
  - position: 포지션
  - createdAt: 가입 날짜
- Section: 질문이 포함되는 CS 분야
  - id: 고유 부여되는 아이디
  - subject: 주제
  - questions: Question[]
  - createdAt: 생성 날짜
- Question: 질문
  - id: 고유 부여되는 아이디
  - writer: 작성자의 id
  - sectionId: 질문이 속한 섹션의 id
  - content: 질문 내용
  - actions: Action[]
  - createdAt: 작성 날짜
  - updatedAt: 수정 날짜
- Action: 질문에 대한 답변
  - id: 고유 부여되는 아이디
  - writer: 작성자의 id
  - questionId: 질문의 id
  - content: 답변 내용
  - createdAt: 작성 날짜
  - updatedAt: 수정 날짜
- Comment(User & Action 간 다대다 관계): 답변에 대한 댓글
  - id: 고유 부여되는 아이디
  - writer: 작성자의 아이디
  - questionId: 댓글 달린 액션 아이디
  - content: 댓글 내용
  - createdAt: 작성 날짜
  - updatedAt: 수정 날짜
- Recommendation(User & Action 간 다대다 관계): 답변에 대한 추천
  - id: 고유 부여되는 아이디
  - userId: 추천한 사람
  - actionId: 추천된 액션 아이디
  - createdAt: 생성 날짜
- Book: 질문들을 모아서 만든 문제집
  - id: 고유 부여되는 아이디
  - publisher: 문제집 생성한 사람(사용자) id
  - title: 문제집 제목
  - description: 문제집 설명
  - questions: Question[]
  - createdAt: 생성 날짜
  - updatedAt: 수정 날짜
- Library(User & Book 간 다대다 관계): 문제집 목록
  - id: 고유 부여되는 아이디
  - books: Book[]