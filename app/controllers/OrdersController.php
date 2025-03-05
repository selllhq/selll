<?php

namespace App\Controllers;

class OrdersController extends Controller
{
    public function index()
    {
        response()->inertia('products/orders', [
            'orders' => auth()->user()->orders()->get(),
        ]);
    }
}
