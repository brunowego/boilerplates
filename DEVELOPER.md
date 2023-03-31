# Developer Guide

## Locally Development

### Environment Variables

```sh
# Create environment variables
cp ./.env.example ./.env
```

### Installation

```sh
# Install dependencies
pnpm install
```

### Checking

```sh
# Linting
pnpm lint
```

### Running

```bash
# Development mode
pnpm dev

# Production mode
pnpm start
```

### Testing

```bash
# Unit tests
pnpm test
pnpm run test -- --watch
pnpm run test -- --coverage

# Debugger mode
pnpm test:debug

# E2E tests
TEST_ENV=e2e pnpm test
```

## Docker

### Running Container

```sh
# Run docker container
pnpm docker:run

# View docker logs
pnpm docker:logs

# Stop docker container
pnpm docker:stop
```
