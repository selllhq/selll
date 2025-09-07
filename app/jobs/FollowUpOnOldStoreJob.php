<?php

namespace App\Jobs;

use Leaf\Job;

class FollowUpOnOldStoreJob extends Job
{
    public function schedule()
    {
        return $this->every('month')->on('monday')->at('12:00');
    }

    /**
     * Handle the job.
     * @return void
     */
    public function handle()
    {
        $oldStoresWithoutSalesInAWhile = \App\Models\Store::where('status', 'live')
            ->where('created_at', '<=', tick()->subtract(1, 'week')->format('YYYY-MM-DD hh:mm:ss'))
            ->whereHas('products', function ($query) {
                $query->where('status', 'active');
            })
            ->whereDoesntHave('carts', function ($query) {
                $query->where('created_at', '>=', tick()->subtract(1, 'week')->format('YYYY-MM-DD hh:mm:ss'));
            })
            ->get();

        foreach ($oldStoresWithoutSalesInAWhile as $store) {
            \App\Helpers\SMSHelper::write([
                'to' => $store->phone,
                'message' => "Hi {$store->name}, we noticed you haven't made any sales in a while. We have new marketing tools to help you boost your sales. Add your products, share your store link, and start selling today!"
            ])
                ->withArkesel()
                ->send();
        }
    }
}
