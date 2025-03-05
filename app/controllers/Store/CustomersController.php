<?php

namespace App\Controllers\Store;

class CustomersController extends Controller
{
    public function index()
    {
        response()->inertia('products/customers', [
            'customers' => []
        ]);
    }
}
