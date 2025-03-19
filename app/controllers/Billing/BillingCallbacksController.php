<?php

namespace App\Controllers\Billing;

use App\Controllers\Controller;
use App\Models\Cart;
use App\Models\Customer;

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
                "http://{$userCart->customer->store->identifier}.localhost:5050/order?order_id={$userCart->orders->first()->id}&status=past"
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
            "http://{$userCart->customer->store->identifier}.localhost:5050/order?order_id=" . ($order->id ?? '')
        );
    }
}
