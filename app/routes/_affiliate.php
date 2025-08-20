<?php

app()->get('/affiliates', 'AffiliatesController@index');
app()->get('/affiliates/products', 'AffiliatesController@showProducts');
app()->get('/affiliates/products/{id}', 'AffiliatesController@showProduct');
app()->get('/affiliates/links/{slug}', 'AffiliatesController@showAffiliate');
app()->post('/affiliates/setup', 'AffiliatesController@store');
