<?php

namespace App\Jobs;

use Leaf\Job;

class StoreReportJob extends Job
{
    public function schedule()
    {
        return $this->every('week')->on('monday')->at('7:00');
    }

    /**
     * Handle the job.
     * @return void
     */
    public function handle()
    {
        $allStores = \App\Models\Store::where('status', 'live')
            ->where('created_at', '<=', tick()->subtract(1, 'week')->format('YYYY-MM-DD hh:mm:ss'))
            ->whereHas('products', function ($query) {
                $query->where('status', 'active');
            })
            ->get();

        $lastWeek = tick()->subtract(1, 'week');
        $startOfLastWeek = tick($lastWeek)->startOf('week')->format('YYYY-MM-DD hh:mm:ss');
        $endOfLastWeek = tick($lastWeek)->endOf('week')->format('YYYY-MM-DD hh:mm:ss');

        foreach ($allStores as $store) {
            $productPurchasesLastWeek = $store->productPurchases()
                ->whereBetween('created_at', [$startOfLastWeek, $endOfLastWeek])
                ->sum('quantity');

            $ordersLastWeek = $store->carts()
                ->where(function ($query) {
                    $query->where('status', 'completed')
                        ->orWhere('status', 'paid');
                })
                ->whereBetween('created_at', [$startOfLastWeek, $endOfLastWeek])
                ->count();

            $revenueLastWeek = db()
                ->query('SELECT SUM(total::NUMERIC) AS total FROM carts WHERE store_id = ? AND (status = ? OR status = ?) AND created_at BETWEEN ? AND ?')
                ->bind($store->id, 'paid', 'completed', $startOfLastWeek, $endOfLastWeek)
                ->get()[0]['total'] ?? 0;

            if ($ordersLastWeek >= 20) {
                $rank = 'You ranked in the Top 20% of all stores! Keep selling to unlock a special bonus!';
            } elseif ($ordersLastWeek >= 10) {
                $rank = 'You ranked in the Top 50% of all stores! Need reduced fees? Keep selling to unlock a special bonus!';
            } elseif ($ordersLastWeek >= 1) {
                $rank = 'You made some sales this week! Keep going to unlock a special bonus!';
            } else {
                $rank = 'Share your store link and add more products to start making sales!';
            }

            if ($store->phone) {
                \App\Helpers\SMSHelper::write([
                    'recipient' => $store->phone,
                    'senderId' => 'Selll Team',
                    'message' => "Hey {$store->name}! Here's how your store did last week:\n\n- Products sold: $productPurchasesLastWeek\n- Orders: $ordersLastWeek\n- Revenue: GHS $revenueLastWeek\n\n$rank",
                ])
                    ->withArkesel()
                    ->send();
            }

            echo "Store Report sent to {$store->name} ({$store->phone})\n";
        }
    }
}
