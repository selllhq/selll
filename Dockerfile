# syntax=docker/dockerfile:experimental

ARG PHP_VERSION=8.2
ARG NODE_VERSION=18
FROM ubuntu:22.04 as base
LABEL fly_launch_runtime="leaf"

ARG PHP_VERSION
ENV DEBIAN_FRONTEND=noninteractive \
    COMPOSER_ALLOW_SUPERUSER=1 \
    COMPOSER_HOME=/composer \
    COMPOSER_MAX_PARALLEL_HTTP=24 \
    PHP_PM_MAX_CHILDREN=10 \
    PHP_PM_START_SERVERS=3 \
    PHP_MIN_SPARE_SERVERS=2 \
    PHP_MAX_SPARE_SERVERS=4 \
    PHP_DATE_TIMEZONE=UTC \
    PHP_DISPLAY_ERRORS=Off \
    PHP_ERROR_REPORTING=22527 \
    PHP_MEMORY_LIMIT=256M \
    PHP_MAX_EXECUTION_TIME=90 \
    PHP_POST_MAX_SIZE=100M \
    PHP_UPLOAD_MAX_FILE_SIZE=100M \
    PHP_ALLOW_URL_FOPEN=Off

# Install system packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    gnupg2 ca-certificates wget curl unzip zip git rsync htop vim-tiny tzdata \
    nginx supervisor cron sqlite3 mysql-server postgresql-client libpq-dev libzip-dev \
    libpng-dev libjpeg-dev libfreetype6-dev libxml2-dev software-properties-common

# Add Ondřej PHP PPA and PostgreSQL repo
RUN add-apt-repository ppa:ondrej/php -y && \
    echo "deb http://apt.postgresql.org/pub/repos/apt jammy-pgdg main" > /etc/apt/sources.list.d/pgdg.list && \
    wget --quiet -O - https://www.postgresql.org/media/keys/ACCC4CF8.asc | apt-key add -

# Install PHP and extensions
RUN apt-get update && apt-get install -y --no-install-recommends \
    php${PHP_VERSION}-fpm \
    php${PHP_VERSION}-cli \
    php${PHP_VERSION}-mbstring \
    php${PHP_VERSION}-opcache \
    php${PHP_VERSION}-xml \
    php${PHP_VERSION}-fileinfo \
    php${PHP_VERSION}-tokenizer \
    php${PHP_VERSION}-ctype \
    php${PHP_VERSION}-curl \
    php${PHP_VERSION}-dom \
    php${PHP_VERSION}-gd \
    php${PHP_VERSION}-mysql \
    php${PHP_VERSION}-pgsql \
    php${PHP_VERSION}-sqlite3 \
    php${PHP_VERSION}-simplexml \
    php${PHP_VERSION}-xmlwriter \
    php${PHP_VERSION}-bcmath \
    php${PHP_VERSION}-exif \
    php${PHP_VERSION}-iconv \
    php${PHP_VERSION}-phar \
    php${PHP_VERSION}-posix \
    php${PHP_VERSION}-zip

# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

RUN ln -sf /usr/bin/vim.tiny /etc/alternatives/vim && \
    ln -sf /etc/alternatives/vim /usr/bin/vim && \
    mkdir -p /var/www/html/public && echo "<?php echo 'index';" > /var/www/html/public/index.php && \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

# Copy config files
COPY .fly/nginx/ /etc/nginx/
COPY .fly/fpm/ /etc/php/${PHP_VERSION}/fpm/
COPY .fly/supervisor/ /etc/supervisor/
COPY .fly/entrypoint.sh /entrypoint
COPY .fly/start-nginx.sh /usr/local/bin/start-nginx
RUN chmod 754 /usr/local/bin/start-nginx

# App code
COPY . /var/www/html
WORKDIR /var/www/html

RUN composer install --optimize-autoloader --no-dev && \
    chown -R www-data:www-data /var/www/html && \
    chmod +x /entrypoint && touch .env

# Node asset builder
FROM node:${NODE_VERSION} as node_modules_go_brrr

RUN mkdir -p /app
WORKDIR /app
COPY . .
COPY --from=base /var/www/html/vendor /app/vendor

RUN if [ -f "yarn.lock" ]; then \
      yarn install --frozen-lockfile && yarn build; \
    elif [ -f "pnpm-lock.yaml" ]; then \
      corepack enable && corepack prepare pnpm@latest-7 --activate && \
      pnpm install --frozen-lockfile && pnpm run build; \
    elif [ -f "package-lock.json" ]; then \
      npm ci --no-audit && npm run build; \
    elif [ -f "package.json" ]; then \
      npm install --force && npm run build; \
    fi

# Final image
FROM base
COPY --from=node_modules_go_brrr /app/public /var/www/html/public-npm
RUN rsync -ar /var/www/html/public-npm/ /var/www/html/public/ && \
    rm -rf /var/www/html/public-npm && \
    chown -R www-data:www-data /var/www/html/public && \
    php leaf link && rm -rf public/hot

EXPOSE 8080

ENTRYPOINT ["/entrypoint"]
