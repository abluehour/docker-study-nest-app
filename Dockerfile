# 1단계: 빌드 전용
# 소스코드를 빌드하기 위한 베이스
FROM node:24-alpine AS builder

# 작업할 디렉토리 설정
WORKDIR /app

# yarn v4 활성화
RUN npm i -g corepack
RUN corepack enable

# 의존성 파일 복사
COPY package.json yarn.lock .yarnrc.yml ./

# 의존성 설치
RUN yarn install --immutable

# 소스코드 복사
COPY . .

# 왜 환경변수를 설정하지 않을까?
# Node에서는 .env, .env.develop 아니면 환경변수를 기본적으로 읽어올 수 있어.
# NestJS > NodeJS에서 돌아감 > 빌드시 환경변수가 필요없다.

# 빌드
RUN yarn build

#######################
# 2단계: 배포 전용
# 실제 이미지에 들어갈 베이스
FROM node:24-alpine AS production

# 작업할 디렉토리 설정
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle ./drizzle
EXPOSE 3000

CMD ["node", "dist/main"]