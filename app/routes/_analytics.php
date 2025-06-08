<?php

app()->group('/analytics', [
    'middleware' => ['auth.required', 'auth.verified'],
    function () {
        app()->get('/', 'Store\AnalyticsController@index');
    },
]);
