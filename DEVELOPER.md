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

# Authenticate with Anchor (lcl.host)
anchor auth signin

# Setup the Anchor (lcl.host) environment
anchor lcl setup
# 1. Option: Add dotenv contents to your clipboard.
# 2. Paste the contents into the ./apps/web/.env.local file.

# Start the development server
pnpm dev --filter @acme/web
```
