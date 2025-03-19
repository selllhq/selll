<?php

namespace App\Controllers\Api;

use App\Controllers\Controller;
use App\Models\Cart;
use App\Models\Store;

class BillingController extends Controller
{
    public function handle($storeId)
    {
        $cartData = request()->get('cart');
        $customerData = request()->get('customer');

        $cartTotal = 0;
        $store = Store::find($storeId);

        $customer = $store->customers()->where($customerData)->firstOrCreate($customerData);

        $items = array_map(function ($cartItem) use ($store, &$cartTotal) {
            $item = $store->products()->find($cartItem['id']);
            $cartTotal += $item->price * $cartItem['quantity'];

            return [
                'item' => $item->name,
                'quantity' => $cartItem['quantity'],
                'amount' => $item->price,
            ];
        }, $cartData);

        $cart = $customer->carts()->create([
            'items' => json_encode($items),
            'total' => $cartTotal,
            'store_id' => $store->id,
            'store_url' => request()->get('store_url'),
        ]);

        $session = billing()->charge([
            'amount' => $cartTotal,
            'currency' => $store->currency,
            'description' => 'Purchase of items in cart',
            'customer' => $customer->email,
            'metadata' => [
                'cart_id' => $cart->id,
                'customer_id' => $customer->id,
                'store_id' => $store->id,
                'items' => $items,
            ]
        ]);

        $cart = Cart::find($cart->id);
        $cart->billing_session_id = $session->id;
        $cart->save();

        response()->json([
            'id' => $session->id,
            'url' => $session->url,
        ]);
    }
}
