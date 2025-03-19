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

        if ($userCart->status === 'completed') {
            return response()->redirect(
                "{$userCart->store_url}/order?order_id={$userCart->order->id}&status=past"
            );
        }

        if (billing()->isSuccess()) {
            $order = $userCart->customer->orders()->create([
                'store_id' => $userCart->customer->store_id,
                'cart_id' => $userCart->id,
            ]);
            $userCart->status = 'completed';
            $userCart->save();
        } else {
            $userCart->status = 'failed';
            $userCart->save();
        }

        return response()->redirect(
            "{$userCart->store_url}/order?order_id=" . ($order->id ?? '')
        );
    }
}
