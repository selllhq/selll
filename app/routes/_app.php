<?php

app()->get('/', 'HomeController@index');
app()->inertia('/pricing', 'pricing');



app()->inertia('/faqs', 'faqs');



app()->inertia('/privacy', 'privacy');


app()->inertia('/terms', 'terms');



app()->inertia('/something', 'something');