# Developer Guide

## Local Develop

```sh
#
pnpm install

#
pnpm dev

#
pnpm build

#
pnpm preview
```

## Docker

```sh
#
docker build \
  -t ghcr.io/brunowego/vite-react-base:latest \
  ./

#
docker run -it --rm \
  -p 8080:8080 \
  ghcr.io/brunowego/vite-react-base:latest
```
