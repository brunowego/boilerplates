# Developer Guide

## Locally Development

### Environment Variables

```sh
# Create dotENV
cp ./.env.example ./.env

# Create direnv
cp ./.envrc.example ./.envrc
```

### Bytebase

#### Setup

1. [Setup admin account](http://127.0.0.1:8080/auth/signup)
2. [Setup service account](http://127.0.0.1:8080/setting/member)

   - Check "Create as service account"
   - Name: `bytebase`
   - Check role "DBA"
   - Click "+ Add"

3. "Copy Service Key" from `bytebase@service.bytebase.com` and save on `BYTEBASE_SERVICE_KEY` in `.envrc` file
4. Run Terraform

   ```sh
   ( cd ./.infra/terraform && terraform init )
   ( cd ./.infra/terraform && terraform apply )
   ```

5. Correct the [Environments](http://127.0.0.1:8080/environment#101) order

### Installation

```sh
# Install dependencies
pnpm install
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

### Testing

```bash
# Unit tests
pnpm test
pnpm run test -- --watch
pnpm run test -- --coverage

# Debugger mode
pnpm test:debug

# E2E tests
TEST_ENV=e2e pnpm test
```

## Docker

### Setup

```sh
# Turbo prune
pnpm dlx turbo prune --scope @acme/api --docker

# Remove node_modules folders
pnpm dlx npkill -d ./out

# Build image
docker build --build-arg TZ=America/Sao_Paulo -f ./nestjs.dockerfile --tag ghcr.io/acme/api:latest ./

# Run container
docker run -it --rm -p 3000:3000 --name acme-api ghcr.io/acme/api:latest
```
