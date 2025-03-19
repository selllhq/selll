<?php

namespace App\Controllers\Billing;

use App\Controllers\Controller;
use App\Models\Cart;

class BillingCallbacksController extends Controller
{
    public function handle()
    {
        $userCart = Cart::where('billing_session_id', request()->get('session_id'))->first();

        if (!$userCart) {
            return response()->markup('Invalid session ID');
        }

        if ($userCart->status !== 'pending') {
            return response()->redirect(
                "{$userCart->store_url}/order?order_id={$userCart->id}&status=past"
            );
        }

        if (billing()->isSuccess()) {
            $userCart->status = 'paid';

            // notify store of successful payment
        } else {
            $userCart->status = 'failed';
        }

        $userCart->save();

        return response()->redirect(
            "{$userCart->store_url}/order?order_id=" . ($userCart->id ?? '')
        );
    }
}
