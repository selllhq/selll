<?php

namespace App\Controllers\Mobile;

use App\Helpers\StoreHelper;
use App\Services\InventoryService;
use App\Services\OrdersService;

class ProductsController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();

        response()->json([
            'success' => true,
            'orders' => make(OrdersService::class)->getOrders($currentStore),
            'products' => make(InventoryService::class)->getProducts($currentStore),
        ]);
    }

    public function categories()
    {
        $currentStore = StoreHelper::find();

        response()->json([
            'success' => true,
            'categories' => $currentStore->categories()->get(),
        ]);
    }

    public function store()
    {
        $product = make(InventoryService::class)
            ->createProduct();

        if (!$product) {
            return response()
                ->json([
                    'success' => false,
                    'errors' => request()->errors(),
                ], 400);
        }

        return response()->json([
            'success' => true,
            'product' => $product,
        ]);
    }
}
