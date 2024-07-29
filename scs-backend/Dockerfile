# 베이스 이미지 설정
FROM node:16-alpine

# 작업 디렉토리 설정
WORKDIR /usr/src/app

# 의존성 설치
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# 소스 코드 복사
COPY . .

# 기본 명령어를 sh로 설정
CMD ["sh"]
