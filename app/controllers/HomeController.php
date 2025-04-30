<?php

namespace App\Controllers;

use App\Models\Cart;
use App\Models\Store;

class HomeController extends Controller
{
    public function index()
    {
        response()->inertia('index', [
            // 'activeStores' => Store::count(),
            // 'purchases' => Cart::where('status', 'paid')->count(),
        ]);
    }
}
