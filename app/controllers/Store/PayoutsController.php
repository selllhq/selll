<?php

namespace App\Controllers\Store;

use App\Models\Store;

class PayoutsController extends Controller
{
    public function index()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        response()->inertia('payouts/payouts', [
            'currentStore' => $currentStore,
            'wallets' => $currentStore->wallets()->with('payouts')->get(),
            'payouts' => $currentStore->payouts()->with('wallet')->latest()->get(),
            'orders' => $currentStore->carts()->where('status', 'paid')->count(),
            'errors' => flash()->display('errors'),
        ]);
    }

    public function setup()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);
        $billingProvider = billing(in_array($currentStore->currency, ['GHS', 'NGN', 'KES', 'ZAR']) ? 'paystack' : 'stripe');

        $banks = $billingProvider->provider()->getAvailableBanks([
            'country' => $currentStore->country,
            'type' => 'ghipss',
            'currency' => $currentStore->currency,
        ]);

        $mobileMoney = $billingProvider->provider()->getAvailableBanks([
            'country' => $currentStore->country,
            'type' => 'mobile_money',
            'currency' => $currentStore->currency,
        ]);

        response()->inertia('payouts/setup', [
            'currentStore' => $currentStore,
            'banks' => $banks,
            'mobileMoney' => $mobileMoney,
            'wallets' => $currentStore->wallets()->with('payouts')->get(),
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

        return response()->redirect('/payouts/setup', 303);
    }
}
