<?php

app()->get('/api/stores/{store}', 'Api\StoresController@show');
app()->get('/api/stores/{store}/products', 'Api\StoresController@showProducts');
