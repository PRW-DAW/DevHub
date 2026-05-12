#!/usr/bin/env bash
set -euo pipefail

MAJOR="1"
MINOR="1.0"
PATCH="1.0.0"

build_and_push() {
    local name=$1
    local context=$2

    docker build \
        -t "ghcr.io/prw-daw/devhub-${name}:${MAJOR}" \
        -t "ghcr.io/prw-daw/devhub-${name}:${MINOR}" \
        -t "ghcr.io/prw-daw/devhub-${name}:${PATCH}" \
        -t "ghcr.io/prw-daw/devhub-${name}:latest" \
        -t "fjrodafo/devhub-${name}:${MAJOR}" \
        -t "fjrodafo/devhub-${name}:${MINOR}" \
        -t "fjrodafo/devhub-${name}:${PATCH}" \
        -t "fjrodafo/devhub-${name}:latest" \
        "./${context}"

    for tag in "${MAJOR}" "${MINOR}" "${PATCH}" "latest"; do
        docker push "ghcr.io/prw-daw/devhub-${name}:${tag}"
        docker push "fjrodafo/devhub-${name}:${tag}"
    done
}

build_and_push nginx nginx
build_and_push frontend frontend
build_and_push backend backend
