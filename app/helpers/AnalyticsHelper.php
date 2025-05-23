<?php
namespace App\Helpers;

class AnalyticsHelper
{
    public static function getRevenue6Months($currentStoreId)
    {
        $months = [];
        for ($i = 5; $i >= 0; $i--) {
            $month = date('m', strtotime("-$i months"));
            $year = date('Y', strtotime("-$i months"));
            $months["$year-$month"] = 0;
        }

        $midyearRevenueList = db()
            ->select('carts', 'SUM(total::NUMERIC) AS revenue, TO_CHAR(created_at, \'YYYY-MM\') AS month')
            ->where('store_id', (int) $currentStoreId)
            ->where('status', 'paid')
            ->where('created_at', '>=', date('Y-m-01', strtotime('-5 months')))
            ->groupBy('month')
            ->get();

        $revenueData = [];
        foreach ($midyearRevenueList as $row) {
            $revenueData[$row['month']] = $row['revenue'];
        }

        $finalRevenueList = [];
        foreach ($months as $month => $revenue) {
            $finalRevenueList[] = [
                'name' => $month,
                'total' => $revenueData[$month] ?? 0
            ];
        }

        return $finalRevenueList;
    }
}
