<?php

namespace App\Controllers\Auth;

use App\Models\Store;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $stores = User::find(auth()->id())->ownedStores()->get();
        $currentStore = User::find(auth()->id())->currentStore()->first();
        $products = Store::find(auth()->user()->current_store_id)->products()->get();

        response()->inertia('dashboard', [
            'stores' => $stores,
            'currentStore' => $currentStore,
            'products' => $products,
        ]);
    }
}
