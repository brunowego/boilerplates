# Developer Guide

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/en/download)
- [pnpm](https://pnpm.io/installation)
- [Stripe API keys](https://dashboard.stripe.com/test/apikeys)

### Setup

```sh
# Install dependencies
pnpm install

# Copy the sample environment file
( cd ./apps/web; cp ./.env.local.sample ./.env.local )

# Start the development server
pnpm dev --filter @acme/web
```
