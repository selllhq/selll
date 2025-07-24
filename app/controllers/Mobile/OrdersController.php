<?php

namespace App\Controllers\Mobile;

use App\Helpers\StoreHelper;
use App\Models\Cart;
use App\Services\OrdersService;

class OrdersController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();

        response()->json(
            make(OrdersService::class)->getOrders($currentStore)
        );
    }

    public function show($id)
    {
        $data = make(OrdersService::class)->getOrderById(
            $id,
            StoreHelper::find()
        );

        if (!$data) {
            return response()->json([
                'success' => false,
                'error' => 'Order not found'
            ], 404);
        }

        response()->json([
            'order' => $data['order'],
            'items' => $data['items'],
        ]);
    }

    public function shipping($id)
    {
        $currentStore = StoreHelper::find();
        $order = Cart::with('customer')->find($id);

        if (!$order || $order->store_id !== $currentStore->id) {
            return response()->json([
                'success' => false,
                'error' => 'Order not found'
            ], 404);
        }

        make(OrdersService::class)->sendShippingUpdate($order, $currentStore);

        return response()->json([
            'success' => true,
            'message' => 'Shipping update sent'
        ]);
    }

    public function complete($id)
    {
        $currentStore = StoreHelper::find();
        $order = Cart::with(['customer', 'shippingUpdates'])->find($id);

        if (!$order || $order->store_id !== $currentStore->id) {
            return response()->json([
                'success' => false,
                'error' => 'Order not found'
            ], 404);
        }

        make(OrdersService::class)->completeOrder($order, $currentStore);

        return response()->json([
            'success' => true,
            'message' => 'Order completed successfully'
        ]);
    }
}
