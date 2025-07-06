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
        $currentStore = Store::find(auth()->user()->current_store_id);

        if (!$currentStore) {
            return response()->redirect('/store/new', 303);
        }

        return $currentStore;
    }
}
