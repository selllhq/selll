<?php

namespace App\Controllers\Store;

use App\Helpers\StoreHelper;
use App\Models\Store;
use App\Models\User;

class PayoutsController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();

        response()->inertia('payouts/payouts', [
            'currentStore' => $currentStore,
            'payoutWallets' => $currentStore->wallets()->get(),
            'activePayoutWallet' => $currentStore->payout_account_id,
            'wallets' => $currentStore->wallets()->with('payouts')->get(),
            'payouts' => $currentStore->payouts()->with('wallet')->latest()->get(),
            'orders' => $currentStore->carts()->where('status', 'paid')->count(),
            'errors' => flash()->display('errors'),
        ]);
    }

    public function setup()
    {
        $currentStore = StoreHelper::find();
        $wallets = $currentStore->wallets()->with('payouts')->get();

        if (count($wallets) === 5) {
            return response()->redirect('/payouts');
        }

        $billingProvider = billing(in_array($currentStore->currency, ['GHS', 'NGN', 'KES', 'ZAR']) ? 'paystack' : 'stripe');

        $banks = cache(
            "wallets.banks.{$currentStore->currency}",
            60 * 60,
            function () use ($billingProvider, $currentStore) {
                return $billingProvider->provider()->getAvailableBanks([
                    'type' => 'ghipss',
                    'country' => $currentStore->country,
                    'currency' => $currentStore->currency,
                ]);
            }
        );

        $mobileMoney = cache(
            "wallets.mobileMoney.{$currentStore->currency}",
            60 * 60,
            function () use ($billingProvider, $currentStore) {
                return $billingProvider->provider()->getAvailableBanks([
                    'type' => 'mobile_money',
                    'country' => $currentStore->country,
                    'currency' => $currentStore->currency,
                ]);
            }
        );

        response()->inertia('payouts/setup', [
            'currentStore' => $currentStore,
            'mobileMoney' => $mobileMoney,
            'wallets' => $wallets,
            'banks' => $banks,
        ]);
    }

    public function store()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);
        $billingProvider = billing(in_array($currentStore->currency, ['GHS', 'NGN', 'KES', 'ZAR']) ? 'paystack' : 'stripe');

        $data = request()->validate([
            'type' => 'string',
            'account_number' => 'string',
            'provider' => 'string',
        ]);

        if (!$data) {
            return response()
                ->withFlash('errors', request()->errors())
                ->redirect('/payouts/setup', 303);
        }

        [$bankCode, $provider] = explode(':', $data['provider']);

        try {
            $subaccount = $billingProvider->provider()->subaccounts()->create([
                'business_name' => $currentStore->name,
                'settlement_bank' => $bankCode,
                'account_number' => $data['account_number'],
                'percentage_charge' => 2,
                'description' => "Selll payout account for {$currentStore->name}",
                'primary_contact_email' => $currentStore->email,
                'primary_contact_name' => $currentStore->name,
                'metadata' => [
                    'store_id' => $currentStore->id,
                    'user_id' => auth()->user()->id,
                ],
            ]);

            if (!$subaccount) {
                return response()
                    ->withFlash('errors', ['type' => 'Unable to create subaccount. Please try again later.'])
                    ->redirect('/payouts/setup', 303);
            }

            $wallet = $currentStore->wallets()->create([
                'type' => $data['type'],
                'provider' => $provider,
                'account_code' => $subaccount->subaccount_code,
                'account_number' => $data['account_number'],
                'account_identifier' => $bankCode,
                'currency' => $subaccount->currency,
            ]);

            $currentStore->update([
                'status' => 'live',
                'payout_account_id' => $wallet->id,
            ]);

            User::find(auth()->id())->referral()->first()?->update([
                'store_activated_at' => $currentStore->updated_at
            ]);

            $geoData = request()->getUserLocation();

            app()->mixpanel->track('Store Activated', [
                '$user_id' => auth()->id(),
                'store_id' => $currentStore->id,
                '$region' => $geoData['region'] ?? null,
                '$city' => $geoData['city'] ?? null,
                'mp_country_code' => $geoData['countryCode'] ?? null,
                '$country_code' => $geoData['countryCode'] ?? null,
            ]);

            return response()->redirect('/payouts/setup', 303);
        } catch (\Throwable $th) {
            return response()
                ->withFlash('errors', ['account_number' => $th->getMessage()])
                ->redirect('/payouts/setup', 303);
        }
    }

    public function updateWallet()
    {
        $newWallet = request()->get('wallet');
        $currentStore = StoreHelper::find();
        $wallet = $currentStore->wallets()->find($newWallet);

        if (!$wallet) {
            return response()
                ->withFlash('error', [
                    'wallet' => 'Wallet not found'
                ])
                ->redirect('/payouts', 303);
        }

        $currentStore->update([
            'payout_account_id' => $newWallet
        ]);

        return response()
            ->withFlash('success', 'Wallet updated successfully')
            ->redirect('/payouts', 303);
    }
}
