FROM docker.io/library/node:18.12.1 as builder

ENV NODE_ENV production

RUN corepack enable pnpm

WORKDIR /app

COPY ./package.json ./pnpm-lock.yaml ./
COPY ./node_modules/@generated/prisma-client ./node_modules/@generated/prisma-client

RUN pnpm install --frozen-lockfile --ignore-scripts


FROM cgr.dev/chainguard/node:18.12

ENV \
  NODE_ENV=production \
  TZ=UTC

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY ./dist ./

EXPOSE 3000

CMD ["./main.js"]
