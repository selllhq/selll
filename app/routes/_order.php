<?php

app()->group('/orders', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/', 'Store\OrdersController@index');
        app()->get('/(\d+)', 'Store\OrdersController@show');
    }
]);

