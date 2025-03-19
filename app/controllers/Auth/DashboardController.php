<?php

namespace App\Controllers\Auth;

use App\Jobs\SendInvoiceJob;
use App\Models\Store;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $currentStoreId = auth()->user()->current_store_id;

        $stores = User::find(auth()->id())->ownedStores()->get();
        $currentStore = $currentStoreId ? Store::find($currentStoreId)->first() : [];
        $products = $currentStoreId ? Store::find($currentStoreId)->products()->get() : [];
        $orders = $currentStore->carts->get();

        dispatch(SendInvoiceJob::class);

        response()->inertia('dashboard', [
            'stores' => $stores,
            'currentStore' => $currentStore,
            'products' => $products,
            'orders' => $orders
        ]);
    }
}

// <?php

// namespace App\Controllers\Auth;

// use App\Models\Order;
// use App\Models\User;
// use App\Models\Product;

// class DashboardController extends Controller
// {
//     public function index()
//     {
//         $user = auth()->user();
//         $currentStore = $user?->currentStore;

//         if (!$currentStore) {
//             return response()->inertia('dashboard', [
//                 'auth' => ['user' => $user],
//                 'stores' => $user->stores,
//                 'products' => [],
//                 'orders' => [],
//                 'revenue' => 0,
//                 'customers' => [],
//                 'currentStore' => null,
//             ]);
//         }

//         $orders = Order::where('store_id', $currentStore->id)
//             ->with('customer')
//             ->orderBy('created_at', 'desc')
//             ->get();

//         $products = Product::where('store_id', $currentStore->id)
//             ->withCount(['orders as sales'])
//             ->orderBy('sales', 'desc')
//             ->get();

//         $customers = User::whereHas('orders', function ($query) use ($currentStore) {
//             $query->where('store_id', $currentStore->id);
//         })->get();

//         $revenue = $orders->sum('total');

//         return response()->inertia('dashboard', [
//             'auth' => ['user' => $user],
//             'stores' => $user->stores,
//             'products' => $products,
//             'orders' => $orders,
//             'revenue' => $revenue,
//             'customers' => $customers,
//             'currentStore' => $currentStore,
//         ]);
//     }
// }
