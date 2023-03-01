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
docker compose up -d

#
pnpm run db:validate
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
docker network create workbench \
  --subnet 10.1.1.0/24

#
docker run -d \
  $(echo "$DOCKER_RUN_OPTS") \
  -h postgresql \
  -e POSTGRES_USER='dev' \
  -e POSTGRES_PASSWORD='dev' \
  -e POSTGRES_DB='dev' \
  -v app-postgresql-data:/var/lib/postgresql/data \
  -p 5432:5432 \
  --name app-postgresql \
  --network workbench \
  docker.io/library/postgres:15.1-alpine

#
pnpm db:push

#
docker run \
  --rm \
  --env DATABASE_URL='postgresql://dev:dev@postgresql:5432/dev?schema=public' \
  -p 3000:3000 \
  --name app \
  --network workbench \
  ghcr.io/brunowego/boilerplates:nestjs-with-prisma-rest
```
