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

### Database

```sh
# Sync database schema
pnpm db:push

# Seed database
pnpm db:seed

# Run Prisma Studio
pnom db:studio
```

### Running

```bash
# Build database library
pnpm build --filter @acme/db

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

### Setup

```sh
# Turbo prune
pnpm dlx turbo prune --scope @acme/api --docker

# Remove node_modules folders
pnpm dlx npkill -d ./out

# Build image
docker build --build-arg TZ=America/Sao_Paulo -f ./nestjs.dockerfile --tag ghcr.io/acme/api:latest ./

# Run container
docker run -it --rm -p 3000:3000 --name acme-api ghcr.io/acme/api:latest
```
