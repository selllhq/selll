<?php

namespace App\Helpers;

use App\Models\Store;
use Illuminate\Support\Collection;

class StoreHelper
{
    /**
     * Find the current store based on the authenticated user's current store ID.
     * If no store is found, redirect to the store creation page.
     *
     * @return Collection<int, Store>|Store|null|void
     */
    public static function find()
    {
        $storeId = auth()->user()->current_store_id;

        $currentStore = cache("user.store.$storeId", 60 * 15, function () use ($storeId) {
            return Store::find($storeId);
        });

        if (!$currentStore) {
            return response()->redirect('/store/new', 303);
        }

        return $currentStore;
    }
}
