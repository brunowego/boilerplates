FROM docker.io/library/node:18.12.1

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN corepack enable pnpm

RUN \
  apt-get update && \
  apt-get --no-install-recommends -y install \
  sudo=1.9.5p2-3+deb11u1 && \
  rm -rf /var/lib/apt/lists/*

ARG USERNAME=node

RUN \
  echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME && \
  chmod 0440 /etc/sudoers.d/$USERNAME

USER $USERNAME

WORKDIR /workspace
