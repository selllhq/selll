<?php

namespace App\Controllers\Mobile;

use App\Helpers\StoreHelper;
use App\Services\AnalyticsService;

class StatsController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();

        response()->json(
            make(AnalyticsService::class)->getDashboardStats($currentStore)
        );
    }
}
