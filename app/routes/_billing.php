<?php

app()->post('/webhooks/billing', 'Billing\BillingWebhooksController@handle');
app()->get('/billing/callback', 'Billing\BillingCallbacksController@handle');
