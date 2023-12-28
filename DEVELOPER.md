# Developer Guide

## Locally Development

```sh
# Install dependencies
pnpm install

# Lint code
pnpm lint --filter api

# Test code
pnpm test --filter api
# Watch mode
pnpm test:watch --filter api
# Test coverage
pnpm test:cov --filter api
npx serve ./apps/api/coverage/lcov-report
# Debug mode
pnpm test:debug --filter api
# E2E test
pnpm test:e2e --filter api

# Development mode
pnpm dev --filter api

# Build code
pnpm build --filter api

# Production mode
pnpm start --filter api
# Debug mode
pnpm start:debug --filter api
# Production mode
pnpm start:prod --filter api
```
