<?php

app()->get('/blog', 'BlogController@index');
app()->get('/blog/{slug}', 'BlogController@show');
