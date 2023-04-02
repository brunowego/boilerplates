FROM docker.io/library/node:18.12.1 AS builder

RUN corepack enable pnpm

WORKDIR /app

COPY ./out/json ./out/pnpm-lock.yaml ./

RUN pnpm install

COPY ./out/full ./

RUN pnpm build


FROM builder AS pruner

ENV NODE_ENV production

RUN pnpm --filter @acme/api deploy ./pruned


FROM cgr.dev/chainguard/node:18.12

USER nobody

ARG TZ

ENV \
  NODE_ENV=production \
  TZ=$TZ

WORKDIR /app

COPY --from=builder ./app/apps/api/dist ./
COPY --from=pruner ./app/pruned/node_modules ./node_modules

EXPOSE 3000

CMD ["./main.js"]
