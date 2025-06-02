<?php

app()->get('/api/stores/{store}', 'Api\StoresController@show');
app()->get('/api/stores/(\d+)/categories', 'Api\StoresController@showCategories');
app()->get('/api/stores/(\d+)/products', 'Api\StoresController@showProducts');
app()->get('/api/stores/(\d+)/products/(\d+)', 'Api\StoresController@showProduct');
app()->post('/api/stores/(\d+)/checkout', 'Api\BillingController@handle');
app()->get('/api/stores/(\d+)/orders/(\d+)', 'Api\StoresController@showOrders');

app()->post('/api/auth/email', 'Api\AuthController@verify');
