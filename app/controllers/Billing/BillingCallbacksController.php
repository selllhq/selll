<?php

namespace App\Controllers\Billing;

use App\Controllers\Controller;
use App\Mailers\StoreMailer;
use App\Models\Cart;
use App\Models\Product;

class BillingCallbacksController extends Controller
{
    public function handle()
    {
        $userCart = Cart::where('billing_session_id', request()->get('session_id') ?? request()->get('txId') ?? request()->get('reference'))
            ->with('customer')
            ->first();

        if (!$userCart) {
            return response()->markup('Invalid session ID');
        }

        if ($userCart->status !== 'pending') {
            return response()->redirect(
                "{$userCart->store_url}/order?order_id={$userCart->id}&status=past"
            );
        }

        if (billing(request()->get('session_id') ? 'stripe' : 'paystack')->callback()->isSuccessful()) {
            $itemsInCart = json_decode($userCart->items, true);

            foreach ($itemsInCart as $item) {
                $userCart->items()->create([
                    'product_id' => $item['id'],
                    'customer_id' => $userCart->customer_id,
                    'quantity' => $item['quantity'],
                    'amount' => $item['amount'] / 100,
                    'currency' => $userCart->currency,
                ]);

                $product = Product::find($item['id']);

                if ($product->quantity === 'limited') {
                    $product->quantity_items -= $item['quantity'];
                    $product->save();
                }
            }

            $userCart->status = 'paid';
            $ownerEmail = $userCart->store->owner->email;

            StoreMailer::newOrder($ownerEmail, $userCart);

            // deduct selll's 2% commission
            // deduct stripe/paystack fees
            // put customer balance in the store's balance
        } else {
            $userCart->status = 'cancelled';
        }

        $userCart->save();

        return response()->redirect(
            "{$userCart->store_url}/order?order_id=" . ($userCart->id ?? '')
        );
    }
}
