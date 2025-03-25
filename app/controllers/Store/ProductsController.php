<?php

namespace App\Controllers\Store;

use App\Models\Store;
use App\Models\User;

class ProductsController extends Controller
{
    public function index()
    {
        $currentStore = Store::find(auth()->user()->current_store_id);
        $products = $currentStore->products()->get();
        $orders = $currentStore->carts()->with('customer')->latest()->get();

        if (!$currentStore) {
            return response()->redirect('/store/create', 303);
        }

        response()->inertia('products/products', [
            'orders' => $orders,
            'products' => $products,
            'currentStore' => $currentStore->first(),
        ]);
    }

    public function create()
    {
        response()->inertia('products/setup', [
            'currentStore' => Store::find(auth()->user()->current_store_id)->first(),
        ]);
    }

    public function store()
    {
        Store::find(auth()->user()->current_store_id)->products()->create(
            request()->get([
                'name',
                'description',
                'price',
                'quantity',
                'quantity_items',
            ])
        );

        return response()->redirect('/products', 303);
    }

    public function show($id)
    {
        $currentStore = Store::find(auth()->user()->current_store_id);

        response()->inertia('products/product', [
            'product' => $currentStore->products()->find($id),
            'currentStore' => $currentStore->first(),
            'orders' => $currentStore->carts()->get(),
        ]);
    }
}
