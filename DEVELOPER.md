# Developer Guide

## Local Development

```sh
# Install dependencies
bun install

# Run auxiliary services
bun compose:up

# Local environment variables
( cd ./apps/web; cp ./.env.local.sample ./.env.local )
( cd ./packages/db; cp ./.env.local.sample ./.env.local )

# Migrate the database
bun db:migrate

# Run development server
bunx turbo dev --filter web
```
