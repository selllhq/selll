<?php

namespace App\Controllers\Store;

use App\Models\Store;

class CustomersController extends Controller
{
    public function index()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        response()->inertia('products/customers', [
            'customers' => $currentStore->customers()->get(),
            'currentStore' => $currentStore->first(),
            'orders' => $currentStore->carts()->get(),
        ]);
    }
}
