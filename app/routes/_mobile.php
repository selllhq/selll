<?php

app()->post('/api/mobile/auth/login', 'Mobile\AuthController@index');
app()->get('/api/mobile/stats', 'Mobile\StatsController@index');

app()->group('/api/mobile/orders', function () {
    app()->get('/', 'Mobile\OrdersController@index');
    app()->get('/(\d+)', 'Mobile\OrdersController@show');
    app()->post('/(\d+)/shipping', 'Mobile\OrdersController@shipping');
    app()->post('/(\d+)/cancel', 'Mobile\OrdersController@cancel');
    app()->post('/(\d+)/complete', 'Mobile\OrdersController@complete');
});

app()->group('/api/mobile/products', function () {
    app()->get('/', 'Mobile\ProductsController@index');
    app()->post('/new', 'Mobile\ProductsController@store');
    app()->get('/(\d+)', 'Mobile\ProductsController@show');
    app()->post('/(\d+)/edit', 'Mobile\ProductsController@update');
    app()->delete('/(\d+)', 'Mobile\ProductsController@destroy');
});

app()->group('/api/mobile/store', function () {
    app()->post('/domain', 'Mobile\StoreController@domain');
});
