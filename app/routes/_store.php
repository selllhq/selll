<?php

app()->group('/store', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/new', 'Store\SetupController@index');
        app()->post('/new', 'Store\SetupController@store');
        app()->get('/customize', 'Store\SetupController@showCustomize');
        app()->post('/customize', 'Store\SetupController@customize');
    }
]);

