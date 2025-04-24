<?php

app()->get('/orders', 'Store\OrdersController@index');
app()->get('/orders/(\d+)', 'Store\OrdersController@show');
