<?php

app()->get('/products', 'Store\ProductsController@index');
app()->get('/products/new', 'Store\ProductsController@create');
app()->post('/products/new', 'Store\ProductsController@store');
app()->get('/products/(\d+)', 'Store\ProductsController@show');
