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

    public function defaults()
    {
        $data = request()->get([
            'allow_pickups',
            'expected_delivery_days',
            'longitude',
            'latitude',
        ]);

        $currentStore = StoreHelper::find();
        $currentStore->deliveryDefaults()->updateOrCreate(
            ['store_id' => $currentStore->id],
            [
                'allow_pickups' => $data['allow_pickups'] ?? false,
                'expected_delivery_days' => $data['expected_delivery_days'] ?? 1,
                'longitude' => $data['longitude'] ?? null,
                'latitude' => $data['latitude'] ?? null,
            ]
        );

        return response()->redirect('/deliveries', 303);
    }
}
