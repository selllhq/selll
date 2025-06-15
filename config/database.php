<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Database Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the database connections below you wish
    | to use as your default connection for all database work. Of course
    | you may use many connections at once using the Database library.
    |
    */
    'default' => _env('DB_CONNECTION', 'mysql'),

    /*
    |--------------------------------------------------------------------------
    | Database Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the database connections setup for your application.
    | Of course, examples of configuring each database platform that is
    | supported by eloquent is shown below to make development simple.
    |
    |
    | All database work in eloquent is done through the PHP PDO facilities
    | so make sure you have the driver for your particular database of
    | choice installed on your machine before you begin development.
    |
    */
    'connections' => [
        'sqlite' => [
            'driver' => 'sqlite',
            'url' => _env('DATABASE_URL'),
            'database' => _env('DB_DATABASE', AppPaths('databaseStorage') . '/database.sqlite'),
            'prefix' => '',
            'foreign_key_constraints' => _env('DB_FOREIGN_KEYS', true),
        ],

        'pgsql' => [
            'driver' => 'pgsql',
            'url' => _env('DATABASE_URL'),
            'host' => _env('DB_HOST', '127.0.0.1'),
            'port' => _env('DB_PORT', '5432'),
            'database' => _env('DB_DATABASE', 'forge'),
            'username' => _env('DB_USERNAME', 'forge'),
            'password' => _env('DB_PASSWORD', ''),
            'charset' => _env('DB_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

        'analytics' => [
            'driver' => 'pgsql',
            'url' => _env('ANALYTICS_DATABASE_URL'),
            'host' => _env('ANALYTICS_DB_HOST', '127.0.0.1'),
            'port' => _env('ANALYTICS_DB_PORT', '5432'),
            'database' => _env('ANALYTICS_DB_DATABASE', 'forge'),
            'username' => _env('ANALYTICS_DB_USERNAME', 'forge'),
            'password' => _env('ANALYTICS_DB_PASSWORD', ''),
            'charset' => _env('ANALYTICS_DB_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],

        'imports' => [
            'driver' => 'pgsql',
            'url' => _env('IMPORTS_DATABASE_URL'),
            'host' => _env('IMPORTS_DB_HOST', '127.0.0.1'),
            'port' => _env('IMPORTS_DB_PORT', '5432'),
            'database' => _env('IMPORTS_DB_DATABASE', 'forge'),
            'username' => _env('IMPORTS_DB_USERNAME', 'forge'),
            'password' => _env('IMPORTS_DB_PASSWORD', ''),
            'charset' => _env('IMPORTS_DB_CHARSET', 'utf8'),
            'prefix' => '',
            'prefix_indexes' => true,
            'schema' => 'public',
            'sslmode' => 'prefer',
        ],
    ],
];
