<?php

app()->get('/api/stores/{store}', 'Api\StoresController@show');
app()->get('/api/stores/(\d+)/categories', 'Api\StoresController@showCategories');
app()->get('/api/stores/(\d+)/products', 'Api\StoresController@showProducts');
app()->get('/api/stores/(\d+)/products/{product}', 'Api\StoresController@showProduct');
app()->get('/api/stores/(\d+)/orders/(\d+)', 'Api\StoresController@showOrders');

app()->post('/api/auth/email', 'Api\AuthController@verify');
app()->post('/api/analytics', 'Api\AnalyticsController@store');

app()->get('/api/locator', function () {
    return response()->json(
        request()->getLocationFromIp('41.155.14.189'),
    );
});
