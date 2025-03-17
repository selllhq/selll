<?php

namespace App\Controllers\Auth;

use App\Jobs\SendInvoiceJob;
use App\Models\Store;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $currentStoreId = auth()->user()->current_store_id;

        $stores = User::find(auth()->id())->ownedStores()->get();
        $currentStore = $currentStoreId ? Store::find($currentStoreId)->first() : [];
        $products = $currentStoreId ? Store::find($currentStoreId)->products()->get() : [];

        dispatch(SendInvoiceJob::class);

        response()->inertia('dashboard', [
            'stores' => $stores,
            'currentStore' => $currentStore,
            'products' => $products,
        ]);
    }
}
