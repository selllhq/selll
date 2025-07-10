<?php

namespace App\Controllers\Api;

use App\Controllers\Controller;
use App\Helpers\CustomerHelper;
use App\Models\Store;

class BillingController extends Controller
{
    public function handle($storeId)
    {
        $cartData = request()->get('cart');
        $customerData = request()->get('customer');

        $cartTotal = 0;
        $store = Store::find($storeId);
        $billingProvider = in_array($store->currency, ['GHS', 'NGN', 'KES', 'ZAR']) ? 'paystack' : 'stripe';

        $customer = CustomerHelper::saveToStore($storeId, $customerData);

        $items = array_map(function ($cartItem) use ($store, &$cartTotal) {
            $item = $store->products()->find($cartItem['id']);
            $cartTotal += ((float) $item->price * $cartItem['quantity']);

            return [
                'id' => $item->id,
                'item' => $item->name,
                'quantity' => $cartItem['quantity'],
                'amount' => $item->price * 100,
            ];
        }, $cartData);

        $cart = $customer->carts()->create([
            'items' => json_encode($items),
            'total' => $cartTotal,
            'currency' => $store->currency,
            'store_id' => $store->id,
            'store_url' => request()->get('store_url'),
        ]);

        $storePayoutWallet = $store->wallets()->find($store->payout_account_id);

        try {
            $session = billing($billingProvider)->charge([
                'amount' => $cartTotal * 100,
                'currency' => $store->currency,
                'description' => 'Purchase of items in cart',
                'customer' => $customer->email,
                'url' => request()->getUrl() . '/billing/callback', // only for paystack
                '_paystack' => [
                    'subaccount' => $storePayoutWallet->account_code,
                    'bearer' => 'subaccount',
                ],
                'metadata' => [
                    'cart_id' => $cart->id,
                    'customer_id' => $customer->id,
                    'store_id' => $store->id,
                    'items' => $items,
                ]
            ]);

            $cart->billing_session_id = $session->id();
            $cart->save();
        } catch (\Exception $e) {
            $cart->status = 'failed';
            $cart->save();

            return response()->json([
                'error' => $e->getMessage(),
                'message' => 'Failed to create billing session. Please try again later.',
            ], 500);
        }

        app()->mixpanel->track('Billing Session Created', [
            'store_id' => $store->id,
            'customer_id' => $customer->id,
            'cart_id' => $cart->id,
            'provider' => $billingProvider,
            'amount' => $cartTotal,
            'currency' => $store->currency,
        ]);

        response()->json([
            'id' => $session->id(),
            'url' => $session->url(),
        ]);
    }
}
