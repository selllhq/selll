<?php

app()->get('/', 'HomeController@index');
app()->redirect('/social', '/');
app()->get('/invite/{code}', 'HomeController@invite');
app()->inertia('/pricing', 'pricing');
app()->inertia('/faqs', 'faqs');
app()->inertia('/privacy', 'privacy');
app()->inertia('/terms', 'terms');
app()->inertia('/contact', 'contact');
app()->inertia('/about', 'about');
app()->get('/__internal__', 'InternalController@index');
