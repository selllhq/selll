<?php

app()->group('/orders', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/', 'Store\OrdersController@index');
        app()->get('/(\d+)', 'Store\OrdersController@show');
        app()->post('/(\d+)/shipping', 'Store\OrdersController@shipping');
        app()->post('/(\d+)/cancel', 'Store\OrdersController@cancel');
        app()->post('/(\d+)/complete', 'Store\OrdersController@complete');
    }
]);
