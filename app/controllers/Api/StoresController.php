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
        $order = Store::find($storeId)->carts()->with('customer')->find($orderId) ?? [];

        if (!$order) {
            return response()->json(['error' => 'Order not found'], 404);
        }

        $itemsInCart = $order->items()->with('product')->get();
        $order->items = $itemsInCart;

        return response()->json($order);
    }
}
