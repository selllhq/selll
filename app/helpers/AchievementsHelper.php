<?php
namespace App\Helpers;

use App\Models\Achievement;

/**
 * Achievement Helper
 * ----------------
 * Leaf MVC Helpers basically contain static methods
 * that you can call from your controllers
 */
class AchievementsHelper
{
    public static function checkForFirstProduct()
    {
        $store = StoreHelper::find();

        if ($store->products()->count() === 1) {
            if ($store->achievements()->where('type', Achievement::FIRST_PRODUCT_ADDED)->exists()) {
                return;
            }

            $achievementName = Achievement::FIRST_PRODUCT_ADDED;
            $achievement = Achievement::$achievements[$achievementName];

            $store->achievements()->create([
                'type' => $achievementName,
                'points' => $achievement['points'] ?? 0,
                'data' => json_encode($achievement)
            ]);

            if ($store->fee()->exists()) {
                $store->fee->increment('remaining_transactions', 1);
            } else {
                $store->fee()->create([
                    'rate' => '0.01',
                    'remaining_transactions' => 1,
                ]);
            }

            response()->withFlash('achievement', $achievementName);
        }
    }
}
