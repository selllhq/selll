<?php

namespace App\Jobs;

use Leaf\Job;

class FollowUpOnUsersWithoutStoreJob extends Job
{
    /**
     * Handle the job.
     *
     * @return void
     */
    public function handle()
    {
        echo 'This is example output from FollowUpOnUsersWithoutStoreJob';
    }
}
