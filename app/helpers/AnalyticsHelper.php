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
            ->query(
                "SELECT
                SUM(total::NUMERIC) AS revenue,
                TO_CHAR(created_at, 'YYYY-MM') AS month
            FROM carts
            WHERE store_id = ?
              AND (status = 'paid' OR status = 'completed')
              AND created_at >= ?
            GROUP BY month",
            )->bind(
                (int) $currentStoreId,
                date('Y-m-01', strtotime('-5 months'))
            )->get();

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

    public static function getStoreViews30Days($currentStoreId)
    {
        $views = db('analytics')
            ->select('analytics', 'COUNT(*) AS views, DATE(created_at) AS date')
            ->where('store_id', (int) $currentStoreId)
            ->where('event', 'page_view')
            ->where('page', 'home')
            ->where('created_at', '>=', date('Y-m-d H:i:s', strtotime('-30 days')))
            ->groupBy('date')
            ->get();

        $viewsData = [];
        foreach ($views as $view) {
            $viewsData[$view['date']] = $view['views'];
        }

        $finalViewsList = [];
        for ($i = 29; $i >= 0; $i--) {
            $date = date('Y-m-d', strtotime("-$i days"));
            $viewsCount = $viewsData[$date] ?? 0;
            $finalViewsList[] = [
                'name' => $date,
                'views' => $viewsCount
            ];
        }

        return $finalViewsList;
    }

    public static function getQuickAnalyticsThisMonth($currentStoreId)
    {
        $startOfThisMonth = date('Y-m-01');
        $startOfLastMonth = date('Y-m-01', strtotime('first day of last month'));
        $endOfLastMonth = date('Y-m-t', strtotime('last month'));

        $views = db('analytics')->query(
            "SELECT
        CASE
            WHEN created_at >= ? THEN 'this'
            WHEN created_at BETWEEN ? AND ? THEN 'last'
        END AS period,
        COUNT(*) AS views
    FROM analytics
    WHERE store_id = ?
      AND event = 'page_view'
      AND page = 'home'
      AND (
          created_at >= ?
          OR created_at BETWEEN ? AND ?
      )
    GROUP BY period",
        )->bind(
                $startOfThisMonth,
                $startOfLastMonth,
                $endOfLastMonth,
                (int) $currentStoreId,
                $startOfThisMonth,
                $startOfLastMonth,
                $endOfLastMonth
            )->get();

        $ordersRevenue = db()->query(
            "SELECT
        CASE
            WHEN created_at >= ? THEN 'this'
            WHEN created_at BETWEEN ? AND ? THEN 'last'
        END AS period,
        COUNT(*) AS orders,
        SUM(total::NUMERIC) AS revenue
    FROM carts
    WHERE store_id = ?
      AND (status = 'paid' OR status = 'completed')
      AND (
          created_at >= ?
          OR created_at BETWEEN ? AND ?
      )
    GROUP BY period"
        )->bind(
                $startOfThisMonth,
                $startOfLastMonth,
                $endOfLastMonth,
                (int) $currentStoreId,
                $startOfThisMonth,
                $startOfLastMonth,
                $endOfLastMonth
            )->get();

        $viewsMap = collect($views)->keyBy('period');
        $ordersMap = collect($ordersRevenue)->keyBy('period');

        $viewsThis = (int) ($viewsMap['this']['views'] ?? 0);
        $viewsLast = (int) ($viewsMap['last']['views'] ?? 0);

        $ordersThis = (int) ($ordersMap['this']['orders'] ?? 0);
        $ordersLast = (int) ($ordersMap['last']['orders'] ?? 0);

        $revenueThis = (float) ($ordersMap['this']['revenue'] ?? 0);
        $revenueLast = (float) ($ordersMap['last']['revenue'] ?? 0);

        $conversionRate = $viewsThis > 0 ? round(($ordersThis / $viewsThis) * 100, 2) : 0;
        $avgOrderValue = $ordersThis > 0 ? round($revenueThis / $ordersThis, 2) : 0;

        $growth = fn($current, $previous) =>
            $previous > 0 ? round((($current - $previous) / $previous) * 100, 2) : null;

        return [
            'views' => $viewsThis,
            'revenue' => $revenueThis,
            'conversionRate' => $conversionRate,
            'averageOrderValue' => $avgOrderValue,

            'growth' => [
                'views' => $growth($viewsThis, $viewsLast),
                'revenue' => $growth($revenueThis, $revenueLast),
                'orders' => $growth($ordersThis, $ordersLast),
                'conversionRate' => $growth(
                    $viewsThis > 0 ? $ordersThis / $viewsThis : 0,
                    $viewsLast > 0 ? $ordersLast / $viewsLast : 0
                ),
                'averageOrderValue' => $growth(
                    $ordersThis > 0 ? $revenueThis / $ordersThis : 0,
                    $ordersLast > 0 ? $revenueLast / $ordersLast : 0
                ),
            ],
        ];
    }
}
