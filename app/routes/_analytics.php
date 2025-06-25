<?php

app()->group(
    '/api/analytics',
    function () {
        app()->post('/add-to-cart', 'Api\AnalyticsController@addToCart');
        app()->post('/product-view', 'Api\AnalyticsController@productView');
    },
);
