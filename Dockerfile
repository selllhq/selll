# syntax=docker/dockerfile:1.4

ARG PHP_VERSION=8.2
ARG NODE_VERSION=18

FROM php:${PHP_VERSION}-fpm-bookworm AS base

LABEL fly_launch_runtime="leaf"

# Arguments repeated after FROM
ARG PHP_VERSION

ENV DEBIAN_FRONTEND=noninteractive \
    COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/composer \
    COMPOSER_MAX_PARALLEL_HTTP=24 \
    PHP_DATE_TIMEZONE=UTC \
    PHP_MEMORY_LIMIT=256M \
    PHP_UPLOAD_MAX_FILESIZE=100M \
    PHP_POST_MAX_SIZE=100M \
    PHP_MAX_EXECUTION_TIME=90

# Install dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    curl ca-certificates gnupg unzip zip git nginx supervisor cron \
    libpq-dev postgresql-client \
    libzip-dev libpng-dev libjpeg-dev libfreetype6-dev libxml2-dev \
    vim sqlite3 rsync \
    && docker-php-ext-install pdo pdo_pgsql zip gd \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# PHP config overrides
COPY .fly/fpm/ /usr/local/etc/php-fpm.d/

# Nginx + Supervisor configs
COPY .fly/nginx/ /etc/nginx/
COPY .fly/supervisor/ /etc/supervisor/
COPY .fly/start-nginx.sh /usr/local/bin/start-nginx
RUN chmod +x /usr/local/bin/start-nginx

# Entrypoint
COPY .fly/entrypoint.sh /entrypoint
RUN chmod +x /entrypoint

# Copy application
WORKDIR /var/www/html
COPY . .

# Composer install
RUN composer install --optimize-autoloader --no-dev \
    && chown -R www-data:www-data /var/www/html \
    && touch .env

# Static asset builder
FROM node:${NODE_VERSION} AS node_modules_go_brrr

WORKDIR /app
COPY . .
COPY --from=base /var/www/html/vendor /app/vendor

RUN if [ -f "yarn.lock" ]; then \
    yarn install --frozen-lockfile && yarn build; \
    elif [ -f "pnpm-lock.yaml" ]; then \
    corepack enable && corepack prepare pnpm@latest-7 --activate && pnpm install --frozen-lockfile && pnpm run build; \
    elif [ -f "package-lock.json" ]; then \
    npm ci --no-audit && npm run build; \
    elif [ -f "package.json" ]; then \
    npm install --force && npm run build; \
    fi;

# Final image
FROM base

COPY --from=node_modules_go_brrr /app/public /var/www/html/public-npm
RUN rsync -ar /var/www/html/public-npm/ /var/www/html/public/ \
    && rm -rf /var/www/html/public-npm \
    && chown -R www-data:www-data /var/www/html/public \
    && php leaf link \
    && rm -rf public/hot

EXPOSE 8080
ENTRYPOINT ["/entrypoint"]
