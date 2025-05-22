<?php

namespace App\Controllers\Billing;

use App\Controllers\Controller;
use App\Models\Cart;

class BillingCallbacksController extends Controller
{
    public function handle()
    {
        $userCart = Cart::where('billing_session_id', request()->get('session_id') ?? request()->get('txId') ?? request()->get('reference'))->first();

        if (!$userCart) {
            return response()->markup('Invalid session ID');
        }

        if ($userCart->status !== 'pending') {
            return response()->redirect(
                "{$userCart->store_url}/order?order_id={$userCart->id}&status=past"
            );
        }

        // deal with deductions and stuff

        if (billing(request()->get('session_id') ? 'stripe' : 'paystack')->callback()->isSuccessful()) {
            // notify store of successful payment
            $itemsInCart = json_decode($userCart->items, true);

            foreach ($itemsInCart as $item) {
                $userCart->items()->create([
                    'product_id' => $item['id'],
                    'customer_id' => $userCart->customer_id,
                    'quantity' => $item['quantity'],
                    'amount' => $item['amount'],
                    'currency' => $userCart->currency / 100,
                ]);
            }

            $userCart->status = 'paid';
        } else {
            $userCart->status = 'cancelled';
        }

        $userCart->save();

        return response()->redirect(
            "{$userCart->store_url}/order?order_id=" . ($userCart->id ?? '')
        );
    }
}
