<?php

namespace App\Controllers;

use App\Models\Cart;
use App\Models\Store;

class HomeController extends Controller
{
    public function index()
    {
        response()->inertia('index', [
            'activeStores' => cache('home.activeStores', 60 * 30, function () {
                return Store::count() + 17;
            }),
            'purchases' => cache('home.purchases', 60 * 30, function () {
                return Cart::count() + 27;
            }),
        ]);
    }
}
