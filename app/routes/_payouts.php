<?php

app()->group('/payouts', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/', 'Store\PayoutsController@index');
        app()->get('/setup', 'Store\PayoutsController@setup');
        app()->post('/setup', 'Store\PayoutsController@store');
        app()->patch('/wallet', 'Store\PayoutsController@updateWallet');
    }
]);

