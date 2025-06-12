<?php

namespace App\Controllers\Store;

use App\Helpers\SMSHelper;
use App\Mailers\UserMailer;
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
        $order = Cart::with(['customer', 'items.product', 'shippingUpdates'])->find($id);

        if (!$order || $order->store_id !== $currentStore->id) {
            return response()->redirect('/orders');
        }

        response()->inertia('products/order', [
            'order' => $order,
            'currentStore' => $currentStore,
        ]);
    }

    public function shipping($id)
    {
        $currentStore = Store::find(auth()->user()->current_store_id);
        $order = Cart::with('customer')->find($id);

        if (!$order || $order->store_id !== $currentStore->id) {
            return response()->redirect('/orders');
        }

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
                'message' => "Update on your order #{$order->id} from {$currentStore->name} {$message}. Expected delivery date is {$expectedDeliveryDate}. Visit {$order->store_url}/order/{$order->id} for more details.",
            ])
                ->withArkesel()
                ->send();
        }

        return response()->redirect("/orders/$id");
    }

    public function cancel($id)
    {
        $currentStore = Store::find(auth()->user()->current_store_id);
        $order = Cart::with('customer')->find($id);

        if (!$order || $order->store_id !== $currentStore->id) {
            return response()->redirect('/orders');
        }

        // Logic to handle order cancellation would go here

        return response()->redirect("/orders/$id");
    }

    public function complete($id)
    {
        $currentStore = Store::find(auth()->user()->current_store_id);
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
