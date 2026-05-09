FROM php:8.4-fpm

LABEL org.opencontainers.image.authors="Francisco José Rodríguez Afonso"
LABEL org.opencontainers.image.documentation="https://prw-daw.github.io/DevHub/"
LABEL org.opencontainers.image.source="https://github.com/PRW-DAW/DevHub"
LABEL org.opencontainers.image.version="0.15.0"
LABEL org.opencontainers.image.vendor="PRW-DAW"
LABEL org.opencontainers.image.licenses="CC0-1.0"
LABEL org.opencontainers.image.title="DevHub | Backend"
LABEL org.opencontainers.image.description="¡Tu espacio para registrar, mostrar y destacar tus proyectos, llevando tu desarrollo profesional al siguiente nivel!"

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
