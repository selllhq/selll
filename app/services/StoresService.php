<?php

namespace App\Services;

use App\Helpers\AnalyticsHelper;
use App\Models\Store;
use App\Models\User;

class StoresService
{
    /**
     * Get all stores owned by the user.
     * @return \Illuminate\Database\Eloquent\Collection<Store>
     */
    public function getUserStores()
    {
        return User::find(auth()->id())->ownedStores()->get();
    }
}
