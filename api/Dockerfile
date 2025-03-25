FROM node:21-alpine AS dependencies
WORKDIR /app
COPY package*.json ./
RUN yarn install

FROM node:21-alpine AS build
WORKDIR /app
COPY --from=dependencies /app/node_modules ./node_modules
COPY prisma ./prisma/
COPY . .
RUN apk add --no-cache openssl3 

ARG VERSION="docker-nidoran"
RUN yarn prisma generate && yarn build

FROM node:21-alpine AS deploy
WORKDIR /app
RUN apk update 
ENV NODE_ENV production

FROM node:21-alpine AS server
COPY --from=build /app/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist

EXPOSE 3333

CMD ["yarn", "start:prod"]
