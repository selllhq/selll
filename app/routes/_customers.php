<?php

app()->group('/customers', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/', 'Store\CustomersController@index');
        app()->get('/(\d+)', 'Store\CustomersController@show');
    }
]);

