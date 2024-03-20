# Developer Guide

## Local Development

```sh
# Install dependencies
bun install

# Run auxiliary services
bun compose:up

# Migrate the database
bun db:migrate

# Local environment variables
( cd ./apps/console; cp ./.env.local.sample ./.env.local )
( cd ./packages/db; cp ./.env.local.sample ./.env.local )

# Run development server
bunx turbo dev --filter console
```
