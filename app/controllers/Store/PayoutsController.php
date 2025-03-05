<?php

namespace App\Controllers\Store;

class PayoutsController extends Controller
{
    public function index()
    {
        response()->inertia('store/payouts', [
            'payouts' => []
        ]);
    }
}
