# Developer Guide

## Locally Development

### Environment Variables

```sh
# Create environment variables
cp ./.example.env ./.env
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

## Docker

### Setup

```sh
#
pnpm clean

# Turbo prune
pnpm dlx turbo prune --scope @acme/web --docker

# Remove node_modules folders
pnpm dlx npkill -d ./out

# Build image
docker build \
  --build-arg TZ=America/Sao_Paulo \
  -f ./nextjs.dockerfile \
  --tag ghcr.io/acme/web:latest \
  ./

# Run container
docker run \
  -it \
  --rm \
  -p 3000:3000 \
  --name acme-web \
  ghcr.io/acme/web:latest
```
