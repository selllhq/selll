<?php

namespace App\Services;

use App\Helpers\AnalyticsHelper;
use App\Models\Store;

class AnalyticsService
{
    /**
     * Get all dashboard stats.
     * @return array
     */
    public function getDashboardStats(Store $store): array
    {
        $products = $store->products()->withCount('purchases')->get() ?? [];
        $customers = $store->customers()->get() ?? [];
        $orders = $store
            ->carts()
            ->with('customer')
            ->where(function ($query) {
                $query->where('status', 'completed')
                    ->orWhere('status', 'paid');
            })
            ->latest()
            ->get() ?? [];

        return [
            'orders' => $orders,
            'products' => $products,
            'customers' => $customers,
            'productsSold' => $store->productPurchases()->sum('quantity'),
            'revenueGraph' => cache("analytics.revenueGraph.{$store->id}", 60 * 15, function () use ($store) {
                return AnalyticsHelper::getRevenue6Months($store->id);
            }),
            'analytics' => cache("analytics.quick.{$store->id}", 60 * 15, function () use ($store) {
                return AnalyticsHelper::getQuickAnalyticsThisMonth($store->id);
            }),
        ];
    }
}
