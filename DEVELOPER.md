# Developer Guide

## Local Development

### Prerequisites

- [Docker](https://docs.docker.com/get-docker)
- [Docker Compose](https://docs.docker.com/compose/install)
- [Node.js](https://nodejs.org/en/download)
- [bun](https://bun.sh/docs/installation)

### Setup

```sh
# Install dependencies
bun install

# Run auxiliary services
bun compose:up

# Copy environment files
( cd ./apps/console; cp ./.env.local.sample ./.env.local )
( cd ./packages/db; cp ./.env.sample ./.env )

# Run database migrations
bun db:migrate

# Run database seeders
bun db:seed

# Start the development server
bun dev --filter console
```
