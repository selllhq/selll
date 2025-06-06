<?php

app()->group('/products', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/', 'Store\ProductsController@index');
        app()->get('/new', 'Store\ProductsController@create');
        app()->post('/new', 'Store\ProductsController@store');
        app()->get('/(\d+)', 'Store\ProductsController@show');
        app()->get('/(\d+)/edit', 'Store\ProductsController@edit');
        app()->post('/(\d+)/edit', 'Store\ProductsController@update');
        app()->delete('/(\d+)', 'Store\ProductsController@destroy');
    }
]);

