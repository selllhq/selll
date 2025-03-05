<?php

app()->get('/store/new', 'Store\SetupController@index');
app()->post('/store/new', 'Store\SetupController@store');
