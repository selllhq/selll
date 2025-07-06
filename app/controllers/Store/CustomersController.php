<?php

namespace App\Controllers\Store;

use App\Helpers\StoreHelper;
use App\Models\Customer;

class CustomersController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();

        response()->inertia('products/customers', [
            'currentStore' => $currentStore,
            'orders' => $currentStore->carts()->get(),
            'customers' => $currentStore->customers()->get(),
        ]);
    }

    public function show($id)
    {
        $currentStore = StoreHelper::find();
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
