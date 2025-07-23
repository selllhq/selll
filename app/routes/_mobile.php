<?php

app()->post('/mobile/auth/login', 'Mobile\AuthController@index');

app()->group('/mobile', function () {
    app()->get('/stats', 'Mobile\StatsController@index');
    app()->get('/orders', 'Mobile\OrdersController@index');
    app()->get('/orders/(\d+)', 'Mobile\OrdersController@show');
});
