<?php

namespace App\Controllers\Api;

use App\Controllers\Controller;

class AnalyticsController extends Controller
{
    public function index()
    {
        response()->inertia('analytics');
    }
}
