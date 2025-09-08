<?php

namespace App\Jobs;

use Leaf\Job;

class HighlightReferAndEarnJob extends Job
{
    public function schedule()
    {
        return $this->every('month')->on('tuesday')->at('9:00');
    }

    /**
     * Handle the job.
     * @return void
     */
    public function handle()
    {
        $allStores = \App\Models\Store::where('status', 'live')->get();

        foreach ($allStores as $store) {
            \App\Helpers\SMSHelper::write([
                'to' => $store->phone,
                'message' => "Hi {$store->name}, did you know you can earn cash and rewards by referring others to join Selll? Visit selll.online/dashboard/referrals to get started!"
            ])
                ->withArkesel()
                ->send();
        }
    }
}
