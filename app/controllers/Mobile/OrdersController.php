<?php

namespace App\Controllers\Mobile;

use App\Helpers\StoreHelper;
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
            return response()->json(['error' => 'Order not found'], 404);
        }

        response()->json([
            'order' => $data['order'],
            'items' => $data['items'],
        ]);
    }
}
