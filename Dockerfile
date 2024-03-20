# STAGE: Builder
FROM node:18-alpine AS builder

WORKDIR /builder

COPY  package.json    ./
RUN npm i

COPY . /builder

# STAGE: Prod Deploy Ready Image

FROM node:18-alpine

RUN apk add --update nodejs

# RUN addgroup -S node && adduser -S node -G node
USER node

# RUN mkdir /home/app
WORKDIR /home/app

COPY  --chown=node:node package.json package-lock.json   ./

RUN npm ci --only=production

COPY --from=builder --chown=node:node /builder/backend ./backend

EXPOSE 3333 80
CMD ["node", "src/app.js"]

