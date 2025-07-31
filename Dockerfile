# syntax=docker/dockerfile:1.4

ARG PHP_VERSION=8.2
ARG NODE_VERSION=18

FROM php:${PHP_VERSION}-fpm-alpine as base
LABEL fly_launch_runtime="leaf"

# Install system dependencies
RUN apk --no-cache add \
    nginx supervisor curl git unzip bash rsync tzdata \
    libpng libjpeg-turbo freetype libpq postgresql-client \
    php82-pecl-pdo_pgsql php82-pdo_mysql php82-pdo_sqlite php82-mbstring php82-opcache php82-xml \
    php82-fileinfo php82-tokenizer php82-ctype php82-curl php82-dom php82-gd php82-mysqli \
    php82-simplexml php82-xmlwriter php82-session php82-bcmath php82-exif php82-iconv php82-json \
    php82-phar php82-posix php82-zip php82-zlib php82-openssl

# Composer install
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Setup directories
WORKDIR /var/www/html
COPY . .

# Set permissions
RUN chown -R www-data:www-data /var/www/html

# Install PHP dependencies
RUN composer install --no-dev --optimize-autoloader

# Supervisor config
COPY .fly/supervisor /etc/supervisor/

# Nginx config
COPY .fly/nginx /etc/nginx/

# PHP-FPM config
COPY .fly/fpm /usr/local/etc/php-fpm.d/

# Entrypoint script
COPY .fly/entrypoint.sh /entrypoint
RUN chmod +x /entrypoint

# Build frontend
FROM node:${NODE_VERSION}-alpine as frontend
WORKDIR /app
COPY . .
RUN if [ -f "package-lock.json" ]; then npm install && npm run build; fi

# Final stage
FROM base
COPY --from=frontend /app/public /var/www/html/public

RUN chown -R www-data:www-data /var/www/html/public \
    && rm -rf public/hot \
    && php leaf link || true

EXPOSE 8080
ENTRYPOINT ["/entrypoint"]
