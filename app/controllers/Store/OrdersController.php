<?php

namespace App\Controllers\Store;

use App\Helpers\StoreHelper;
use App\Models\Cart;
use App\Services\OrdersService;
use App\Services\PaylinksService;

class OrdersController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();

        response()->inertia('products/orders', [
            'currentStore' => $currentStore,
            // 'products' => $currentStore->products()->get(),
            'customers' => $currentStore->customers()->get(),
            'orders' => make(OrdersService::class)->getOrders($currentStore),
            'products' => $currentStore->products()->whereNot('status', 'archived')->get(),
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
            'paylink' => make(PaylinksService::class)->getLinkByCartId($data['order']->id, $currentStore),
        ]);
    }

    public function storeLinks()
    {
        $link = make(PaylinksService::class)->createLink();

        if (!$link) {
            return response()->redirect('/orders');
        }

        // Optionally send email or SMS notification
        // UserMailer::sendLinkCreatedNotification($link, $currentStore);
        // SMSHelper::sendLinkCreatedNotification($link, $currentStore);

        return response()->redirect("/orders/{$link['cart_id']}", 303);
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

        make(OrdersService::class)->completeOrder($order, $currentStore);

        return response()->redirect("/orders/$id");
    }
}
