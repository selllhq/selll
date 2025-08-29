<?php

use Illuminate\Cache\CacheManager;
use Illuminate\Config\Repository as Config;
use Illuminate\Container\Container;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Cache\FileStore;
use Illuminate\Cache\Repository;

// Register a Laravel-style container inside Leaf
app()->register('cacheConfig', function () {
    $container = new Container;

    // Register filesystem
    $container->singleton('files', function () {
        return new Filesystem;
    });

    // Register config repository with cache config
    $container->instance('config', new Config([
        'cache' => [
            'default' => 'file',
            'stores' => [
                'file' => [
                    'driver' => 'file',
                    'path' => StoragePath('framework/cache'),
                ],
            ],
            'prefix' => 'leaf_cache',
        ],
    ]));

    // Register cache manager
    $container->singleton('cache', function ($container) {
        return new CacheManager($container);
    });

    return $container;
});

/**
 * Global cache helper
 *
 * Usage:
 *   cache()->put('foo', 'bar', 600);
 *   cache()->get('foo');
 *   cache('foo'); // shorthand get
 *   cache('foo', 600, 'bar'); // shorthand put
 */
function cache($key = null, $seconds = null, $value = null)
{
    static $cache = null;

    if ($cache === null) {
        $laraContainer = app()->cacheConfig;

        $cache = new Repository(new FileStore(
            $laraContainer->make('files'),
            $laraContainer['config']['cache.stores.file']['path']
        ));
    }

    if ($key === null) {
        return $cache;
    }

    // Getter only
    if ($seconds === null) {
        return $cache->get($key);
    }

    // Closure-based remember
    if ($value instanceof Closure) {
        if ($cache->has($key)) {
            return $cache->get($key);
        }

        $result = $value();
        $cache->put($key, $result, $seconds);

        return $result;
    }

    // Setter
    return $cache->put($key, $value, $seconds);
}
