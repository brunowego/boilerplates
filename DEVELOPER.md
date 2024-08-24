# Developer Guide

## Locally Development

```sh
# Install dependencies
pnpm install

# Test code
pnpm test --filter @acme/api
# Watch mode
pnpm test:watch --filter @acme/api
# Test coverage
pnpm test:cov --filter @acme/api
npx serve ./apps/api/coverage/lcov-report
# Debug mode
pnpm test:debug --filter @acme/api
# E2E test
pnpm test:e2e --filter @acme/api

# Development mode
pnpm dev --filter @acme/api

# Build code
pnpm build --filter @acme/api

# Production mode
pnpm start --filter @acme/api
# Debug mode
pnpm start:debug --filter @acme/api
# Production mode
pnpm start:prod --filter @acme/api
```
