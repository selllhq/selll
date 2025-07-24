<?php

namespace App\Controllers\Mobile;

use App\Helpers\StoreHelper;
use App\Services\SettingsService;

class StoreController extends Controller
{
    public function domain()
    {
        $data = make(SettingsService::class)->updateUrl(
            StoreHelper::find()
        );

        if (!$data['success']) {
            return response()
                ->json([
                    'success' => false,
                    'errors' => $data['errors'] ?? [],
                ]);
        }

        return response()
            ->json([
                'success' => true,
                'message' => 'Store domain updated successfully.',
            ]);
    }
}
