<?php

app()->get('/products', 'Store\ProductsController@index');
app()->get('/products/new', 'Store\ProductsController@create');
app()->post('/products/new', 'Store\ProductsController@store');
app()->get('/products/(\d+)', 'Store\ProductsController@show');
app()->get('/products/(\d+)/edit', 'Store\ProductsController@edit');
app()->post('/products/(\d+)/edit', 'Store\ProductsController@update');
app()->delete('/products/(\d+)', 'Store\ProductsController@destroy');
