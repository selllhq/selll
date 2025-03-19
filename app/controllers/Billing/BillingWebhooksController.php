<?php

namespace App\Controllers\Billing;

use App\Controllers\Controller;

class BillingWebhooksController extends Controller
{
    public function handle()
    {
        $event = billing()->webhook();

        if ($event->is('checkout.session.completed')) {
            // Payment was successful and the Checkout Session is complete
            // ✅ Give access to your service
            // $event->user() will give you the user who made the payment (if available)
            return;
        }

        if ($event->is('checkout.session.expired')) {
            // Payment was not successful and the Checkout Session has expired
            // 📧 Maybe send an abandoned checkout mail?
            return;
        }

        // ... handle all other necessary events
    }
}
