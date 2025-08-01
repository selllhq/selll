<?php

app()->get('/pay/(\d+)/(\d+)', 'Billing\BillingController@pay');
app()->get('/billing/callback', 'Billing\BillingCallbacksController@handle');
app()->post('/api/stores/(\d+)/checkout', 'Billing\BillingController@handle');
app()->post('/private/billing/webhook', 'Billing\BillingWebhooksController@handle');
