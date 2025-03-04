<?php

namespace App\Controllers\Auth;

use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $stores = User::find(auth()->id())->stores()->get();
        $currentStore = User::find(auth()->id())->currentStore()->first();

        response()->inertia('dashboard', [
            'stores' => $stores,
            'currentStore' => $currentStore,
        ]);
    }
}
