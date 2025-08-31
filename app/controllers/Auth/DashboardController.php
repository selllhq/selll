<?php

namespace App\Controllers\Auth;

use App\Helpers\StoreHelper;
use App\Models\User;
use App\Services\AnalyticsService;
use App\Services\OrdersService;
use App\Services\StoresService;

class DashboardController extends Controller
{
    public function index()
    {
        $currentStore = StoreHelper::find();
        $data = make(AnalyticsService::class)->getDashboardStats($currentStore);

        response()->inertia('dashboard', array_merge($data, [
            'currentStore' => $currentStore,
            'wallets' => $currentStore->wallets()->get(),
            'customers' => $currentStore->customers()->get(),
            'stores' => make(StoresService::class)->getUserStores(),
            'paidOrders' => make(OrdersService::class)->getPaidOrders($currentStore),
            'products' => $currentStore->products()
                ->whereNot('status', 'archived')
                ->where(function ($query) {
                    return $query->where('quantity', '==', 'unlimited')
                        ->orWhere(function ($query) {
                            $query->where('quantity', 'limited')
                                ->whereRaw('CAST(quantity_items AS INTEGER) >= ?', [1]);
                        });
                })
                ->get(),
            'lowStockProducts' => $currentStore->products()
                ->where('quantity', 'limited')
                ->whereRaw('CAST(quantity_items AS INTEGER) < ?', [5])
                ->where('status', 'active')
                ->orderByRaw('CAST(quantity_items AS INTEGER) ASC')
                ->get(),
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

        $referralCode = base64_encode(auth()->user()->id);

        response()->inertia('referrals', [
            'referrals' => $referrals,
            'referralCode' => $referralCode,
            'currentStore' => $currentStore,
        ]);
    }

    public function gettingStarted()
    {
        return response()->redirect('/dashboard', 303);
    }

    public function brand()
    {
        $currentStore = StoreHelper::find();

        response()->inertia('brand-assets', [
            'currentStore' => $currentStore,
        ]);
    }
}
