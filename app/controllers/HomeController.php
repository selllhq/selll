<?php

namespace App\Controllers;

use App\Models\Order;
use App\Models\Store;

class HomeController extends Controller
{
    public function index()
    {
        response()->inertia('index', [
            'activeStores' => Store::where('status', 'live')->count(),
            'purchases' => Order::count(),
        ]);
    }
}
