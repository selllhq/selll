<?php

namespace App\Controllers\Auth;

use App\Helpers\AnalyticsHelper;
use App\Helpers\StoreHelper;
use App\Models\Store;
use App\Models\User;
use App\Services\AnalyticsService;
use App\Services\StoresService;

class DashboardController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();
        $data = make(AnalyticsService::class)->getDashboardStats($currentStore);

        if (count($data['products']) === 0 && count($data['orders']) === 0) {
            return response()->redirect('/dashboard/getting-started', 303);
        }

        response()->inertia('dashboard', array_merge($data, [
            'stores' => make(StoresService::class)->getUserStores(),
            'currentStore' => $currentStore,
        ]));
    }

    public function referrals()
    {
        $currentStore = StoreHelper::find();

        $referrals = User::find(auth()->id())
            ->referrals()
            ->whereNotNull('store_id')
            ->with(['store', 'store.owner'])
            ->get();

        $referralCode = auth()->user()->generateVerificationToken(
            time() + (60 * 60 * 24 * 60), // 60 days,
            'referral'
        );

        response()->inertia('referrals', [
            'referrals' => $referrals,
            'referralCode' => $referralCode,
            'currentStore' => $currentStore,
        ]);
    }

    public function gettingStarted()
    {
        $currentStore = StoreHelper::find();

        response()->inertia('getting-started', [
            'currentStore' => $currentStore,
            'wallets' => $currentStore->wallets()->get(),
            'products' => $currentStore->products()->get()
        ]);
    }
}
