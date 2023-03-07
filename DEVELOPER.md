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
pnpm run compose:up

#
pnpm run db:push

#
pnpm run dev
pnpm run dev:debug
```

### Building

```sh
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

## Docker

### Build and Run

```sh
#
pnpm run build

#
docker build \
  --tag ghcr.io/brunowego/boilerplates:nestjs-with-prisma-rest \
  ./

#
pnpm run compose:up

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
