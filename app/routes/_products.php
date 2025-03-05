<?php

app()->get('/products', 'ProductsController@index');
app()->get('/products/new', 'ProductsController@create');
app()->post('/products/new', 'ProductsController@store');
app()->get('/products/(\d+)', 'ProductsController@show');
