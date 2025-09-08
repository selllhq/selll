<?php

namespace App\Services;

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
        $userId = auth()->id();

        return cache("user.stores.$userId", 60 * 15, function () use ($userId) {
            return User::find($userId)->ownedStores()->get();
        });
    }
}
