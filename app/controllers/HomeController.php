<?php

namespace App\Controllers;

use App\Models\Cart;
use App\Models\Store;

class HomeController extends Controller
{
    public function index()
    {
        response()->inertia('index', [
            'activeStores' => cache('home.activeStores', 60 * 30, function () {
                return Store::count() + 17;
            }),
            'purchases' => cache('home.purchases', 60 * 30, function () {
                return Cart::count() + 27;
            }),
        ]);
    }

    public function invite($code)
    {
        $userId = base64_decode($code);
        $user = \App\Models\User::find($userId);

        if (!$user) {
            return response()->redirect('/auth/register');
        }

        $user->code = $code;

        return response()->inertia('invite', [
            'referrer' => $user->only(['id', 'name', 'email', 'avatar', 'code']),
        ]);
    }
}
