<?php

namespace App\Controllers\Auth;

use App\Helpers\AnalyticsHelper;
use App\Models\Store;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $currentStoreId = auth()->user()->current_store_id;

        if (!$currentStoreId) {
            return response()->redirect('/store/new', 303);
        }

        $stores = User::find(auth()->id())->ownedStores()->get();
        $currentStore = $currentStoreId ? Store::find($currentStoreId) : [];

        $products = $currentStoreId ? $currentStore->products()->get() : [];
        $customers = $currentStoreId ? $currentStore->customers()->get() : [];
        $orders = $currentStoreId ? $currentStore->carts()->with('customer')->latest()->get() : [];

        if (count($products) === 0 && count($orders) === 0) {
            return response()->redirect('/dashboard/getting-started', 303);
        }


        response()->inertia('dashboard', [
            'stores' => $stores,
            'currentStore' => $currentStore,
            'products' => $products,
            'productsSold' => $currentStore->productPurchases()->sum('quantity'),
            'orders' => $orders,
            'customers' => $customers,
            'revenueGraph' => AnalyticsHelper::getRevenue6Months($currentStoreId),
        ]);
    }

    public function referrals()
    {
        $currentStoreId = auth()->user()->current_store_id;

        if (!$currentStoreId) {
            return response()->redirect('/store/new', 303);
        }

        $currentStore = $currentStoreId ? Store::find($currentStoreId) : [];

        if (!$currentStore) {
            return response()->redirect('/store/new', 303);
        }

        $referrals = User::find(auth()->id())
            ->referrals()
            ->whereNotNull('store_id')
            ->with(['store', 'store.owner'])
            ->get();

        $referralCode = auth()->user()->generateVerificationToken(
            time() + (60 * 60 * 24 * 60), // 60 days,
            'referral'
        );

        response()->inertia('referrals', [
            'referrals' => $referrals,
            'referralCode' => $referralCode,
            'currentStore' => $currentStore,
        ]);
    }

    public function gettingStarted()
    {
        $currentStoreId = auth()->user()->current_store_id;

        if (!$currentStoreId) {
            return response()->redirect('/store/new', 303);
        }

        $currentStore = $currentStoreId ? Store::find($currentStoreId) : [];

        response()->inertia('getting-started', [
            'currentStore' => $currentStore,
            'wallets' => $currentStore->wallets()->get(),
            'products' => $currentStore->products()->get()
        ]);
    }
}
