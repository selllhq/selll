<?php

app()->group('/auth', [
    'middleware' => 'auth.guest',
    function () {
        app()->get('/login', 'Auth\LoginController@show');
        app()->post('/login', 'Auth\LoginController@store');
        app()->get('/register', 'Auth\RegisterController@show');
        app()->post('/register', 'Auth\RegisterController@store');
    },
]);

app()->get('/auth/verify', 'Auth\VerificationController@show');

app()->post('/auth/logout', [
    'middleware' => 'auth.required',
    'Auth\LoginController@logout'
]);

app()->group('/dashboard', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/', 'Auth\DashboardController@index');
        app()->get('/getting-started', 'Auth\DashboardController@gettingStarted');
        app()->get('/referrals', 'Auth\DashboardController@referrals');
    },
]);

app()->group('/settings', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/profile', 'Profile\AccountController@show_update');
        app()->patch('/profile', 'Profile\AccountController@update');
    }
]);
