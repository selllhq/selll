<?php

namespace App\Controllers\Api;

use App\Controllers\Controller;
use App\Models\Store;

class StoresController extends Controller
{
    public function show($store)
    {
        $store = Store::where('slug', $store)->with(['owner'])->first();

        if (! $store) {
            return response()->json([
                'error' => 'Store not found',
            ], 404);
        }

        return response()->json($store);
    }

    public function showProducts($storeId)
    {
        return response()->json(Store::find($storeId)->products()->get() ?? []);
    }

    public function showOrders($storeId, $orderId)
    {
        return response()->json(Store::find($storeId)->carts()->find($orderId) ?? []);
    }
}
