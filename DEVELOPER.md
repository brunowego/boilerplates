# Developer Guide

## Locally Development

### Environment Variables

```sh
#
cp ./.env.example ./.env
```

### Installation

```sh
#
pnpm install
```

### Running

```bash
#
pnpm run dev
pnpm run dev:debug

#
pnpm run build

#
pnpm run start
pnpm run start:prod
```

### Testing

```bash
#
pnpm run test
pnpm run test:watch
pnpm run test:cov
pnpm run test:debug
pnpm run test:e2e
```

### Docs

```sh
pnpm run compodoc:serve
```

## Docker

### Build and Run

```sh
#
docker build \
  --tag ghcr.io/brunowego/nestjs-base:latest \
  ./

#
docker run \
  -d \
  --rm \
  -p 3000:3000 \
  --name nestjs-base \
  ghcr.io/brunowego/nestjs-base:latest

#
docker stop nestjs-base
```
