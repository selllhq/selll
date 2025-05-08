<?php

namespace App\Controllers\Store;

use App\Models\Store;
use App\Models\Cart;

class OrdersController extends Controller
{
    public function index()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        response()->inertia('products/orders', [
            'currentStore' => $currentStore,
            'products' => $currentStore->products()->get(),
            'orders' => $currentStore->carts()->with('customer')->get(),
        ]);
    }

    public function show($id)
    {
        $currentStore = Store::find(auth()->user()->current_store_id);
        $order = Cart::with(['customer', 'items.product'])->find($id);

        if (!$order || $order->store_id !== $currentStore->id) {
            return redirect('/orders');
        }

        response()->inertia('products/order', [
            'order' => $order,
            'currentStore' => $currentStore,
        ]);
    }
}
