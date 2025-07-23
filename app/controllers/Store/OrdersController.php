<?php

namespace App\Controllers\Store;

use App\Helpers\SMSHelper;
use App\Helpers\StoreHelper;
use App\Mailers\UserMailer;
use App\Models\Cart;
use App\Services\OrdersService;

class OrdersController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();

        response()->inertia('products/orders', [
            'currentStore' => $currentStore,
            // 'products' => $currentStore->products()->get(),
            'orders' => make(OrdersService::class)->getOrders($currentStore),
        ]);
    }

    public function show($id)
    {
        $currentStore = StoreHelper::find();
        $data = make(OrdersService::class)->getOrderById($id, $currentStore);

        if (!$data) {
            return response()->redirect('/orders');
        }

        response()->inertia('products/order', [
            'order' => $data['order'],
            'items' => $data['items'],
            'currentStore' => $currentStore,
        ]);
    }

    public function shipping($id)
    {
        $currentStore = StoreHelper::find();
        $order = Cart::with('customer')->find($id);

        if (!$order || $order->store_id !== $currentStore->id) {
            return response()->redirect('/orders');
        }

        make(OrdersService::class)->sendShippingUpdate($order, $currentStore);

        return response()->redirect("/orders/$id");
    }

    public function cancel($id)
    {
        $currentStore = StoreHelper::find();
        $order = Cart::with('customer')->find($id);

        if (!$order || $order->store_id !== $currentStore->id) {
            return response()->redirect('/orders');
        }

        // Logic to handle order cancellation would go here

        return response()->redirect("/orders/$id");
    }

    public function complete($id)
    {
        $currentStore = StoreHelper::find();
        $order = Cart::with(['customer', 'shippingUpdates'])->find($id);

        if (!$order || $order->store_id !== $currentStore->id) {
            return response()->redirect('/orders');
        }

        SMSHelper::write([
            'recipient' => $order->customer->phone,
            'senderId' => 'Selll Order',
            'message' => "Woohoo! Your order from {$currentStore->name} has been completed. Thank you for shopping with us!",
        ])
            ->withArkesel()
            ->send();

        $order->status = 'completed';
        $order->save();

        return response()->redirect("/orders/$id");
    }
}
