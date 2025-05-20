<?php

namespace App\Controllers\Api;

use App\Controllers\Controller;
use App\Models\Store;

class StoresController extends Controller
{
    public function show($store)
    {
        $store = Store::where('slug', $store)->with(['owner'])->first();

        if (!$store) {
            return response()->json([
                'error' => 'Store not found',
            ], 404);
        }

        return response()->json($store);
    }

    public function showProducts($storeId)
    {
        $products = Store::find($storeId)->products()->where('status', 'active')->get() ?? [];

        return response()->json($products);
    }

    public function showProduct($storeId, $id)
    {
        $currentStore = Store::find($storeId);

        if (!$currentStore) {
            return response()->json(['error' => 'Store not found'], 404);
        }

        $product = $currentStore->products()->where(['id' => $id, 'status' => 'active'])->first();

        if (!$product) {
            return response()->json(['error' => 'Product not found'], 404);
        }

        return response()->json($product);
    }

    public function showOrders($storeId, $orderId)
    {
        return response()->json(Store::find($storeId)->carts()->find($orderId) ?? []);
    }
}
