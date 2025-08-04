<?php

namespace App\Controllers\Billing;

use App\Controllers\Controller;
use App\Helpers\CustomerHelper;
use App\Models\Store;

class BillingController extends Controller
{
    public function handle($storeId)
    {
        $cartData = request()->get('cart');
        $customerData = request()->get('customer');
        $customerDataToSave = array_merge($customerData, [
            'phone' => CustomerHelper::formatPhone($customerData['phone'] ?? '', $customerData['country_code'] ?? '233'),
            'address' => $customerData['deliveryLocation']['address'] ?? ''
        ]);

        unset($customerDataToSave['deliveryLocation']);

        $cartTotal = 0;
        $store = Store::find($storeId);
        $billingProvider = in_array($store->currency, ['GHS', 'NGN', 'KES', 'ZAR']) ? 'paystack' : 'stripe';

        $customer = CustomerHelper::saveToStore($storeId, $customerDataToSave);

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
            'address' => $customerDataToSave['address'] ?? null,
            'longitude' => $customerData['deliveryLocation']['lngLat'][0] ?? null,
            'latitude' => $customerData['deliveryLocation']['lngLat'][1] ?? null,
            'notes' => $customerData['notes'] ?? null,
        ]);

        $storePayoutWallet = $store->wallets()->find($store->payout_account_id);

        try {
            $session = billing($billingProvider)->charge([
                'amount' => $cartTotal * 100,
                'currency' => $store->currency,
                'description' => 'Purchase of items in cart',
                'customer' => $customer->email,
                'url' => rtrim(_env('APP_URL', 'https://selll.online'), '/') . '/billing/callback', // only for paystack
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

    public function pay($storeId, $orderId)
    {
        $store = Store::find($storeId);

        if (!$store) {
            return response()->redirect('/pay/oops');
        }

        $order = $store->carts()->find($orderId);

        if (!$order) {
            return response()->redirect('/pay/oops');
        }

        if ($order->status !== 'pending') {
            return response()->redirect("https://{$store->slug}.selll.store/orders/{$order->id}");
        }

        $payLinkRecord = $store->payLinks()->where('cart_id', $orderId)->first();

        if (!$payLinkRecord) {
            return response()->redirect('/pay/oops');
        }

        $customer = $store->customers()->find($order->customer_id);

        if (!$customer) {
            return response()->redirect('/pay/oops');
        }

        $storePayoutWallet = $store->wallets()->find($store->payout_account_id);

        try {
            $billingProvider = in_array($store->currency, ['GHS', 'NGN', 'KES', 'ZAR']) ? 'paystack' : 'stripe';

            $session = billing($billingProvider)->charge([
                'amount' => ((float) $order->total) * 100,
                'currency' => $store->currency,
                'description' => 'Custom Order with Paylink',
                'customer' => $customer->email,
                'url' => request()->getUrl() . '/billing/callback', // only for paystack
                '_paystack' => [
                    'subaccount' => $storePayoutWallet->account_code,
                    'bearer' => 'subaccount',
                ],
                'metadata' => [
                    'cart_id' => $order->id,
                    'customer_id' => $customer->id,
                    'store_id' => $store->id,
                    'items' => json_decode($order->items),
                ]
            ]);

            $order->billing_session_id = $session->id();
            $order->save();
        } catch (\Exception $e) {
            $order->status = 'failed';
            $order->save();

            return false;
        }

        app()->mixpanel->track('Billing Session Created', [
            'store_id' => $store->id,
            'customer_id' => $customer->id,
            'cart_id' => $order->id,
            'provider' => $billingProvider,
            'amount' => $order->total,
            'currency' => $store->currency,
        ]);

        return response()->redirect($session->url());

        // $session = billing($payLinkRecord->provider)->session($order->billing_session_id);

        // if (!$session) {
        //     return response()->redirect('/pay/oops');
        // }

        // if ($session->isSuccessful() && ($order->status === 'paid' || $order->status === 'completed')) {
        //     return response()->redirect("https://{$store->slug}.selll.store/orders/{$order->id}?status=paid");
        // }

        // // if ($session->isPending()) {
        // //     return response()->redirect($session->url());
        // // }

        // dd($order->toArray(), $payLinkRecord->toArray(), $session->status(), $session->paymentStatus());

        // if ($session->isExpired()) {
        //     $payLinkRecord->status = 'expired';
        //     $payLinkRecord->save();

        //     $order->status = 'abandoned';
        //     $order->save();

        //     return response()->redirect("https://{$store->slug}.selll.store/orders/{$order->id}?status=expired");
        // }
    }
}
