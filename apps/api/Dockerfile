FROM docker.io/library/node:18.12.1 AS builder

ENV NODE_ENV production

RUN corepack enable pnpm

WORKDIR /app

COPY ./package.json ./

RUN pnpm install


FROM cgr.dev/chainguard/node:18.12

USER nobody

ENV \
  NODE_ENV=production \
  TZ=UTC

WORKDIR /app

COPY ./dist ./

COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["./main.js"]
