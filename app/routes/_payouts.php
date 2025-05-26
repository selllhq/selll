<?php

app()->get('/payouts', 'Store\PayoutsController@index');
app()->get('/payouts/setup', 'Store\PayoutsController@setup');
