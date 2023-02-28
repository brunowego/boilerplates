# Developer Guide

## Local Development

### Installation

```sh
# Install the dependencies
pnpm install

# Copy the example environment file
cp ./.example.env ./.env
```

### Running

```bash
# Check if the docker-compose configuration is valid
docker compose config

# Start the dependency service
docker compose up -d

# Generate the database schema related files `@prisma/client` and `@/generated/typegraphql-prisma`
pnpm db:generate

# Assure all tables are created before seeding
pnpm db:push

# Seed the database
pnpm db:reset
pnpm db:seed

# Start the web app
pnpm run dev
pnpm run dev:debug

# Build the web app
pnpm run build

# Start the web app in production mode
pnpm run start
pnpm run start:prod
```

The service will be available at: [http://localhost:3000/](http://localhost:3000/)

### Testing

```bash
# Run the tests
pnpm run test
pnpm run test:watch
pnpm run test:cov
pnpm run test:debug
pnpm run test:e2e
```
