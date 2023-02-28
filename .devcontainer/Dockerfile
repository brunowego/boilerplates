FROM docker.io/library/node:18.12.1

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN corepack enable pnpm

RUN \
  apt-get update && \
    apt-get --no-install-recommends -y install \
      sudo \
      libnss3-tools \
      libatk1.0-dev \
      libatk-bridge2.0-dev \
      libcups2-dev \
      libdrm-dev \
      libxkbcommon-dev \
      libxcomposite-dev \
      libxdamage-dev \
      libxrandr-dev \
      libgbm-dev \
      libasound-dev && \
        rm -rf /var/lib/apt/lists/*

ARG USERNAME=node

RUN \
  echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME && \
    chmod 0440 /etc/sudoers.d/$USERNAME

WORKDIR /workspace

RUN curl -fsSL 'https://get.trunk.io' | bash -s -- -y
