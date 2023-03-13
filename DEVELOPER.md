# Developer Guide

## Host Development

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
pnpm compose:up

#
pnpm db:push

#
pnpm db:reset
pnpm db:seed

#
pnpm dev
pnpm dev:debug
```

### Building

```sh
#
pnpm build

#
pnpm start
pnpm start:prod
```

### Testing

```bash
#
pnpm test
pnpm test:watch
pnpm test:cov
pnpm test:debug
pnpm test:e2e
```

## Docker

### Build and Run

```sh
#
pnpm build

#
docker build \
  --tag ghcr.io/brunowego/boilerplates:nestjs-with-prisma-rest \
  ./

#
pnpm compose:up

#
pnpm db:push

#
docker run \
  --rm \
  --env DATABASE_URL='postgresql://dev:dev@postgresql:5432/dev?schema=public' \
  -p 3000:3000 \
  --name app \
  ghcr.io/brunowego/boilerplates:nestjs-with-prisma-rest
```
