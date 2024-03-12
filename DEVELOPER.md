# Developer Guide

## Local Development

```sh
# Install dependencies
bun install

# Start auxiliary services
bun compose:up

# Migrate database
bun db:migrate

# Run the development server
bunx turbo dev --filter marketplace
bunx turbo dev --filter store
```
