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
        ]);
    }

    public function setup()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        response()->inertia('payouts/setup', [
            'currentStore' => $currentStore,
            'wallets' => $currentStore->wallets()->with('payouts')->get(),
        ]);
    }
}
