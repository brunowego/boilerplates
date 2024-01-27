FROM oven/bun:alpine AS bun


FROM bun AS builder

WORKDIR /app

COPY ./ ./

RUN bun install --production

RUN bunx turbo run build --filter @acme/api


FROM bun AS runner

WORKDIR /app

COPY --from=builder /app/services/api/server ./

EXPOSE 3000

CMD ["/server"]
