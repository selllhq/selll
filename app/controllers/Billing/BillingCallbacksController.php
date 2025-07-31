<?php

namespace App\Controllers\Billing;

use App\Controllers\Controller;
use App\Helpers\SMSHelper;
use App\Mailers\StoreMailer;
use App\Models\Cart;
use App\Models\Product;
use App\Models\User;

class BillingCallbacksController extends Controller
{
    public function handle()
    {
        $provider = request()->get('session_id') ? 'stripe' : 'paystack';
        $userCart = Cart::where('billing_session_id', request()->get('session_id') ?? request()->get('txId') ?? request()->get('reference'))
            ->with('customer')
            ->first();

        if (!$userCart) {
            return response()->markup('Invalid session ID');
        }

        if ($userCart->status !== 'pending') {
            return response()->redirect(
                "{$userCart->store_url}/orders/{$userCart->id}?status=past"
            );
        }

        $billingCallback = billing($provider)->callback();

        if ($billingCallback->isSuccessful()) {
            $itemsInCart = json_decode($userCart->items, true);

            foreach ($itemsInCart as $item) {
                $userCart->items()->create([
                    'store_id' => $userCart->store_id,
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

            $selllFee = 0.02;
            $selllCommission = $userCart->total * $selllFee;

            if ($provider === 'paystack') {
                $providerFee = $billingCallback->session()->data['fees'] / $billingCallback->session()->data['amount'];
                $providerCommission = $billingCallback->session()->data['fees'] / 100;
            }

            $payout = $userCart->payout()->create([
                'amount' => $userCart->total - $selllCommission - $providerCommission,
                'currency' => $userCart->currency,
                'selll_fee' => $selllFee,
                'selll_fee_amount' => $selllCommission,
                'payment_provider' => $provider,
                'payment_fee' => $providerFee,
                'payment_fee_amount' => $providerCommission,
                'store_id' => $userCart->store_id,
                'wallet_id' => $userCart->store->payout_account_id,
            ]);

            if ($userCart->store->carts()->count() === 1) {
                User::find(auth()->id())->referral()->first()?->update([
                    'store_first_order_at' => $payout->updated_at
                ]);
            }

            $geoData = request()->getUserLocation();

            app()->mixpanel->track('New Successful Order', [
                'store_id' => $userCart->store_id,
                'customer_id' => $userCart->customer_id,
                'cart_id' => $userCart->id,
                'amount' => $userCart->total,
                'currency' => $userCart->currency,
                'payment_provider' => $provider,
                '$region' => $geoData['region'] ?? null,
                '$city' => $geoData['city'] ?? null,
                'is_first_order' => $userCart->store->carts()->count() === 1,
                'mp_country_code' => $geoData['countryCode'] ?? null,
                '$country_code' => $geoData['countryCode'] ?? null,
            ]);

            SMSHelper::write([
                'recipient' => $userCart->customer->phone,
                'senderId' => 'Selll Order',
                'message' => "Your order has been successfully placed. Thank you for shopping with us! Your order ID is {$userCart->id}.",
            ])
                ->withArkesel()
                ->send();

            if ($userCart->store->phone) {
                $customerFirstName = explode(' ', $userCart->customer->name)[0];

                SMSHelper::write([
                    'recipient' => $userCart->store->phone,
                    'senderId' => 'Selll Order',
                    'message' => "{$customerFirstName} just paid GHS {$userCart->total} for order #{$userCart->id} on your store. View order: selll.online/orders/{$userCart->id}",
                ])
                    ->withArkesel()
                    ->send();
            }

            StoreMailer::newOrder($ownerEmail, $userCart)->send();
        } else {
            $userCart->status = 'cancelled';
        }

        $userCart->save();

        return response()->redirect(
            "{$userCart->store_url}/orders/" . ($userCart->id ?? '')
        );
    }
}
