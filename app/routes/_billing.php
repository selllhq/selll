<?php

app()->post('/private/billing/webhook', 'Billing\BillingWebhooksController@handle');
app()->get('/billing/callback', 'Billing\BillingCallbacksController@handle');
