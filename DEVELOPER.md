# Developer Guide

## Local Environment

### Requirements

- [pnpm](https://pnpm.io)

### Setup

```sh
# Run auxiliary services
pnpm compose:up

# Install dependencies
pnpm install

# Check code
pnpm lint

# Run development server
pnpm dev

# Build for production
pnpm build
pnpm build --filter @acme/docs
pnpm build --filter @acme/web

# Run production server
pnpm start
```
