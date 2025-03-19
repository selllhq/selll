<?php

namespace App\Controllers\Store;

use App\Models\Store;

class OrdersController extends Controller
{
    public function index()
    {
        response()->inertia('products/orders', [
            'orders' => Store::find(auth()->user()->current_store_id)->carts()->get(),
        ]);
    }
}
