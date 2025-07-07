<?php

namespace App\Controllers\Api;

use App\Controllers\Controller;
use App\Models\Analytics;

class AnalyticsController extends Controller
{
    public function pageView()
    {
        $data = request()->get([
            'page',
            'action_id',
            'store_id',
            'metadata',
            'user_ip',
            'user_location',
            'user_device',
            'internal_reference',
        ]);

        $data['metadata']['page'] = request()->headers('Referer') ?? 'unknown';

        switch ($data['page']) {
            case 'home':
                app()->mixpanel->track('Store Viewed', [
                    'store_id' => $data['store_id'] ?? null,
                    'store_name' => $data['metadata']['store_name'] ?? 'unknown',
                    'source' => request()->headers('Referer') ?? 'unknown',
                ]);
                break;
            case 'product':
                app()->mixpanel->track('Product Viewed', [
                    'store_id' => $data['store_id'] ?? null,
                    'product_id' => $data['action_id'] ?? null,
                    'product_name' => $data['metadata']['product_name'] ?? 'unknown',
                    'source' => request()->headers('Referer') ?? 'unknown',
                ]);
                break;
            default:
                $data['metadata']['action'] = 'Unknown Page';
        }

        Analytics::create([
            'action' => 'page_view',
            'page' => $data['page'],
            'action_id' => $data['action_id'],
            'store_id' => $data['store_id'],
            'metadata' => json_encode($data['metadata']),
            'user_ip' => $data['user_ip'],
            'user_location' => $data['user_location'],
            'user_device' => $data['user_device'],
            'internal_reference' => $data['internal_reference'],
        ]);

        return response()->noContent();
    }

    public function productView()
    {
        $data = request()->get([
            'action_id',
            'store_id',
            'metadata',
            'user_device',
        ]);

        $geoData = request()->getUserLocation();
        $data['metadata']['page'] = request()->headers('Referer') ?? 'unknown';

        app()->mixpanel->track('Product Viewed', [
            'store_id' => $data['store_id'] ?? null,
            'product_id' => $data['action_id'] ?? null,
            'product_name' => $data['metadata']['product_name'] ?? 'unknown',
            'source' => request()->headers('Referer') ?? 'unknown',
            '$latitude' => $geoData['lat'] ?? null,
            '$longitude' => $geoData['lon'] ?? null,
        ]);

        Analytics::create([
            'event' => 'page_view',
            'page' => 'product',
            'action_id' => $data['action_id'],
            'store_id' => $data['store_id'],
            'metadata' => json_encode($data['metadata']),
            'user_ip' => $geoData['ip'],
            'user_location' => $geoData['country'] ?? 'unknown',
            'user_device' => $data['user_device'],
        ]);

        return response()->noContent();
    }

    public function addToCart()
    {
        $data = request()->get([
            'store_id',
            'action_id',
            'metadata',
            'user_device',
        ]);

        $geoData = request()->getUserLocation();
        $data['metadata']['page'] = request()->headers('Referer') ?? 'unknown';

        app()->mixpanel->track('Product Added to Cart', [
            'store_id' => $data['store_id'] ?? null,
            'product_id' => $data['action_id'] ?? null,
            'product_name' => $data['metadata']['product_name'] ?? 'unknown',
            'product_price' => $data['metadata']['product_price'] ?? 0,
            'product_quantity' => $data['metadata']['product_quantity'] ?? 1,
            'source' => request()->headers('Referer') ?? 'unknown',
            '$latitude' => $geoData['lat'] ?? null,
            '$longitude' => $geoData['lon'] ?? null,
        ]);

        Analytics::create([
            'event' => 'add_to_cart',
            'page' => 'action',
            'action_id' => $data['action_id'],
            'store_id' => $data['store_id'],
            'metadata' => json_encode($data['metadata']),
            'user_device' => $data['user_device'],
            'user_ip' => $geoData['ip'],
            'user_location' => $geoData['country'] ?? 'unknown',
        ]);

        return response()->noContent();
    }
}
