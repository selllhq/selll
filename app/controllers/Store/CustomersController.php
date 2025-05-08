<?php

namespace App\Controllers\Store;

use App\Models\Store;
use App\Models\Customer;

class CustomersController extends Controller
{
    public function index()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        response()->inertia('products/customers', [
            'currentStore' => $currentStore,
            'orders' => $currentStore->carts()->get(),
            'customers' => $currentStore->customers()->get(),
        ]);
    }

    public function show($id)
    {
        $currentStore = Store::find(auth()->user()->current_store_id);
        $customer = Customer::find($id);

        if (!$customer || $customer->store_id !== $currentStore->id) {
            return redirect('/customers');
        }

        response()->inertia('products/customer', [
            'customer' => $customer,
            'currentStore' => $currentStore,
            'orders' => $currentStore->carts()->where('customer_id', $customer->id)->get(),
        ]);
    }
}
