<?php

app()->group('/store', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->inertia('/', 'store/store');
        app()->get('/new', 'Store\SetupController@index');
        app()->post('/new', 'Store\SetupController@store');
        app()->get('/customize', 'Store\SetupController@showCustomize');
        app()->post('/customize', 'Store\SetupController@customize');
        app()->get('/domain', 'Store\SetupController@showDomain');
        app()->post('/domain', 'Store\SetupController@domain');
        app()->post('/domain/custom', 'Store\SetupController@customDomain');
        app()->get('/domain/setup', 'Store\SetupController@showCustomDomainSetup');
    }
]);

app()->group('/customers', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/', 'Store\CustomersController@index');
        app()->get('/(\d+)', 'Store\CustomersController@show');
    }
]);

app()->group('/deliveries', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/', 'Store\DeliveriesController@index');
        app()->post('/defaults', 'Store\DeliveriesController@defaults');
    }
]);
