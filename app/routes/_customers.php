<?php

app()->get('/customers', 'Store\CustomersController@index');
app()->get('/customers/(\d+)', 'Store\CustomersController@show');
