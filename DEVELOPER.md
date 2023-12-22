# Developer Guide

## Locally Development

```sh
# Install dependencies
pnpm install

# Start the auxiliary services
pnpm compose:up

# Run the migrations
pnpm db:migrate

# Run the seeders
pnpm db:seed

# Development mode
pnpm dev
# or run each service separately
pnpm dev --filter backend
pnpm dev --filter web

# Production mode
pnpm start

# Stop the auxiliary services
pnpm compose:down
```
