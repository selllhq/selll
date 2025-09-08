<?php

namespace App\Jobs;

use Leaf\Job;

class HighlightFeeReductionJob extends Job
{
    public function schedule()
    {
        return $this->every('month')->on('wednesday')->at('10:00');
    }

    /**
     * Handle the job.
     * @return void
     */
    public function handle()
    {
        $storesWithNoProducts = \App\Models\Store::where('status', 'live')
            ->whereDoesntHave('products', function ($query) {
                $query->where('status', 'active');
            })
            ->get();

        foreach ($storesWithNoProducts as $store) {
            if ($store->phone) {
                \App\Helpers\SMSHelper::write([
                    'to' => $store->phone,
                    'message' => "Hi {$store->name}, we've got a special offer for you! Add at least 5 products to your store, and enjoy a 50% reduction on your selling fees for the next month. Start adding products today to take advantage of this limited-time offer!"
                ])
                    ->withArkesel()
                    ->send();
            }
        }
    }
}
