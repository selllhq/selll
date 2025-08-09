<?php

namespace App\Controllers\Store;

use App\Helpers\StoreHelper;

class DeliveriesController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();

        response()->inertia('deliveries/deliveries', [
            'currentStore' => $currentStore,
            'deliveryDefaults' => $currentStore->deliveryDefaults()->first(),
            'deliveries' => $currentStore->deliveries()->get(),
            'deliveryUpdates' => $currentStore->shippingUpdates()->get(),
        ]);
    }
}
