# Developer Guide

## Local Development

```sh
# Install dependencies
pnpm install

# Run auxiliary services
pnpm compose:up

# Local environment variables
( cd ./apps/web; cp ./.env.local.sample ./.env.local )
( cd ./packages/db; cp ./.env.local.sample ./.env.local )

# Migrate the database
pnpm db:migrate

# Run development server
pnpm dev --filter @acme/web
```
