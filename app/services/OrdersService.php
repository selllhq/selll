<?php

namespace App\Services;

use App\Models\Cart;
use App\Models\Store;

class OrdersService
{
    /**
     * Get all store orders
     */
    public function getOrders(Store $store): array
    {
        return $store->carts()->with('customer')->latest()->get();
    }

    /**
     * Get a single order by ID
     * @param int $id
     * @param Store $store
     */
    public function getOrderById(int $id, Store $store)
    {
        $items = [];
        $order = Cart::with(['customer', 'items.product', 'shippingUpdates'])->find($id);

        if (!$order || $order->store_id !== $store->id) {
            return null;
        }

        if ($order->status === 'pending') {
            $items = json_decode(Cart::find($id, [
                'items'
            ])['items'] ?? '[]', true);

            $items = collect($items)->map(function ($item) use ($store) {
                $product = $store->products()->find($item['id']);

                if (!$product) {
                    return null;
                }

                return [
                    'id' => $item['id'],
                    'product' => $product,
                    'quantity' => $item['quantity'],
                    'amount' => $item['amount'] / 100,
                    'currency' => $item['currency'] ?? 'GHS',
                ];
            })->filter();
        }

        return [
            'order' => $order,
            'items' => $items,
        ];
    }
}
