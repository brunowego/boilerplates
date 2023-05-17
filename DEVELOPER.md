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
# Run auxiliary services
pnpm compose:up

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

## Port Mapping

| Service      | Type | Address                                                          |
| ------------ | ---- | ---------------------------------------------------------------- |
| Web          | Web  | [http://127.0.0.1:8000](http://127.0.0.1:8000)                   |
| API          | REST | [http://127.0.0.1:8000/api](http://127.0.0.1:8000/api)           |
| Kong Gateway | REST | [http://127.0.0.1:8001/services](http://127.0.0.1:8001/services) |
