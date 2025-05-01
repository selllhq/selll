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

        $stores = User::find(auth()->id())->ownedStores()->get();
        $currentStore = $currentStoreId ? Store::find($currentStoreId) : [];

        $products = $currentStoreId ? $currentStore->products()->get() : [];
        $customers = $currentStoreId ? $currentStore->customers()->get() : [];
        $orders = $currentStoreId ? $currentStore->carts()->with('customer')->latest()->get() : [];

        response()->inertia('dashboard', [
            'stores' => $stores,
            'currentStore' => $currentStore,
            'products' => $products,
            'orders' => $orders,
            'customers' => $customers,
            'revenueGraph' => AnalyticsHelper::getRevenue6Months($currentStoreId),
        ]);
    }
}
