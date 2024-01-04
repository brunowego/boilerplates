# Developer Guide

## Locally Development

### Installation

```sh
# Install dependencies
pnpm install
```

### Auxiliary Services

```sh
# Start auxiliary services
pnpm compose:up

# Stop auxiliary services
pnpm compose:down
```

### Database

```sh
#
pnpm db:generate

#
pnpm db:migrate

#
pnpm db:seed
```

### Checking

```sh
# Linting
pnpm lint
```

### Running

```bash
# Development mode
pnpm dev

# Production mode
pnpm start
```
