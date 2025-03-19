<?php

app()->get('/api/stores/{store}', 'Api\StoresController@show');
app()->get('/api/stores/(\d+)/products', 'Api\StoresController@showProducts');
app()->post('/api/stores/(\d+)/pay', 'Api\BillingController@handle');
