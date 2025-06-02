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

    public function showCategories($storeId)
    {
        $categories = Store::find($storeId)->categories()->where('status', 'active')->get() ?? [];

        return response()->json($categories);
    }

    public function showProducts($storeId)
    {
        $category = request()->query('category');
        $sort = request()->query('sortBy', 'created_at-desc');
        $search = request()->query('search');

        $products = $category
            ? Store::find($storeId)->categories()
                ->find($category)
                ->products()
                ->where('status', 'active')
            : Store::find($storeId)
                ->products()
                ->where('status', 'active');

        if ($search) {
            $products = $products
                ->where(function ($query) use ($search) {
                    $query->where('name', 'like', "%$search%")
                        ->orWhere('description', 'like', "%$search%");
                });
        }

        if ($sort === 'popular') {
            return response()->json(
                $products
                    ->withCount('purchases')
                    ->orderByDesc('purchases_count')
                    ->get() ?? []
            );
        }

        return response()->json($products
            ->orderBy(
                explode('-', $sort)[0],
                explode('-', $sort)[1] ?? 'desc'
            )
            ->get() ?? []);
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
