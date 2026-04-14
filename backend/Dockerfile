FROM php:8.4-fpm

LABEL org.opencontainers.image.authors="Francisco José Rodríguez Afonso" \
      org.opencontainers.image.documentation="https://prw-daw.github.io/DevHub/" \
      org.opencontainers.image.source="https://github.com/PRW-DAW/DevHub" \
      org.opencontainers.image.version="0.9.0" \
      org.opencontainers.image.vendor="PRW-DAW" \
      org.opencontainers.image.licenses="CC0-1.0" \
      org.opencontainers.image.title="DevHub | Backend" \
      org.opencontainers.image.description="¡Tu espacio para registrar, mostrar y destacar tus proyectos, llevando tu desarrollo profesional al siguiente nivel!"

RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libpq-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-install pdo pdo_pgsql

COPY --from=composer:2.8.12 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

EXPOSE 8000
