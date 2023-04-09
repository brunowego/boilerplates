FROM docker.io/library/node:18.12.1 AS builder

RUN corepack enable pnpm

WORKDIR /app

COPY ./out/json ./out/pnpm-lock.yaml ./

RUN pnpm install

COPY ./out/full ./


FROM builder AS pruner

RUN pnpm --filter @acme/web deploy ./pruned

WORKDIR /app/pruned

RUN pnpm build


FROM cgr.dev/chainguard/node:18.12

USER nobody

ARG TZ

ENV TZ=$TZ

WORKDIR /app

COPY --from=pruner ./app/pruned/.next/standalone ./
COPY --from=pruner ./app/pruned/.next/static ./.next/static
COPY --from=pruner ./app/pruned/public ./public

EXPOSE 3000

CMD ["./server.js"]
