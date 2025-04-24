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
            'customers' => $currentStore->customers()->get(),
            'currentStore' => $currentStore->first(),
            'orders' => $currentStore->carts()->get(),
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
            'currentStore' => $currentStore->first(),
            'orders' => $currentStore->carts()->where('customer_id', $customer->id)->get(),
        ]);
    }
}
