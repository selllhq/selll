<?php

namespace App\Services;

use App\Helpers\SMSHelper;
use App\Mailers\UserMailer;
use App\Models\Cart;
use App\Models\Store;

class OrdersService
{
    /**
     * Get all store orders
     */
    public function getOrders(Store $store)
    {
        return $store->carts()->with('customer')->latest()->get();
    }

    public function getPaidOrders(Store $store)
    {
        return $store->carts()->where('status', 'paid')->with('customer')->latest()->get();
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

    /**
     * Send shipping updates to the customer
     * @param Cart $order
     * @param Store $currentStore
     * @return void
     */
    public function sendShippingUpdate(Cart $order, Store $currentStore)
    {
        $message = request()->get('message') ?? '';
        $expectedDeliveryDate = request()->get('expected_delivery_date');

        $order->shippingUpdates()->create([
            'store_id' => $currentStore->id,
            'customer_id' => $order->customer->id,
            'message' => $message,
            'estimated_delivery_date' => tick($expectedDeliveryDate)->format('Y-MM-DD H:i:s'),
        ]);

        $expectedDeliveryDate = tick($expectedDeliveryDate)->format('dd, DD MMMM YYYY');

        if ($order->customer->email) {
            UserMailer::shippingUpdate(
                $order,
                $currentStore,
                $message,
                $expectedDeliveryDate
            )
                ->send();
        } else {
            $message = $message ? ": $message" : '';

            SMSHelper::write([
                'recipient' => $order->customer->phone,
                'senderId' => 'Selll Order',
                'message' => "Update on your order #{$order->id} from {$currentStore->name} {$message}. Expected delivery date is {$expectedDeliveryDate}. Visit {$order->store_url}/orders/{$order->id} for more details.",
            ])
                ->withArkesel()
                ->send();
        }
    }

    /**
     * Complete an order
     * @param Cart $order
     * @param Store $currentStore
     * @return void
     */
    public function completeOrder(Cart $order, Store $currentStore)
    {
        SMSHelper::write([
            'recipient' => $order->customer->phone,
            'senderId' => 'Selll Order',
            'message' => "Woohoo! Your order from {$currentStore->name} has been completed. Thank you for shopping with us!",
        ])
            ->withArkesel()
            ->send();

        $order->status = 'completed';
        $order->save();
    }
}
