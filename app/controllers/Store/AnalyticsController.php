<?php

namespace App\Controllers\Store;

class AnalyticsController extends Controller
{
    public function index()
    {
        response()->inertia('analytics');
    }
}
