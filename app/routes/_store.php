<?php

app()->get('/store/new', 'Store\SetupController@index');
app()->post('/store/new', 'Store\SetupController@store');
app()->get('/store/customize', 'Store\SetupController@showCustomize');
app()->post('/store/customize', 'Store\SetupController@customize');
